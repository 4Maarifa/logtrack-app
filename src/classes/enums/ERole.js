import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSteeringWheel, faUserTie, faEye, faWrench } from '@fortawesome/pro-solid-svg-icons';

const ERole = Object.freeze({
    DRIVER: 'DRIVER',
    MANAGER: 'MANAGER',
    OBSERVER: 'OBSERVER',
    MECHANIC: 'MECHANIC'
});

export const RoleIcons = {
    [ERole.DRIVER]: <FontAwesomeIcon icon={faSteeringWheel} />,
    [ERole.MANAGER]: <FontAwesomeIcon icon={faUserTie} />,
    [ERole.OBSERVER]: <FontAwesomeIcon icon={faEye} />,
    [ERole.MECHANIC]: <FontAwesomeIcon icon={faWrench} />
};

export default ERole;
