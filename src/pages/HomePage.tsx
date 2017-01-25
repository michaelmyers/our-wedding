import * as React from "react";
import { Link } from "react-router";
import { Button } from "react-toolbox/lib/button";

import { Col, Row } from "../components/Grid";
const style = require("../styles/main");
let buttonStyle = require("../styles/button");

export default class HomePage extends React.Component<any, any> {
    render() {
        return (
            <span>
                <Row center>
                    <Col>
                        <h4>The wedding of</h4>
                        <h2>Annie Rorem & Michael Myers</h2>
                        <h4>March 18, 2017 5:00 PM</h4>
                        <h5>Eastern Market</h5>
                        <h5>Washington, D.C.</h5>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3>Schedule</h3>
                        <h5>Friday, March 17</h5>
                        <p><span className={style.time}>8:00 PM</span> - Join us for a drink & appetizers</p>
                        <p className={style.detail}><a href="#tunnicliffs">@ Tunnicliff's Tavern</a></p>
                        <h5>Saturday, March 18</h5>
                        <p><span className={style.time}>9:30 AM</span>- Annie & Michael Wedding Day 5K</p>
                        <p className={style.detail}><Link to="/race">More Details</Link></p>
                        <p><strong>~</strong></p>
                        <p><span className={style.time}>5:00 PM</span> - Ceremony</p>
                        <p className={style.detail}><a href="#eastern-market">@ Eastern Market - North Hall</a></p>
                        <p><span className={style.time}>5:30 PM</span> - Cocktails</p>
                        <p><span className={style.time}>6:30 PM</span> - Dinner</p>
                        <p className={style.detail}><a href="#menu">Dinner Menu</a></p>
                        <p><span className={style.time}>7:30 PM</span> - Live Music & Dancing</p>
                        <p className={style.detail}><a href="#band">The Band</a></p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3>Venues</h3>
                        <img id="tunnicliffs" style={{ width: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/wedding-website-b17ea.appspot.com/o/assets%2Fimgs%2Ftunnicliffs.png?alt=media&token=a20ef9bb-0d2d-43c9-8876-be680e920db1" />
                        <h4>Tunnicliff's Tavern</h4>
                        <p>Tunnicliff's Tavern, across the street from Eastern Market, is one of our favorite neighborhood spots to meet up with friends.  Join us the night before the wedding for a drink and appetizers; our treat.</p>
                        <h6><a href="https://www.google.com/maps/place/Tunnicliff's+Tavern/@38.8865669,-76.9979647,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7b83181e5d1a3:0x9f441236d8b5dddd!8m2!3d38.8865627!4d-76.995776">222 7th St SE, Washington, DC 20003</a></h6>
                        <img id="eastern-market" style={{ width: "100%" }} src="https://firebasestorage.googleapis.com/v0/b/wedding-website-b17ea.appspot.com/o/assets%2Fimgs%2Feastern-market.png?alt=media&token=a3dc3ef3-0cd6-42a2-8665-07104d0e4e89" />
                        <h4>Eastern Market</h4>
                        <p>Built in 1873, Eastern Market serves the Capitol Hill neighborhood of D.C. as a public market.  It was included in L'Enfant's original 1791 plan for Washington, D.C. (along with a Central Market and Western Market) and is the only remaining market building that still functions as a market.  Listed on the National Register of Historic Places, it is the center of our community in D.C. — visiting the market to pick up groceries or sunflowers is a common weekend activity.</p>
                        <h6><a href="https://www.google.com/maps/place/Eastern+Market/@38.8865922,-76.9986338,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7b832498bc863:0x54c365b8a7c83238!8m2!3d38.886588!4d-76.9964451">225 7th St SE, Washington, DC 20003</a></h6>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3 id="ceremony">Ceremony</h3>
                        <p>After we say our vows to each other, we invite you — our community of family and friends — to share spoken messages with us.  All are welcome to contribute a thought or reading that reflects the joy and significance of this occasion.</p>
                        <p>If you are interested in speaking, please plan to keep your words to a few minutes or less, so that all those who would like to participate may have a chance.  You can expect some pauses or moments of silence at this point in the ceremony; we welcome these as opportunities for reflection.</p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={40}>
                        <h3 id="menu">Dinner Menu</h3>
                        <p>Strawberry & Spinach Salad</p>
                        <p>Dual Entree of Atlantic Cod & Beef Short Ribs served with Chinese Long Green Beans & Yukon Gold Whipped Potatoes</p>
                        <p><i>Vegetarian Option Available - please request when you RSVP</i></p>
                    </Col>
                </Row>
                <Row center>
                    <Col percentage={60}>
                        <h3 id="band">Band</h3>
                        <p>Live music will be provided by Dr. Blues' <a href="http://newvegasloungedc.com/band/">Out of Town Blues Band</a>, a 7-piece rhythm and blues band.  The band plays out of the New Vegas Lounge, one of Washington, D.C.'s best clubs for live music and a much-loved dancing destination for us and our friends.</p>
                    </Col>
                </Row>
                <Row center>
                    <Col>
                        <Link to="/rsvp"><Button theme={buttonStyle} label="RSVP Here" raised /></Link>
                    </Col>
                </Row>
            </span>
        );
    }
}
