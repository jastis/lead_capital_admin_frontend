import { Avatar, Flex, Input, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import { BsArrowRight } from "react-icons/bs";
import { CHAT_LIST } from "./RequestDetails";

export const Chat = () => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Chat
        </Text>
      </Flex>
      <Flex flexDir={"column"} gap="10px">
        {CHAT_LIST.map((data, idx) => (
          <Flex
            key={idx}
            {...(data.me ? { flexDirection: "row-reverse" } : {})}
            gap="5px"
            alignItems={"center"}
          >
            <Avatar src={data.img} />
            <Text
              w="100%"
              p="10px 8px"
              borderRadius={"4px"}
              bg={!data.me ? _COLORS.lightBrand : "#F6F6F6"}
              fontSize={".7em"}
            >
              {data?.chat}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Flex alignItems={"center"} gap="20px" mt="30px">
        <Input
          placeholder="Type a message"
          fontFamily={"Montserrat"}
          _placeholder={{ color: "#2E150073", fontFamily: "Montserrat" }}
          _focus={{
            outline: "none",
            boxShadow: "none",
            borderColor: "none",
          }}
          _focusVisible={{ boxShadow: "none", borderColor: "none" }}
          boxShadow="-1px 2px 2px 0px #80808059"
        />
        <Flex p="7px" bg={_COLORS.brand} borderRadius={"50%"}>
          <BsArrowRight color="#fff" />
        </Flex>
      </Flex>
    </Flex>
  );
};

