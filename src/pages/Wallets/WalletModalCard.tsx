import { Center } from "@chakra-ui/react";

interface Props {
    children: React.ReactNode;
}

const WalletModalCard = ({ children }: Props) => {
    return (
        <Center
            h="10rem"
            bgColor={"whitesmoke"}
            rounded="lg"
            borderColor={"gray.20"}
            borderWidth={1}
            p={5}
            justifyContent="flex-start"
            flex={1}
        >
            {children}
        </Center>
    );
};

export default WalletModalCard;
