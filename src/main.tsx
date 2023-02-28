import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const queryClient = new QueryClient();
const root = createRoot(container);

root.render(
    <QueryClientProvider client={queryClient}>
        <ChakraProvider>
            <BrowserRouter>
                <App />
                <ReactQueryDevtools />
            </BrowserRouter>
        </ChakraProvider>
    </QueryClientProvider>
);
