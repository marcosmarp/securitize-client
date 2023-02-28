import { ExchangeRate } from "../../api/types";
import {
    HStack,
    Icon,
    IconButton,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { AiFillSave } from "react-icons/ai";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { apiClient } from "../../api/config";
import { AxiosResponse } from "axios";

interface Props {
    item: ExchangeRate;
}

const ExchangeRateItem = ({ item }: Props) => {
    const [rate, setRate] = useState(item.rate);
    const queryClient = useQueryClient();
    const toast = useToast();

    const { mutateAsync: updateExchangeRate, isLoading } = useMutation(
        () => apiClient.put(`/exchange-rates/${item.id}`, { rate }),
        {
            onSuccess: () => {
                const currentQuery = queryClient.getQueryData(
                    "exchange-rates"
                ) as AxiosResponse<ExchangeRate[]>;

                queryClient.setQueryData("exchange-rates", () => {
                    const updatedExchangeRates = currentQuery.data.map(
                        (r: ExchangeRate) => {
                            if (r.id === item.id) {
                                return {
                                    ...r,
                                    rate,
                                };
                            }
                            return r;
                        }
                    );

                    return { ...currentQuery, data: updatedExchangeRates };
                });

                queryClient.resetQueries(["wallets"]);
            },
            onError: () => {
                toast({
                    title: "There was an error",
                    description: "Try again later",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );

    return (
        <HStack
            alignItems={"center"}
            w="full"
            justifyContent={"space-between"}
            spacing={5}
        >
            <HStack>
                <Text>1</Text>
                <Icon fontSize={"2xl"} color={"#62678F"} as={FaEthereum} />
                <Text>=</Text>
                <NumberInput
                    size={"sm"}
                    value={rate}
                    onChange={(_, value) => setRate(value)}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <Text>{item.source}</Text>
            </HStack>
            <IconButton
                icon={<AiFillSave size={20} />}
                aria-label="Update exchange rate"
                colorScheme={"blue"}
                variant="ghost"
                isDisabled={rate === item.rate || isLoading}
                isLoading={isLoading}
                onClick={() => updateExchangeRate()}
            />
        </HStack>
    );
};

export default ExchangeRateItem;
