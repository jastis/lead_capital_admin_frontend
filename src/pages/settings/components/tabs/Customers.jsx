/* eslint-disable react/jsx-key */
import { Box, Text, Td, Tr } from "@chakra-ui/react";
import { _COLORS } from "../../../../constant";
import CustomTable from "../../../../components/CustomTable";
import {BsTrash} from "react-icons/bs"

function Customers() {
  return (
    <Box
    width="100%"
    borderRadius="10px"
    mt="20px"
    >
      <CustomTable head={titleHead}>
        {bodyData?.map((data) => (
          <Tr>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.firstName}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.lastName}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.email}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.phoneNumber}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.date}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text
                color={
                  data?.status.toLowerCase() === "accepted" ||
                  data?.status.toLowerCase() === "open" ||
                  data?.status.toLowerCase() === "active"
                    ? _COLORS.green
                    : _COLORS.red
                }
              >
                {data?.status}
              </Text>
            </CustomTable.Td>
            <Td>
              <BsTrash size={24} color="#FD0303"/>
            </Td>
          </Tr>
        ))}
      </CustomTable>
      <CustomTable.Pagination
        length={10}
        total={50}
        updateTable={async (page) => null}
      />
    </Box>
  );
}

export default Customers;

const titleHead = [
  "First Name",
  "Last Name",
  "Email",
  "Phone Number",
  "Date",
  "Status",
  "Action",
];

const bodyData = [
  {
    firstName: "Adewale",
    lastName: "Demola",
    email: "adewale@gmail.com",
    phoneNumber: "09074538245",
    date: "21, August 2023",
    status: "Active",
    action: "",
  },
  {
    firstName: "Adewale",
    lastName: "Demola",
    email: "adewale@gmail.com",
    phoneNumber: "09074538245",
    date: "21, August 2023",
    status: "Pending",
    action: "",
  },
  {
    firstName: "Adewale",
    lastName: "Demola",
    email: "adewale@gmail.com",
    phoneNumber: "09074538245",
    date: "21, August 2023",
    status: "Active",
    action: "",
  },
  {
    firstName: "Adewale",
    lastName: "Demola",
    email: "adewale@gmail.com",
    phoneNumber: "09074538245",
    date: "21, August 2023",
    status: "Active",
    action: "",
  },
];
