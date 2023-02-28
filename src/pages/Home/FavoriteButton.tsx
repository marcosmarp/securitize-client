import { IconButton, useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/config";
import { Wallet } from "../../api/types";

interface Props {
    wallet: Wallet;
    queryKey: string[];
}

const FavoriteButton = ({ wallet, queryKey }: Props) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutateAsync: toggleFavorite, isLoading } = useMutation(
        () =>
            apiClient.put(`/wallets/${wallet.id}`, {
                ...wallet,
                favorite: !wallet.favorite,
            }),
        {
            onSuccess: () => {
                const currentQuery = queryClient.getQueryData(
                    queryKey
                ) as AxiosResponse<Wallet[]>;

                queryClient.setQueryData(queryKey, () => {
                    const updatedWallets = currentQuery.data.map(
                        (w: Wallet) => {
                            if (w.id === wallet.id) {
                                return {
                                    ...w,
                                    favorite: !w.favorite,
                                };
                            }
                            return w;
                        }
                    );

                    return { ...currentQuery, data: updatedWallets };
                });
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
        <IconButton
            aria-label="Toggle favorite"
            icon={
                wallet.favorite ? (
                    <AiFillStar size={20} />
                ) : (
                    <AiOutlineStar size={20} />
                )
            }
            colorScheme={wallet.favorite ? "yellow" : "gray"}
            variant={"link"}
            color={wallet.favorite ? "yellow.500" : "gray.500"}
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={async () => await toggleFavorite()}
        />
    );
};

export default FavoriteButton;
