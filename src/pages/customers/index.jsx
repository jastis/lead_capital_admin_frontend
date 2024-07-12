/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useState } from "react";

import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import Filter from "../../components/Filter";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import { BiPlus } from "react-icons/bi";
import { getCustomers, createCustomers } from "./service";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function Customers() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);
  const { data: customersData = [] } = useQuery({
    queryKey: ["customers", skip],
    queryFn: () => getCustomers(skip),
  });

  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb="40px">
        <Filter
          searchPlaceholder="Search Customer"
          searchFilter={"name"}
          filters={["numberOfDeliveries "]}
          filterBy={setFilterBy}
          info={customersData}
          mb="0"
        />

        <CreateCompanyModal mb="20px" />
      </Flex>
      <CustomTable head={r}>
        {customersData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.name || "N/A"}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.phone || "N/A"}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.address || "N/A"}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.email || "N/A"}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.numberOfDeliveries || "N/A"}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.numberOfIssues || "N/A"}
                </Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>

      <CustomTable.Pagination
        length={customersData?.length}
        updateTable={(page) => {
          setSkip(page * DATA_ROWS.LIMIT /*limit */);
        }}
      />
    </>
  );
}

const r = [
  "Name",
  "Phone Nuber",
  "Address",
  "Email",
  "Number of Deliveries",
  "Number of Issues",
];

export const CreateCompanyModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const { mutate: createNewCustomer, isLoading } = useMutation({
    mutationFn: createCustomers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formValues };
    createNewCustomer(payload);
  };
  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ background: _COLORS.green }}
        bg={_COLORS.green}
        color="#fff"
      >
        <Flex alignItems={"center"} gap="5px" fontWeight={"500"}>
          <BiPlus />
          <Text>Add Customer</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input
                placeholder="Name"
                fontSize=".86em"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
              <Input
                placeholder="Phone Number"
                fontSize=".86em"
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
              />
              <Input
                placeholder="Address"
                fontSize=".86em"
                name="address"
                value={formValues.address}
                onChange={handleChange}
              />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Add Customer
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
