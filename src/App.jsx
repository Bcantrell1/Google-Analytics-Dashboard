import React, { useState, useEffect } from "react";

//Material UI
import {
    CssBaseline,
    AppBar,
    Toolbar,
    Button,
    Typography,
    Box,
    Avatar,
} from "@material-ui/core";
import useStyles from "./styles/useStyles";

//Visual
import Dashboard from "./components/visual/Dashboard.jsx";
import LandingPage from "./components/visual/LandingPage.jsx";

//Logical
import {
    signOut,
    renderButton,
    checkSignedIn,
} from "./components/logical/auth/googleAuth";

const App = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, setUser] = useState();
    const [pic, setPic] = useState();
    const classes = useStyles();

    const updateSignin = (signedIn) => {
        setIsSignedIn(signedIn);
        if (!signedIn) {
            renderButton();
        }
    };

    const init = () => {
        checkSignedIn()
            .then((signedIn) => {
                updateSignin(signedIn);
                window.gapi.auth2
                    .getAuthInstance()
                    .isSignedIn.listen(updateSignin);
                let profile = window.gapi.auth2
                    .getAuthInstance()
                    .currentUser.get()
                    .getBasicProfile();
                setPic(profile.iJ);
                setUser(profile.eU);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        window.gapi.load("auth2", init);
    });

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Analytics Dashboard
                    </Typography>
                    {isSignedIn ? (
                        <>
                            <Box m={2} display="flex">
                                <Button onClick={signOut} variant="contained">
                                    Sign Out
                                </Button>
                            </Box>
                            <Avatar alt="Cindy Baker" src={pic} />
                        </>
                    ) : (
                        <div
                            id="signin-button"
                            onClick={checkSignedIn}
                            variant="contained"
                        ></div>
                    )}
                </Toolbar>
            </AppBar>
            {!isSignedIn ? <LandingPage /> : <Dashboard user={user} />}
        </div>
    );
};
export default App;
