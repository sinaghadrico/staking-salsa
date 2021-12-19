/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
// import { ReactNode, useState } from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://7a3a6bbe84fa4cfe893b77c961d16fd5@o1011085.ingest.sentry.io/5975928",
    integrations: [new Integrations.BrowserTracing()],
    release: "Predictor@1.0.0",
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const FallbackComponent = ({ error, componentStack, resetError }: any) => {
    /* When resetError() is called it will remove the Fallback component */
    /* and render the Sentry ErrorBoundary's children in their initial state */
    return (
        <>
            <div>You have encountered an error</div>
            <div>{error.toString()}</div>
            <div>{componentStack}</div>
            <button onClick={() => resetError()}>Click here to reset!</button>
        </>
    );
};

const ErrorBoundary = ({ children }: any) => {
    // const [message, setMessage] = useState<any>("test");
    return (
        <Sentry.ErrorBoundary>
            {/* <div>{message}</div>
            <button onClick={() => setMessage({ message: { text: "Hello World" } })}>
                Click here to change message!
            </button> */}
            {children}
        </Sentry.ErrorBoundary>
    );
};

export default Sentry.withProfiler(ErrorBoundary);
