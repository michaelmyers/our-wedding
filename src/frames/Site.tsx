import * as React from "react";
import { Link } from "react-router";
import { AppBar } from "react-toolbox";
import { Layout, Navigation, Panel } from "react-toolbox";

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
                    <AppBar >
                        <Navigation type="horizontal">
                            <Link to="/rsvp"> RSVP</Link>
                            <Link to="/race"> 5k</Link>
                        </Navigation>
                    </AppBar>
                    <div style={{ flex: 1, overflowY: "auto", padding: "1.8rem" }}>
                        {this.props.children}
                    </div>
                </Panel>
            </Layout>
        );
    }
}

export default Site;