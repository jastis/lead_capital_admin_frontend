import { Flex, Text } from "@chakra-ui/react";
import { BiChevronLeft } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomerInfo } from "./CustomInfo";
import { RouteInfo } from "./RouteInfo";
import { AssignRequestModal } from "./AssignRequestModal";
import { useQuery } from "react-query";
import { getPartners } from "../../partners/service";
import FullPageLoader from "../../../components/FullPageLoader";

function AssignRequestDetails() {
  const navigate = useNavigate();
  const { state: request } = useLocation();

  const { data: partnersData = [], isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
  });

  console.log("STATE DATA", request, "partnersData", partnersData);

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Flex flexDir={"column"} borderRadius="5px">
      <Flex width="100%" justify="space-between">
        <Flex
          flexDir={"row"}
          alignItems="center"
          gap="10px"
          mb="20px"
          cursor={"pointer"}
          onClick={() => navigate(-1)}
        >
          <BiChevronLeft fontSize={"1.5em"} />
          <Text fontWeight={"500"}>Back</Text>
        </Flex>
        <AssignRequestModal partners={partnersData} requestId={request?._id} />
      </Flex>
      <Flex
        gap="20px"
        flexDir={["column", "row"]}
        alignItems="initial"
        w={["100%", "100%", "100%", "60%"]}
        justifyContent={"space-between"}
      >
        <Flex flexDir="column" gap="20px" flex="1">
          <CustomerInfo customer={request?.customerId} />

          {/* <ExpireDateTime /> */}
        </Flex>
        <Flex flexDir="column" gap="20px" flex="1">
          <RouteInfo request={request} />
          {/* <AcceptDecline />

          <OtherInfo />
          <TotalReqStatus /> */}
        </Flex>
        {/* <Flex flexDir="column" gap="20px">
          <TruckType />
          <Chat />
        </Flex> */}
      </Flex>
    </Flex>
  );
}

export default AssignRequestDetails;
