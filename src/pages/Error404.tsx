import React from 'react';
import {Button, Layout, Typography} from "antd";
import Logo from "./../assets/images/logo.svg";

const {Content} = Layout;
const {Title, Text, Paragraph} = Typography;

export default class Error404 extends React.Component<any, any> {
    render() {
        return (
            <Layout className="page-layout-Error404">
                <Content className="page-content">
                    <div className="content">
                        <img src={Logo} alt="Logo"/>
                        <Title>Page not found</Title>
                        <Paragraph>
                            <Text type="secondary">Sorry, looks like we could not find what you were looking for.</Text>
                        </Paragraph>
                        <Button type="primary"
                                size="large"
                                onClick={() => this.props.history.push("/")}>
                            Go to homepage
                        </Button>
                    </div>
                </Content>
            </Layout>
        );
    }
}
