import * as React from "react";

import { Col, Row } from "../components/Grid";

export default class HomePage extends React.Component<any, any> {
    render() {
        return (
            <span>
                <Row center>
                    <Col>
                        <h2>Annie & Michael</h2>
                        <h4>5:30 PM March 18, 2017</h4>
                        <h5>Eastern Market</h5>
                        <h5>Washington, D.C.</h5>
                    </Col>
                </Row>
                <Row center>
                    <Col>
                        <h4>Schedule</h4>
                        <h4>Venue</h4>
                        <h4>Menu</h4>
                        <h4>Entertainment</h4>
                    </Col>
                </Row>
            </span>
        );
    }
}
