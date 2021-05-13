import React, { useState, createRef } from "react";

//Visuals
import TabPanel from "../../hooks/TabPanel";
import PageViewsReport from "./PageViewsReport";

import {
    Container,
    Typography,
    Box,
    Button,
    Tabs,
    Tab,
} from "@material-ui/core";

const Dashboard = ({ user }) => {
    const [viewID, setViewID] = useState();
    const [value, setValue] = useState(0);
    const textInput = createRef("");

    const handleSubmit = () => {
        setViewID(textInput.current.value);
    };

    const setTabInfo = (index) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    };

    const tabChange = (e, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            {viewID ? (
                <>
                    <Typography align="center" variant="h1">
                        {user}
                    </Typography>
                    <Tabs value={value} onChange={tabChange} centered>
                        <Tab label="Page Views" {...setTabInfo(0)} />
                        <Tab label="Item Two" {...setTabInfo(1)} />
                        <Tab label="Item Three" {...setTabInfo(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <PageViewsReport viewID={viewID} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </>
            ) : (
                <Box display="flex">
                    <input
                        id="outlined-basic"
                        label="View Id"
                        variant="outlined"
                        value={viewID}
                        ref={textInput}
                    />
                    <Button color="primary" onClick={handleSubmit}>
                        Go
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default Dashboard;
