import { Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import { formatToNaira } from "../../../utils/numberFormat";
// import { BsArrowRight } from "react-icons/bs";
// import { CHAT_LIST } from "./RequestDetails";
// import { useState } from "react";

export const TotalReqStatus = ({ request }) => {
  // const [showMessaging, setShowMessaging] = useState(false);
  return (
    <Flex
      borderRadius="5px"
      flexDir={"column"}
      w="100%"
      bg="#fff"
      p="20px"
      alignItems={"initial"}
      h="-webkit-fill-available"
    >
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Total request status
        </Text>
      </Flex>
      <Text
        fontSize={".86em"}
        color={_COLORS.green}
        fontWeight="600"
        mb="20px"
        textTransform="capitalize"
      >
        {request?.status}
      </Text>

      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"} textTransform="capitalize">
          Transporter name
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.companyId?.name}
        </Text>
        <Flex alignItems={"center"} mt="20px" gap="10px">
          <Text color="#7E7C73" fontSize={".86em"}>
            Suggested Price
          </Text>{" "}
          {/* <Text
            borderRadius={"4px"}
            fontSize=".86em"
            p="3px"
            color="#fff"
            bg={showMessaging ? "#353334" : _COLORS.orange}
            cursor={"pointer"}
            onClick={() => setShowMessaging((prev) => !prev)}
          >
            Negotiate
          </Text> */}
        </Flex>

        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {formatToNaira(request?.suggestedPrice)}
        </Text>

        {/* {showMessaging && (
          <Flex mt="30px" flexDir={"column"}>
            <Flex flexDir={"column"} gap="10px">
              {CHAT_LIST.map((data, idx) => (
                <Flex
                  key={idx}
                  {...(data.me ? { flexDirection: "row-reverse" } : {})}
                  gap="5px"
                  alignItems={"center"}
                >
                  <Avatar size="sm" src={data.img} />
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
        )} */}
      </Flex>
    </Flex>
  );
};
