import React, { Component } from 'react';
import {Link} from "react-router-dom";

import { Button, ButtonGroup, } from "@blueprintjs/core";

import BlocklyComp from '../../Blockly_comps/BlocklyComp';
import EditField from '../../SmallComponents/EditField';
import LoadingSymbol from '../../SmallComponents/LoadingSymbol';

class ManageLesson extends Component {
  state={
    // TODO change this to take in array of props
    name: '',
    question: '',
    hint: '',
    answer: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getLessonInfo();
  }

  getLessonInfo = async () => {
      const lesson_id = this.props.match.params.lessonID;
      // only load in info if this is an existing lesson
      if (lesson_id !== 'NewLesson'){
        fetch('/api/lesson/' + lesson_id)
          .then(response => {
            this.setState({isLoading: false});
            return response.json();
          })
          .then(json => {
            this.setState({
              name: json.data.name,
              question: json.data.question,
              hint: json.data.hint,
              answer: json.data.answer
            });
          });
      }
      else{
        this.setState({isLoading: false});
      }
  }

  handleSave = async e => {
    e.preventDefault();
    var name = this.state.name;
    var question = this.state.question;
    var hint = this.state.hint;
    var answer = this.state.answer;
    var lesson_id = this.props.match.params.lessonID;

    // check that none are empty
    if ((name === '') || (question === '') || (hint === '') || (answer === '')) {
      alert("Must fill in all fields. Content Not Saved.");
      return;
    }

    if (lesson_id === 'NewLesson') {
      // If we are creating a new lesson
      const response = await fetch('/api/NewLesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "question": question,
          "answer": answer,
          "name": name,
          "hint": hint,
          // TODO add xml
          // TODO add grading script?
        })
      });
      const body = await response.text();
      if (body === "Success"){
        console.info("Created " + name);
        alert("Lesson Created");
        // TODO add redirect back to manageLessons, 
        //  similar to LoginScreen Redirect
      }
      else {
        console.info("Error: " + body);
        alert("Database Error");
      }
    }
    else {
      // If we are editing an existing lesson
      const response = await fetch('/api/UpdateLesson/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "lesson_id": lesson_id,
          "question": question,
          "answer": answer,
          "name": name,
          "hint": hint,
          // TODO add xml
          // TODO add grading script?
        })
      });
      const body = await response.text();
      if (body === "Success"){
        console.info("Updated " + name);
        alert("Lesson Updated");
        // TODO add redirect back to manageLessons
      }
      else {
        console.info("Error: " + body);
        alert("Database Error");
      }
    }
  };

  onRemove = async e => {
  // onRemove = () => {
    var lesson_id = this.props.match.params.lessonID;
    // TODO add alert with confirmation
    // TODO possibly add OTP for confirmation
    // TODO remove all grades from this lesson?
      // may not be the best idea in case of accidental deletion
      // however, otp confirmation should make accidental deletion difficult
    const response = await fetch('/api/RemoveLesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lesson_id: lesson_id,
      })
    });
    const body = await response.text();
    if (body === "Success") {
      console.info("Removed " + lesson_id);
      alert("Lesson Removed");
      // TODO add redirect back to manageLessons
    }
  }

  deleteButton = () => {
    if (this.props.match.params.lessonID !== "NewLesson") {
      return (
        <Button
          text="Delete"
          intent="warning"
          icon="small-cross"
          ojnClick={(e) => this.handleRemove(e)}
        />
      );
    }
    return (
      <div />
    );
  }

  render() {
    if (this.state.isLoading){
      return (<LoadingSymbol/>);
    }
    return (
      <div className="Edit-Lesson">
        <ButtonGroup large style={{ paddingBottom: "1vh" }}>
          <Link to="/ManageLessons">
            <Button
              text="Back"
              className={"Top-Left-Back"}
              style={{ marginRight: "1vh" }}
              intent="warning"
              icon="small-cross"
            />
          </Link>
          <Button
            text="Save"
            intent="success"
            icon="small-cross"
            onClick={(e) => this.handleSave(e)}
          />
          {this.deleteButton()}
        </ButtonGroup>
        <EditField
          title="Lesson Name"
          placeholder="Click to edit..."
          value={this.state.name}
          onChange={(value) => { this.setState({ name: value }); }}
        />
        <br />
        <EditField
          title="Question"
          placeholder="Click to edit..."
          value={this.state.question}
          onChange={(value) => this.setState({ question: value })}
        />
        <br />
        <EditField
          title="Hint"
          placeholder="Click to edit..."
          value={this.state.hint}
          onChange={(value) => this.setState({ hint: value })}
        />
        <br />
        <EditField
          title="Answer"
          placeholder="Click to edit..."
          value={this.state.answer}
          onChange={(value) => this.setState({ answer: value })}
        />
        <br />
        <BlocklyComp lessonID={this.props.match.params.lessonID} />
      </div>
    );
  }
}

export default ManageLesson;