import React, { Component } from 'react';
import Header from '../header_footer/Header.js'
import Footer from '../header_footer/Footer.js'
import { Button } from "@blueprintjs/core";
import '../CSS_files/App.css';
import "../../../node_modules/normalize.css";
import "../../../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import "../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";

// import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
// import { AnchorButton, Button, Code, H5, Intent, Switch as bpSwitch, Navbar, Alignment, Menu, MenuDivider, MenuItem, Popover, Position, Classes } from "@blueprintjs/core";
//import logo from './logo.svg';
//import { Text, View, StyleSheet } from 'react-native';
//import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
// import BlocklyComp from '../Blockly_comps/BlocklyComp.js'
//import LessonTemp from "./LessonTemplate.js"
// require('../Editor.jsx')

class LessonMenu extends Component {

  state = {
    lessonIDs: [],
    lessonNames: []
  }

  componentDidMount = () => {
    // This is where the arrays would be set from the database
    this.setState({
      lessonIDs: [
        'lesson_1',
        'lesson_2'
      ]
    });

    this.setState({
      lessonNames: [
        'Lesson 1',
        'Lesson 2'
      ]
    });
  }
  goToLesson = (lessonID) => {
    // changes the url when a button is clicked
    this.props.history.push(`/Lesson/${lessonID}`);
  }

  render() {
    return (
      <div className="App">

        <Header />

        <h1>Component LessonTemplate</h1>

        <div>
          { /* This prints out a bunch of buttons based on arrays 
                These arrays should be taken from the database*/}
          {this.state.lessonIDs.map((value, index) => {
            return <Button type="button" class="bp3-button bp3-icon-code-block" icon="code-block" id={index} text={this.state.lessonNames[index]} onClick={() => this.goToLesson(value)} />
          })}
        </div>

        <Footer />

      </div>
    );
  }
}

export default LessonMenu;