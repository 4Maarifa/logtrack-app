import React from 'react';

const EEquipmentModelType = Object.freeze({
    SEMI_TRUCK: 'SEMI_TRUCK',
    TANDEM: 'TANDEM',
    SEMI_TRAILER: 'SEMI_TRAILER',
    VAN: 'VAN',
    TOOL: 'TOOL'
});

export const EEquipmentModelSubType = Object.freeze({
    [EEquipmentModelType.SEMI_TRUCK]: {
        T4x2: 'T4x2',
        T6x2: 'T6x2',
        T4x2_big: 'T4x2_big',
        T6x2_big: 'T6x2_big'
    },
    [EEquipmentModelType.TANDEM]: {
        T4x2: 'T4x2',
        T6x2: 'T6x2'
    },
    [EEquipmentModelType.SEMI_TRAILER]: {
        TRAILER: 'TRAILER',
        FLATBED: 'FLATBED'
    },
    [EEquipmentModelType.VAN]: {
        L1H1: 'L1H1',
        L1H2: 'L1H2',
        L1H3: 'L1H3',

        L2H1: 'L2H1',
        L2H2: 'L2H2',
        L2H3: 'L2H3',

        L3H1: 'L3H1',
        L3H2: 'L3H2',
        L3H3: 'L3H3',

        L1BODY: 'L1BODY',
        L2BODY: 'L2BODY',
        L3BODY: 'L3BODY'
    },
    [EEquipmentModelType.TOOL]: {

    }
});

export const EEquipmentModelSubTypeIcon = Object.freeze({
    [EEquipmentModelType.SEMI_TRUCK]: {
        [EEquipmentModelSubType.SEMI_TRUCK.T4x2]: <div className="transportation-icon-container">
            <i className="icon icon-truck-front"></i>
            <i className="icon icon-truck-end-4x2"></i>
        </div>,
        [EEquipmentModelSubType.SEMI_TRUCK.T6x2]: <div className="transportation-icon-container">
            <i className="icon icon-truck-front"></i>
            <i className="icon icon-truck-end-6x2"></i>
        </div>,
        [EEquipmentModelSubType.SEMI_TRUCK.T4x2_big]: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-big"></i>
            <i className="icon icon-truck-end-4x2"></i>
        </div>,
        [EEquipmentModelSubType.SEMI_TRUCK.T6x2_big]: <div className="transportation-icon-container">
            <i className="icon icon-truck-front-big"></i>
            <i className="icon icon-truck-end-6x2"></i>
        </div>,
    },
    [EEquipmentModelType.TANDEM]: {
        [EEquipmentModelSubType.TANDEM.T4x2]: <div className="transportation-icon-container">
            <i className="icon icon-truck-front"></i>
            <i className="icon icon-truck-end-4x2-tandem-trailer"></i>
        </div>,
        [EEquipmentModelSubType.TANDEM.T6x2]: <div className="transportation-icon-container">
            <i className="icon icon-truck-front"></i>
            <i className="icon icon-truck-end-6x2-tandem-trailer"></i>
        </div>,
    },
    [EEquipmentModelType.SEMI_TRAILER]: {
        [EEquipmentModelSubType.SEMI_TRAILER.TRAILER]: <div className="transportation-icon-container">
            <i className="icon icon-trailer-start-big"></i>
            <i className="icon icon-trailer-mid-big"></i>
            <i className="icon icon-trailer-end-6"></i>
        </div>,
        [EEquipmentModelSubType.SEMI_TRAILER.FLATBED]: <div className="transportation-icon-container">
            <i className="icon icon-flatbed-start-big"></i>
            <i className="icon icon-flatbed-mid-big"></i>
            <i className="icon icon-flatbed-end-6"></i>
        </div>
    },
    [EEquipmentModelType.VAN]: {
        [EEquipmentModelSubType.VAN.L1H1]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1"></i>
            <i className="icon icon-van-end-l1h1"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L1H2]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h2"></i>
            <i className="icon icon-van-end-l1h2"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L1H3]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h3"></i>
            <i className="icon icon-van-end-l1h3"></i>
        </div>,

        [EEquipmentModelSubType.VAN.L2H1]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1"></i>
            <i className="icon icon-van-end-l2h1"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L2H2]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h2"></i>
            <i className="icon icon-van-end-l2h2"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L2H3]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h3"></i>
            <i className="icon icon-van-end-l2h3"></i>
        </div>,

        [EEquipmentModelSubType.VAN.L3H1]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1"></i>
            <i className="icon icon-van-end-l3h1"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L3H2]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h2"></i>
            <i className="icon icon-van-end-l3h2"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L3H3]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h3"></i>
            <i className="icon icon-van-end-l3h3"></i>
        </div>,

        [EEquipmentModelSubType.VAN.L1BODY]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1"></i>
            <i className="icon icon-van-end-l1-body"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L2BODY]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1"></i>
            <i className="icon icon-van-end-l2-body"></i>
        </div>,
        [EEquipmentModelSubType.VAN.L3BODY]: <div className="transportation-icon-container">
            <i className="icon icon-van-front-h1"></i>
            <i className="icon icon-van-end-l3-body"></i>
        </div>
    },
    [EEquipmentModelType.TOOL]: {

    }
});

export default EEquipmentModelType;
