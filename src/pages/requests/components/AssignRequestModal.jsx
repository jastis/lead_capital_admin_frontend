import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import { BiPlus } from "react-icons/bi";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { asignRequestToPartner } from "../service";

export const AssignRequestModal = ({ partners, requestId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [assignedPartner, setAssignedPartner] = useState({});
  const queryClient = useQueryClient();

  const { mutate: assignRequestMutation, isLoading } = useMutation({
    mutationFn: asignRequestToPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests", "partners"] });
      onClose();
    },
  });

  console.log("assignedPartner", assignedPartner);

  const handleAssign = () => {
    const payload = {
      requestId,
      assignedTo: assignedPartner?._id,
      phoneNumber: assignedPartner.phone,
    };
    assignRequestMutation(payload);
  };

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
          <Text>Assign</Text>
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
          <ModalHeader>Assign Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Select
                placeholder="Select Partner"
                onChange={(e) => setAssignedPartner(JSON.parse(e.target.value))}
              >
                {partners?.map((partner) => (
                  <option key={partner?._id} value={JSON.stringify(partner)}>
                    {partner?.businessName}
                  </option>
                ))}
              </Select>

              <Button
                bg={_COLORS.brand}
                color="#fff"
                _hover={{ background: `${_COLORS.brand}50` }}
                px="50px"
                fontSize={".86em"}
                alignSelf={"flex-end"}
                isLoading={isLoading}
                onClick={handleAssign}
              >
                Assign
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
