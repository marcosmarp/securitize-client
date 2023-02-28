import { HStack, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";

interface Props {
    label: string;
    to: string;
    icon: IconType;
}

const NavbarItem = ({ label, icon, to }: Props) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} style={{ height: "100%" }}>
            <HStack
                color="white"
                h="full"
                alignItems={"flex-end"}
                pb={3}
                borderBottomColor="#F49E39"
                borderBottomWidth={isActive ? 4 : 0}
                fontWeight={isActive ? "bold" : "normal"}
                transition="all 0.2s"
                _hover={{
                    fontWeight: "bold",
                }}
            >
                <Text>{label}</Text>
            </HStack>
        </Link>
    );
};

export default NavbarItem;
