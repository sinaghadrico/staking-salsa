import { UnsecuredPage } from "components/UnsecuredPage";
import React from "react";
import { render } from "react-dom";
import { ReactGAM } from "services/google-anlytics";
import "styles/main.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Won't render the application if WebApp is under Clickjacking attack
if (window.self === window.top) {
    ReactGAM().init();
    ReactGAM().trackPageView(window.location.pathname);

    render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root"),
    );
} else {
    render(<UnsecuredPage />, document.getElementById("root"));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// // This function handles any unhandled promise rejections
// const globalPromiseRejectionHandler = (event: any) => {
//     console.log("Unhandled promise rejection reason: ", event.reason);
// };

// // Here we assign our handler to the corresponding global, window property
// window.onunhandledrejection = globalPromiseRejectionHandler;
