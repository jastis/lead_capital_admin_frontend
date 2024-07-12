/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import {
  Divider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Select,
  Input,
} from "@chakra-ui/react";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import Filter from "../../components/Filter";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "../../service/api";
import dayjs from "dayjs";
import { errorNotifier } from "../../components/notifier";
import { BiDownload } from "react-icons/bi";
import { creatCsvFile, downloadFile } from "download-csv";
import { useNavigate } from "react-router-dom";
import { CustomBtn } from "../../components/CustomBtn";
import CustomModal from "../../components/CustomModal";
const Invoices = () => {
  const navigate = useNavigate();
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);

  const { data } = useQuery({
    queryKey: ["invoices", skip],
    queryFn: () =>
      axiosInstance
        .get(
          `/invoice?limit=${DATA_ROWS.LIMIT}&sort=desc&skip=${
            skip * DATA_ROWS.LIMIT
          }`
        )
        .then((res) => res?.data)
        .catch((e) => {
          errorNotifier(
            e.response?.data?.message || e.response?.data?.data?.message
          );
          return [];
        }),
  });

  const invoices = data?.data;

  return (
    <>
      {console.log(data, "invoice")}
      <Flex mb="20px" alignItems={"center"} justifyContent={"space-between"}>
        <Filter
          filters={["status", "nameOfCompany"]}
          filterBy={setFilterBy}
          info={invoices}
        />
        <Flex
          bg={_COLORS.brand}
          color="#fff"
          p="10px"
          px="15px"
          fontWeight={"bold"}
          borderRadius={"5px"}
        >
          <CustomModal
            title={"Create Invoice"}
            header={`Create Invoice`}
            overflow="scroll"
          >
            <CreateInvoiceModal />
          </CustomModal>
        </Flex>
      </Flex>

      <CustomTable head={r}>
        {invoices
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          .map((data) => (
            <Tr>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.requestId?.loadDetails}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {dayjs(data?.requestId?.pickUpDate).format("YYYY-MM-DD")}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.requestId?.pickUpAddress}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.requestId?.deliveryLocation}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {dayjs(data?.requestId?.deliveryDate).format("YYYY-MM-DD")}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text color={_COLORS.green}>
                  ₦ {data?.amount?.toLocaleString()}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                {/* <DownloadIndividualInvoiceAsCSV data={data} /> */}
                <Text
                  onClick={() =>
                    navigate("/invoices/invoice-details", {
                      state: {
                        ...data,
                      },
                    })
                  }
                >
                  View
                </Text>
              </CustomTable.Td>
            </Tr>
          ))}
        {console.log(data, "{{}}")}
      </CustomTable>
      {!filterBy && (
        <CustomTable.Pagination
          length={invoices}
          updateTable={(page) => setSkip(page)}
        />
      )}
    </>
  );
};

export default Invoices;

const r = [
  "Load Details",
  "Pickup Date",
  "Pickup Address",
  "Delivery Address",
  "Delivery Date",
  "Amount(₦)",

  // "Action",
];

export const CreateInvoiceModal = ({ onClose }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => axiosInstance.post("/invoice", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      onClose();
    },
  });

  const { data } = useQuery({
    queryKey: ["getReq"],
    queryFn: () => axiosInstance.get(`/request`).then((res) => res?.data),
  });

  console.log(data?.data, "getReq");

  const handleInvoice = () => {
    const find = data?.data?.find((ob) => ob?._id === reqId);
    const payload = {
      requestId: reqId,
      amount,
      companyId: find?.companyId?._id,
    };
    console.log(payload, "payload");
    mutate(payload);
  };

  const [reqId, setReqId] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <Flex flexDir={"column"} gap="20px">
      <Select
        onChange={(e) => setReqId(e.target.value)}
        name="tripId"
        defaultValue={"default"}
      >
        <option disabled value={"default"}>
          Select Customer
        </option>
        {data?.data?.map((request) => (
          <option key={request?._id} value={request?._id}>
            {request?.customerId?.name}
          </option>
        ))}
      </Select>
      <Flex flexDir={"column"} fontSize=".86em" gap="10px">
        <Text> Enter Amount</Text>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Flex>

      <CustomBtn
        loading={isLoading}
        handleClick={handleInvoice}
        text={" Create Invoice"}
      ></CustomBtn>
    </Flex>
  );
};
export const DownloadIndividualInvoiceAsCSV = ({ data }) => {
  const csvColumns = {
    loadDetails: "Load Details",
    pickUpDate: "Pickup Date",
    pickUpAddress: "Pickup Address",
    deliveryAddress: "Delivery Address",
    deliveryDate: "Delivery Date",
    amount: "Amount(₦)",
  };

  const csvData = [
    {
      loadDetails: data?.requestId?.truckTonnage || "---",
      pickupDate:
        dayjs(data?.requestId?.pickUpDate).format("YYYY-MM-DD") || "---",
      pickupAddress: data?.requestId?.pickUpAddress || "---",
      deliveryAddress: data?.requestId?.deliveryLocation || "---",
      deliveryDate:
        dayjs(data?.requestId?.deliveryDate).format("YYYY-MM-DD") || "---",
      amount: data?.amount?.toLocaleString() || "---",
    },
  ];

  const handleCsvDownload = () => {
    const csvFile = creatCsvFile(csvData, csvColumns);
    downloadFile(csvFile);
  };

  return (
    <BiDownload
      onClick={handleCsvDownload}
      cursor={"pointer"}
      fontSize={"1.5em"}
    />
  );
};
