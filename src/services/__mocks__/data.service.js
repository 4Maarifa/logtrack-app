
const DataService = {

  computeValues: () => Promise.resolve(),
  computed: {
    search: (searchTypeArray, term, companyId) => {

    },

    isConnected: () => true,

    notifyChanges: () => {/* Nothing */},
    notifyObservers: () => {/* Nothing */},

    getDefaultComputedValues: () => ({
      employee: null,
      user: null,
      activeRole: null,
      activeRoleCompany: null,
      initialized: null
    }),

    observeComputedValues: (callback, ) => {
      callback({
        employee: DataService.computed.employee,
        user: DataService.computed.user,
        activeRole: DataService.computed.activeRole,
        activeRoleCompany: DataService.computed.activeRoleCompany,
        initialized: DataService.computed.initialized
      });
    },

    unobserveComputedValues: _ => { /* Nothing */ },

    observers: {},

    user: {
      uid: '---------------',
      email: 'test@user.com'
    },
    activeRole: {
      role: 'MANAGER',
      companyId: '---------------',
      creationIsoDate: '2020-01-01T00:00:00.000Z',
      employeeId: '---------------',
      revokedIsoDate: null,
      status: 'CONFIRMED'
    },
    activeRoleCompany: {
      color: '#999999',
      creationIsoString: '2020-01-01T00:00:00.000Z',
      creator: '---------------',
      logoURL: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
      name: 'TEST COMPANY',
      plan: 'STANDARD'
    },
    employee: {
      activeRoleId: '---------------',
      certificates: [{
        date: '2020-01-01T00:00:00.000Z',
        name: 'Certificate'
      }],
      creationIsoDate: '2020-01-01T00:00:00.000Z',
      currentLogTrack: {
        '---------------': {
          activity: 'ABSENT',
          companyId: '---------------',
          creationIsoDate: '2020-01-01T00:00:00.000Z',
          creator: '---------------',
          employeeId: '---------------',
          equipmentIds: [],
          isPunctual: false,
          startIsoDate: '2020-01-01T00:00:00.000Z',
          startTimestamp: 1577836800000
        }
      },
      experience: [{
        company: 'OTHER COMPANY',
        end: null,
        name: 'CONSULTANT',
        start: '2020-01-01T00:00:00.000Z'
      }],
      firstname: 'John',
      lastname: 'Doe',
      legal: {
        acceptDate: '2020-01-01T00:00:00.000Z',
        informed: true,
        terms: true,
        version: '0.1.0'
      },
      profilePictureUrl: 'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=',
      search: {
        looking: true,
        resume: 'MY RESUME',
        roles: [ 'MANAGER', 'ACCOUNTANT' ],
        settings: {
          
        }
      }
    },
    initialized: true
  }
};

export default DataService;
