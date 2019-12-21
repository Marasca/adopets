import React from 'react';
import LoaderAnimation from "./../assets/images/loader.svg";
import EventBusService from "../services/EventBusService";

export default class PagerLoader extends React.Component<any, any> {
    showLoader = () => {
        // @ts-ignore
        document.querySelector("body").classList.add("show-page-loader");
    };

    hideLoader = () => {
        setTimeout(() => {
            // @ts-ignore
            document.querySelector("body").classList.remove("show-page-loader");
        }, 300);
    };

    componentDidMount() {
        EventBusService.$on("SHOW_LOADER", this.showLoader);
        EventBusService.$on("HIDE_LOADER", this.hideLoader);
    }

    componentWillUnmount() {
        EventBusService.$off("SHOW_LOADER");
        EventBusService.$off("HIDE_LOADER");
    }

    render() {
        return (
            <div className="page-loader">
                <div className="loader">
                    <img src={LoaderAnimation} alt="Loader"/>
                </div>
            </div>
        );
    }
}
