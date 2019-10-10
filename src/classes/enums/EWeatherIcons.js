import React from 'react';
import { 
  faSun, faMoon, 
  faCloudSun, faCloudMoon,
  faCloud, 
  faCloudsSun, faCloudsMoon, 
  faCloudShowers, 
  faCloudRain, 
  faThunderstormSun, faThunderstormMoon, 
  faSnowflake, 
  faFog } from '@fortawesome/pro-solid-svg-icons';

import Icon from './../../components/Utils/Icon/Icon';

const EWeatherIcons = {
  '01d': <Icon icon={faSun} source="fa" size="2x" />,
  '01n': <Icon icon={faMoon} source="fa" size="2x" />,

  '02d': <Icon icon={faCloudSun} source="fa" size="2x" />,
  '02n': <Icon icon={faCloudMoon} source="fa" size="2x" />,

  '03d': <Icon icon={faCloud} source="fa" size="2x" />,
  '03n': <Icon icon={faCloud} source="fa" size="2x" />,

  '04d': <Icon icon={faCloudsSun} source="fa" size="2x" />,
  '04n': <Icon icon={faCloudsMoon} source="fa" size="2x" />,

  '09d': <Icon icon={faCloudShowers} source="fa" size="2x" />,
  '09n': <Icon icon={faCloudShowers} source="fa" size="2x" />,

  '10d': <Icon icon={faCloudRain} source="fa" size="2x" />,
  '10n': <Icon icon={faCloudRain} source="fa" size="2x" />,

  '11d': <Icon icon={faThunderstormSun} source="fa" size="2x" />,
  '11n': <Icon icon={faThunderstormMoon} source="fa" size="2x" />,

  '13d': <Icon icon={faSnowflake} source="fa" size="2x" />,
  '13n': <Icon icon={faSnowflake} source="fa" size="2x" />,

  '50d': <Icon icon={faFog} source="fa" size="2x" />,
  '50n': <Icon icon={faFog} source="fa" size="2x" />,
};

export default EWeatherIcons;
