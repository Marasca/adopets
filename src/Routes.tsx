import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import Login from './pages/Login';

export default class Routes extends React.Component<any, any> {
    render() {
        let routes = [];

        if (this.props.user.loggedIn) {
            routes.push(<Route key="home"
                               path="/"
                               exact
                               render={(props) => <Home {...props} user={this.props.user}/>}/>);
            routes.push(<Redirect key="login" path="/login" to="/"/>);
        } else {
            routes.push(<Redirect key="home" path="/" exact to="/login"/>);
            routes.push(<Route key="login" path="/login" component={Login}/>);
        }

        return (
            <BrowserRouter>
                <Switch>
                    {routes}
                    <Route path="*" component={Error404}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
