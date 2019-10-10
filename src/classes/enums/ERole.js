import React from 'react';
import { faUserTie, faSteeringWheel, faEye, faWrench } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../components/Utils/Icon/Icon';

const ERole = Object.freeze({
    DRIVER: 'DRIVER',
    MANAGER: 'MANAGER',
    OBSERVER: 'OBSERVER',
    MECHANIC: 'MECHANIC'
});

export const RoleIcons = {
    [ERole.DRIVER]: <Icon source="fa" icon={faSteeringWheel} />,
    [ERole.MANAGER]: <Icon source="fa" icon={faUserTie} />,
    [ERole.OBSERVER]: <Icon source="fa" icon={faEye} />,
    [ERole.MECHANIC]: <Icon source="fa" icon={faWrench} />
};

export default ERole;
