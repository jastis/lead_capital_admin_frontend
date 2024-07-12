import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";
import { _COLORS } from "../../constant";
import { getNotification } from "./services/notifications";
import { useQuery } from "react-query";
// import { useGetState } from "../../../../GlobalStateContext/useGetState";
import { useGetState } from "../../GlobalStateContext/useGetState";
import FullPageLoader from "../../components/FullPageLoader";

const index = () => {
  const { state } = useGetState();
  const user = state.type;
  const userType = user.charAt(0).toUpperCase() + user.slice(1);

  console.log(userType, "lagos");
  const { data: notificationData = [], isLoading } = useQuery({
    queryFn: () => getNotification(userType),
    queryKey: ["notification"],
  });
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box width={"100%"} mt="20px">
      <Box width="100%">
        {notificationData.map((item) => (
          <Box
            key={item.id}
            width="100%"
            bgColor={_COLORS.white}
            borderRadius="16px"
            padding="20px 20px"
            paddingBottom="30px"
            mb="20px"
          >
            <Flex
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              mb="10px"
            >
              <Text fontWeight="500" fontSize="16px">
                {item?.title || "N/A"}
              </Text>
            </Flex>
            <Text color="#7E7C73" maxW="700px" fontSize={".8em"}>
              {item?.message || "N/A"}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default index;
