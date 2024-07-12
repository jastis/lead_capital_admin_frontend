import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import CustomTable from "../../../components/CustomTable";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../../components/CustomModal";
import { CustomBtn } from "../../../components/CustomBtn";
import { getPartners } from "../../partners/service";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import axiosInstance from "../../../service/api";
import { errorNotifier, successNotifier } from "../../../components/notifier";
// import { AddNewRequestModal } from "..";

export const MoreActionPopover = ({
  clickRef,
  tabName,
  data,
  handleDelete,
  deleteLoading,
  refresh,
}) => {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          bg="transparent"
          _hover={{ background: "transparent" }}
          _focus={{ background: "transparent" }}
        >
          <BsThreeDots fontSize={"1.2em"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"100%"}>
        <PopoverArrow />
        <PopoverBody gap="10px" display={"flex"} flexDir={"column"}>
          {data?.status?.toLowerCase() !== "assigned" && (
            <CustomModal
              title={"Assign"}
              header={`Assign Request`}
              overflow="scroll"
            >
              <AssignRequest refresh={refresh} requestId={data?._id} />
            </CustomModal>
          )}
          <Text
            cursor={"pointer"}
            onClick={() =>
              navigate(`/requests/detail/${data?._id}`, { state: data })
            }
          >
            View
          </Text>

          <Text cursor={"pointer"} onClick={() => clickRef.current?.click()}>
            Edit
          </Text>

          <CustomTable.ActionType
            type={4}
            handleDelete={handleDelete}
            deleteLoading={deleteLoading}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export const AssignRequest = ({ requestId, onClose, refresh }) => {
  const { data: partnersData = [] } = useQuery({
    queryKey: ["partners"],
    queryFn: () => getPartners(),
  });

  console.log(partnersData, "???");

  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [noOfTrucks, setNoOfTruck] = useState(0);

  const { mutate: assignRequest, isLoading } = useMutation({
    mutationFn: (payload) =>
      axiosInstance.put(`/request/assign/${requestId}`, payload),
    onSuccess: () => {
      onClose();

      successNotifier("Assigned Successfully");
      refresh && refresh();
    },
    onError: (er) => errorNotifier(er?.response?.data?.message),
  });

  return (
    <Stack spacing={5}>
      <Select
        defaultValue={"select"}
        onChange={(e) => setSelectedPartnerId(e.target.value)}
      >
        <option disabled value={"select"}>
          Select partner/customer to assign
        </option>

        {partnersData?.map((partner) => (
          <option value={partner?._id}>{partner?.name}</option>
        ))}
      </Select>

      <Select
        defaultValue={"select"}
        onChange={(e) => setNoOfTruck(e.target.value)}
      >
        <option disabled value={"select"}>
          Select Number of Trucks
        </option>

        {[...Array(100)]?.map((_, index) => (
          <option value={index + 1}>{index + 1}</option>
        ))}
      </Select>
      <CustomBtn
        loading={isLoading}
        handleClick={() =>
          assignRequest({
            assignedTo: selectedPartnerId,
            trucksAssigned: 9,
            phoneNumber: partnersData?.find(
              (partner) => partner?._id === selectedPartnerId
            )?.phone,
          })
        }
        disabled={!noOfTrucks || !selectedPartnerId}
        mt={"2em"}
        size="sm"
        alignSelf="flex-end"
        bg="#3C0B71"
        text="Assign Request"
      />
    </Stack>
  );
};
