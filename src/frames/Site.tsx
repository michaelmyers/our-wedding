import * as React from "react";
import { Link } from "react-router";
import { AppBar } from "react-toolbox";
import { Layout, Panel } from "react-toolbox";

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
                    <AppBar className={style.appBar}>
                        <Link className={style.navLink} to="/"> Wedding</Link>
                        <Link className={style.navLink} to="/washington-dc"> Washington, D.C.</Link>
                        <Link className={style.navLink} to="/registry"> Registry</Link>
                        <Link className={style.navLink} to="/rsvp"> RSVP</Link>
                        <Link className={style.navLink} to="/race"> 5k</Link>
                    </AppBar>
                    <div className={style.container}>
                        {this.props.children}
                    </div>
                </Panel>
            </Layout>
        );
    }
}

export default Site;