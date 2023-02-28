import { useQuery } from "react-query";
import { apiClient } from "../api/config";
import { ExchangeRate } from "../api/types";

export const useExchangeRatesQuery = () =>
    useQuery(
        "exchange-rates",
        () => apiClient.get<ExchangeRate[]>("/exchange-rates"),
        {
            select: (r) => r.data,
        }
    );
