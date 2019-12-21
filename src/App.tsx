import React from 'react';
import Routes from './Routes'
import PageLoader from "./components/PageLoader";
import SessionService from "./services/SessionService";
import EventBusService from "./services/EventBusService";

export default class App extends React.Component<any, any> {
    state = {user: {loggedIn: false, name: ''}};

    loginUser = () => {
        this.setState({
            user: {
                loggedIn: !!SessionService.getItem("USER_TOKEN"),
                name: SessionService.getItem("USER_FULLNAME") || ''
            }
        });
    };

    logoutUser = () => {
        SessionService.setItem("APP_TOKEN", '');
        SessionService.setItem("USER_TOKEN", '');
        SessionService.setItem("USER_FULLNAME", '');

        this.setState({user: {loggedIn: false, name: ''}});
    };

    componentDidMount() {
        this.loginUser();

        EventBusService.$on("LOGIN_USER", this.loginUser);
        EventBusService.$on("LOGOUT_USER", this.logoutUser);
    }

    render() {
        return (
            <>
                <Routes user={this.state.user}/>
                <PageLoader/>
            </>
        );
    }
}
