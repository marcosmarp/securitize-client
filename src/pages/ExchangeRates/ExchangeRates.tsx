import { Divider, Heading, VStack, Spinner, Center } from "@chakra-ui/react";
import MainContainer from "../../components/MainContainer";
import { useExchangeRatesQuery } from "../../hooks/useExchangeRatesQuery";
import ExchangeRateItem from "./ExchangeRateItem";

const ExchangeRates = () => {
    const {
        data: exchangeRates,
        isSuccess,
        isLoading,
    } = useExchangeRatesQuery();
    return (
        <MainContainer>
            <Heading fontSize={"2xl"}>Exchange rates</Heading>
            <Divider />
            <Center w="full">
                <VStack alignItems={"flex-start"} spacing={5}>
                    {isSuccess &&
                        exchangeRates.map((er) => (
                            <ExchangeRateItem key={er.id} item={er} />
                        ))}
                    {isLoading && (
                        <Center w="full">
                            <Spinner size={"xl"} />
                        </Center>
                    )}
                </VStack>
            </Center>
        </MainContainer>
    );
};

export default ExchangeRates;
