import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_LOeIpKbB8",
  client_id: "osb35ief4b5mj04uo93jnkskr",
  redirect_uri: "http://localhost:5173/",
  //redirect_uri: "https://d2ehn4cdwldqb5.cloudfront.net/",
  response_type: "code",
  scope: "email openid",
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig} >
      {/* </AuthProvider><AuthProvider {...cognitoAuthConfig} extraQueryParams={{ identity_provider: "Okta" }}> */}
      <App />
      </AuthProvider>
  </React.StrictMode>
);
