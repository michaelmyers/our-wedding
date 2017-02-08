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
                            href="https://secure.williams-sonoma.com/registry/w9djtcnk2b/registry-list.html"
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
                            href="http://www.crateandbarrel.com/gift-registry/annie-rorem-and-michael-myers/r5630133"
                            target="_blank">
                            <img
                                style={{ width: "100%" }}
                                src="http://february20th.com/wp-content/plugins/bean-registry/images/crate-and-barrel.png"
                            />
                        </a>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80}>
                        <h2>Donate to LSS/NCA</h2>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={80}>
                        <p><a href="http://lssnca.org/">Lutheran Social Services of the National Capital Area (LSS/NCA)</a> serves as a local affiliate of Lutheran Immigrant and Refugee Services, one of ten national voluntary refugee resettlement agencies working with the U.S. State Department to provide assistance to refugees as they strive toward self-sufficiency in the United States.  <a href="http://lssnca.org/programs/refugees_immigrant/resettlement.html">According to LSS/NCA</a>, "Since serving displaced persons following WWII over half of a century ago, LSS/NCA has partnered with local organizations, companies, and individual volunteers to aid in the resettlement of thousands of federally approved refugees as they begin new lives in the Washington DC Metro area. On the path to regain independence, families receive intensive case management, cultural orientation from our trained staff of professionals, and other services to gain self-sufficiency."  LSS/NCA uses a combination of government funding, grants, and donations to provide goods and services to the refugee families with whom it works.</p>

                        <p>Annie's church, St. Mark's on Capitol Hill, currently partners with LSS/NCA to provide resettlement assistance for three Afghan families in the area.</p>

                        <p>We would be honored if you would care to donate to LSS/NCA in commemoration of our marriage.  If you are interested in offering a donation as your gift, please visit <a href="https://lssncaorg.presencehost.net/get_involved/make_donation/">this page</a> and select "Refugee Services."</p>
                    </Col>
                </Row>
            </span>
        );
    }
}
