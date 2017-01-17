import * as React from "react";
import { Link } from "react-router";
import { Layout, Panel } from "react-toolbox";

import { Col, Row } from "../components/Grid";
import { WashingtonDC } from "../svg/WashingtonDC";

const style = require("./style.scss");

interface SiteProps {
    children: JSX.Element[];
}

interface SiteState {
    drawerActive: boolean;
    drawerPinned: boolean;
    sidebarPinned: boolean;
}

class Site extends React.Component<SiteProps, SiteState> {
    constructor(props: SiteProps) {
        super(props);
        this.state = {
            drawerActive: false,
            drawerPinned: false,
            sidebarPinned: false
        };
    }

    toggleDrawerActive = () => {
        this.state.drawerActive = !this.state.drawerActive;
        this.setState(this.state);
    }

    toggleDrawerPinned = () => {
        this.state.drawerPinned = !this.state.drawerPinned;
        this.setState(this.state);
    }

    toggleSidebar = () => {
        this.state.sidebarPinned = !this.state.sidebarPinned;
        this.setState(this.state);
    }

    render() {
        return (
            <Layout>
                <Panel>
                    <header>
                        <Row center className={style.appBar}>
                            <Col middle>
                                <Link className={style.navLink} to="/">Details</Link>
                            </Col>
                            <Col middle>
                                <Link className={style.navLink} to="/rsvp">RSVP</Link>
                            </Col>
                            <Col middle>
                                <Link className={style.navLink} to="/registry">Registry</Link>
                            </Col>
                            <Col middle>
                                <Link className={style.navLink} to="/race">5k</Link>
                            </Col>
                            <Col middle>
                                <Link className={style.navLink} to="/washington-dc">D.C.</Link>
                            </Col>
                        </Row>
                    </header>
                    <div className={style.container}>
                        {this.props.children}
                    </div>
                    <Row center>
                        <Col style={{ padding: 25 }}>
                            <WashingtonDC />
                        </Col>
                    </Row>
                    <Row center>
                        <Col>
                            <span className={style.footer}>Annie & Michael</span>
                        </Col>
                    </Row>
                    <Row center>
                        <Col>
                            <span className={style.footer}>March 18, 2017</span>
                        </Col>
                    </Row>
                </Panel>
            </Layout>
        );
    }
}

export default Site;