import "@/styles/globals.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </Provider>
    </SessionProvider>
  );
}
