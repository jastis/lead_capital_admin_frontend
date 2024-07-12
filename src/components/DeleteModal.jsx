import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomBtn } from "./CustomBtn";

function DeleteModal({ text, handleClick, loading, onClose }) {
 
  return (
    <Box>
      <Text align="center" fontSize="16px" color="red.500" fontWeight={"bold"}>
        Are you sure you want to delete this {text}?
      </Text>
      <Flex direction="column" gap="20px" mt="50px">
        <CustomBtn text={text} handleClick={handleClick} loading={loading} />
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

export default DeleteModal;
