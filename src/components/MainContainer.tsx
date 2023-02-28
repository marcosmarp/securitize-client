import { VStack } from "@chakra-ui/react";

interface Props {
    children: React.ReactNode;
}

const MainContainer = ({ children }: Props) => {
    return (
        <VStack
            minW={"40vw"}
            w={"fit-content"}
            maxW="full"
            p={5}
            alignItems="flex-start"
            spacing={5}
            bgColor="white"
            borderWidth={1}
            borderColor="gray.300"
        >
            {children}
        </VStack>
    );
};

export default MainContainer;
