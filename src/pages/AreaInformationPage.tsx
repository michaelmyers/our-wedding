import * as React from "react";

import { Col, Row } from "../components/Grid";

let style = require("../styles/main.scss");

export default class AreaInformationPage extends React.Component<any, any> {
    render() {
        return (
            <span>
                <Row center>
                    <Col>
                        <h2>Washington, D.C.</h2>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={50}>
                        <h3>Hotels</h3>
                        <p>We have blocks reserved at two near by hotels.</p>
                        <p>Since Capitol Hill is mostly residential, we also recommend <a href="https://www.airbnb.com/s/Washington--DC">AirBnB</a></p>
                        <h4>Holiday Inn Express & Suites National Arboretum </h4>
                        <ul className={style.linkList}>
                            <li>1917 Bladensburg Road NE</li>
                            <li>Washington, DC 20002</li>
                            <li>202-266-9000</li>
                            <li>Ask for the Myers-Rorem wedding.</li>
                        </ul>
                        <h4>Holiday Inn Capitol</h4>
                        <ul className={style.linkList}>
                            <li>550 C Street SW</li>
                            <li>Washington, DC 20024</li>
                            <li>202-479-4000</li>
                            <li>Ask for the Rorem wedding.</li>
                        </ul>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={50}>
                        <h3>Transportation</h3>
                        <ul className={style.linkList}>
                            <li><a href="https://www.wmata.com/">Metro</a></li>
                            <li>Taxi</li>
                            <li>Uber/Lyft</li>
                        </ul>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={50}>
                        <h3>Museums</h3>
                        <p>The Smithsonians are free. Our favorites are:</p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={50}>
                        <ul className={style.linkList}>
                            <li><a href="https://airandspace.si.edu/visit/museum-dc">The Air and Space Museum</a></li>
                            <li><a href="http://npg.si.edu/">The Portrait Gallery</a></li>
                            <li><a href="http://hirshhorn.si.edu/collection/home/">The Hirshhorm</a></li>
                            <li><a href="http://www.nga.gov/content/ngaweb/about/welcome-to-the-east-building.html">National Gallery of Art - East Building</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={50}>
                        <h3>Washington D.C.</h3>
                        <ul className={style.linkList}>
                            <li><a href="https://www.visitthecapitol.gov/">Tour the U.S. Capitol Building</a></li>
                        </ul>
                    </Col>
                </Row>
            </span>
        );
    }
}
