import React from 'react';
import { faImage, faPalette, faFill, faCode, faPlay } from '@fortawesome/pro-solid-svg-icons';

import { DEFAULT_THEME_COLOR, DEFAULT_MAIN_COLOR, TEXT_COLOR, LIGHT_GRAY, GRAY, EPalette, 
  EDarkPaletteDetails, EMediumPaletteDetails, ELightPaletteDetails, EVeryLightPaletteDetails } from './../../../../services/color.service';
import ModalService from './../../../../services/modal.service';

import AnimatedLogo from './../../AnimatedLogo/AnimatedLogo';

import Icon from './../../../Utils/Icon/Icon';

const DevDocIdentityTab = () => {

  return <div className="DevDocIdentityTab">
    <div className="DevDoc-section section-animated">
      <h1 className="section-title">
        <Icon source="fa" icon={faPlay} />
        Animated Logo
      </h1>
      <AnimatedLogo />
    </div>
    <div className="DevDoc-section section-colors">
      <h1 className="section-title">
        <Icon source="fa" icon={faFill} />
        Main Colors
      </h1>
      <div className="color-container">
        <span className="doc-square" style={{ backgroundColor: DEFAULT_MAIN_COLOR }}></span>
        <span>
          <h3>Main background color</h3>
          <span className="sub">{DEFAULT_MAIN_COLOR}</span>
        </span>
        <button className="DevDoc-button white-button" onClick={() => ModalService.showModal('Main Color Usage', <div>
          <div className="doc-header" style={{ backgroundColor: DEFAULT_MAIN_COLOR }}></div>
          <h3>Rules</h3>
          <ul>
            <li>Never use the hexa code directly</li>
            <li>Never set this color with partial opacity elements. The print color must always be {DEFAULT_MAIN_COLOR}</li>
            <li>This color must always be used for background purposes</li>
            <li>No text should be printed on top of it</li>
          </ul>
          <h3>Usage</h3>
          <span className="doc-code">
            <span className="doc-code-indicator">CSS</span>
            <span>color: var(--main);</span>
          </span>
          <span className="doc-code">
            <span className="doc-code-indicator">JavaScript</span>
            <span>import {`{ DEFAULT_MAIN_COLOR }`} from 'color.service';<br/>{`<div style={{ backgroundColor: DEFAULT_MAIN_COLOR }}>...</div>`}</span>
          </span>
        </div>, { actions: [] })}>
          <Icon source="fa" icon={faCode} />
        </button>
      </div>
      <div className="color-container">
        <span className="doc-square" style={{ backgroundColor: DEFAULT_THEME_COLOR }}></span>
        <span>
          <h3>Theme color</h3>
          <span className="sub">{DEFAULT_THEME_COLOR}</span>
        </span>
        <button className="DevDoc-button white-button" onClick={() => ModalService.showModal('Theme Color Usage', <div>
          <div className="doc-header" style={{ backgroundColor: DEFAULT_THEME_COLOR }}></div>
          <h3>Rules</h3>
          <ul>
            <li>Never use the hexa code directly</li>
            <li>Never set this color with partial opacity elements. The print color must always be {DEFAULT_THEME_COLOR}</li>
            <li>This color must always be used for actionable components</li>
          </ul>
          <h3>Usage</h3>
          <span className="doc-code">
            <span className="doc-code-indicator">CSS</span>
            <span>color: var(--theme);</span>
          </span>
          <span className="doc-code">
            <span className="doc-code-indicator">JavaScript</span>
            <span>import ColorService from 'color.service';<br/>{`<div style={{ backgroundColor: ColorService.get }}>...</div>`}</span>
          </span>
          The following code must never be used if an active role is set:
          <span className="doc-code">
            <span className="doc-code-indicator">JavaScript</span>
            <span>import {`{ DEFAULT_THEME_COLOR }`} from 'color.service';<br/>{`<div style={{ backgroundColor: DEFAULT_THEME_COLOR }}>...</div>`}</span>
          </span>
        </div>, { actions: [] })}>
          <Icon source="fa" icon={faCode} />
        </button>
      </div>
      <div className="color-container">
        <span className="doc-square" style={{ backgroundColor: TEXT_COLOR }}></span>
        <span>
          <h3>Text color</h3>
          <span className="sub">{TEXT_COLOR}</span>
        </span>
        <button className="DevDoc-button white-button" onClick={() => ModalService.showModal('Text Color Usage', <div>
          <div className="doc-header" style={{ backgroundColor: TEXT_COLOR }}></div>
          <h3>Rules</h3>
          <ul>
            <li>Never use the hexa code directly</li>
            <li>Never set this color with partial opacity elements. The print color must always be {TEXT_COLOR}</li>
            <li>This color must always be used for text purposes. It should not be used for background.</li>
            <li>No text should be printed with other colors than this one or inverse</li>
          </ul>
          <h3>Usage</h3>
          <span className="doc-code">
            <span className="doc-code-indicator">CSS</span>
            <span>color: var(--text);</span>
          </span>
          <span className="doc-code">
            <span className="doc-code-indicator">JavaScript</span>
            <span>import {`{ TEXT_COLOR }`} from 'color.service';<br/>{`<div style={{ backgroundColor: TEXT_COLOR }}>...</div>`}</span>
          </span>
        </div>, { actions: [] })}>
          <Icon source="fa" icon={faCode} />
        </button>
      </div>
      <div className="color-container">
        <span className="doc-square" style={{ backgroundColor: GRAY }}></span>
        <span>
          <h3>Gray</h3>
          <span className="sub">{GRAY}</span>
        </span>
      </div>
      <div className="color-container">
        <span className="doc-square" style={{ backgroundColor: LIGHT_GRAY }}></span>
        <span>
          <h3>Light Gray</h3>
          <span className="sub">{LIGHT_GRAY}</span>
        </span>
      </div>
    </div>
    <div className="DevDoc-section section-palettes">
      <h1 className="section-title">
        <Icon source="fa" icon={faPalette} />
        Palette
      </h1>
      {Object.keys(EPalette).map(paletteKey => <div className="palette-container" key={paletteKey}>
        <ul className="palette">
          <li style={{ backgroundColor: EDarkPaletteDetails[paletteKey].color }}></li>
          <li style={{ backgroundColor: EMediumPaletteDetails[paletteKey].color }}></li>
          <li style={{ backgroundColor: ELightPaletteDetails[paletteKey].color }}></li>
          <li style={{ backgroundColor: EVeryLightPaletteDetails[paletteKey].color }}></li>
        </ul>
        <span>
          <h3>{EDarkPaletteDetails[paletteKey].name}</h3>
        </span>
      </div>)}
    </div>
    <div className="DevDoc-section section-logos">
      <h1 className="section-title">
        <Icon source="fa" icon={faImage} />
        Logos
      </h1>
      <div className="logos-container">
        <div className="logo-container">
          <div>
            <Icon containerclassname="logo-small" source="custom" icon="LogTrack" />
            <Icon containerclassname="logo-medium" source="custom" icon="LogTrack" />
            <Icon containerclassname="logo-big" source="custom" icon="LogTrack" />
          </div>
          <h3>Simplified Logo</h3>
          <span>Simplified Logo</span>
        </div>
        <div className="logo-container">
          <Icon containerclassname="logo-big" source="custom" icon="LogTrackAlt" />
          <h3>Full-size Logo</h3>
          <span>Full-size Logo</span>
        </div>
        <div className="logo-container">
          <Icon containerclassname="logo-big" source="custom" icon="LogTrackAlt2" />
          <h3>Website Logo</h3>
          <span>Website Logo</span>
        </div>
      </div>
    </div>
  </div>;
}

export default DevDocIdentityTab;
