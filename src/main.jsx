import { ChakraProvider, createStandaloneToast, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";

const { ToastContainer } = createStandaloneToast();
const queryClient = new QueryClient();

const theme = extendTheme({
  initialColorMode: "light",
  useSystemColorMode: false,

  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Poppins",
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
