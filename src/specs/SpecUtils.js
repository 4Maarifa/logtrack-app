
const SpecUtils = {

  _consoleOriginal: {},

  mockConsole: () => {
    // Mock error
    SpecUtils._consoleOriginal.error = console.error;
    console.error = jest.fn();

    // Mock warn
    SpecUtils._consoleOriginal.warn = console.warn;
    console.warn = jest.fn();

    // Mock info
    SpecUtils._consoleOriginal.info = console.info;
    console.info = jest.fn();

    // Mock log
    SpecUtils._consoleOriginal.log = console.log;
  },
  restoreConsole: () => {
    // Restore error
    console.error = SpecUtils._consoleOriginal.error;

    // Restore warning
    console.warn = SpecUtils._consoleOriginal.warn;

    // Restore info
    console.info = SpecUtils._consoleOriginal.info;

    // Restore log
    console.log = SpecUtils._consoleOriginal.log;
  },
  removeWhitespaces: str => str.replace(/\s/g, '')
};

export default SpecUtils;
