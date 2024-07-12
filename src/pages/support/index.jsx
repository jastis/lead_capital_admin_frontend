import {
  Box,
  useDisclosure,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import { CustomBtn } from "../../components/CustomBtn";
import SupportCard from "../../components/SupportCard";
import ContactUsModal from "../../components/ContactUsModal";
import { useQuery } from "react-query";
import { getSupport, createCloseSupport,createSupport } from "./service/support";
import FullPageLoader from "../../components/FullPageLoader";
import { useMutation, useQueryClient } from "react-query";

const Support = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { data: supportData = [], isLoading } = useQuery({
    queryKey: ["support"],
    queryFn: getSupport,
  });

  const queryClient = useQueryClient();
  const { mutate: CloseTickets, isLoading: isResolveLoading } = useMutation({
    mutationFn: createCloseSupport,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support"] });
      onClose();
    },
  });
  const handleCloseTicket = (ticketId) => {
    const payload = { ticketId, status: 'closed' }
    CloseTickets(payload);
  };

  console.log(supportData);
  return isLoading ? (
    <FullPageLoader />
  ) : (
    <>
      <Box>
        <Flex justifyContent={"space-between"}>
          <Heading
            as="h2"
            fontSize={["22px", "22px", "30px"]}
            mb={["20px", "20px", "0px"]}
          >
            Support Messages
          </Heading>
          <CustomBtn
            text="Send Broadcast"
            handleClick={onOpen}
            _hover={{ background: _COLORS.green }}
            bg={_COLORS.green}
            color="#fff" />
        </Flex>
        <SupportCard
          data={supportData}
          handleClose={onClose}
          handleCloseTicket={handleCloseTicket}
          ResolveLoading={isResolveLoading}
        />
        <ContactUsModal
          {...{ isOpen, onClose }}
        createSupport={createSupport}
        />
      </Box>
    </>
  );
};

export default Support;
