import { Box, Flex, Text } from "@chakra-ui/react";
import CustomModal from "../../../components/CustomModal";
import { FaRegEdit } from "react-icons/fa";
import { _COLORS } from "../../../constant";
import UpdateInfoModal from "./UpdateInfoModal";
import { useGetState } from "../../../GlobalStateContext/useGetState";

const GeneralInformation = () => {
  const { state } = useGetState();
  return (
    <Box
      padding="50px 30px"
      bgColor={_COLORS.white}
      borderRadius="10px"
      width={["100%", "65%"]}
    >
      <Flex justifyContent="space-between" alignItems="center" mb="20px">
        <Text color={_COLORS.primaryBtn} fontSize="24px" fontWeight="bold">
          General Infomation
        </Text>
        <Box boxSize="30px">
          <CustomModal
            icon={<FaRegEdit color={_COLORS.brand} fontSize={"2em"} />}
            header={`Update Information`}
            // maxH="500px"
            overflow="scroll"
            iconColor={"#154141"}
          >
            <UpdateInfoModal />
          </CustomModal>
        </Box>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        fontWeight="500"
      >
        <Text>Name</Text>
        <Text color="#7E7C73">{state?.fullName}</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        fontWeight="500"
      >
        <Text>Email Address</Text>
        <Text color="#7E7C73">{state?.email}</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        fontWeight="500"
      >
        <Text>Phone Number</Text>
        <Text color="#7E7C73">{state?.phoneNumber}</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        fontWeight="500"
      >
        <Text>Business Name</Text>
        <Text color="#7E7C73">N/A</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        fontWeight="500"
      >
        <Text>CAC Registration Number</Text>
        <Text color="#7E7C73">N/A</Text>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb="20px"
        fontWeight="500"
      >
        <Text>Location</Text>
        <Text color="#7E7C73">N/A</Text>
      </Flex>
    </Box>
  );
};

export default GeneralInformation;
