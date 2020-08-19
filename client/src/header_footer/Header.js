import React, { Component } from 'react';
import { Button, Menu, MenuDivider, MenuItem, Popover, Position, ButtonGroup } from "@blueprintjs/core";
import { Link } from 'react-router-dom';

const jwt = require('jsonwebtoken');
const secret = "this is temporary";

class Header extends Component {
    state ={
        studentLoggedIn: false,
        teacherLoggedIn: false,
        username: '',
    }

    logOut = (loggedOut) => {
        if (!loggedOut) {
            // alert("Logged out of account");
            localStorage.setItem('nccjwt', '');
        }
    }

    checkTokenMenu = () => {
        var token = localStorage.getItem('nccjwt');
        if (!token) {
            this.setState({ studentLoggedIn: false, teacherLoggedIn: false });
        }
        else {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    console.log("Error: " + err);
                    return false;
                }
                //Teacher is logging in
                else if (Boolean(decoded.teacher) === true) {
                    console.log("Teacher logged in");
                    this.setState({ teacherLoggedIn: true });
                }
                else {
                    //Student is logging in
                    console.log("Student logged in");
                    this.setState({ studentLoggedIn: true });
                }
                this.setState({ username: decoded.username });
            });
        }
    }

    usernameMessage = () => {
        if (this.state.username){
            return(
                <div>
                    <MenuItem
                        text={"Logged in as " + this.state.username}
                    />
                    {/* <h4>
                        {"Logged in as " + this.state.username}
                    </h4> */}
                    <MenuDivider />
                </div>
            );
        }
        else {
            return(
                <div />
            );
        }
    }

    render() {
        const student = this.state.studentLoggedIn;
        const teacher = this.state.teacherLoggedIn;
        const loggedOut = !(teacher||student);
        const popMenu = (
            <Menu >
                <this.usernameMessage/>
                <ButtonGroup vertical>
                    {/* <Button> */}
                        <Link to="/" >
                            <MenuItem icon="home"
                                text="Home"
                                // href={"/"}
                                disabled={loggedOut}
                            />
                        </Link>
                    {/* </Button>
                    <Button>  */}
                        <Link to={teacher ? "/ManageLessons" : "/LessonMenu"} >
                        <MenuItem icon="book"
                            text={teacher ? "Manage Lessons" : "Lessons"}
                            // href={teacher ? "/ManageLessons" : "/LessonMenu"}
                            disabled={loggedOut}
                        />
                    </Link> 
                    {/* </Button> */}
                    {/* <Button>  */}
                        <Link to={teacher ? "/ManageStudents" : "/Grades"} >
                        <MenuItem
                            icon={"clipboard"}
                            text={teacher ? "Manage Students" : "Grades"}
                            // href={teacher ? "/ManageStudents" : "/Grades"}
                            disabled={loggedOut}
                        />
                    </Link>
                     {/* </Button> */}
                </ButtonGroup>
                <MenuDivider />
                    {/* TODO add Settings*/}
                {/* <MenuItem disabled icon="cog" text="Settings">
                    <MenuItem text="option coming soon" />
                </MenuItem>
                <MenuDivider /> */}

                <Link to = {loggedOut ? "/login" : "/"} >
                    <MenuItem
                        text={loggedOut ? "Log In" : "Log Out"}
                        intent={loggedOut ? "success" : "danger"}
                        icon={loggedOut ? "log-in" : "log-out"}
                        // href={loggedOut ? "/login" : "/"}
                        onClick={() => this.logOut(loggedOut) }
                    />
                </Link>
            </Menu>
        );

        return(
            <div>
                <div className="Header">
                    <h2 className="Header-Title">Native Code Creator</h2>
                    <div className="Header-Hamburger">
                        <Popover content={popMenu} position={Position.LEFT_TOP} >
                            <Button onClick={() => { this.checkTokenMenu() }} icon="menu" />
                        </Popover>
                    </div>
                </div>
                <div style={{ 'height': '10vh' }} />
            </div>
        )
    }
}

export default Header