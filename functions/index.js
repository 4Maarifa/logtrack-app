const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

var db = admin.firestore();

const computeStatApp = express();
computeStatApp.use(cors({origin: true}));
computeStatApp.use(bodyParser.json());

const computeStat = {
  api: functions.https.onRequest((request, response) => {
    if (!request.path) {
      request.url = `/${request.url}`
    }
    return computeStatApp(request, response);
  }),
  app: (req, res) => {
    var promises = [];
  
    req.body.data.types.forEach(reqType => {
      if (computeStat.fns[reqType]) {
        promises.push(computeStat.fns[reqType](req));
      } 
      else {
        console.error('The type ' + reqType + ' was not recognized');
      }
    });
  
    Promise.all(promises)
      .then(values => {
        var result = {data: {}};
        values.forEach(value => {
          Object.assign(result.data, value);
        });
  
        return res.status(200).send(result);
      })
      .catch((e) => {
        console.error(e);
        return res.status(500).end();
      });
  },
  fns: {
    'equipment-count': req => new Promise((resolve, reject) => {
      if (!req.body.data.companyId) {
        handleError(reject, 'The equipment-count request needs the companyId param');
      }
  
      db.collection('equipments')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => resolve({equipmentCount: querySnapshot.size}))
        .catch(e => handleError(reject, e));
    }),
    'employee-count': req => new Promise((resolve, reject) => {
      if (!req.body.data.companyId) {
        handleError(reject, 'The employee-count request needs the companyId param');
      }
  
      var roles = {};
      db.collection('roles')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((roleDoc) => roles[roleDoc.id] = roleDoc.data());
          return resolve({
            employeeCount: removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId)).length
          });
        })
        .catch(e => handleError(reject, e));
    }),
    'warehouse-count': req => new Promise((resolve, reject) => {
      if (!req.body.data.companyId) {
        handleError(reject, 'The warehouse-count request needs the companyId param');
      }

      db.collection('warehouses')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => resolve({warehouseCount: querySnapshot.size}))
        .catch(e => handleError(reject, e));
    })
  }
};

computeStatApp.post('*', computeStat.app);

handleError = (reject, message) => {
  console.error(new Error(message));
  reject(message);
}

removeDuplicateFromArray = (array) => {
  return array.filter((item, pos) => array.indexOf(item) === pos);
}

module.exports = {
  computeStat: computeStat.api
};
