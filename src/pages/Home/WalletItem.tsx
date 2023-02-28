import { HStack, Icon, Text } from "@chakra-ui/react";
import { Wallet } from "../../api/types";
import { FaEthereum } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import FavoriteButton from "./FavoriteButton";

interface Props {
    wallet: Wallet;
    queryKey: string[];
}

const WalletItem = ({ wallet, queryKey }: Props) => {
    return (
        <HStack
            p={3}
            w="full"
            borderColor="gray.200"
            borderWidth={1}
            rounded="xl"
            spacing={5}
            justifyContent="space-between"
        >
            <HStack spacing={3}>
                <Icon fontSize={"2xl"} color={"#62678F"} as={FaEthereum} />
                <Text color="gray.800">{wallet.address}</Text>
            </HStack>
            <HStack spacing={5}>
                <FavoriteButton wallet={wallet} queryKey={queryKey} />
                <DeleteButton queryKey={queryKey} id={wallet.id} />
            </HStack>
        </HStack>
    );
};

export default WalletItem;
