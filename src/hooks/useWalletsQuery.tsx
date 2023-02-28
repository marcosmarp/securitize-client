import { useQuery } from "react-query";
import { apiClient } from "../api/config";
import { Wallet } from "../api/types";
import { useToast } from "@chakra-ui/react";

export const useWalletsQuery = (
    queryKey: string[],
    search: string,
    sort: "address" | "favorite"
) => {
    const toast = useToast();
    return useQuery(queryKey, () => apiClient.get<Wallet[]>("/wallets"), {
        select: (r) => r.data,
        onError: () =>
            toast({
                status: "error",
                title: "An error occurred",
                description: "Try again later",
            }),
    });
};
