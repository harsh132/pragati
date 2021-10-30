import React from "react";
import AddData from "./AddData";
import AddVillager from "./AddVillager";
import { Tabs, Tab, Container } from "react-bootstrap";

function NGORepDashboard() {
    return (
        <Container className="centre mb-5">
            <div className="dashboard">
                <Tabs defaultActiveKey="addvillager" id="uncontrolled-tab" className="mb-3">
                    <Tab eventKey="addvillager" title="Add Villager">
                        <AddVillager />
                    </Tab>
                    <Tab eventKey="addvillagerdata" title="Add Villager Data">
                        <AddData />
                    </Tab>
                </Tabs>
            </div>
        </Container>
    );
}

export default NGORepDashboard;
