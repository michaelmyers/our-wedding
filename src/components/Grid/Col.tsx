import * as React from "react";

const style = require("./style.scss");

interface ColProps {
    percentage?: number;
    style?: React.CSSProperties;
}

export default class Col extends React.Component<ColProps, any> {

    style(): React.CSSProperties {

        let style = {...this.props.style};

        if (this.props.percentage) {
            style = {...style, flex: "0 0 " + this.props.percentage + "%"};
        }

        return style;
    }
    render() {
        return (
            <div className={style.col} style={this.style()}> {this.props.children} </div>
        );
    }

}