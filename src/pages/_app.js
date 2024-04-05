import "@/styles/globals.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "@/store/store";

// axios.defaults.baseURL = process.env.API_URL;
axios.defaults.baseURL = "http://localhost:3001"

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
