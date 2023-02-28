import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from "@chakra-ui/react";

interface Props {
    walletId: string;
    isOpen: boolean;
    onClose: () => void;
}

const WalletModal = ({ walletId, isOpen, onClose }: Props) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Wallet balance view</ModalHeader>
                <ModalCloseButton />
                <ModalBody></ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default WalletModal;
