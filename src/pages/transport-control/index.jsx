import {
  Button,
  Flex,
  Text,
  Tr,
  useDisclosure,
  Input as ChakraInput,
  Select,
} from "@chakra-ui/react";
import CustomTable from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import OverviewCard from "../../components/OverviewCard";

function TransportControl() {
  return (
    <>
      <OverviewCard title={"Active Drivers"} value="9">
        <CreateDriverModal />
      </OverviewCard>

      <CustomTable head={r}>
        {s?.map((data) => (
          <Tr>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.name}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.exDate}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.isDate}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.mobile}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.driverLi}</Text>
            </CustomTable.Td>
          </Tr>
        ))}
      </CustomTable>
      <CustomTable.Pagination
        length={10}
        total={50}
        updateTable={async (page) => null}
      />
    </>
  );
}

export default TransportControl;

const r = [
  "Name",
  "Expiry Date",
  "Issued Date",
  "Mobile",
  "Driver’s License Number",
];

const s = [
  {
    name: "Ogbevi Victor",
    exDate: "12/2025",
    isDate: "10/2022",
    mobile: "09023465767",
    driverLi: "FKJ671-HG",
  },
];

export const CreateDriverModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Text>Create Driver</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Driver</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input placeholder="First Name" fontSize=".86em" />
              <Input placeholder="Last Name" fontSize=".86em" />

              <Input placeholder="Password" fontSize=".86em" />

              <Select placeholder="Expiry Date" fontSize=".86em">
                <option>1</option>
                <option>1</option>
              </Select>

              <Select placeholder="Issued Date" fontSize=".86em">
                <option>1</option>
                <option>1</option>
              </Select>

              <Input type="tel" placeholder="Mobile" fontSize=".86em" />
              <Input placeholder="Driver’s License Number" fontSize=".86em" />
              <Input placeholder="Driver’s License Image" />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
              >
                Create
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};
