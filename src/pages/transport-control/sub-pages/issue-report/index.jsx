import {
  Text,
  Tr,
  Input as ChakraInput,
  Button,
  Select,
  useDisclosure,
  Flex,
  Textarea,
} from "@chakra-ui/react";
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
import { BiPlus } from "react-icons/bi";
import { BsDatabaseExclamation } from "react-icons/bs";
import { _COLORS } from "../../../../constant";
function IssueReport() {
  return (
    <>
      <OverviewCard
        icon={BsDatabaseExclamation}
        title={"Issued Reports"}
        value="9"
      >
        <CreateIssueReportModal />
      </OverviewCard>
      <CustomTable head={r}>
        {s?.map((data) => (
          <Tr>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.assetId}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style}>{data?.classification}</Text>
            </CustomTable.Td>
            <CustomTable.Td>
              <Text {...CustomTable.style} maxW="250px">
                {data?.loggedIssues}
              </Text>
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

export default IssueReport;

const r = ["Asset ID", "Classification", "Logged Issues"];

const s = [
  {
    assetId: "KT38GHZU",
    classification: "Customer",
    loggedIssues: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  },
];

export const CreateIssueReportModal = () => {
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
          <Text>Issue Report</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Issue Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input placeholder="Asset ID" fontSize=".86em" />

              <Select placeholder="Classification" fontSize=".86em">
                <option>1</option>
                <option>1</option>
              </Select>
              <Textarea
                placeholder="Log issue"
                resize={"none"}
                fontSize=".86em"
              />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
              >
                Issue Report
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
