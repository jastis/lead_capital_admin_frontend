import { Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";

export const CustomerInfo = ({ customer }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Customer Information
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Name
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {customer?.name}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Phone number
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {customer?.phone}
        </Text>
      </Flex>
    </Flex>
  );
};
