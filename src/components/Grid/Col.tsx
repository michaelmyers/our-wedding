import * as classnames from "classnames";
import * as React from "react";

const style = require("./style.scss");

interface ColProps {
    middle?: boolean;
    percentage?: number;
    style?: React.CSSProperties;
}

export default class Col extends React.Component<ColProps, any> {

    classNames() {
        return classnames(style.col, {
            [style.middle]: this.props.middle
        });
    }

    style(): React.CSSProperties {

        let style = {...this.props.style};

        if (this.props.percentage) {
            style = {...style, flex: "0 0 " + this.props.percentage + "%"};
        }

        return style;
    }
    render() {
        return (
            <div className={this.classNames()} style={this.style()}> {this.props.children} </div>
        );
    }

}