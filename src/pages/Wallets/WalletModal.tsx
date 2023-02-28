import { useWalletQuery } from "../../hooks/useWalletQuery";
import { Center, Flex, Select, Spinner, Text, VStack } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";
import OldWalletWarning from "./OldWalletWarning";
import WalletModalCard from "./WalletModalCard";
import { useState } from "react";

interface Props {
    walletId: string;
    isOpen: boolean;
    onClose: () => void;
}

const WalletModal = ({ walletId, isOpen, onClose }: Props) => {
    const { isSuccess, data: wallet, isLoading } = useWalletQuery(walletId);
    const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Wallet balance view</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={5}>
                    {isLoading && (
                        <Center w="full" h="20vh">
                            <Spinner />
                        </Center>
                    )}
                    {isSuccess && (
                        <VStack w="full" alignItems={"center"} spacing={5}>
                            {wallet.isOld && <OldWalletWarning />}
                            <Flex
                                w="full"
                                gap={3}
                                flexDir={{ base: "column", md: "row" }}
                            >
                                <WalletModalCard>
                                    <Text fontWeight={"bold"}>
                                        {wallet.balance.toLocaleString()}
                                    </Text>
                                </WalletModalCard>
                                <WalletModalCard>
                                    <VStack alignItems={"flex-start"} w="full">
                                        <Select
                                            value={currency}
                                            onChange={(e) =>
                                                setCurrency(
                                                    e.target.value as
                                                        | "USD"
                                                        | "EUR"
                                                )
                                            }
                                            bgColor="white"
                                        >
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                        </Select>
                                        <Text fontWeight={"bold"}>
                                            {currency === "USD"
                                                ? wallet.balanceInUsd.toLocaleString()
                                                : wallet.balanceInEur.toLocaleString()}{" "}
                                            $
                                        </Text>
                                    </VStack>
                                </WalletModalCard>
                            </Flex>
                        </VStack>
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default WalletModal;
