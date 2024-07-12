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
  Textarea,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPayment } from "./services";
import dayjs from "dayjs";
import CustomModal from "../../components/CustomModal";
import axiosInstance from "../../service/api";
import { useGetState } from "../../GlobalStateContext/useGetState";
import { errorNotifier, successNotifier } from "../../components/notifier";
import { CustomBtn } from "../../components/CustomBtn";

export default function Financials() {
  const [skip1, setSkip1] = useState(0);
  const [skip2, setSkip2] = useState(0);
  const [skip3, setSkip3] = useState(0);

  const { data: payInData, isLoading: payInLoading } = useQuery({
    queryKey: ["payment", "payin", skip1],
    queryFn: () => getPayment("payin", skip1),
  });

  const { data: payOutData, isLoading: payOutLoading } = useQuery({
    queryKey: ["payment", "payout", skip2],
    queryFn: () => getPayment("payout", skip1),
  });

  const { data: payOutReqData, isLoading: payOutReqLoading } = useQuery({
    queryKey: ["payment", "payout_req", skip3],
    queryFn: () => axiosInstance.get("/payout").then((res) => res.data?.data),
  });

  console.log(payOutReqData, "PPPP");
  const [activeTab, setActiveTab] = useState("");
  return (
    <Tabs>
      <Flex justifyContent={"space-between"}>
        <TabList>
          <Tab
            _selected={{
              color: _COLORS.brand,
              fontWeight: "bold",
              borderBottom: `2px solid ${_COLORS.brand}`,
            }}
            onClick={() => setActiveTab("payIn")}
          >
            Pay In
          </Tab>
          <Tab
            _selected={{
              color: _COLORS.brand,
              fontWeight: "bold",
              borderBottom: `2px solid ${_COLORS.brand}`,
            }}
            onClick={() => setActiveTab("payOut")}
          >
            Pay Out
          </Tab>
          <Tab
            _selected={{
              color: _COLORS.brand,
              fontWeight: "bold",
              borderBottom: `2px solid ${_COLORS.brand}`,
            }}
            onClick={() => setActiveTab("payOut")}
          >
            Pay Out Request
          </Tab>
        </TabList>

        <Flex alignItems={"center"} flexDir={"row"} gap="30px">
          {activeTab === "payIn" ? <PayInModal /> : <PayOutModal />}
        </Flex>
      </Flex>
      {console.log(payInData, "LL")}
      <TabPanels>
        <TabPanel px={"0"}>
          <>
            <CustomTable head={r}>
              {payInData?.map((data) => (
                <Tr>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.tripId?.tripId}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.tripTitle}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.company?.name}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.totalBill}</Text>
                  </CustomTable.Td>

                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {dayjs(data?.updatedAt).format("YYYY-MM-DD")}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {dayjs(data?.updatedAt).format("HH:mm:ss")}
                    </Text>
                  </CustomTable.Td>
                </Tr>
              ))}
            </CustomTable>
            <CustomTable.Pagination
              length={payInData?.length}
              updateTable={(page) => {
                setSkip1(page * DATA_ROWS.LIMIT /*limit */);
              }}
            />
          </>
        </TabPanel>
        <TabPanel px={"0"}>
          <>
            <CustomTable head={s}>
              {payOutData?.map((data) => (
                <Tr>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.tripId?.tripId}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.tripTitle}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.partner?.name}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.totalAmountDue?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.paidDeposit?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.remainingBalance?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.profit?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>
                </Tr>
              ))}
            </CustomTable>
            <CustomTable.Pagination
              length={payOutData?.length}
              updateTable={(page) => {
                setSkip2(page * DATA_ROWS.LIMIT /*limit */);
              }}
            />
          </>
        </TabPanel>
        {console.log(payOutData, "payout data")}
        <TabPanel px={"0"}>
          <>
            <CustomTable head={payOutReq}>
              {payOutReqData?.map((data) => (
                <Tr>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.tripId?.tripId}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.paymentId?.tripTitle}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.partnerId?.name}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.paymentId?.totalAmountDue?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.paymentId?.paidDeposit?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {data?.paymentId?.remainingBalance?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>

                  <CustomTable.Td>
                    <Text
                      {...CustomTable.style}
                      {...(data?.approvalStatus === "awaiting"
                        ? { color: "#b7b728" }
                        : data?.approvalStatus === "approved"
                        ? { color: "green" }
                        : { color: "#EB3F3F" })}
                    >
                      {data?.approvalStatus?.toLocaleString()}
                    </Text>
                  </CustomTable.Td>

                  <CustomTable.Td>
                    <CustomModal
                      title={"View"}
                      header={`Pay Out Request`}
                      overflow="scroll"
                      iconColor={"#154141"}
                    >
                      <PayoutRequestModal data={data} />
                    </CustomModal>
                  </CustomTable.Td>
                </Tr>
              ))}
            </CustomTable>
            <CustomTable.Pagination
              length={payOutData?.length}
              updateTable={(page) => {
                setSkip3(page * DATA_ROWS.LIMIT /*limit */);
              }}
            />
          </>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export const PayoutRequestModal = ({ data, onClose }) => {
  const queryClient = useQueryClient();

  const {
    state: { _id: _adminId },
  } = useGetState();

  const { mutate: reject, isLoading: isRejectLoading } = useMutation({
    mutationFn: (payload) =>
      axiosInstance.put(`/payout/update/${data?._id}`, payload),
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["payout"] });
      onClose();

      successNotifier(e?.data?.msg);
    },
    onError: (e) => {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    },
  });

  const { mutate: accept, isLoading: isAcceptLoading } = useMutation({
    mutationFn: (payload) =>
      axiosInstance.put(`/payout/update/${data?._id}`, payload),
    onSuccess: (e) => {
      queryClient.invalidateQueries({ queryKey: ["payout"] });
      onClose();

      successNotifier(e?.data?.msg);
    },
    onError: (e) => {
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      );
    },
  });

  console.log("apyout details", data);
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px">
      <Flex alignItems={"center"} gap="10px">
        <Button
          isLoading={isAcceptLoading}
          size="sm"
          bg={_COLORS.brand}
          color="#fff"
          onClick={() =>
            accept({ approvalStatus: "accepted", adminId: _adminId })
          }
        >
          Accept
        </Button>

        <CustomModal
          title={"Reject"}
          header={`Reason for Rejecting`}
          overflow="scroll"
          iconColor={"#154141"}
          containerProps={{
            bg: "transparent",
            border: "1px solid grey",
            color: "#000",
            py: "5px",
            px: "20px",
            borderRadius: "5px",
            fontWeight: "bold",
            fontSize: ".9em",
          }}
        >
          <RejectModal reject={reject} isRejectLoading={isRejectLoading} />
        </CustomModal>
      </Flex>
    </Flex>
  );
};

export const RejectModal = ({ reject, isRejectLoading }) => {
  const {
    state: { _id: _adminId },
  } = useGetState();
  const [comment, setComment] = useState("");

  return (
    <>
      <Textarea
        size="sm"
        isLoading={isRejectLoading}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        mb="10px"
      />
      <CustomBtn
        isDisabled={!comment}
        isLoading={isRejectLoading}
        handleClick={() =>
          reject({ comment, approvalStatus: "rejected", adminId: _adminId })
        }
        text="Submit"
      />
    </>
  );
};

export const PayOutModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (payload) => axiosInstance.post("/payment", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
      onClose();
      successNotifier("Successful");
    },
    onError: (e) =>
      errorNotifier(
        e.response?.data?.message || e.response?.data?.data?.message
      ),
  });

  const { data: trips } = useQuery({
    queryKey: ["_"],
    queryFn: () => axiosInstance.get(`/trips`),
  });

  const { data: partners } = useQuery({
    queryKey: ["partners"],
    queryFn: () => axiosInstance.get(`/partner`),
  });

  console.log(partners, "::{{{{");

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate({ ...formValues, paymentFor: "payout" });
  };
  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ background: _COLORS.green }}
        bg={_COLORS.green}
        color="#fff"
      >
        Pay Out
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Select
                onChange={handleChange}
                name="tripId"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select Trip
                </option>
                {trips?.data?.data?.map((trip) => (
                  <option key={trip?._id} value={trip?._id}>
                    {trip?.tripId}
                  </option>
                ))}
              </Select>

              <Select
                onChange={handleChange}
                name="partner"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select Partner
                </option>
                {partners?.data?.data?.map((partner) => (
                  <option key={partner?._id} value={partner?._id}>
                    {partner?.name}
                  </option>
                ))}
              </Select>

              {/* <Select
                onChange={handleChange}
                name="paymentFor"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Payment for
                </option>
                <option value={"individual"}>Individual</option>
              </Select> */}

              <Input
                placeholder="Trip Title"
                fontSize=".86em"
                name="tripTitle"
                value={formValues?.tripTitle}
                onChange={handleChange}
              />
              <Input
                placeholder="Total Amount Due"
                type="number"
                fontSize=".86em"
                name="totalAmountDue"
                value={formValues?.totalAmountDue}
                onChange={handleChange}
              />
              <Input
                placeholder="Paid Deposit"
                type="number"
                fontSize=".86em"
                name="paidDeposit"
                value={formValues?.paidDeposit}
                onChange={handleChange}
              />
              <Input
                placeholder="Remaining Balance"
                type="number"
                fontSize=".86em"
                name="remainingBalance"
                value={formValues?.remainingBalance}
                onChange={handleChange}
              />
              <Input
                placeholder="Profit"
                type="number"
                fontSize=".86em"
                name="profit"
                value={formValues?.profit}
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
                Pay In
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export const PayInModal = () => {
  const queryClient = useQueryClient();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const { mutate: createNewCustomer, isLoading } = useMutation({
    mutationFn: (payload) => axiosInstance.post("/payment", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
      onClose();
    },
  });

  const { data: trips } = useQuery({
    queryKey: ["_"],
    queryFn: () => axiosInstance.get(`/trips`),
  });

  const { data: companies } = useQuery({
    queryKey: ["_"],
    queryFn: () => axiosInstance.get(`/company`),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    createNewCustomer({ ...formValues, paymentFor: "payin" });
  };
  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ background: _COLORS.green }}
        bg={_COLORS.green}
        color="#fff"
      >
        Pay In
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pay In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Select
                onChange={handleChange}
                name="tripId"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select Trip
                </option>
                {trips?.data?.data?.map((trip) => (
                  <option key={trip?._id} value={trip?._id}>
                    {trip?.tripId}
                  </option>
                ))}
              </Select>
              <Select
                onChange={handleChange}
                name="company"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select Company
                </option>
                {companies?.data?.data?.map((company) => (
                  <option
                    key={company?.companyId?._id}
                    value={company?.companyId?._id}
                  >
                    {company?.companyId?.name}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Trip Title"
                fontSize=".86em"
                name="tripTitle"
                value={formValues?.tripTitle}
                onChange={handleChange}
              />
              <Input
                placeholder="Total Bill"
                type="number"
                fontSize=".86em"
                name="totalBill"
                value={formValues?.totalBill}
                onChange={handleChange}
              />
              {/* <Select defaultValue={"default"}>
                <option disabled value={"default"}>
                  Payment for
                </option>
                <option value={"payin"}>
               payin
                </option>
              </Select> */}
              <Select
                onChange={handleChange}
                name="paymentStatus"
                defaultValue={"default"}
              >
                <option disabled value={"default"}>
                  Select Payment Status
                </option>
                <option value={"individual"}>Individual</option>
              </Select>

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
                Pay In
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const r = [
  "Trip ID",
  "Trip Title ",
  "Company Name",
  "Total Bill",
  // "Payment Status",
  "Date",
  "Time",
];

const s = [
  "Trip ID",
  "Trip Title ",
  "Partner's Name",
  "Total Amount Due",
  "Deposit Paid",
  "Balance Remaining",
  "Profit",
];

const payOutReq = [
  "Trip ID",
  "Trip Title ",
  "Partner's Name",
  "Total Amount Due",
  "Deposit Paid",
  "Balance Remaining",
  "Status",
  "Action",
];
