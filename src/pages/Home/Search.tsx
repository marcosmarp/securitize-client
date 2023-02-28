import { HStack, Icon, Input } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
interface Props {
    search: string;
    setSearch: (search: string) => void;
}

const Search = ({ search, setSearch }: Props) => {
    return (
        <HStack>
            <Icon as={AiOutlineSearch} fontSize="xl" color="gray.600" />
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
            />
        </HStack>
    );
};

export default Search;
