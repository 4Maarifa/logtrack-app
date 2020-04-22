const paramsInc = require('./params.inc');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

const computeStatApp = express();
computeStatApp.use(cors({origin: true}));
computeStatApp.use(bodyParser.json());

const computeStat = {
  api: functions.https.onRequest((request, response) => {
    if(!request.path) {
      request.url = `/${request.url}`
    }
    return computeStatApp(request, response);
  }),
  app: (req, res) => {
    const promises = [];
  
    req.body.data.types.forEach(reqType => {
      if(computeStat.fns[reqType]) {
        promises.push(computeStat.fns[reqType](req));
      } 
      else {
        console.error('The type ' + reqType + ' was not recognized');
      }
    });
  
    Promise.all(promises)
      .then(values => {
        const result = {data: {}};
        values.forEach(value => {
          Object.assign(result.data, value);
        });
  
        return res.status(200).send(result);
      })
      .catch(e => {
        console.error(e);
        return res.status(500).end();
      });
  },
  fns: {
    'equipment-count': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        handleError(reject, 'The equipment-count request needs the companyId param');
      }
  
      db.collection('equipments')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => resolve({equipmentCount: querySnapshot.size}))
        .catch(e => handleError(reject, e));
    }),
    'employee-count': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        handleError(reject, 'The employee-count request needs the companyId param');
      }
  
      const roles = {};
      db.collection('roles')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(roleDoc => roles[roleDoc.id] = roleDoc.data());
          return resolve({
            employeeCount: removeDuplicateFromArray(Object.keys(roles).map((roleKey) => roles[roleKey].employeeId)).length
          });
        })
        .catch(e => handleError(reject, e));
    }),
    'warehouse-count': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        handleError(reject, 'The warehouse-count request needs the companyId param');
      }

      db.collection('warehouses')
        .where('companyId', '==', req.body.data.companyId)
        .get()
        .then(querySnapshot => resolve({warehouseCount: querySnapshot.size}))
        .catch(e => handleError(reject, e));
    }),
    'requested-roles-count': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        handleError(reject, 'The requested-roles-count request needs the companyId param');
      }

      db.collection('roles')
        .where('companyId', '==', req.body.data.companyId)
        .where('status', '==', 'DRAFT')
        .get()
        .then(querySnapshot => resolve({requestedRolesCount: querySnapshot.size}))
        .catch(e => handleError(reject, e));
    }),
    'chat-count': req => new Promise((resolve, reject) => {
      if(!req.body.data.userId) {
        handleError(reject, 'The chat-count request needs the userId param');
      }

      db.collection('chats')
        .where('users', 'array-contains', req.body.data.userId)
        .get()
        .then(querySnapshot =>  {
          let conversationIds = {};
          querySnapshot.forEach(chatDoc => conversationIds[chatDoc.data().conversationId] = 1);
          return resolve({chatCount: Object.keys(conversationIds).length});
        })
        .catch(e => handleError(reject, e));
    })
  }
};

computeStatApp.post('*', computeStat.app);

const searchApp = express();
searchApp.use(cors({origin: true}));
searchApp.use(bodyParser.json());

const search = {
  api: functions.https.onRequest((request, response) => {
    if(!request.path) {
      request.url = `/${request.url}`
    }
    return searchApp(request, response);
  }),
  app: (req, res) => {
    if(!req.body.data.term) {
      console.error('The search request needs the term param');
      return res.status(500).end();
    }
    if(!req.body.data.types) {
      console.error('The search request needs the types param');
      return res.status(500).end();
    }

    const promises = [];

    req.body.data.types.forEach(reqType => {
      if(search.fns[reqType]) {
        promises.push(search.fns[reqType](req));
      } 
      else {
        console.error('The type ' + reqType + ' was not recognized');
      }
    });

    Promise.all(promises).then(values => {
      const result = {data: {}};
      values.forEach(value => {
        Object.assign(result.data, value);
      });

      return res.status(200).send(result);
    }).catch(e => {
      console.error(e);
      return res.status(500).end();
    });
  },
  fns: {
    'search-companies': req => new Promise((resolve, reject) => {  
      const companies = {};
      db.collection('companies').get()
        .then(querySnapshot => {
          querySnapshot.forEach(companyDoc => {
            if(companyDoc.data().name.toLowerCase().includes(req.body.data.term)) {
              companies[companyDoc.id] = companyDoc.data();
            }
          });
          return resolve({companies});
        })
        .catch(e => handleError(reject, e));
    }),
    'search-employees': req => new Promise((resolve, reject) => {  
      const employees = {};
      db.collection('employees').get()
        .then(querySnapshot => {
          querySnapshot.forEach(employeeDoc => {
            if(employeeDoc.data().firstname.toLowerCase().includes(req.body.data.term) || employeeDoc.data().lastname.toLowerCase().includes(req.body.data.term)) {
              employees[employeeDoc.id] = employeeDoc.data();
            }
          });
          return resolve({employees});
        })
        .catch(e => handleError(reject, e));
    }),
    'search-equipments': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        console.error('The search request needs the companyId param to search equipments');
        reject(new Error('The search request needs the companyId param to search equipments'));
      }
      const equipments = {};
      db.collection('equipments').get()
        .then(querySnapshot => {
          querySnapshot.forEach(equipmentDoc => {
            if(equipmentDoc.data().identification.toLowerCase().includes(req.body.data.term)) {
              equipments[equipmentDoc.id] = equipmentDoc.data();
            }
          });
          return resolve({equipments});
        })
        .catch(e => handleError(reject, e));
    }),
    'search-contracts': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        console.error('The search request needs the companyId param to search contracts');
        reject(new Error('The search request needs the companyId param to search contracts'));
      }
      const contracts = {};
      Promise.all([
        db.collection('contracts').where('companyExecId', '==', req.body.data.companyId).get(),
        db.collection('contracts').where('companyOrderId', '==', req.body.data.companyId).get()
      ]).then(results => {
        results[0].forEach(contractDoc => {
          if(contractDoc.data().identification.toLowerCase().includes(req.body.data.term)) {
            contracts[contractDoc.id] = contractDoc.data();
          }
        });
        results[1].forEach(contractDoc => {
          if(contractDoc.data().identification.toLowerCase().includes(req.body.data.term)) {
            contracts[contractDoc.id] = contractDoc.data();
          }
        });
        return resolve({contracts});
      }).catch(e => handleError(reject, e));
    }),
    'search-warehouses': req => new Promise((resolve, reject) => {
      if(!req.body.data.companyId) {
        console.error('The search request needs the companyId param to search warehouses');
        reject(new Error('The search request needs the companyId param to search warehouses'));
      }
      const warehouses = {};
      db.collection('warehouses').get()
        .then(querySnapshot => {
          querySnapshot.forEach(warehouseDoc => {
            if(warehouseDoc.data().name.toLowerCase().includes(req.body.data.term)) {
              warehouses[warehouseDoc.id] = warehouseDoc.data();
            }
          });
          return resolve({warehouses});
        })
        .catch(e => handleError(reject, e));
    })
  }
};

searchApp.post('*', search.app);

handleError = (reject, message) => {
  console.error(new Error(message));
  reject(message);
}

removeDuplicateFromArray = array => {
  return array.filter((item, pos) => array.indexOf(item) === pos);
}

module.exports = {
  computeStat: computeStat.api,
  search: search.api
};
