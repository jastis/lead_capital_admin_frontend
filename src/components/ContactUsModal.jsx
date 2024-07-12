import {
    Box,
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Textarea,
  } from "@chakra-ui/react";
import { useGetState } from "../GlobalStateContext/useGetState";
  import React from "react";
  import { useState } from "react";
  
   const ContactUsModal = ({ isOpen, onClose,createSupport }) => {

    const { state } = useGetState();
   
    const [formValues, setFormValues] = useState({email:state?.email});
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const handleCreateSupport = async () => {
      setLoading(true);
      const payload = { ...formValues };
      console.log(payload);
      await createSupport(payload);
      setLoading(false);
      onClose();
    };
    return (
      <>
        <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent px="20px" w={"100%"}>
            <ModalCloseButton color={"brandColor"} />
            <ModalBody py={6}>
              <Box w={"100%"} bg={"#FFFFFF"} p={"30px"}>
                <Text color={"#264653"} fontSize={"15px"} fontWeight={"semibold"} py={"10px"}>
                  Reason
                </Text>
                <Input
                  bg={"#F8F2FF"}
                  size={"lg"}
                  name="name"
                  value={formValues?.name}
            onChange={handleChange}
                />
                <Text color={"#264653"} fontSize={"15px"} fontWeight={"semibold"} py={"10px"} pt={"15px"}>
                  Message
                </Text>
                <Textarea
                  resize={"none"}
                  bg={"#F8F2FF"}
                  h={"150px"}
                  name="description"
                  value={formValues?.description}
            onChange={handleChange}
                />
                <Flex justify={"center"}>
                  <Button
                    bg={"#3C0B71"}
                    color={"#FFFFFF"}
                    fontSize={"14px"}
                    fontWeight={"light"}
                    alignContent="center"
                    mt={"40px"}
                    px={"60px"}
                    _hover={{ bg: "brandColor" }}
                    w={["100%", "100%", "60%"]}
                    onClick={()=>handleCreateSupport()}
                    loading={loading}
                  >
                    Proceed
                  </Button>
                </Flex>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ContactUsModal