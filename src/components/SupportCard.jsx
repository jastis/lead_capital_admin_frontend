import React from 'react';
import { Box, Flex, Text, HStack, Avatar, Tooltip } from '@chakra-ui/react';
import { MdAdd } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import CustomModal from './CustomModal';
import ResolveTicket from '../components/ResolveTicket';
import ResponseModal from './ResponseModal';
import dayjs from 'dayjs';

const SupportCard = ({ data, handleClose, handleCloseTicket, ResolveLoading}) => {

  return (
    <>
      {data?.map((datum) => (
        <Box
          key={datum?._id}
          bg={"white"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          padding={"15px"}
          borderRadius={"10px"}
          my={"6"}
        >
          <Flex alignItems={"flex-start"} justifyContent="flex-start" mt="10px">
            <Avatar src={datum?.userId?.image} name={"image"} size={["md"]} alt={"image"} />
            <Box ml="20px">
              <Text color="#4A4949" fontWeight={800} fontSize="16px">
                {datum?.reason}
              </Text>
              <Tooltip label={datum?.response?.length > 0 ? datum?.response[0]?.message : datum?.message}>
                <Text color="#4A4949" fontWeight={400} fontSize="14px">
                  {datum?.response?.length > 0 ? datum?.response[0]?.message : datum?.message}
                </Text>
              </Tooltip>
              <HStack>
                <Text color={"#3C0B71"} pt={"5px"} fontSize="13px">
                  {dayjs(datum?.createdAt).format("DD MMM YYYY")}
                </Text>
                <Text color={"#3C0B71"} pt={"5px"} fontSize="13px">
                  {datum?.userType}
                </Text>
              </HStack>
            </Box>
          </Flex>
          <Box display={"flex"} alignItems={"center"}>
            <ResponseModal
              data={datum}
            />
            {datum?.status === "open" ? (
              <CustomModal
                icon={<MdAdd size="24px" color={"#154141"} />}
                header={`Resolve Ticket`}
                iconColor={"#154141"}
              >
                <ResolveTicket
                  text="Resolve Ticket"
                  onClose={handleClose}
                  handleClick={() => handleCloseTicket(datum?._id)}
                  loading={ResolveLoading}
                />
              </CustomModal>
            ) : (
              <CustomModal
                icon={<FaCheckDouble size="20px" color={"#154141"} />}
                header={`Ticket Resolved`}
                iconColor={"#154141"}
              >
                <Text>This ticket is resolved.</Text>
              </CustomModal>
            )}
          </Box>
        </Box>
      ))}
    </>
  )
}

export default SupportCard