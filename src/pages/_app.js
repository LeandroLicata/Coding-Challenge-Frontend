import "@/styles/globals.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import Navbar from "@/components/Navbar";

// axios.defaults.baseURL = process.env.API_URL;
axios.defaults.baseURL = "http://localhost:3001";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-teal-400">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
