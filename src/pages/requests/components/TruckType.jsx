import { Flex, Text } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";

export const TruckType = ({ request}) => {
  return (
    <Flex
      flexDir={"column"}
      w="100%"
      bg="#fff"
      p="20px"
      alignItems={"initial"}
      borderRadius="5px"
    >
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Truck Type
        </Text>
      </Flex>

      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Truck Type
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.truckType}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"} mt="20px">
          Remaining Trucks Allocation{" "}
        </Text>

        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.remainingTruckAllocation}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"} mt="20px">
          Transporter name
        </Text>

        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {request?.companyId?.name}
        </Text>
      </Flex>
    </Flex>
  );
};
