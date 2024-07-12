import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomBtn } from "./CustomBtn";

const ResolveTicket = ({ text, onClose,handleClick, loading }) => {
 
  return (
    <Box>
      <Text align="center" fontSize="16px" color="grey.200" fontWeight={"bold"}>
        Are you sure you want to {text}?
      </Text>
      <Flex direction="column" gap="20px" mt="50px">
        <CustomBtn 
        text={text} 
        handleClick={handleClick} 
        loading={loading} 
        />
        <CustomBtn
          text="No, Cancel"
          bg="#fff"
          color="#FF7070"
          border="1px solid #FF7070"
          handleClick={onClose}
        />
      </Flex>
    </Box>
  );
}

export default ResolveTicket;
