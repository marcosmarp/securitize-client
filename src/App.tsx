import { Center, VStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Wallets from "./pages/Wallets/Wallets";
import ExchangeRates from "./pages/ExchangeRates/ExchangeRates";

function App() {
    return (
        <VStack w="full" h="100vh" bgColor={"gray.200"}>
            <Navbar />
            <Center flex={1}>
                <Routes>
                    <Route path="/" element={<Wallets />} />
                    <Route path="/rates" element={<ExchangeRates />} />
                </Routes>
            </Center>
        </VStack>
    );
}

export default App;
