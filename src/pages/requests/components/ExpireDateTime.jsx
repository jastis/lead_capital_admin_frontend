import { Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import dayjs from "dayjs";

export const ExpireDateTime = ({ request }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Expiry Date/Time
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Expiry Date
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(request?.expiryDate).format("DD, MMM YYYY")}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Storage Date
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(request?.storageDate).format("DD, MMM YYYY")}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Time
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.pickUptime}
        </Text>
      </Flex>
    </Flex>
  );
};
