import {
    VStack,
    Center,
    HStack,
    Heading,
    Text,
    Divider,
} from "@chakra-ui/react";
import { useWalletsQuery } from "../../hooks/useWalletsQuery";
import WalletItem from "./WalletItem";
import NewWalletModule from "./NewWalletModule";
import Sort from "./Sort";
import { useState } from "react";
import Search from "./Search";
import { Spinner } from "@chakra-ui/react";
import MainContainer from "../../components/MainContainer";

const Wallets = () => {
    const [sort, setSort] = useState<"address" | "favorite">("favorite");
    const [search, setSearch] = useState<string>("");
    const queryKey = ["wallets", search, sort];

    const {
        isSuccess,
        isLoading,
        data: wallets,
    } = useWalletsQuery(queryKey, search, sort);

    return (
        <MainContainer>
            <HStack
                w="full"
                justifyContent={"space-between"}
                alignItems="flex-end"
            >
                <Heading fontSize={"2xl"}>Wallets</Heading>
                <HStack spacing={3}>
                    <Search search={search} setSearch={setSearch} />
                    <Sort sort={sort} setSort={setSort} />
                </HStack>
            </HStack>
            <Divider />
            <VStack w="full" alignItems={"flex-start"} spacing={3}>
                {isLoading && (
                    <Center w="full" h="20vh">
                        <Spinner size={"xl"} />
                    </Center>
                )}
                {isSuccess && !wallets.length && (
                    <Text>
                        {search === ""
                            ? "You don't have any wallets yet"
                            : "No results, try a different search"}
                    </Text>
                )}
                {isSuccess &&
                    wallets
                        .filter((w) =>
                            w.address
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .sort((a, b) => {
                            if (sort === "address") {
                                return a.address.localeCompare(b.address);
                            }
                            return a.favorite === b.favorite
                                ? 0
                                : a.favorite
                                ? -1
                                : 1;
                        })
                        .map((w) => (
                            <WalletItem
                                queryKey={queryKey}
                                wallet={w}
                                key={w.id}
                            />
                        ))}
            </VStack>
            <NewWalletModule queryKey={queryKey} />
        </MainContainer>
    );
};

export default Wallets;
