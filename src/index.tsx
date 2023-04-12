import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux/es/exports";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far);

declare module "@mui/material/styles" {
    interface BreakpointOverrides {
        xxl: true;
    }
}

const theme = createTheme({
    breakpoints: {
        keys: ["xs", "sm", "md", "lg", "xl", "xxl"],
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440, xxl: 1536 },
    },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </ThemeProvider>
);
