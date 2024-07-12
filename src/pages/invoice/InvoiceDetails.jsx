import React from "react";
import { jsPDF } from "jspdf";
import {
  Button,
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { _COLORS } from "../../constant";

export default function InvoiceDetails(props) {
  const { state } = useLocation();
  //console.log(state);
  const download = () => {
    var doc = new jsPDF();

    var elementHTML = document.querySelector("#pdf-container");

    doc.html(elementHTML, {
      callback: function (doc) {
        doc.save("sample-document.pdf");
      },
      x: 15,
      y: 15,
      width: 170, //target width in the PDF document
      windowWidth: 650, //window width in CSS pixels
    });
  };
  return (
    <Flex
      gap="40px"
      flexDir={"column"}
      bg="#fff"
      h="100vh"
      p="20px"
      alignItems={"center"}
    >
      <Button
        bg={_COLORS.brand}
        color="#fff"
        _hover={{ background: `${_COLORS.brand}50` }}
        fontWeight="bold"
        alignSelf={"flex-end"}
        onClick={download}
      >
        Download Invoice
      </Button>
      <Flex flexDir={"column"} w="100%" maxW="700px" id="pdf-container">
        <Text alignSelf={"flex-end"} fontSize={"2.5em"} fontWeight={"bold"}>
          {" "}
          Invoice
        </Text>
        <br />
        <br />

        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex flexDir={"column"}>
            <Text fontWeight={"bold"}>BILLED TO:</Text>
            <Text fontSize={".9em"}>{state?.requestId?.companyId?.name}</Text>
          </Flex>
          <Text fontSize={".9em"}>
            {dayjs(state?.createdAt).format("D MMMM YYYY")}
          </Text>
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap="10px" mt="10px">
          <Text fontWeight={"bold"}>Pick Up Address:</Text>
          <Text fontSize={".9em"}>{state?.requestId?.pickUpAddress}</Text>
        </Flex>
        <Flex flexDir={"row"} alignItems={"center"} gap="10px" mt="10px">
          <Text fontWeight={"bold"}>Delivery Address:</Text>
          <Text fontSize={".9em"}>{state?.requestId?.deliveryLocation}</Text>
        </Flex>
        <br />
        <br />
        <Divider borderColor={"#000"} />
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th borderBottom={"1px solid "} fontWeight={"900"} color="#000">
                  Load Details
                </Th>
                <Th borderBottom={"1px solid "} fontWeight={"900"} color="#000">
                  Amount
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td borderBottom={"1px solid "} fontSize={".9em"}>
                  {state?.requestId?.loadDetails}
                </Td>
                <Td borderBottom={"1px solid "} fontSize={".9em"}>
                  N {state?.amount?.toLocaleString()}
                </Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td fontSize={"1.2em"} fontWeight={"bold"}>
                  <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                    Total
                  </span>
                  N {state?.amount?.toLocaleString()}
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}
