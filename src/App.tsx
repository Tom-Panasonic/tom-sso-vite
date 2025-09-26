import { useAuth } from "react-oidc-context";

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

  // Unauthenticated: SSO login page (Azure + Okta)
  const signInWithOkta = () => {
    auth.signinRedirect({
      extraQueryParams: { identity_provider: "Okta" },
    }).catch((err) => {
      // optional: log error for debugging
      // (keep tokens and sensitive info out of logs)
      console.error("signinRedirect failed", err);
    });
  };

  const signInWithAzure = () => {
    auth.signinRedirect({
      extraQueryParams: { identity_provider: "Azure" },
    }).catch((err) => {
      // optional: log error for debugging
      // (keep tokens and sensitive info out of logs)
      console.error("signinRedirect failed", err);
    });
  };

  const signInWithGoogle = () => {
    auth.signinRedirect({
      extraQueryParams: { identity_provider: "Google" },
    }).catch((err) => {
      // optional: log error for debugging
      // (keep tokens and sensitive info out of logs)
      console.error("signinRedirect failed", err);
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 520,
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
          padding: 32,
          textAlign: "center",
        }}
      >
                    <div style={{ marginBottom: 12 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "linear-gradient(135deg,#7cfc00,#06b6d4)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 20,
                  marginBottom: 8,
                }}
              >
                SSO
              </div>
              <h2 style={{ margin: 0, fontSize: 18, color: "#0f172a" }}>Sign in with SAML SSO SAMPLE</h2>
              <p style={{ marginTop: 8, color: "#6b7280", fontSize: 13 }}>
                Use your SAML SSO account to access this application.
              </p>
            </div>


        {/* Stack the two sign-in blocks vertically */}
        <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <div
            style={{
              textAlign: "left",
              width: "100%",
              maxWidth: 440,
              padding: 20,
              borderRadius: 12,
              background: "linear-gradient(135deg,#ffffff,#fbfbff)",
              boxShadow: "0 4px 12px rgba(2,6,23,0.04)",
            }}
          >
          <label style={{ fontSize: 13, color: "#6b7280" }}>メールアドレス</label>
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 14,
              outline: "none",
            }}
          />

          <label style={{ fontSize: 13, color: "#6b7280", marginTop: 8 }}>パスワード</label>
          <input
            type="password"
            placeholder="パスワードを入力"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 14,
              outline: "none",
            }}
          />

           <div style={{ marginBottom: 20, display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch", textAlign: "left" }}></div>

          <button
            disabled
            aria-disabled="true"
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#7cfc00",
              color: "#111827",
              cursor: "not-allowed",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: 0.6,
              marginBottom: 12,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2C9.243 2 7 4.243 7 7v3H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1V7c0-2.757-2.243-5-5-5z" fill="#111827" opacity="0.12"/>
              <path d="M9 10V7a3 3 0 116 0v3" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            ログイン
          </button>

          <div style={{ margin: "16px 0", display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                fontSize: 12,
                color: "#374151",
                background: "#f8fafc",
                padding: "6px 10px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
            </span>

            <div style={{ flex: 1, height: 1, background: "#e5e7eb", borderRadius: 2 }} />

            <span
              style={{
                fontSize: 12,
                color: "#374151",
                background: "#f8fafc",
                padding: "6px 10px",
                borderRadius: 999,
                whiteSpace: "nowrap",
              }}
            >
            </span>
          </div>

            <button
              onClick={() => auth.signinRedirect()}
              style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#b33e5c",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 12, // Add spacing between the buttons
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2L3 8v8l9 6 9-6V8l-9-6z" fill="#fff" opacity="0.12" />
              <path d="M12 4.2L4.5 9v6L12 19.8 19.5 15V9L12 4.2z" fill="#fff" />
              </svg>
              Sign in Cognito Hosted UI(default)
            </button>

            <button
              onClick={signInWithAzure}
              style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#2b6cb0",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 12, // Add spacing between the buttons
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2L3 8v8l9 6 9-6V8l-9-6z" fill="#fff" opacity="0.12" />
              <path d="M12 4.2L4.5 9v6L12 19.8 19.5 15V9L12 4.2z" fill="#fff" />
              </svg>
              Sign in with Azure
            </button>
            <button
              onClick={signInWithOkta}
              style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#ff7a59",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 3h18v18H3z" fill="#fff" opacity="0.06" />
                <path d="M6 12a6 6 0 1112 0 6 6 0 01-12 0z" fill="#fff" />
              </svg>
              Sign in with Okta
            </button>
            <button
              onClick={signInWithGoogle}
              style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              background: "#4285F4", // Google-like blue
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginTop: 12, // add spacing from the button above
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 3h18v18H3z" fill="#fff" opacity="0.06" />
              <path d="M6 12a6 6 0 1112 0 6 6 0 01-12 0z" fill="#fff" />
              </svg>
              Sign in with Google
            </button>

            <div style={{ marginTop: 12, color: "#9ca3af", fontSize: 13 }}>
              By continuing, you will be redirected to IdP for authentication.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
