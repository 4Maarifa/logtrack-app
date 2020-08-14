
/**
 * Enum: ELoadMesure
 * Describes the way a merchandise is mesured
 */
const ELoadMeasure = Object.freeze({
    // Weight, in kg or ton
    WEIGHT: 'WEIGHT',
    // Volume, in m3 or L
    VOLUME: 'VOLUME',
    // Number of pallets
    PALLET: 'PALLET',
    // Number of items
    NUMBER: 'NUMBER',
    // Number of container and size
    CONTAINER: 'CONTAINER',
    // Special, for special transport
    EXTRA_DIMENSIONS: 'EXTRA_DIMENSIONS'
});

export default ELoadMeasure;
