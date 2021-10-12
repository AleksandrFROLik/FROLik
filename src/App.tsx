import React from 'react';
import './App.css';
import  {Header} from "./components/Header/Haeder";
import {NavBar} from "./components/NavBar/NavBar";
import {ProFile} from "./components/ProFile/ProFile";


function App() {
  return (
    <div className="App">
        <div className="app-wrapper">
            <Header/>
            <NavBar/>
            <ProFile/>
        </div>

    </div>
  );
}

export default App;
