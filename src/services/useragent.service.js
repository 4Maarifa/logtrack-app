import { faQuestion } from '@fortawesome/pro-light-svg-icons';
import { faOpera, faEdge, faInternetExplorer, faFirefox, faChrome, 
  faSafari, faWindows, faApple, faLinux, faAndroid } from '@fortawesome/free-brands-svg-icons';

import { migratePrototype } from './data.service';
import ErrorService from './error.service';

const OS_REQUEST_CONSTANTS = [
  { name: 'Windows 10', regex: /(Windows 10.0|Windows NT 10.0)/},
  { name: 'Windows 8.1', regex: /(Windows 8.1|Windows NT 6.3)/},
  { name: 'Windows 8', regex: /(Windows 8|Windows NT 6.2)/},
  { name: 'Windows 7', regex: /(Windows 7|Windows NT 6.1)/},
  { name: 'Windows Vista', regex: /Windows NT 6.0/},
  { name: 'Windows Server 2003', regex: /Windows NT 5.2/},
  { name: 'Windows XP', regex: /(Windows NT 5.1|Windows XP)/},
  { name: 'Windows 2000', regex: /(Windows NT 5.0|Windows 2000)/},
  { name: 'Windows ME', regex: /(Win 9x 4.90|Windows ME)/},
  { name: 'Windows 98', regex: /(Windows 98|Win98)/},
  { name: 'Windows 95', regex: /(Windows 95|Win95|Windows_95)/},
  { name: 'Windows NT 4.0', regex: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
  { name: 'Windows CE', regex: /Windows CE/},
  { name: 'Windows 3.11', regex: /Win16/},
  { name: 'Android', regex: /Android/},
  { name: 'Open BSD', regex: /OpenBSD/},
  { name: 'Sun OS', regex: /SunOS/},
  { name: 'Linux', regex: /(Linux|X11)/},
  { name: 'iOS', regex: /(iPhone|iPad|iPod)/},
  { name: 'Mac OS X', regex: /Mac OS X/},
  { name: 'Mac OS', regex: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
  { name: 'QNX', regex: /QNX/},
  { name: 'UNIX', regex: /UNIX/},
  { name: 'BeOS', regex: /BeOS/},
  { name: 'OS/2', regex: /OS\/2/},
  { name: 'Search Bot', regex: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
];

const UserAgentService = {
  /* Clipboard */
  copyToClipboard: text => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    ErrorService.success('Copied to Clipboad!');
  },

  /* ALL */
  getAll: () => {
    return {
      appVersion: UserAgentService.getAppVersion(),
      browser: {
        isMobile: UserAgentService.isMobile(),
        isCookiesEnabled: UserAgentService.isCookiesEnabled(),
        infos: UserAgentService.getBrowserInfos()
      },
      screen: {
        isTactile: UserAgentService.getNbTouchpoints() > 0,
        nbTouchpoints: UserAgentService.getNbTouchpoints(),
        properties: UserAgentService.getScreenProperties()
      },
      connection: UserAgentService.getConnection(),
      language: UserAgentService.getLanguage(),
      memory: {
        amount: UserAgentService.getMemory(),
        usage: UserAgentService.getMemoryUsage()
      },
      processor: UserAgentService.getNbThreads(),
      plugins: UserAgentService.getPlugins()
    };
  },

  /* Version */
  getAppVersion: () => process.env.REACT_APP_VERSION,

  /* Browser */
  isMobile: () => !navigator.appVersion || /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion),
  isCookiesEnabled: () => {
    let cookieEnabled = navigator.cookieEnabled;

    if (typeof navigator.cookieEnabled === 'undefined' && !cookieEnabled) {
        document.cookie = 'testcookie';
        cookieEnabled = document.cookie.indexOf('testcookie') !== -1;
    }

    return cookieEnabled;
  },
  getBrowserInfos: () => ({ agent: navigator.userAgent, name: navigator.appName, version: navigator.appVersion }),
  parseBrowserInfos: ({ name: appName, version: appVersion, agent }) => {
    const nAgt = agent;

    let browser = appName,
      icon = faQuestion;
    let version = '' + parseFloat(appVersion);
    let majorVersion = parseInt(appVersion, 10);
    let nameOffset, verOffset, ix;

    // Opera
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
      browser = 'Opera';
      icon = faOpera;
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }

    if ((verOffset = nAgt.indexOf('OPR')) !== -1) { // Opera Next
      browser = 'Opera';
      icon = faOpera;
      version = nAgt.substring(verOffset + 4);
    } else if ((verOffset = nAgt.indexOf('Edge')) !== -1) { // Edge
      browser = 'Microsoft Edge';
      icon = faEdge;
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) { // MSIE
      browser = 'Microsoft Internet Explorer';
      icon = faInternetExplorer;
      version = nAgt.substring(verOffset + 5);
    } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) { // Chrome
      browser = 'Chrome';
      icon = faChrome;
      version = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) { // Safari
      browser = 'Safari';
      icon = faSafari;
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        version = nAgt.substring(verOffset + 8);
      }
    } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) { // Firefox
      browser = 'Firefox';
      icon = faFirefox;
      version = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident/') !== -1) { // MSIE 11+
      browser = 'Microsoft Internet Explorer';
      icon = faInternetExplorer;
      version = nAgt.substring(nAgt.indexOf('rv:') + 3);
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) { // Other browsers
      browser = nAgt.substring(nameOffset, verOffset);
      icon = faQuestion;
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() === browser.toUpperCase()) {
        browser = appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(';')) !== -1) {
      version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(' ')) !== -1) {
      version = version.substring(0, ix);
    }
    if ((ix = version.indexOf(')')) !== -1) {
      version = version.substring(0, ix);
    }

    majorVersion = parseInt('' + version, 10);
    if (isNaN(majorVersion)) {
      version = '' + parseFloat(appVersion);
      majorVersion = parseInt(appVersion, 10);
    }

    return { name: browser, icon, majorVersion, completeVersion: version };
  },

  /* OS */
  parseOS({ agent: nAgt }) {

    let os = '-';
    let version = '-';
    let icon = '';

    OS_REQUEST_CONSTANTS.forEach(clientString => {
      if (clientString.regex.test(nAgt) && os === '-') {
        os = clientString.name;
      }
    });

    if (/Windows/.test(os)) {
      version = /Windows (.*)/.exec(os)[1];
      os = 'Windows';
      icon = faWindows;
    }

    switch (os) {
      case 'Mac OS X':
        version = /Mac OS X (10[._\d]+)/.exec(nAgt)[1];
        icon = faApple;
        break;
      case 'Android':
        version = /Android ([._\d]+)/.exec(nAgt)[1];
        icon = faAndroid;
        break;
      case 'iOS':
        const osVersionIOS = /OS (\d+)_(\d+)_?(\d+)?/.exec(nAgt);
        version = osVersionIOS[1] + '.' + osVersionIOS[2] + '.' + (osVersionIOS[3] || 0);
        icon = faApple;
        break;
      case 'Linux':
        icon = faLinux;
        break;
      default:
        break;
    }

    return { os: os, osVersion: version, osIcon: icon };
  },

  /* Screen */
  getNbTouchpoints: () => navigator.maxTouchPoints || 0,
  isTactile: () => navigator.maxTouchPoints > 0,
  getScreenProperties: () => {
    return {
      height: {
          outer: window.outerHeight + ' px',
          inner: window.innerHeight + ' px',
          screen : window.screen.height + ' px',
          available: window.screen.availHeight + ' px'
      },
      width: {
          outer: window.outerWidth + ' px',
          inner: window.innerWidth + ' px',
          screen: window.screen.width + ' px',
          available: window.screen.availWidth + ' px'
      },
      isLandscapeScreen: (window.screen.width > window.screen.height),
      isLandscapeWindow: (window.outerWidth > window.outerHeight)
    };
  },

  /* Internet connection */
  getConnection: () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || navigator.msConnection || {};
      connection.online = navigator.onLine;
      if (!connection.type) {
          connection.type = 'ethernet';
      }
      return migratePrototype(connection);
  },

  /* Language */
  getLanguage: () => {
    return {
      name: navigator.language || navigator.userLanguage,
      iso: (navigator.language || navigator.userLanguage).indexOf('-') > 1 ? (navigator.language || navigator.userLanguage).split('-')[0]  : ''
    }
  },

  /* Memory */
  getMemory: () => navigator.deviceMemory ? ((navigator.deviceMemory === 8) ? '>= 8' : navigator.deviceMemory) + ' GB' : 'Unknown',
  getMemoryUsage: () => {
    if(!window.performance || !window.performance.memory) {
      return 'Unknown Usage';
    }
    let memoryTemp = window.performance.memory;
    if(!memoryTemp.jsHeapSizeLimit || !memoryTemp.totalJSHeapSize || !memoryTemp.usedJSHeapSize) {
      return 'Unknown Usage';
    }
    return {
      jsHeapSizeLimit: memoryTemp.jsHeapSizeLimit / 1000000,
      totalJSHeapSize: memoryTemp.totalJSHeapSize / 1000000,
      usedJSHeapSize: memoryTemp.usedJSHeapSize / 1000000,
      percentageUsedOfTotal: Math.floor((memoryTemp.usedJSHeapSize / memoryTemp.totalJSHeapSize) * 100)/100,
      percentageTotalOfLimit: Math.floor((memoryTemp.totalJSHeapSize / memoryTemp.jsHeapSizeLimit) * 100)/100,
      percentageTotalOfTotal: Math.floor((memoryTemp.usedJSHeapSize / memoryTemp.jsHeapSizeLimit) * 100)/100
    };
  },

  /* Processor */
  getNbThreads: () => (navigator.hardwareConcurrency || 1) + ' vCores',

  /* Plugins */
  getPlugins: () => {
    const plugins = [];

    for (let i = 0; i < navigator.plugins.length; i++) {
        plugins.push(navigator.plugins[i].name);
    }
    return plugins;
  }
};

export default UserAgentService;
