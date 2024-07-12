import {
  Button,
  Flex,
  Text,
  Tr,
  useDisclosure,
  Input as ChakraInput,
  Select,
} from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import CustomTable from "../../../../components/CustomTable";
import OverviewCard from "../../../../components/OverviewCard";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { _COLORS } from "../../../../constant";
function Trucks() {
  return (
    <>
      <OverviewCard title="Active Trucks" value="9">
        <CreateTruckModal />
      </OverviewCard>
      <CustomTable head={r}>
        {s?.map((data) => (
          <Tr>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.regNo}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.assetC}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.assetS}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.model}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.make}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.chassisNumber}</Text>
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

export default Trucks;

const r = [
  "Registration Number",
  "Asset Class",
  "Asset Size",
  "Model",
  "Make",
  "Chassis Number",
];

const s = [
  {
    regNo: "256GHZK8",
    assetC: "Barge",
    assetS: "Large",
    model: "Foton Auman",
    make: "Ford",
    chassisNumber: "SV30-0169266",
  },
];

export const CreateTruckModal = () => {
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
          <Text>Add Truck</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Truck</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input placeholder="Registration Number" fontSize=".86em" />
              <Select placeholder="Asset Class" fontSize=".86em">
                <option>1</option>
                <option>1</option>
              </Select>
              <Select placeholder="Asset Size" fontSize=".86em">
                <option>1</option>
                <option>1</option>
              </Select>
              <Input placeholder="Model" fontSize=".86em" />
              <Input placeholder="Make" fontSize=".86em" />
              <Input placeholder="Chassis Number" fontSize=".86em" />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
              >
                Add Truck
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
