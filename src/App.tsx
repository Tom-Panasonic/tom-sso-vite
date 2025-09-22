import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    // e.g. 6ehuq2e03ftb5kr5dgl2ke5h0o
    const clientId = "33kguupbqh5gn5vl95oqn1trf5";
    const logoutUri = "http://localhost:5173/";
    // e.g. https://ap-northeast-1c7npd74mh.auth.ap-northeast-1.amazoncognito.com
    const cognitoDomain = "https://ap-northeast-1loeipkbb8.auth.ap-northeast-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
        padding: 20,
      }}
    >
      <div
        style={{
          width: 480,
          background: "#ffffff",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
          padding: 32,
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          {/* simple logo */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect x="2" y="2" width="20" height="20" rx="6" fill="#7cfc00" />
            <path
              d="M7 12.5L10 15L17 8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 style={{ margin: 0, fontSize: 20, color: "#111827" }}>Welcome</h1>
        <p style={{ color: "#6b7280", marginTop: 8, marginBottom: 20, fontSize: 14 }}>
          Sign in to continue to the below application
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "stretch" }}>
          {/* Okta card */}
          <div
            style={{
              flex: 1,
              background: "#fff4e6", // light Okta/orange background
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
              minHeight: 160,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#d97706" /* Okta orange title */ }}>
              Okta
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Sign in with your Okta account</div>
            <button
              onClick={() => auth.signinRedirect()}
              style={{
          marginTop: 6,
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          background: "#111827", // unified button background
          color: "#fff", // unified button text color
          cursor: "pointer",
          fontWeight: 600,
          height: 50,
          alignSelf: "stretch",
              }}
            >
              Sign in with Okta
            </button>
          </div>

          {/* Azure AD card */}
          <div
            style={{
              flex: 1,
              background: "#eaf6ff", // light Azure/blue background
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
              minHeight: 160,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0078d4" /* Azure blue title */ }}>
              Azure AD
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Sign in with your Azure Active Directory</div>
            <button
              onClick={() => {
          // placeholder: Azure AD not wired yet
          // replace with the proper signin flow when configuring Azure AD
          // e.g. auth.signinRedirect({ /* provider-specific params */})
          alert("Azure AD sign-in not configured yet");
              }}
              style={{
          marginTop: 6,
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          background: "#111827", // unified button background
          color: "#fff", // unified button text color
          cursor: "pointer",
          fontWeight: 600,
          height: 50,
          alignSelf: "stretch",
              }}
            >
              Sign in with Azure AD
            </button>
          </div>

          {/* Panasonic (PA基盤) card */}
          <div
            style={{
              flex: 1,
              background: "#f0f9ff", // light Panasonic-ish background
              borderRadius: 8,
              padding: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
              minHeight: 160,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0033a0" /* Panasonic blue title */ }}>
              PA基盤
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              Sign in with the Panasonic authentication platform
            </div>
            <button
              onClick={() => {
          // placeholder: PA基盤のサインイン未設定
          // PA基盤をOIDCプロバイダとして構成したら、ここを実際のサインイン処理に置き換えてください。
          // 例: auth.signinRedirect({ /* provider-specific params or extraQueryParams */ })
          alert("PA基盤のサインインは未設定です");
              }}
              style={{
          marginTop: 6,
          width: "100%",
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          background: "#111827",
          color: "#fff",
          cursor: "pointer",
          fontWeight: 600,
          height: 50,
          alignSelf: "stretch",
              }}
            >
              Sign in with PA基盤
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            onClick={() => auth.removeUser()}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 8,
              border: "none",
              background: "#7cfc00",
              color: "#111827",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign out
          </button>

          <button
            onClick={() => signOutRedirect()}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: "#fff",
              color: "#111827",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Provider logout
          </button>
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: "#9ca3af" }}>
          You can sign in with your identity provider.
        </div>
      </div>
    </div>
  );
}

export default App;
