import React from 'react';
import {Button, Form, Icon, Input, Layout, notification} from "antd";
import Logo from "../assets/images/logo.svg";
import ApiService from "../services/ApiService";
import SessionService from "../services/SessionService";
import EventBusService from "../services/EventBusService";

const {Content} = Layout;

class LoginComponent extends React.Component<any, any> {
    showNotification = (type: string, title: string, message: string) => {
        // @ts-ignore
        notification[type]({
            message: title,
            description: message
        });
    };

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                EventBusService.$emit("SHOW_LOADER");

                ApiService.getAppToken().then((token) => {
                    SessionService.setItem("APP_TOKEN", token);

                    ApiService.loginUser(values.email, values.password).then((user) => {
                        EventBusService.$emit("HIDE_LOADER");

                        if (!user) {
                            this.showNotification("error", "Login error", "Invalid e-mail and/or password!");
                            return;
                        }

                        SessionService.setItem("USER_TOKEN", user.access_key);
                        SessionService.setItem("USER_FULLNAME", user.organization_user.first_name + ' ' + user.organization_user.last_name);

                        EventBusService.$emit("LOGIN_USER");
                        this.props.history.push('/');
                    });
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Layout className="page-layout-Login">
                <Content className="page-content">
                    <div className="content">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item className="logo">
                                <img src={Logo} alt="Logo"/>
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [{required: true, message: 'Please input your e-mail!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="E-mail"
                                        autoFocus={true}
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: 'Please input your password!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Layout>
        );
    }
}

const Login = Form.create()(LoginComponent);

export default Login;
