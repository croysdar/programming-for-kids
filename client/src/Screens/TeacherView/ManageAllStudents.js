import React, { Component } from 'react';
import { HTMLTable, Card, } from "@blueprintjs/core";
import LoadingSymbol from '../../SmallComponents/LoadingSymbol';

class ManageAllStudents extends Component {
  state = {
    students : [{}],
    isLoading: true,
  };

  getStudents = async () => {
    return fetch('api/Student/all')
      .then(response => {
        this.setState({isLoading: false});
        return response.json();
      })
      .then(json => {
        if (json.data){
          this.setState({ students: json.data });
        }
      });
  }

  goToStudent = (username) => {
    // changes the url when a button is clicked
    // TODO change this to a Link or Redirect rather than push
    console.log("Username in all: " + username);
    this.props.history.push(`/ManageStudents/${username}`);
  }

  componentDidMount() {
    this.getStudents();
  }

  render() {
    if (this.state.isLoading){
      return (<LoadingSymbol/>);
    }
    return (
      <div className="home-menu">
        <Card>
          <HTMLTable striped interactive bordered>
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th>User Name</th>
                <th>Overall Grade</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((value, key) => {
                return (
                  <tr onClick={() => this.goToStudent(value.username)} key={key}>
                    <td> {value.first_name} </td>
                    <td> {value.last_name} </td>
                    <td> {value.username} </td>
                    {/* TODO add overall grade */}
                    <td> {100 + "%"} </td>
                  </tr>
                )
              })}
            </tbody>
          </HTMLTable>
        </Card>
      </div>
    );
  }
}

export default ManageAllStudents;
