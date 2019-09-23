const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const app = express();
app.use(cors({origin: true}));
app.use(bodyParser.json());

app.post('*', (req, res) => {
  var db = admin.firestore();

  switch(req.body.data.type) {
    case 'equipment-count':
      if(!req.body.data.companyId) {
        handleError(res, 'The equipment-count request needs the companyId param');
      }

      db.collection('equipments')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => res.status(200).send({data: {equipmentCount: querySnapshot.size} }))
        .catch(e => handleError(res, e));
      break;

    case 'employee-count':
      var roles = {};
      if(!req.body.data.companyId) {
        handleError(res, 'The employee-count request needs the companyId param');
      }

      db.collection('roles')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach((roleDoc) => roles[roleDoc.id] = roleDoc.data());
          return res.status(200).send({data: {employeeCount: removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId)).length } });
        })
        .catch(e => handleError(res, e));
      break;

    default:
      handleError(res, 'Request type ' + req.body.data.type + ' not found');
      break;
  }
});

const api = functions.https.onRequest((request, response) => {
  if (!request.path) {
    request.url = `/${request.url}`
  }
  return app(request, response);
});

module.exports = {
  computeStat: api
};

handleError = (res, message) => {
  console.error(new Error(message));
  res.status(404).end();
}

removeDuplicateFromArray = (array) => {
  return array.filter((item, pos) => array.indexOf(item) === pos);
}
