import { HStack, Icon, Show, Text } from "@chakra-ui/react";
import { Wallet } from "../../api/types";
import { FaEthereum } from "react-icons/fa";
import DeleteButton from "./DeleteButton";
import FavoriteButton from "./FavoriteButton";
import { Link } from "react-router-dom";

interface Props {
    wallet: Wallet;
    queryKey: string[];
}

const WalletItem = ({ wallet, queryKey }: Props) => {
    return (
        <Link style={{ width: "100%" }} to={`/wallets/${wallet.id}`}>
            <HStack
                p={3}
                w="full"
                borderColor="gray.200"
                borderWidth={1}
                rounded="xl"
                spacing={5}
                justifyContent="space-between"
                _hover={{
                    borderColor: "gray.300",
                }}
            >
                <HStack spacing={3}>
                    <Icon fontSize={"2xl"} color={"#62678F"} as={FaEthereum} />
                    <Show above="md">
                        <Text color="gray.800" textTransform={"uppercase"}>
                            {wallet.address}
                        </Text>
                    </Show>
                    <Show below="md">
                        <Text color="gray.800" textTransform={"uppercase"}>
                            {wallet.address.substring(0, 8)}...
                            {wallet.address.substring(
                                wallet.address.length - 8,
                                wallet.address.length
                            )}
                        </Text>
                    </Show>
                </HStack>
                <HStack spacing={5}>
                    <FavoriteButton wallet={wallet} queryKey={queryKey} />
                    <DeleteButton queryKey={queryKey} id={wallet.id} />
                </HStack>
            </HStack>
        </Link>
    );
};

export default WalletItem;
