import React from 'react';
import icon from './icon.png';
import './App.css';
import firebase from 'firebase/app';
import { askForPermissioToReceiveNotifications } from './push-notification';


const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={icon} className="App-logo" alt="icon" />
      <h1 className="App-title">Welcome to the push-notification registeration!</h1>
    </header>
    <button onClick={askForPermissioToReceiveNotifications} >
      Click here to receive notifications
    </button>
  </div>
);

export default App;