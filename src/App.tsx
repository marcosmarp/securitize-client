import { Box, Center } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

function App() {
    return (
        <Center w="full" h="100vh" bgColor={"gray.200"}>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Center>
    );
}

export default App;
