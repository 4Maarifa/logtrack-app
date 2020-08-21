import React from 'react';
import { Link } from 'react-router-dom';

import Terms from './../../Utils/Terms/Terms';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import ChangeLog from './pages/ChangeLog';

import AnimatedLogo from './../AnimatedLogo/AnimatedLogo';

import video_intersection_mp4 from './../../../assets/backgrounds/intersection_compressed.mp4';
import video_intersection_webm from './../../../assets/backgrounds/intersection_compressed.webm';

import './Splash.scss';

// Render page accoring to the parameter
const renderPage = page => {
  switch(page) {
    case 'terms':
      return <Terms />;
    case 'pricing':
      return <Pricing />;
    case 'contact':
      return <Contact />;
    case 'faq':
      return <FAQ />;
    case 'changelog':
      return <ChangeLog />;
    default:
      return <Home />;
  }
};

// Render footer
const renderFooter = () => {
  return <footer>
    <Link to='/'>Home</Link>
    <Link to='/pricing'>Pricing</Link>
    <Link to='/terms'>Terms &amp; Conditions</Link>
    <Link to='/faq'>FAQ</Link>
    <Link to='/changelog'>ChangeLog</Link>
    <Link to='/contact'>Contact Us</Link>
  </footer>;
};

/**
 * Component: Splash
 * SplashScreen of LogTrack
 */
const Splash = ({ page }) => {
  return (
    <div className="Splash">

      {/* Header of Splash screen, with video and logo */}
      <div className="name-container">
        <video width="1280" height="720" autoPlay loop muted>
          <source src={video_intersection_webm} type="video/webm" />
          <source src={video_intersection_mp4} type="video/mp4" />
        </video>
        <div className="name-container-content">
          <AnimatedLogo />
          <span className="headline">Your everyday logistics partner</span>
        </div>

        {/* Render page content */}
        {renderPage(page)}

        {/* Footer */}
        {renderFooter()}
      </div>
    </div>
  );
};

export default Splash;
