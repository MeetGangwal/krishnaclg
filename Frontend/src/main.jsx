import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId = "1083024567550-ho28cme563l6rk5nq14mcdur2julvvc5.apps.googleusercontent.com";
const persistor= persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId}>
      <App />
      </GoogleOAuthProvider>
      <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);