import { Flex, Text } from "@chakra-ui/react";
import { BiChevronLeft } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { AcceptDecline } from "./AcceptDecline";
import { CustomerInfo } from "./CustomInfo";
import { TruckType } from "./TruckType";
import { RouteInfo } from "./RouteInfo";
import { TotalReqStatus } from "./TotalReqStatus";
import { ExpireDateTime } from "./ExpireDateTime";
import { OtherInfo } from "./OtherInfo";

function RequestDetails() {
  const navigate = useNavigate();
  const { state: request } = useLocation();

  console.log("REQUEST DETAILS", request);

  return (
    <Flex flexDir={"column"} borderRadius="5px">
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

      <Flex
        gap="20px"
        flexDir={["column", "row"]}
        alignItems="initial"
        w="100%"
        justifyContent={"space-between"}
      >
        <Flex flexDir="column" gap="20px" flex="1">
          <CustomerInfo customer={request?.customerId} />
          <RouteInfo request={request} />
        </Flex>
        <Flex flexDir="column" gap="20px" flex="1">
          <AcceptDecline request={request} />

          <OtherInfo />
          <TotalReqStatus request={request} />
        </Flex>
        <Flex flexDir="column" gap="20px">
          <TruckType request={request} />
          <ExpireDateTime request={request} />
          {/* <Chat /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default RequestDetails;

export const CHAT_LIST = [
  {
    img: "https://bit.ly/kent-c-dodds",
    chat: "Do you mean we have to carry two loaders?",
  },
  {
    img: "https://bit.ly/ryan-florence",
    chat: "Yes",
    me: true,
  },
  {
    img: "https://bit.ly/kent-c-dodds",
    chat: "Do you mean we have to carry two loaders?",
  },
  {
    img: "https://bit.ly/ryan-florence",
    chat: "Yes",
    me: true,
  },
];
