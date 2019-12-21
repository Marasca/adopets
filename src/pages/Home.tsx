import React from 'react';
import {Col, Layout, Row, Table} from "antd";
import EventBusService from "../services/EventBusService";
import ApiService from "../services/ApiService";
import {isEmptyObject, petAges, petSexes, petSizes, uppercaseWords} from "../Helpers";
import PageHeader from "../components/PageHeader";

const {Content} = Layout;

export default class Home extends React.Component<any, any> {
    state = {
        pets: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
        filters: {},
        sorting: []
    };

    getPets = (pagination: object, filters: object, sorting: Array<string>) => {
        EventBusService.$emit("SHOW_LOADER");

        ApiService.getPets(pagination, filters, sorting).then((data) => {
            this.setState({
                pets: data.result,
                pagination: {...pagination, total: data.count},
                filters: filters,
                sorting: sorting
            });

            EventBusService.$emit("HIDE_LOADER");
        });
    };

    handleTableChange = (pagination: any, filters: any, sorter: any) => {
        let searchFilters = {};
        let sorting: Array<string> = [];

        Object.keys(filters).forEach((key) => {
            // @ts-ignore
            searchFilters[key] = filters[key][0];
        });

        if (!isEmptyObject(sorter) && sorter.hasOwnProperty("order")) {
            sorting = [(sorter.order !== "ascend" ? "-" : "") + sorter.field]
        }

        this.getPets(pagination, searchFilters, sorting);
    };

    componentDidMount() {
        this.getPets(this.state.pagination, this.state.filters, this.state.sorting);
    }

    render() {
        let sexesFilter: any[] = [];
        let sizesFilter: any[] = [];
        let agesFilter: any[] = [];

        Object.keys(petSexes).forEach((key) => {
            // @ts-ignore
            sexesFilter.push({text: petSexes[key], value: key});
        });

        Object.keys(petSizes).forEach((key) => {
            // @ts-ignore
            sizesFilter.push({text: petSizes[key], value: key});
        });

        Object.keys(petAges).forEach((key) => {
            // @ts-ignore
            agesFilter.push({text: petAges[key], value: key});
        });

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: true
            },
            {
                title: 'Sex',
                dataIndex: 'sex_key',
                key: 'sex_key',
                // @ts-ignore
                render: (sex: string) => petSexes[sex],
                filterMultiple: false,
                filters: sexesFilter,
                sorter: true
            },
            {
                title: 'Size',
                dataIndex: 'size_key',
                key: 'size_key',
                // @ts-ignore
                render: (size: string) => petSizes[size],
                filterMultiple: false,
                filters: sizesFilter,
                sorter: true
            },
            {
                title: 'Age',
                dataIndex: 'age_key',
                key: 'age_key',
                // @ts-ignore
                render: (age: string) => petAges[age],
                filterMultiple: false,
                filters: agesFilter,
                sorter: true
            },
            {
                title: 'Specie',
                dataIndex: 'specie.name',
                key: 'specie_id',
                sorter: true
            },
            {
                title: 'Status',
                dataIndex: 'status_key',
                key: 'status_key',
                render: (status: string) => uppercaseWords(status),
                sorter: true
            },
            {
                title: 'Created At',
                dataIndex: 'created_date',
                key: 'created_date',
                render: (date: string) => date.substr(0, 19),
                sorter: true
            },
        ];

        return (
            <Layout className="page-layout-Home">
                <PageHeader user={this.props.user}/>
                <Content className="page-content">
                    <div className="content">
                        <Row>
                            <Col span={24}>
                                <Table columns={columns}
                                       dataSource={this.state.pets}
                                       rowKey="id"
                                       pagination={this.state.pagination}
                                       onChange={this.handleTableChange}
                                       size="small"/>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}
