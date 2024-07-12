import { Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";

export const OtherInfo = () => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Other Information
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Comment
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          nil
        </Text>
      </Flex>
    </Flex>
  );
};
