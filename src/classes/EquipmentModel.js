import React from 'react';
import { faToolbox } from '@fortawesome/pro-light-svg-icons';

import Icon from './../components/Utils/Icon/Icon';

/**
 * class EquipmentModel
 * The model of an equipment.
 *
 * name: string | Commercial name of the equipment
 * type: string | Generalist type of the product
 * subType: string | Less generalist type of the product
 * photoUrl: string | Photo of the equipment
 * creator: string | User id that created the equipment. Null if default equipment
 * brand: string | Brand of the product
 * 
 * Example for a cargo trailer :
 * name: 3-Achs-ULTRALIGHT-Schiebeplanen-Plateausattelanhänger
 * type: trailer
 * subType: curtainsider trailer
 * photoUrl: http://...
 * creator: null
 * brand: Schwarzmueller
 */
class EquipmentModel {
    constructor(name, type, subType, parts, photoUrl, creator, brand) {
        this.name = name;
        this.type = type;
        this.subType = subType;
        this.parts = parts;
        this.photoUrl = photoUrl;
        this.creator = creator;
        this.brand = brand;
    }
}

/**
 * Enum: EEquipmentModelType
 * Type of the equipment
 */
export const EEquipmentModelType = Object.freeze({
    // Truck / Semi truck tractor
    SEMI_TRUCK: 'SEMI_TRUCK',

    // Motorized part of a tamdem truck
    TANDEM: 'TANDEM',

    // Trailer of a semi
    SEMI_TRAILER: 'SEMI_TRAILER',

    // Trailer of a tandem
    TANDEM_TRAILER: 'TANDEM_TRAILER',

    // Van
    VAN: 'VAN',

    // Other
    TOOL: 'TOOL'
});

/**
 * Enum: EEquipmentModelTypeDetails
 * Details about the enum EEquipmentModelType
 * 
 * name: string | Printable name of the type
 * icon: HTMLElement | Icon set of the type
 */
export const EEquipmentModelTypeDetails = Object.freeze({
    [EEquipmentModelType.SEMI_TRUCK]: {
        name: 'Semi Truck',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front" />
            <i className="icon icon-truck-end-4x2" />
        </div>
    },
    [EEquipmentModelType.TANDEM]: {
        name: 'Tandem',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-truck-front" />
            <i className="icon icon-truck-end-4x2-tandem-trailer" />
        </div>
    },
    [EEquipmentModelType.SEMI_TRAILER]: {
        name: 'Semi Trailer',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-trailer-start-big" />
            <i className="icon icon-trailer-mid-big" />
            <i className="icon icon-trailer-end-6" />
        </div>
    },
    [EEquipmentModelType.VAN]: {
        name: 'Van',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1" />
            <i className="icon icon-van-end-l1h1" />
        </div>
    },
    [EEquipmentModelType.TANDEM_TRAILER]: {
        name: 'Tandem Trailer',
        icon: <div className="transportation-icon-container">
            <i className="icon icon-trailer-start-2" />
            <i className="icon icon-trailer-end-2" />
        </div>
    },
    [EEquipmentModelType.TOOL]: {
        name: 'Tool',
        icon: <Icon source="fa" icon={faToolbox} />
    }
});

/**
 * Enum: EEquipmentModelSubType
 * SubType of an equipment model type
 * Structurized as : TYPE: { SUBTYPE, SUBTYPE }
 */
export const EEquipmentModelSubType = Object.freeze({
    [EEquipmentModelType.SEMI_TRUCK]: {
        // 4x2 transmission
        T4x2: 'T4x2',
        // 6x2 Transmission
        T6x2: 'T6x2',
        // 4x2 with big hood
        T4x2_big: 'T4x2_big',
        // 6x2 with bug hood
        T6x2_big: 'T6x2_big'
    },
    [EEquipmentModelType.TANDEM]: {
        // 4x2 transmission (one rear axle)
        T4x2: 'T4x2',
        // 6x2 transmission (two rear axles)
        T6x2: 'T6x2'
    },
    [EEquipmentModelType.SEMI_TRAILER]: {
        // Trailer
        TRAILER: 'TRAILER',
        // Flatbed trailer
        FLATBED: 'FLATBED'
    },
    [EEquipmentModelType.TANDEM_TRAILER]: {
        // Tandem trailer
        TRAILER: 'TRAILER',
        // Tandem flatbed trailer
        FLATBED: 'FLATBED'
    },
    [EEquipmentModelType.VAN]: {
        // All different variants of a van

        L1H1: 'L1H1',
        L1H2: 'L1H2',
        L1H3: 'L1H3',

        L2H1: 'L2H1',
        L2H2: 'L2H2',
        L2H3: 'L2H3',

        L3H1: 'L3H1',
        L3H2: 'L3H2',
        L3H3: 'L3H3',

        // Body means no rear equipment
        L1BODY: 'L1BODY',
        L2BODY: 'L2BODY',
        L3BODY: 'L3BODY'
    },
    [EEquipmentModelType.TOOL]: {
        // Nothing here for the moment :)
    }
});

/**
 * Enum: EEquipmentModelSubTypeDetails
 * Details about the enum EEquipmentModelSubType
 * 
 * name: string | Printable name
 * icon: HTMLElement | Icon set for the subType
 */
export const EEquipmentModelSubTypeDetails = Object.freeze({
    [EEquipmentModelType.SEMI_TRUCK]: {
        [EEquipmentModelSubType.SEMI_TRUCK.T4x2]: {
            name: '4x2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-truck-front" />
                <i className="icon icon-truck-end-4x2" />
            </div>
        },
        [EEquipmentModelSubType.SEMI_TRUCK.T6x2]: {
            name: '6x2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-truck-front" />
                <i className="icon icon-truck-end-6x2" />
            </div>
        },
        [EEquipmentModelSubType.SEMI_TRUCK.T4x2_big]: {
            name: '4x2 Long Body',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-truck-front-big" />
                <i className="icon icon-truck-end-4x2" />
            </div>
        },
        [EEquipmentModelSubType.SEMI_TRUCK.T6x2_big]: {
            name: '6x2 Long Body',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-truck-front-big" />
                <i className="icon icon-truck-end-6x2" />
            </div>
        },
    },
    [EEquipmentModelType.TANDEM]: {
        [EEquipmentModelSubType.TANDEM.T4x2]: {
            name: '4x2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-truck-front" />
                <i className="icon icon-truck-end-4x2-tandem-trailer" />
            </div>
        },
        [EEquipmentModelSubType.TANDEM.T6x2]: {
            name: '6x2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-truck-front" />
                <i className="icon icon-truck-end-6x2-tandem-trailer" />
            </div>
        },
    },
    [EEquipmentModelType.SEMI_TRAILER]: {
        [EEquipmentModelSubType.SEMI_TRAILER.TRAILER]: {
            name: 'Trailer',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-trailer-start-big" />
                <i className="icon icon-trailer-mid-big" />
                <i className="icon icon-trailer-end-6" />
            </div>
        },
        [EEquipmentModelSubType.SEMI_TRAILER.FLATBED]: {
            name: 'Flatbed Trailer',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-flatbed-start-big" />
                <i className="icon icon-flatbed-mid-big" />
                <i className="icon icon-flatbed-end-6" />
            </div>
        }
    },
    [EEquipmentModelType.TANDEM_TRAILER]: {
        [EEquipmentModelSubType.TANDEM_TRAILER.TRAILER]: {
            name: 'Trailer',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-trailer-start-2" />
                <i className="icon icon-trailer-end-2" />
            </div>
        },
        [EEquipmentModelSubType.TANDEM_TRAILER.FLATBED]: {
            name: 'Flatbed',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-flatbed-start-2" />
                <i className="icon icon-flatbed-end-2" />
            </div>
        }
    },
    [EEquipmentModelType.VAN]: {
        [EEquipmentModelSubType.VAN.L1H1]: {
            name: 'L1H1',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h1" />
                <i className="icon icon-van-end-l1h1" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L1H2]: {
            name: 'L1H2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h2" />
                <i className="icon icon-van-end-l1h2" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L1H3]: {
            name: 'L1H3',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h3" />
                <i className="icon icon-van-end-l1h3" />
            </div>
        },

        [EEquipmentModelSubType.VAN.L2H1]: {
            name: 'L2H1',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h1" />
                <i className="icon icon-van-end-l2h1" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L2H2]: {
            name: 'L2H2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h2" />
                <i className="icon icon-van-end-l2h2" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L2H3]: {
            name: 'L2H3',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h3" />
                <i className="icon icon-van-end-l2h3" />
            </div>
        },

        [EEquipmentModelSubType.VAN.L3H1]: {
            name: 'L3H1',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h1" />
                <i className="icon icon-van-end-l3h1" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L3H2]: {
            name: 'L3H2',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h2" />
                <i className="icon icon-van-end-l3h2" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L3H3]: {
            name: 'L3H3',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h3" />
                <i className="icon icon-van-end-l3h3" />
            </div>
        },

        [EEquipmentModelSubType.VAN.L1BODY]: {
            name: 'L1 Body',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h1" />
                <i className="icon icon-van-end-l1-body" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L2BODY]: {
            name: 'L2 Body',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h1" />
                <i className="icon icon-van-end-l2-body" />
            </div>
        },
        [EEquipmentModelSubType.VAN.L3BODY]: {
            name: 'L3 Body',
            icon: <div className="transportation-icon-container">
                <i className="icon icon-van-front-h1" />
                <i className="icon icon-van-end-l3-body" />
            </div>
        }
    },
    [EEquipmentModelType.TOOL]: {
        // Nothing here for the moment :)
    }
});

export default EquipmentModel;
