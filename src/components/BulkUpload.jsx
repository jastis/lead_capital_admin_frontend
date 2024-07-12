import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MdUploadFile } from "react-icons/md";
import { FileInput } from "./FileInput";
// import sampleFile from "../assets/bulkSample.png";
// import csvSample from "../assets/sampleCSV.csv";
import { CustomBtn } from "./CustomBtn";
import dayjs from "dayjs";
import { creatCsvFile, downloadFile } from "download-csv";

export default function BulkUpload({ setInputFile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const csvColumns = {
    customerId: "Customer Id",
    companyId: "Company Id",
    partnerId: "Partner Id",
    phoneNumber: "Phone Number",
    truckType: "Truck Type",
    truckTonnage: "Truck Tonnage",
    numberOfTrucks: "Number of Trucks",
    pickUpAddress: "Pickup Address",
    deliveryLocation: "Delivery Address",
    deliveryAddress: "Delivery Address",
    pickUpDate: "Pickup Date",
    pickUpTime: "Pickup Time",
    expiryDate: "ExpiryDate",
    extraNote: "Extra Note",
  };

  const csvData = [
    {
      customerId: "Enter Customer Id",
      companyId: "Enter Company Id",
      partnerId: "Enter Partner Id",
      phoneNumber: "Enter Phone Number",
      truckType: "Enter Truck Type",
      truckTonnage: "Enter Truck Tonnage",
      numberOfTrucks: "Enter Number of Trucks",
      pickUpAddress: "Enter Pickup Address",
      deliveryLocation: "Enter Delivery Address",
      deliveryAddress: "Enter Delivery Address",
      pickUpDate: dayjs().format("YYYY-MM-DD"),
      pickUpTime: dayjs().format("HH:mm A"),
      expiryDate: dayjs().format("YYYY-MM-DD"),
      extraNote: "Enter Extra Note",
    },
  ];

  const handleCsvDownload = () => {
    const csvFile = creatCsvFile(csvData, csvColumns);
    downloadFile(csvFile);
  };

  return (
    <>
      <CustomBtn
        childComp={<MdUploadFile />}
        text={"Create Bulk Request"}
        bg={"#219643"}
        handleClick={onOpen}
      />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bulk Upload</ModalHeader>
          <Text px="25px" color="#3C7B79">
            See sample below(CSV only)
          </Text>
          <ModalCloseButton />
          <Divider mb="3px" />
          {/* <ModalBody mb="10px">
            <Image sizes="md" src={sampleFile} alt="bulk staff sample" />
          </ModalBody> */}

          <ModalFooter>
            <Flex width="100%" justify="space-between" align={"center"}>
              <Button onClick={handleCsvDownload}>Download Template</Button>
              {/* <a href={csvSample} download="csv sample">
                <Text color="#3C7B79" fontSize="12px">
                  Click on the image below to download template:
                </Text>
                <FaFileCsv size={24} color="#3C7B79" />
              </a> */}
              <FileInput setInputFile={setInputFile} />
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
