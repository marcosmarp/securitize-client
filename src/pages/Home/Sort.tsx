import { Text, VStack, HStack, Switch, Select, Icon } from "@chakra-ui/react";
import { AiOutlineSortAscending } from "react-icons/ai";

interface Props {
    sort: "address" | "favorite";
    setSort: (sort: "address" | "favorite") => void;
}

const Sort = ({ sort, setSort }: Props) => {
    return (
        <HStack alignItems={"center"}>
            <Icon as={AiOutlineSortAscending} fontSize="xl" color="gray.600" />
            <Select
                value={sort}
                onChange={(e) => {
                    setSort(e.target.value as "address" | "favorite");
                }}
            >
                <option value="address">Address</option>
                <option value="favorite">Favorites</option>
            </Select>
        </HStack>
    );
};

export default Sort;
