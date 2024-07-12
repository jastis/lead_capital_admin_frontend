import { Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";

export const AcceptDecline = ({ request }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Action
        </Text>
      </Flex>

      <Flex flexDir={"row"} alignItems="center">
        {/* {true ? ( */}
        <Text
          fontSize=".86em"
          color={"#fff"}
          bg={_COLORS.green}
          p="5px 10px"
          borderRadius={"4px"}
          fontWeight="bold"
          textTransform="capitalize"
        >
          {request?.status}
        </Text>
        {/* ) : (
          <Text
            fontSize=".86em"
            color={"#fff"}
            bg={_COLORS.red}
            p="5px 10px"
            borderRadius={"4px"}
            fontWeight="bold"
          >
            Declined
          </Text>
        )} */}

        {/* <CustomTable.ActionType type={0} /> */}
      </Flex>
    </Flex>
  );
};
