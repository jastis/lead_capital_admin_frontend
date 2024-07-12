/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tr,
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  useDisclosure,
  Select,
  Box,
  Textarea,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import { BiPlus } from "react-icons/bi";
import { getRequest } from "./service";
import dayjs from "dayjs";
import { MoreActionPopover } from "./components/MoreActionPopover";
import { useMutation, useQueryClient } from "react-query";
import { createRequest, deleteRequest } from "./service";
import { getCustomers } from "../customers/service";
import { getCompany } from "../companies/service/company";
import Filter from "../../components/Filter";
import axiosInstance from "../../service/api";
import { errorNotifier, successNotifier } from "../../components/notifier";
import BulkUpload from "../../components/BulkUpload";
import { fileUploadNotifier } from "../../components/FileUploadNotifier";

function Requests() {
  const queryClient = useQueryClient();

  const [skip1, setSkip1] = useState(0);
  const [skip2, setSkip2] = useState(0);
  const [skip3, setSkip3] = useState(0);

  const [filterBy, setFilterBy] = useState(null);

  // market place
  const { data: requestData = [], refetch } = useQuery({
    queryKey: ["request", skip1],
    queryFn: () => getRequest(skip1),
  });

  // assigned request
  const { data: assignedRequest } = useQuery({
    queryKey: ["assignedReq", skip2],
    queryFn: () =>
      axiosInstance
        .get(
          `/request?status=assigned&limit=${DATA_ROWS.LIMIT}${
            skip2 ? `&skip=${skip2}` : ""
          }`
        )
        .then((res) => res?.data)
        .catch(() => []),
  });

  const assignedReqData = assignedRequest?.data || [];

  // accepted request
  const { data: acceptedRequest = [] } = useQuery({
    queryKey: ["acceptedReq", skip3],
    queryFn: () =>
      axiosInstance
        .get(
          `/request?preAssign=yes&limit=${DATA_ROWS.LIMIT}${
            skip2 ? `&skip=${skip3}` : ""
          }`
        )
        .then((res) => res?.data)
        .catch(() => []),
  });

  const acceptedReqData = acceptedRequest?.data || [];
  console.log(acceptedReqData, "::==>");

  const clickRef = useRef(null);
  const toastRef = useRef();
  const [tabName, setTabName] = useState("marketPlace");
  const [refresh, setRefresh] = useState();
  const [inputFile, setInputFile] = useState("");

  const { mutate: deleteMutation, isLoading: deleteLoading } = useMutation({
    mutationFn: deleteRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request"] });
    },
  });
  const handleDelete = (id) => {
    deleteMutation(id);
  };

  async function uploadHandler(file) {
    let formData = new FormData();
    if (file !== "") {
      formData.append("csv", file);

      try {
        await axiosInstance.post(`/request/bulk-upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        successNotifier("Uploaded successfully");
        setRefresh([]);
      } catch (err) {
        errorNotifier(err?.response?.data?.message);
      } finally {
        toastRef.current?.onClose();
      }
    }
  }

  useEffect(() => {
    if (inputFile) {
      fileUploadNotifier(toastRef);
    }
    uploadHandler(inputFile);
  }, [inputFile, setRefresh]);

  return (
    <Tabs>
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <TabList>
          <Tab
            _selected={{
              color: _COLORS.brand,
              fontWeight: "bold",
              borderBottom: `2px solid ${_COLORS.brand}`,
            }}
            onClick={() => setTabName("marketPlace")}
          >
            Market Place{" "}
          </Tab>
          <Tab
            _selected={{
              color: _COLORS.brand,
              fontWeight: "bold",
              borderBottom: `2px solid ${_COLORS.brand}`,
            }}
            onClick={() => setTabName("assignedTrucks")}
          >
            Assigned Request
          </Tab>
          <Tab
            _selected={{
              color: _COLORS.brand,
              fontWeight: "bold",
              borderBottom: `2px solid ${_COLORS.brand}`,
            }}
            onClick={() => setTabName("acceptedRequest")}
          >
            Accepted Request
          </Tab>
        </TabList>
        <AddNewRequestModal />
        <BulkUpload setInputFile={setInputFile} />
      </Flex>

      <TabPanels>
        <TabPanel p="0" mt="30px">
          <>
            <Filter
              searchPlaceholder="Search Customer"
              searchFilter={"customerId.name"}
              filters={["truckType"]}
              filterBy={setFilterBy}
              info={requestData}
              mb="20px"
            />
            {/* {console.log("1@@@@@@@@@", requestData)} */}
            <CustomTable head={r}>
              {requestData
                ?.filter((data) => CustomTable.filterFunc(data, filterBy))
                ?.map((data) => (
                  <Tr key={data?._id}>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>{data?.truckType}</Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {data?.customerId?.name}
                      </Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>{data?.pickUpAddress}</Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>{data?.numberOfTrucks}</Text>
                    </CustomTable.Td>
                    <CustomTable.Td>
                      <Text {...CustomTable.style}>
                        {dayjs(data?.expiryDate).format("DD MMM YYYY")}
                      </Text>
                    </CustomTable.Td>

                    <CustomTable.Td>
                      <Text
                        color={
                          data?.status.toLowerCase() === "accepted" ||
                          data?.status.toLowerCase() === "open" ||
                          data?.status.toLowerCase() === "active" ||
                          data?.status.toLowerCase() === "assigned"
                            ? _COLORS.green
                            : _COLORS.red
                        }
                      >
                        {data?.status}
                      </Text>
                    </CustomTable.Td>

                    <CustomTable.Td>
                      <>
                        <MoreActionPopover
                          refresh={() => refetch()}
                          clickRef={clickRef}
                          tabName={tabName}
                          data={data}
                          deleteLoading={deleteLoading}
                          handleDelete={() => handleDelete(data?._id)}
                        />
                        <AddNewRequestModal
                          display="none"
                          mode="Edit"
                          data={data}
                          ref={clickRef}
                        />
                      </>
                    </CustomTable.Td>
                  </Tr>
                ))}
            </CustomTable>
            <CustomTable.Pagination
              length={requestData?.length}
              updateTable={(page) => {
                setSkip1(page * DATA_ROWS.LIMIT /*limit */);
              }}
            />
          </>
        </TabPanel>
        <TabPanel p="0" mt="30px">
          <>
            <CustomTable head={r1}>
              {assignedReqData?.map((data, index) => (
                <Tr key={index}>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.truckType}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.customerId?.name}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.pickUpAddress}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.numberOfTrucks}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {dayjs(data?.expiryDate).format("DD, MMM YYYY")}
                    </Text>
                  </CustomTable.Td>

                  <CustomTable.Td>
                    <Text
                      color={
                        data?.status.toLowerCase() === "assigned"
                          ? _COLORS.green
                          : _COLORS.red
                      }
                    >
                      {data?.status}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <>
                      <MoreActionPopover
                        clickRef={clickRef}
                        data={data}
                        tabName={tabName}
                      />
                      <AddNewRequestModal
                        display="none"
                        mode="Edit"
                        ref={clickRef}
                      />
                    </>
                  </CustomTable.Td>
                </Tr>
              ))}
            </CustomTable>
            <CustomTable.Pagination
              length={10}
              total={50}
              updateTable={async (_page) => null}
            />
          </>
        </TabPanel>
        <TabPanel p="0" mt="30px">
          <>
            <CustomTable head={r1}>
              {acceptedReqData?.map?.((data, index) => (
                <Tr key={index}>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.truckType}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.customerId?.name}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.pickUpAddress}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>{data?.numberOfTrucks}</Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <Text {...CustomTable.style}>
                      {dayjs(data?.expiryDate).format("DD, MMM YYYY")}
                    </Text>
                  </CustomTable.Td>

                  <CustomTable.Td>
                    <Text
                      color={
                        data?.status.toLowerCase() === "assigned"
                          ? _COLORS.green
                          : _COLORS.red
                      }
                    >
                      {data?.status}
                    </Text>
                  </CustomTable.Td>
                  <CustomTable.Td>
                    <>
                      <MoreActionPopover
                        clickRef={clickRef}
                        data={data}
                        tabName={tabName}
                      />
                      <AddNewRequestModal
                        display="none"
                        mode="Edit"
                        ref={clickRef}
                      />
                    </>
                  </CustomTable.Td>
                </Tr>
              ))}
            </CustomTable>
            <CustomTable.Pagination
              length={10}
              total={50}
              updateTable={async (_page) => null}
            />
          </>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Requests;

export const AddNewRequestModal = forwardRef(function AddNewRequestModal(
  { mode = "Add", data, ...props },
  ref
) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState({
    customerName: "",
    companyName: "",
    phoneNumber: "",
    truckType: "",
    truckTonnage: "",
    numberOfTrucks: "",
    pickUpAddress: data?.pickUpAddress,
    pickUpDate: "",
    expiryDate: "",
    pickUptime: "",
    deliveryLocation: "",
    deliveryDate: "",
    deliveryTime: "",
    storageDate: "",
    suggestedPrice: "",
    comment: "",
    remainingTruckAllocation: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const createNewRequest = useMutation(createRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      customerId: formValues?.customerName,
      companyId: formValues?.companyName,
    };
    createNewRequest.mutate(payload);
  };

  const { data: customerData = [] } = useQuery({
    queryKey: ["customer"],
    queryFn: getCustomers,
  });
  const { data: companyData = [] } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
  });

  return (
    <>
      <Button
        onClick={onOpen}
        _hover={{ background: _COLORS.green }}
        bg={_COLORS.green}
        color="#fff"
        {...props}
        ref={ref}
      >
        <Flex alignItems={"center"} gap="5px" fontWeight={"500"}>
          <BiPlus />
          <Text>{mode === "Add" ? "Add" : "Edit"} New Request</Text>
        </Flex>
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {mode === "Add" ? "Add" : "Edit"} New Request
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Select
                name="customerName"
                placeholder="Customer Name"
                value={formValues?.customerName}
                onChange={handleChange}
              >
                {customerData?.map((customer) => (
                  <option key={customer?._id} value={customer?._id}>
                    {customer?.name}
                  </option>
                ))}
              </Select>
              <Select
                name="companyName"
                placeholder="Company Name"
                value={formValues.companyName}
                onChange={handleChange}
              >
                {companyData?.map((company) => (
                  <option key={company?._id} value={company?._id}>
                    {company?.name}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Customer Phone Number"
                fontSize=".86em"
                name="phoneNumber"
                value={formValues?.phoneNumber}
                onChange={handleChange}
              />
              <Select
                placeholder="Select Truck Type"
                name="truckType"
                value={formValues?.truckType}
                onChange={handleChange}
              >
                <option value="volvo">Volvo</option>
                <option value="benz">Benz</option>
              </Select>
              <Select
                placeholder="Select Tonnage"
                name="truckTonnage"
                value={formValues?.truckTonnage}
                onChange={handleChange}
              >
                <option value="medium">medium</option>
                <option value="large">Large</option>
              </Select>
              <Input
                placeholder="Number of Trucks"
                fontSize=".86em"
                name="numberOfTrucks"
                value={formValues?.numberOfTrucks}
                onChange={handleChange}
              />
              <Input
                placeholder="Suggested Price"
                fontSize=".86em"
                name="suggestedPrice"
                value={formValues?.suggestedPrice}
                onChange={handleChange}
              />
              <Input
                placeholder="Remaining Truck Allocation"
                fontSize=".86em"
                name="remainingTruckAllocation"
                value={formValues?.remainingTruckAllocation}
                onChange={handleChange}
              />
              <Input
                placeholder="Pickup Address"
                fontSize=".86em"
                name="pickUpAddress"
                value={formValues?.pickUpAddress}
                onChange={handleChange}
              />
              <Box>
                <Text fontSize=".86em">Pick Up Date</Text>
                <Input
                  type="date"
                  fontSize=".86em"
                  name="pickUpDate"
                  value={formValues?.pickUpDate}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text fontSize=".86em">Pick Up Time</Text>
                <Input
                  type="time"
                  fontSize=".86em"
                  name="pickUptime"
                  value={formValues?.pickUptime}
                  onChange={handleChange}
                />
              </Box>

              <Input
                placeholder="Delivery Location"
                fontSize=".86em"
                name="deliveryLocation"
                value={formValues?.deliveryLocation}
                onChange={handleChange}
              />
              <Box>
                <Text fontSize=".86em">Delivery Date</Text>
                <Input
                  type="date"
                  fontSize=".86em"
                  name="deliveryDate"
                  value={formValues?.deliveryDate}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text fontSize=".86em">Delivery Time</Text>
                <Input
                  type="time"
                  fontSize=".86em"
                  name="deliveryTime"
                  value={formValues?.deliveryTime}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text fontSize=".86em">Storage Date</Text>
                <Input
                  type="date"
                  fontSize=".86em"
                  name="storageDate"
                  value={formValues?.storageDate}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text fontSize=".86em">Expiry Date</Text>
                <Input
                  type="date"
                  fontSize=".86em"
                  name="expiryDate"
                  value={formValues?.expiryDate}
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text fontSize=".86em">Expiry Time</Text>
                <Input
                  type="time"
                  fontSize=".86em"
                  name="expiryTime"
                  value={formValues?.expiryTime}
                  onChange={handleChange}
                />
              </Box>
              <Textarea
                placeholder="Enter Comment"
                name="comment"
                p="5px"
                fontSize={".86em"}
                value={formValues?.comment}
                onChange={handleChange}
                resize={"none"}
              />

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
                // isLoading={isLoading}
                onClick={handleSubmit}
              >
                {mode === "Add" ? "Add Request" : "Save Changes"}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
const r = [
  "Truck type",
  "Customer",
  "Pick up Address",
  "Total Trucks Requested",
  "Expiry Date/Time",
  "Status",
  "Action",
];

const r1 = [
  "Truck type",
  "Customer",
  "Pick up Address",
  "Total Trucks Requested",
  "Expiry Date/Time",
  "Status",
  "Action",
];
