import { Box, Center, VStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Wallets from "./pages/Wallets/Wallets";

function App() {
    return (
        <VStack w="full" h="100vh" bgColor={"gray.200"}>
            <Navbar />
            <Center flex={1}>
                <Routes>
                    <Route path="/" element={<Wallets />} />
                </Routes>
            </Center>
        </VStack>
    );
}

export default App;
