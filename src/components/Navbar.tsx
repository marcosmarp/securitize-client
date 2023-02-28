import { HStack, Img } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";

const NAVBAR_ITEMS = [
    {
        label: "Wallets",
        to: "/",
        icon: FaWallet,
    },
    {
        label: "Exchange rates",
        to: "/rates",
        icon: BsCurrencyExchange,
    },
];

const Navbar = () => {
    return (
        <HStack
            w="full"
            h={"8vh"}
            px={5}
            bgColor="gray.800"
            justifyContent={"space-evenly"}
        >
            <Link
                style={{
                    height: "100%",
                }}
                to="/"
            >
                <Img
                    py={5}
                    h="full"
                    src="https://securitize.io/dist/img/securitize-logo.svg"
                />
            </Link>
            <HStack spacing={8} h="full">
                {NAVBAR_ITEMS.map((item) => (
                    <NavbarItem {...item} key={item.label} />
                ))}
            </HStack>
        </HStack>
    );
};

export default Navbar;
