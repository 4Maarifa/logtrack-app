
/**
 * Enum: ELoadCool
 * Describes the fact that a load or merchandise should be cooled or not
 */
const ELoadCool = Object.freeze({
    // We don't care!
    NONE: 'NONE',
    // Yes, 2 to 6°C
    REFRIGERATED: 'REFRIGERATED',
    // Yes, -20°C
    FROZEN: 'FROZEN',
    // Yes, stable as a specified temperature
    STABLE: 'STABLE',
    // Heated at a specified temperature range
    HEATED: 'HEATED'
});

export default ELoadCool;
