import { HStack, Icon, Text } from "@chakra-ui/react";
import { FaExclamationTriangle } from "react-icons/fa";

const OldWalletWarning = () => {
    return (
        <HStack
            w="full"
            bgColor={"red.200"}
            p={5}
            rounded="lg"
            color="red.800"
            fontWeight={"bold"}
            borderColor="red.500"
            borderWidth={1}
        >
            <Icon as={FaExclamationTriangle} />
            <Text>Wallet is old!</Text>
        </HStack>
    );
};

export default OldWalletWarning;
