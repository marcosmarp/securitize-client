import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useMutation, useQueryClient } from "react-query";
import { apiClient } from "../../api/config";
import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { Wallet } from "../../api/types";

interface Props {
    id: string;
    queryKey: string[];
}

const DeleteButton = ({ id, queryKey }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const queryClient = useQueryClient();
    const toast = useToast();

    const { mutateAsync: deleteWallet, isLoading } = useMutation(
        () => apiClient.delete(`/wallets/${id}`),
        {
            onSuccess: () => {
                const currentQuery = queryClient.getQueryData(
                    queryKey
                ) as AxiosResponse<Wallet[]>;

                queryClient.setQueryData(queryKey, () => {
                    const updatedWallets = currentQuery.data.filter(
                        (w: any) => w.id !== id
                    );

                    return { ...currentQuery, data: updatedWallets };
                });
                onClose();
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
        <>
            <IconButton
                colorScheme="red"
                onClick={onOpen}
                icon={<AiFillDelete size={20} />}
                aria-label="Remove wallet"
                variant={"link"}
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Wallet
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={async () => await deleteWallet()}
                                isLoading={isLoading}
                                isDisabled={isLoading}
                                ml={3}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DeleteButton;
