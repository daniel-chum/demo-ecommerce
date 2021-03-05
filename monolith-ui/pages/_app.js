import "../assets/main.css";
import "../assets/chrome-bug.css";
import { ManagedUIContext } from "../components/ui/context";
import { AuthProvider } from "../lib/hooks/auth";
import Layout from "../components/common/Layout/Layout";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);
  return (
    <AuthProvider>
      <ManagedUIContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </AuthProvider>
  );
}

export default MyApp;
