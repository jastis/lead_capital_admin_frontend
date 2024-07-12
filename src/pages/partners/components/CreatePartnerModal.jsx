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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import { BiPlus } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import { createPartner } from "../service";
import { useState } from "react";

export const CreatePartnerModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    businessName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: createNewPartner, isLoading } = useMutation({
    mutationFn: createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      onClose();
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formValues };
    createNewPartner(payload);
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
          <Text>Create Partner</Text>
        </Flex>
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Partner</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir={"column"} gap="20px" pb="10px">
              <Input
                name="name"
                placeholder="Full Name"
                fontSize=".86em"
                value={formValues.name}
                onChange={handleChange}
              />
              <Input
                name="businessName"
                placeholder=" Business Name"
                fontSize=".86em"
                value={formValues.businessName}
                onChange={handleChange}
              />
              <Input
                name="phone"
                placeholder="Phone Number"
                fontSize=".86em"
                value={formValues.phone}
                onChange={handleChange}
              />

              <Input
                name="email"
                placeholder="Email Address"
                fontSize=".86em"
                value={formValues.email}
                onChange={handleChange}
              />
              <Input
                name="address"
                placeholder=" Address"
                fontSize=".86em"
                value={formValues.address}
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
                Add Partner
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
