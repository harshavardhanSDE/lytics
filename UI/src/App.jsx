import React, { useEffect } from 'react';
import logo from './assets/lyticsLogo.svg';
import style from './App.module.css';
import EventTracker from './eventtracker/eventtracker.jsx';
import Analytics from '../../lytics/src/index.js'


function App() {

  useEffect(() => {
    document.querySelectorAll('#track-button').forEach( button => {
      button.addEventListener('click', (e) => {
          Analytics.trackEvent('button_click', {id: e.target.id})
      }); 
  }); 
  
  window.addEventListener('load', () => {
      Analytics.trackEvent('page_view', {});
  })
  
  document.addEventListener('mousemove', (e) => {
      Analytics.trackEvent('mouse_movement', {coordinates: { X : e.clientX, Y : e.clientY} })
  });
  
  document.addEventListener('mousedown', (e) => {
      Analytics.trackEvent('page_click', {coordinates: { X : e.clientX, Y : e.clientY} } )
  })
}, []); 





  return (
    <>
      <div className={style.hero}>
        <div className={style["hero-text"]}>
          <img src={logo} alt="Lytics logo" className={style["hero-image"]}/>
          <div className={style["text_title"]}>
            <span className={style.title}>Lytics</span>
            <div className={style.description}>
              real-time event tracking, <br />fake event data generator.
            </div>
          </div>
        </div>
        <div className={style.events}>
          <div className={style["event-buttons"]}>
            <button className={style.button} id='track-button' >
              Event 1
            </button>
            <button className={style.button} id='track-button'>
              Event 2
            </button>
          </div>
        </div>
      </div>
      <EventTracker />
    </>
  );
}

export default App;
