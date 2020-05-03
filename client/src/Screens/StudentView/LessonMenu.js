import React, { Component } from 'react';
import { Button, ButtonGroup } from "@blueprintjs/core";
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';

class LessonMenu extends Component {
  state = {
    lessons : [{}]
  };

  getLessons = async () => {
    trackPromise(
      fetch('api/Lesson/all')
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.setState({ lessons: json.data });
        })
    );
  }

  componentDidMount(){
      this.getLessons();
  }

  render() {
    return (
      <div className="Body">
          <ButtonGroup large vertical>
            { /* This map prints out a bunch of buttons based on arrays
                  These arrays are taken from the database*/}
            {this.state.lessons.map((value, index) => {
              return (
                <div key={index}>
                  <Link to={"/Lesson/" + value.lesson_id}>
                    <Button
                      // example text: Lesson 1: Proof of Concept 1
                      text={"Lesson " + value.lesson_number + ": " + value.name}
                    />
                  </Link>
                  <br />
                  <br />
                </div>
              )
            })}
          </ButtonGroup>
      </div>
    );
  }
}

export default LessonMenu;
