const initAuth = () => {
    return window.gapi.auth2.init({
        client_id: process.env.REACT_APP_API_KEY,
        scope: "https://www.googleapis.com/auth/analytics.readonly",
    });
};

export const checkSignedIn = () => {
    return new Promise((resolve, reject) => {
        initAuth()
            .then(() => {
                const auth = window.gapi.auth2.getAuthInstance();
                resolve(auth.isSignedIn.get());
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
};

const onFailure = (error) => {
    console.error(error);
};

export const renderButton = () => {
    window.gapi.signin2.render("signin-button", {
        scope: "profile email",
        width: 240,
        height: 50,
        longtitle: true,
        theme: "light",
        onsuccess: onSuccess,
        onfailure: onFailure,
    });
};

export const signOut = () => {
    window.gapi.auth2.getAuthInstance().signOut();
};