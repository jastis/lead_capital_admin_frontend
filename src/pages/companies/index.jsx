import React, { useState } from "react";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
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
  Select,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import { BiPlus } from "react-icons/bi";
import Filter from "../../components/Filter";
import { createCompany, getCompany } from "./service/company";
import { useMutation, useQuery, useQueryClient } from "react-query";
import FullPageLoader from "../../components/FullPageLoader";

export default function Companies() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);
  const { data: companyData = [] } = useQuery({
    queryKey: ["company", skip],
    queryFn: () => getCompany(skip),
  });
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb="40px">
        <Filter
          searchPlaceholder={"Search Company"}
          searchFilter={"name"}
          filters={["noOfDeliveries"]}
          filterBy={setFilterBy}
          info={companyData}
          mb="0"
        />

        <CreateCompanyModal mb="20px" />
      </Flex>

      <CustomTable head={r}>
        {companyData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr key={data?._id}>
              <CustomTable.Td>
                {console.log(data, "d")}
                <Text {...CustomTable.style}>{data?.name}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.phone}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.email}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.address}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.noOfDeliveries}</Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      {!filterBy && (
        <CustomTable.Pagination
          length={companyData?.length}
          updateTable={(page) => {
            setSkip(page * DATA_ROWS.LIMIT /*limit */);
          }}
        />
      )}
    </>
  );
}

const r = [
  "Name of Company",
  "Phone Nuber",
  "Email Address",
  "Address",
  "Number of Deliveries",
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
  const { mutate: createNewCompany, isLoading } = useMutation({
    mutationFn: createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formValues };
    createNewCompany(payload);
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
          <Text>Add Company</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Company</ModalHeader>
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
                placeholder="Email Address"
                fontSize=".86em"
                name="email"
                value={formValues.email}
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
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                {isLoading ? "Adding..." : "Add Company"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
