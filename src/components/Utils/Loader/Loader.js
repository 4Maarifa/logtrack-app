import React from 'react';

import ColorService from './../../../services/color.service';

import './Loader.scss';

/**
 * Component: Loader
 * render a loader animated icon
 */
const Loader = ({ light }) => (

  /* Render an SVG icon */
  <svg className="Loader" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30">

    {/* First rect is animated with immediate begin */}
    <rect x="0" y="0" width="4" height="10" fill={light ? '#FFFFFF' : ColorService.getThemeColor()}>
      <animateTransform attributeType="xml"
        attributeName="transform" type="translate"
        values="0 0; 0 20; 0 0"
        begin="0" dur="0.6s" repeatCount="indefinite" />
    </rect>

    {/* Second rect is animated with .2s delay from the first one */}
    <rect x="10" y="0" width="4" height="10" fill={light ? '#FFFFFF' : ColorService.getThemeColor()}>
      <animateTransform attributeType="xml"
        attributeName="transform" type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
    </rect>

    {/* Third rect is anumated with .2s from the second one */}
    <rect x="20" y="0" width="4" height="10" fill={light ? '#FFFFFF' : ColorService.getThemeColor()}>
      <animateTransform attributeType="xml"
        attributeName="transform" type="translate"
        values="0 0; 0 20; 0 0"
        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
    </rect>
  </svg>
);

export default Loader;
