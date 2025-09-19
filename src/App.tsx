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
          width: 360,
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
          Sign in to continue to the application
        </p>

        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          <button
            onClick={() => auth.signinRedirect()}
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
            Sign in
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
            Sign out
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
