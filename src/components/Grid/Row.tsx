import * as classnames from "classnames";
import * as React from "react";

const style = require("./style.scss");

interface RowProps {
    center?: boolean;
    className?: string;
}

export default class Row extends React.Component<RowProps, any> {

    classNames() {
        return classnames(this.props.className, style.row, {
            [style.center]: this.props.center
        });
    }

    render() {
        return (
            <div className={this.classNames()}> {this.props.children} </div>
        );
    }

}
