import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  // e.g. https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_c7NPd74MH
  authority: "https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_LOeIpKbB8",
  // e.g. 6ehuq2e03ftb5kr5dgl2ke5h0o
  client_id: "33kguupbqh5gn5vl95oqn1trf5",
  redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root")!);

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
