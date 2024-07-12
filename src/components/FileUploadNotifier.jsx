import { createStandaloneToast, Flex, Progress, Text } from "@chakra-ui/react";
import { AiFillInfoCircle } from "react-icons/ai";

const { toast } = createStandaloneToast();

export const fileUploadNotifier = (toastRef) => {
  return toast({
    duration: null,
    isClosable: false,
    position: "top",
    render: (id) => {
      toastRef.current = id;
      return (
        <Flex
          bg="#6C4097"
          p={4}
          borderRadius="md"
          gridGap={3}
          alignItems="center"
        >
          <AiFillInfoCircle color="white" />
          <Flex direction="column" flexGrow={1}>
            <Text color="white" fontWeight="bold" mb={2}>
              Importing Data
            </Text>
            <Progress
              size="xs"
              sx={{
                "&": {
                  background: "white",
                  "& > *": {
                    background: "#6C4097",
                  },
                },
              }}
              isIndeterminate
            />
          </Flex>
        </Flex>
      );
    },
  });
};
