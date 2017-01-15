import * as React from "react";

const style = require("./style.scss");

export default class Row extends React.Component<any, any> {
    render() {
        return (
            <div className={style.col}> {this.props.children} </div>
        );
    }

}