import React from 'react';
import Logo from "../assets/images/logo.svg";
import {Link} from "react-router-dom";
import Avatar from "../assets/images/avatar.svg";
import {Layout} from "antd";
import EventBusService from "../services/EventBusService";

const {Header} = Layout;

export default class PageHeader extends React.Component<any, any> {
    logoutUser = () => {
        EventBusService.$emit("LOGOUT_USER");
    };

    render() {
        return (
            <Header className="page-header">
                <div className="logo">
                    <img src={Logo} alt="Logo"/>
                </div>
                <div className="avatar">
                    <div>
                        <span>{this.props.user.name}</span><br/>
                        <Link to="/" onClick={this.logoutUser}>Logout</Link>
                    </div>
                    <div>
                        <img src={Avatar} alt="Avatar"/>
                    </div>
                </div>
            </Header>
        );
    }
}
