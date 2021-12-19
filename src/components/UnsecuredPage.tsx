import { FunctionComponent, ReactElement } from "react";

export const UnsecuredPage: FunctionComponent = (): ReactElement => (
    <div className="unsecured-page">
        <span style={{ color: "red" }}>
            if you see this page, Web App link you have clicked on is under Clickjacking security attack.
        </span>
        <h2 style={{ color: "white" }}>
            Please inform team with the reference of the application from where you clicked this link.
        </h2>
        <h2 style={{ color: "white" }}>
            Click{" "}
            <a style={{ color: "red" }} href={window.self.location.href} title="Web Application" target="blank">
                here
            </a>{" "}
            to access WebApp safely.
        </h2>
    </div>
);
