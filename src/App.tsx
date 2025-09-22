import { useAuth } from "react-oidc-context";
import  { useEffect } from 'react';

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "osb35ief4b5mj04uo93jnkskr";
    const logoutUri = "http://localhost:5173/";
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
    const email = auth.user?.profile?.email ?? auth.user?.profile?.name ?? "Unknown";
    const idToken = auth.user?.id_token ?? "";
    const accessToken = auth.user?.access_token ?? "";
    const refreshToken = auth.user?.refresh_token ?? "";

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
            width: 720,
            background: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
            padding: 32,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, color: "#111827" }}>Signed in</h1>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{email}</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => auth.removeUser()}
                style={{
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
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>ID Token</div>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, fontSize: 12, color: "#111827" }}>
                {idToken}
              </pre>
            </div>

            <div style={{ background: "#f8fafc", padding: 16, borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Access Token</div>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, fontSize: 12, color: "#111827" }}>
                {accessToken}
              </pre>
            </div>

            <div style={{ gridColumn: "1 / -1", background: "#f8fafc", padding: 16, borderRadius: 8 }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Refresh Token</div>
              <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", margin: 0, fontSize: 12, color: "#111827" }}>
                {refreshToken || "(not provided)"}
              </pre>
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: "#9ca3af" }}>
            Signed in user details shown above. Keep tokens secret — do not share in logs.
          </div>
        </div>
      </div>
    );
  }
    useEffect(() => {
    // コンポーネントがマウントされたときにsigninRedirectを呼び出す
    auth.signinRedirect();
  }, []); // 空の依存配列を指定することで、マウント時のみ実行される

  return (
    <div></div>
  )
}

export default App;
