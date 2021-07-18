import "../assets/main.css";
import "../assets/chrome-bug.css";
import { ManagedUIContext } from "../components/ui/context";
import { AuthProvider } from "../lib/hooks/auth";
import Layout from "../components/common/Layout/Layout";
import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.classList?.remove("loading");
  }, []);
  return (
    <AuthProvider>
      <ManagedUIContext>
        <Layout>
          <Head>
            <title>Demo - Daniel C</title>
            <meta keywords="web developer, programming, programmer, software developer, software engineer, devops" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </AuthProvider>
  );
}

export default MyApp;
