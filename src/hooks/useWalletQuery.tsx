import { useQuery } from "react-query";
import { apiClient } from "../api/config";
import { Wallet } from "../api/types";

export const useWalletQuery = (walletId: string) =>
    useQuery(
        ["wallets", walletId],
        () => apiClient.get<Wallet>(`/wallets/${walletId}`),
        {
            select: (r) => r.data,
        }
    );
