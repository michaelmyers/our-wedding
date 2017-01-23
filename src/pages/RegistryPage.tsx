import * as React from "react";
import { Col, Row } from "../components/Grid";

const style = require("../styles/main.scss");

export default class RegistryPage extends React.Component<any, any> {
    render() {
        return (
            <span>
                <Row center>
                    <Col percentage={80}>
                        <h2>Registry</h2>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <p style={{ textAlign: "center", fontSize: "1.0em" }}>Your presence at our ceremony is the best gift you can give. However, if you would like to helps us celebrate with a gift, we thank you for helping us build our home together.</p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={48}>
                        <a
                            className={style.link}
                            href="https://secure.williams-sonoma.com/registry/w9djtcnk2b/access-registry.html"
                            target="_blank">
                            <img
                                style={{ width: "100%" }}
                                src="http://february20th.com/wp-content/plugins/bean-registry/images/williams-sonoma.png"
                            />
                        </a>
                    </Col>
                    <Col percentage={48}>
                        <a
                            className={style.link}
                            href="https://secure.williams-sonoma.com/registry/w9djtcnk2b/access-registry.html"
                            target="_blank">
                            <img
                                style={{ width: "100%" }}
                                src="http://february20th.com/wp-content/plugins/bean-registry/images/crate-and-barrel.png"
                            />
                        </a>
                    </Col>
                </Row>
            </span>
        );
    }
}
