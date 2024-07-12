import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import {
  BiChevronDown,
  BiChevronRight,
  BiLineChart,
  BiSupport,
  BiUser,
} from "react-icons/bi";
import { PiVan } from "react-icons/pi";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { GlobalStateContext } from "../GlobalStateContext/GlobalState";
import { _COLORS } from "../constant";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { PiHandshake } from "react-icons/pi";

import { HiOutlineDocumentText } from "react-icons/hi2";
import { TbLayoutDashboard } from "react-icons/tb";
import { APP_CONSTANTS } from "../constants/app";
import { CiCreditCard1 } from "react-icons/ci";
function Sidebar({ ...props }) {
  const [activeSubPage, setActiveSubPage] = useState(null);
  const [mobile] = useMediaQuery("(max-width:480px)");

  const { state, setState } = useContext(GlobalStateContext);

  return (
    <Flex
      h="100vh"
      w="20%"
      display={state?.toggle === false ? "none" : "flex"}
      {...props}
      position={"relative"}
    >
      <Flex
        position={"fixed"}
        w={state?.toggle ? "80%" : !state?.toggle && mobile ? "80%" : "16%"}
        display={state?.toggle === false ? "none" : "flex"}
        h="100vh"
        flexDir={"column"}
        bg="#fff"
        zIndex={"999"}
        justifyContent="space-between"
        py="20px"
      >
        <Image
          paddingLeft="20px"
          // pt="10px"
          w="200px"
          src={logo}
          alt="Lead Capital"
        />
        <Flex flex=".9" flexDir={"column"} gap="30px">
          {NAVS.map(({ to, title, icon: Icon, subPages }, idx) => (
            <Flex>
              {!subPages ? (
                <NavLink
                  key={idx}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                          background: "#3C0B71",
                          width: "100%",
                          marginRight: "20px",
                          borderTopRightRadius: "5px",
                          borderBottomRightRadius: "5px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                      : {
                          color: "#140005",
                          width: "100%",
                          marginRight: "20px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                  }
                  to={to}
                  {...(mobile
                    ? {
                        onClick: () =>
                          setState((prev) => ({ ...prev, toggle: false })),
                      }
                    : {})}
                >
                  <Flex
                    gap="10px"
                    alignItems={"center"}
                    fontWeight="600"
                    onClick={() => setActiveSubPage(null)}
                  >
                    <Icon fontSize={"1.3em"} />
                    <Text fontSize={".89em"}>{title}</Text>
                  </Flex>
                </NavLink>
              ) : (
                <NavLink
                  key={idx}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          color: "#fff",
                          background: "#3C0B71",
                          width: "100%",
                          marginRight: "20px",
                          borderTopRightRadius: "5px",
                          borderBottomRightRadius: "5px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                      : {
                          color: "#000",
                          width: "100%",
                          marginRight: "20px",
                          padding: "7px",
                          paddingLeft: "30px",
                        }
                  }
                  to={to}
                  {...(mobile
                    ? {
                        onClick: () =>
                          setState((prev) => ({ ...prev, toggle: false })),
                      }
                    : {})}
                >
                  <CustomSubNav
                    navTitle={title}
                    icon={Icon}
                    active={activeSubPage}
                    setActive={setActiveSubPage}
                    subPages={subPages}
                  />
                </NavLink>
              )}
            </Flex>
          ))}
        </Flex>

        <LogOutModal />
      </Flex>
    </Flex>
  );
}

export default Sidebar;

const NAVS = [
  { title: "Dashboard", to: "/", icon: TbLayoutDashboard },
  { title: "Requests", to: "/requests", icon: HiOutlineDocumentText },
  { title: "Customers", to: "/customers", icon: BiUser },
  { title: "Companies", to: "/companies", icon: HiOutlineBuildingOffice },
  { title: "Partners", to: "/partners", icon: PiHandshake },
  { title: "Trips", to: "trips", icon: PiVan },

  {
    title: "Financials",
    to: "/financials",
    icon: BiLineChart,
  },
  {
    title: "Invoices",
    to: "/invoices",
    icon: CiCreditCard1,
  },
  {
    title: "Support",
    to: "/support",
    icon: BiSupport,
  },
  {
    title: "Settings",
    to: "settings",
    icon: FiSettings,
  },

  // {
  //   title: "Accepted Requests",
  //   to: "/accepted-requests",
  //   icon: BsFileEarmarkCheckFill,
  // },
  // { title: "Transactions", to: "transactions", icon: BsFillCreditCardFill },
  // {
  //   title: "Transport Control",
  //   to: "transport-control",
  //   icon: BsDatabaseFillGear,
  //   subPages: [
  //     { title: "Driver", to: "/transport-control" },
  //     { title: "Trucks", to: "/transport-control/trucks" },
  //     { title: "Issue Report", to: "/transport-control/issue-report" },
  //   ],
  // },
];

export const CustomSubNav = ({
  icon: Icon,
  navTitle,
  subPages,
  active,
  setActive,
}) => {
  return (
    <>
      <Flex
        justifyContent={"space-between"}
        alignItems="center"
        onClick={() => setActive(navTitle)}
      >
        <Flex gap="10px" alignItems={"center"} fontWeight="600">
          {" "}
          <Icon fontSize={"1.3em"} />
          <Text fontSize={".91em"}>{navTitle}</Text>
        </Flex>
        {active === navTitle ? (
          <BiChevronDown fontSize={"1.2em"} />
        ) : (
          <BiChevronRight fontSize={"1.2em"} />
        )}
      </Flex>

      {subPages && active === navTitle && (
        <Flex
          flexDir={"column"}
          bg="#F8F2FF"
          color="#000"
          p="20px"
          margin="7px -7px -7px -30px"
          paddingLeft="50px"
          gap="20px"
        >
          {subPages?.map((nav, idx) => (
            <NavLink
              key={idx}
              style={({ isActive }) =>
                isActive
                  ? {
                      color: "#3C0B71",
                      fontWeight: "bold",
                    }
                  : {
                      color: "#000",
                    }
              }
              to={nav?.to}
            >
              <Text fontSize={".9em"}> {nav?.title}</Text>
            </NavLink>
          ))}
        </Flex>
      )}
    </>
  );
};

export const LogOutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        justifySelf={"flex-end"}
        marginRight="20px"
        padding="7px"
        paddingLeft="30px"
        flexDir={"row"}
        alignItems="center"
        cursor="pointer"
        gap="10px"
        onClick={onOpen}
      >
        <FiLogOut color={_COLORS.red} />
        <Text
          color={_COLORS.red}
          fontFamily={"Montserrat"}
          fontSize=".86em"
          fontWeight="700"
        >
          Log out
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
            <Flex flexDir={"column"} alignItems="center" py="10px">
              <Flex flexDir={"column"} gap="10px">
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  gap="10px"
                >
                  <FiLogOut color={_COLORS.red} />
                  <Text
                    color={_COLORS.red}
                    fontFamily={"Montserrat"}
                    fontWeight="700"
                  >
                    Log out
                  </Text>
                </Flex>
                <Text fontSize={".9em"}>
                  Are you sure you want to log out ?
                </Text>
              </Flex>

              <Flex
                alignItems={"center"}
                justifyContent="space-between"
                mt="20px"
                mb="10px"
                alignSelf={"stretch"}
                gap="20px"
              >
                <Button
                  w="100%"
                  onClick={onClose}
                  border={`2px solid ${_COLORS.brand}`}
                  bg="transparent"
                  _hover={{ background: "transparent" }}
                >
                  Cancel
                </Button>
                <Button
                  w="100%"
                  bg={_COLORS.brand}
                  color="#fff"
                  _hover={{ background: `${_COLORS.brand}50` }}
                  ml={3}
                  onClick={() => {
                    sessionStorage.removeItem(APP_CONSTANTS.token);

                    location.reload();
                  }}
                >
                  Confirm
                </Button>
              </Flex>
            </Flex>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
