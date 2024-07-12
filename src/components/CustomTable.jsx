/* eslint-disable react/prop-types */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td as ChakraTd,
  TableContainer,
  Box,
  Text,
  Flex,
  useDisclosure,
  HStack,
  Stack,
  Input,
} from "@chakra-ui/react";
import { _COLORS } from "../constant";
import { BsStopFill } from "react-icons/bs";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { LiaTimesSolid } from "react-icons/lia";
import { useEffect, useState } from "react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { PiArrowRightFill } from "react-icons/pi";

function CustomTable({ head = [], actionType = 0, endpoint = [], children }) {
  return (
    <Box bg="#fff">
      <TableContainer>
        <Table variant="simple" bg="#fff" size="sm">
          <Thead>
            <Tr>
              {head?.map((data) => (
                <Th
                  p="15px"
                  color={_COLORS.black}
                  fontWeight={"700"}
                  key={data}
                >
                  {data}
                </Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomTable;

export const DATA_ROWS = {
  LIMIT: 20,
};
const limit = DATA_ROWS.LIMIT;

export const Pagination = ({ updateTable, length = 0, total = 0 }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isEmpty, setEmpty] = useState(false);
  const [maxPageLimit] = useState(5);

  useEffect(() => {
    if (length < 1) {
      setEmpty(({}, () => true));
    } else {
      setEmpty(({}, () => false));
    }
  }, [length]);

  const NUMBER_OF_PAGES = Math.ceil(Number(total) / DATA_ROWS.LIMIT);

  const getPageNumbers = () => {
    let currentPage = page;
    let p = NUMBER_OF_PAGES >= maxPageLimit ? maxPageLimit : NUMBER_OF_PAGES;
    let start = Math.floor(currentPage / p) * p;
    return new Array(p).fill().map((_, idx) => start + idx + 1); //get range 1-5, 6-10
  };
  console.log(page, "page");
  const goBack = () => {
    if (page === 0) return;
    setLoading(true);

    setPage((initial) => {
      console.log("back", initial - 1);
      updateTable(initial - 1);
      setLoading(false);
      return initial - 1;
    });
    // .then(() => setLoading(false));
  };

  const isLastPage = total && limit * (page + 1) >= total;

  const goNext = () => {
    // if (!length) {
    //   return;
    // }

    // if (length < limit || isLastPage) {
    //   return;
    // }
    // setLoading(true);

    setPage((initial) => {
      console.log("next", initial + 1);

      updateTable(initial + 1);
      // setLoading(false);
      return initial + 1;
    });
    // setLoading(true);
    // updateTable(page + 1);
    // then(() =>
    // setLoading(false);
    // );
  };

  const ARROW_STYLE = {
    borderRadius: "10px",
    bg: "transparent",
    _hover: { background: "transparent" },
    _focus: { boxShadow: "none" },
    p: "5px",
    cursor: "pointer",
  };

  const goToPageX = (page) => {
    setLoading(true);
    setPage(page);
    updateTable(page)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        console.log("Encountered error");
      });
  };

  return (
    <Box p="10px 0px" my="20px">
      <HStack spacing="2px" justifyContent="flex-end">
        <Text fontSize={".9em"}>
          Showing 1 - {limit}
          {/* of {NUMBER_OF_PAGES} */}
        </Text>
        <Button
          {...ARROW_STYLE}
          onClick={goBack}
          // disabled={page === 0}
        >
          <BiChevronLeft fontSize={"1.5em"} />
        </Button>
        <Stack direction="row">
          {getPageNumbers()?.map((pageNumber) => {
            let t = pageNumber - 1;
            return pageNumber <= NUMBER_OF_PAGES ? (
              <Text
                border="1px solid #8080806b"
                borderRadius={"5px"}
                fontSize=".8em"
                paddingX="7px"
                cursor={"pointer"}
                onClick={() => (page === t ? null : goToPageX(t))}
                bg={page === t ? _COLORS.brand : "transparent"}
                color={page === t ? "#fff" : "#000"}
              >
                {pageNumber}
              </Text>
            ) : null;
          })}
        </Stack>
        <Button
          {...ARROW_STYLE}
          onClick={goNext}
          // disabled={length < limit || isLastPage}
        >
          <BiChevronRight fontSize={"1.5em"} />
        </Button>
      </HStack>
    </Box>
  );
};

export const ActionType = ({
  type,
  endpoint = [],
  handleDelete,
  deleteLoading,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  switch (type) {
    case 0:
      return (
        <Flex alignItems={"center"} gap="10px">
          <Text
            fontWeight={"500"}
            fontSize=".86em"
            color={_COLORS.green}
            cursor="pointer"
            border={`1px solid ${_COLORS.green}`}
            p="5px 10px"
            borderRadius={"4px"}
          >
            Accept{" "}
          </Text>
          {/* <Divider h="30px" orientation="vertical" /> */}

          <>
            <Text
              fontWeight={"500"}
              fontSize=".86em"
              color={_COLORS.red}
              onClick={onOpen}
              cursor="pointer"
              border={`1px solid ${_COLORS.red}`}
              p="5px 10px"
              borderRadius={"4px"}
            >
              Decline
            </Text>
            <AlertDialog
              motionPreset="slideInBottom"
              onClose={onClose}
              isOpen={isOpen}
              isCentered
              size={"sm"}
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogBody textAlign={"center"}>
                  <Text fontSize={".9em"}>
                    Are you sure you want to decline this request?
                  </Text>
                  <Flex
                    alignItems={"center"}
                    justifyContent="space-between"
                    mt="40px"
                    mb="10px"
                  >
                    <Button
                      onClick={onClose}
                      border={`2px solid ${_COLORS.brand}`}
                      bg="transparent"
                      _hover={{ background: "transparent" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      bg={_COLORS.brand}
                      color="#fff"
                      _hover={{ background: `${_COLORS.brand}50` }}
                      ml={3}
                    >
                      Confirm
                    </Button>
                  </Flex>
                </AlertDialogBody>
              </AlertDialogContent>
            </AlertDialog>
          </>
        </Flex>
      );
    case 1:
      return (
        <>
          <Flex
            onClick={onOpen}
            cursor="pointer"
            alignItems={"center"}
            gap="6px"
          >
            <BsStopFill fontSize={"1.5em"} color={_COLORS.red} />
            <Text fontWeight={"500"} fontSize=".86em" color={_COLORS.red}>
              End Trip{" "}
            </Text>
          </Flex>

          <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"sm"}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogBody textAlign={"center"}>
                <Text fontSize={".9em"}>
                  Are you sure you want to end this trip?
                </Text>

                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  mt="40px"
                  mb="10px"
                >
                  <Button
                    onClick={onClose}
                    border={`2px solid ${_COLORS.brand}`}
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={_COLORS.brand}
                    color="#fff"
                    _hover={{ background: `${_COLORS.brand}50` }}
                    ml={3}
                  >
                    Confirm
                  </Button>
                </Flex>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );

    case 2:
      return (
        <>
          <Flex
            onClick={onOpen}
            cursor="pointer"
            alignItems={"center"}
            gap="6px"
          >
            <PiArrowRightFill fontSize={"1.5em"} color={_COLORS.green} />
            <Text color={_COLORS.green} fontSize=".86em" fontWeight={"500"}>
              Start Trip{" "}
            </Text>
          </Flex>

          <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"sm"}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogBody textAlign={"center"}>
                <Text fontSize={".9em"}>
                  Are you sure you want to start this trip?
                </Text>
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  mt="40px"
                  mb="10px"
                >
                  <Button
                    onClick={onClose}
                    border={`2px solid ${_COLORS.brand}`}
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={_COLORS.brand}
                    color="#fff"
                    _hover={{ background: `${_COLORS.brand}50` }}
                    ml={3}
                  >
                    Confirm
                  </Button>
                </Flex>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    case 3:
      return (
        <>
          <Flex
            onClick={onOpen}
            cursor="pointer"
            alignItems={"center"}
            gap="6px"
          >
            {/* <PiArrowRightFill fontSize={"1.5em"} color={_COLORS.green} /> */}
            <Text
              color={_COLORS.brand}
              fontSize=".86em"
              fontWeight={"bold"}
              fontFamily="Montserrat"
            >
              Request payout
            </Text>
          </Flex>

          <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"sm"}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader
                fontSize="lg"
                fontWeight="bold"
                fontFamily={"Montserrat"}
              >
                <Flex alignItems={"center"} justifyContent="space-between">
                  <Text>Request payout</Text>
                  <LiaTimesSolid onClick={onClose} cursor="pointer" />
                </Flex>
              </AlertDialogHeader>

              <AlertDialogBody textAlign={"center"}>
                <Flex
                  flexDir={"column"}
                  alignItems="flex-start"
                  bg={_COLORS.brand}
                  borderRadius="5px"
                  p="15px"
                  gap="10px"
                >
                  <Text
                    color="#fff"
                    fontFamily={"Montserrat"}
                    fontWeight="bold"
                  >
                    Amount in Wallet
                  </Text>
                  <Flex
                    flexDir={"row"}
                    alignItems="center"
                    fontFamily={"Montserrat"}
                    gap="10px"
                  >
                    <Flex
                      bg="#fff"
                      borderRadius={"50%"}
                      w="20px"
                      h="20px"
                      justifyContent={"center"}
                      alignItems="center"
                    >
                      ₦
                    </Flex>
                    <Text
                      color="#fff"
                      fontFamily={"Montserrat"}
                      fontWeight="bold"
                    >
                      409,000.00
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDir={"column"} my="20px" gap="20px">
                  <Input
                    placeholder="Enter Amount"
                    _focusVisible={{ boxShadow: "none" }}
                  />
                  <Button
                    color={"#fff"}
                    _hover={{ background: `${_COLORS.brand}50` }}
                    bg={_COLORS.brand}
                  >
                    Request Payout
                  </Button>
                </Flex>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );

    case 4:
      return (
        <>
          <Text onClick={onOpen} cursor="pointer" {...props}>
            Delete
          </Text>
          <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"sm"}
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogBody textAlign={"center"}>
                <Text fontSize={".9em"}>
                  Are you sure you want to delete this request?
                </Text>
                <Flex
                  alignItems={"center"}
                  justifyContent="space-between"
                  mt="40px"
                  mb="10px"
                >
                  <Button
                    onClick={onClose}
                    border={`2px solid ${_COLORS.brand}`}
                    bg="transparent"
                    _hover={{ background: "transparent" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={_COLORS.brand}
                    color="#fff"
                    _hover={{ background: `${_COLORS.brand}50` }}
                    ml={3}
                    onClick={handleDelete}
                    deleteLoading={deleteLoading}
                  >
                    Confirm
                  </Button>
                </Flex>
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );

    default:
      return "0000";
  }
};

const style = {
  whiteSpace: "break-spaces",
  maxW: "120px",
  lineHeight: "1.8",
  fontWeight: "400",
};

export const Td = ({ children }) => {
  return (
    <ChakraTd py="10px" fontSize={".8em"}>
      {children}
    </ChakraTd>
  );
};

// check if key value exist from data and check if key value (from data) and filterBy value is the same
export const filterFunc = (data, filterBy) => {
  return filterBy?.key &&
    String(filterBy?.key?.split(".")?.reduce((a, b) => a?.[b], data))
    ? String(filterBy?.key?.split(".")?.reduce((a, b) => a?.[b], data)) ===
        filterBy?.value
    : filterBy?.search
    ? String(filterBy?.searchFilter?.split(".")?.reduce((a, b) => a?.[b], data))
        ?.toLowerCase()
        ?.includes(String(filterBy?.search)?.toLowerCase())
    : data;
};
CustomTable.Td = Td;

CustomTable.ActionType = ActionType;

CustomTable.style = style;

CustomTable.Pagination = Pagination;
CustomTable.filterFunc = filterFunc;
