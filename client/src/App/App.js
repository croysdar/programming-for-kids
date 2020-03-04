import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
//import Header from '../header_footer/Header.js'
//import Footer from '../header_footer/Footer.js'
//import BlocklyComp from '../BlocklyComp.js'
//import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch,Navbar, Alignment } from "@blueprintjs/core";
import HomeScreen from '../Menus/HomeScreen.js'
import LessonMenu from '../Menus/LessonMenu.js'
import LoginMenu from '../Menus/LoginMenu.js'
import CardGame from '../Menus/CardGameMenu.js'
//import LessonTemplate from '../Lesson_comps/LessonTemplate.js'
import LessonScreen from '../Lesson_comps/LessonScreen.js'
import '../CSS_files/App.css';
//require('./Editor.jsx')

class App extends Component {
render() {
    return (
      <div className="App">
        
          <Router>
              <Route exact path="/" component={LoginMenu} />
              <Route exact path="/Home" component={HomeScreen} />
              <Route exact path="/LessonMenu" component={LessonMenu} />
              <Route exact path="/CardGame" component={CardGame} />
              <Route path='/Lesson/:lessonID' component={LessonScreen} />
              {/* <Route path={`${LessonScreen}/:id`}  /> */}

              {/* <Link to="/Home"><button>Home</button></Link>
              
              <Link to="/LessonMenu"><button>Lessons</button></Link>
              <Link to="/"><button>Log in</button></Link> */}
          </Router>

        </div>
    );
  }
}

export default App;