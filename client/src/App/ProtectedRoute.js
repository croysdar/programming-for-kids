import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom";
import Loading from '../SmallComponents/Loading';
const jwt = require('jsonwebtoken');

class ProtectedRoute extends Component {
    state = {
        loggedIn: '',
    }

    componentDidMount = () => {
        this.checkTokenRoute();
    }

    checkTokenRoute = () => {
        var secret = this.props.secret;
        console.log("checking token");
        var token = localStorage.getItem('nccjwt');
        if (!token) {
            console.log("ctr: No Token");
            this.setState({loggedIn: "none"});
        }
        else {
            jwt.verify(token, secret, (err, decoded) => {
                var loggedIn;
                if (err) { loggedIn = "none"; }
                // Teacher is logged in
                else if (Boolean(decoded.teacher)) { loggedIn = "teacher"; }
                // Student is logged in
                else { loggedIn = "student"; }
                console.log("ctr: " + loggedIn);
                this.setState({loggedIn: loggedIn});
            });
        }
    }

    render() {
        var Comp = this.props.component;
        var requiredUser = this.props.requiredUser;
        var path = this.props.path;
        var user = this.state.loggedIn;
        var exact = this.props.exact;

        console.log("PR req " + requiredUser);
        console.log("PR cur " + user);

        var correctUser = (user === requiredUser);
        console.log ("PR cor " + correctUser);
        if (user === '') {
            console.log("LOADING");
            return(
                <Loading />
            );
        }
        else {
            return (
                <Route
                    path={path}
                    exact={exact}
                    {...this.props.params}
                    render={(props) => {
                        return correctUser ? (<Comp {...props} />) : (
                            <Redirect to={{
                                pathname: "/",
                                state: {
                                    prevLocation: path,
                                    error: "You need to login first!",
                                }}}
                            />
                        );
                    }}
                />
            );
        }
    }
}

export default ProtectedRoute;