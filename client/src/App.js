import logo from './logo.svg';
import './App.css';
import { WordCloud, Sentiment } from './components';
import React, { useState, useEffect, useRef, createRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Button, Switch as ToggleSwitch } from '@material-ui/core';
import { IconContext } from "react-icons";
import { BsFillSunFill } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";
import { GiSpikyExplosion } from "react-icons/gi";
import './index.css';


import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

function App() {
  const [url, setUrl] = useState(null);
  const [ hasloaded, setHasLoaded ] = useState(false);
  const [ screenView, setScreenView ] = useState('sentiment');
  const [ showWordCloud, setShowWordCloud ] = useState(true); 
  const [mode, setMode] = useState('light');
  const [toggled, setToggled] = useState(false);


const handleWordCloudClick = () => {
  setScreenView('wordCloud');
}
const handleSentimentClick = () => {
  setScreenView('sentiment');
}
const handleModeChange = async (e) => {
  const isToggled = e.target.getAttribute('toggled');
  const reverseToggle = await !toggled;
  setToggled(reverseToggle); 
  console.log(await reverseToggle); 
  reverseToggle ? setMode('dark') : setMode('light');
}

const useThemeMode = () => {
  let classToAdd;
  let classToRemove;
  useEffect(() => {
    console.log('mode: ' + mode);
    if (mode === 'dark') {
      classToAdd = 'dark-mode';
      classToRemove = 'light-mode';
    } else {
      classToAdd = 'light-mode';
      classToRemove = 'dark-mode';
    }
    document.body.classList.remove(classToRemove);
    document.body.classList.add(classToAdd);
  }, [mode]);
}

  return (
    <Router history={history}>
    {useThemeMode()} 
      <div id='wrapper'>

      <div id='toggle-switch'>
      <IconContext.Provider value={{className: 'sun'}}>
        <FaSun id='sun' />
      </IconContext.Provider>
        <ToggleSwitch size='medium' onChange={handleModeChange} toggled={toggled}/>
      <IconContext.Provider value={{className: 'moon'}}>  
        <FaMoon id='moon' />
      </IconContext.Provider>
      </div> 
  

        <h2 id='title' className={mode === 'light' ? 'dark-purple-text' : ''}>AUDIO & VIDEO INSIGHTS</h2>
        <p id='tagline'>
        <GiSpikyExplosion className='explosion-icon emphasize' color='darkorange' />
        <span className='emphasize'> In a nutshell. </span>
        <GiSpikyExplosion className='explosion-icon emphasize' color='darkorange' />
        {/*<span className='tagline-emoji'>&#128165;</span>*/} </p>

        <Button type="submit" variant='outlined' variant={screenView === 'wordCloud' ? 'contained' : 'outlined'} color='primary' onClick={handleWordCloudClick}> Generate Word Cloud </Button> <span className='left-spacing'></span>

        <Button type="submit" variant={screenView === 'sentiment' ? 'contained' : 'outlined'} color='primary' onClick={handleSentimentClick}> Get Sentiment Score </Button>

        <WordCloud url={url} setUrl={setUrl} screenView={screenView === 'wordCloud'} setScreenView={setScreenView} showWordCloud={showWordCloud} />

        <Sentiment url={url} setUrl={setUrl} setScreenView={setScreenView} screenView={screenView === 'sentiment'} />

        <Switch>
          <Route path="/api/wordCloud" component={WordCloud} />        

         </Switch>
      </div>
    </Router>
   

    
  );
}

export default App;
