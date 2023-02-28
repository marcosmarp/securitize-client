import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    Tooltip,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/config";
import { useToast } from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { Wallet, ApiError } from "../../api/types";

interface Props {
    queryKey: string[];
}

const NewWalletModule = ({ queryKey }: Props) => {
    const [newWalletAddress, setNewWalletAddress] = useState("");

    const isAddressValid = useMemo(() => {
        const regex = /^[0-9a-fA-F]{40}$/;
        return regex.test(newWalletAddress);
    }, [newWalletAddress]);

    const queryClient = useQueryClient();
    const toast = useToast();

    const { mutateAsync: addWallet, isLoading } = useMutation(
        () =>
            apiClient.post<string>("/wallets", {
                address: `0x${newWalletAddress}`,
            }),
        {
            onSuccess: (r) => {
                setNewWalletAddress("");

                const currentQuery = queryClient.getQueryData(
                    queryKey
                ) as AxiosResponse<Wallet[]>;

                queryClient.setQueryData(queryKey, () => ({
                    ...currentQuery,
                    data: [
                        ...currentQuery.data,
                        {
                            id: r.data,
                            address: `0x${newWalletAddress}`,
                            favorite: false,
                        },
                    ],
                }));
            },
            onError: (e: AxiosError<ApiError>) => {
                toast({
                    title: "There was an error",
                    description:
                        e.response?.data.statusCode === 400
                            ? e.response.data.message
                            : "Try again later",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );

    return (
        <HStack alignItems={"center"} w="full">
            <InputGroup size={"sm"}>
                <InputLeftAddon>
                    <Text>0x</Text>
                </InputLeftAddon>
                <Input
                    placeholder="12345678901..."
                    value={newWalletAddress}
                    onChange={(e) => {
                        const value = e.target.value.replace("0x", "");
                        setNewWalletAddress(value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && isAddressValid) addWallet();
                    }}
                />
            </InputGroup>
            <Tooltip
                label={
                    !isAddressValid
                        ? "Check the address: it should have 40 hexadecimal digits"
                        : undefined
                }
            >
                <Button
                    colorScheme={"green"}
                    size="sm"
                    isDisabled={!isAddressValid || isLoading}
                    isLoading={isLoading}
                    onClick={() => addWallet()}
                >
                    Add
                </Button>
            </Tooltip>
        </HStack>
    );
};

export default NewWalletModule;
