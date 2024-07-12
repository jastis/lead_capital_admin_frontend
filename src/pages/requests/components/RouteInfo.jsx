import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { _COLORS } from "../../../constant";

export const RouteInfo = ({ request }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px" borderRadius="5px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Route Information
        </Text>
      </Flex>
      <Flex flexDir={"column"} gap=".6rem">
        <Text color="#7E7C73" fontSize={".86em"}>
          Pickup Location
        </Text>
        <Text
          color={_COLORS.black}
          fontWeight="500"
          fontSize={".86em"}
          isTruncated
        >
          {request?.pickUpAddress}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"}>
          Pickup Date
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(request?.pickUpDate).format("DD-MMM-YYYY")}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"}>
          Pickup Time
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(request?.pickUpTime).format("hh-mm a")}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"}>
          Delivery Location
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.deliveryLocation}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"}>
          Delivery Date
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {dayjs(request?.deliveryDate)?.format("DD-MMM-YYYY")}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"}>
          Delivery Time
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.deliveryTime}
        </Text>
      </Flex>
    </Flex>
  );
};
