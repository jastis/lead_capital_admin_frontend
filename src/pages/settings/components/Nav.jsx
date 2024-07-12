import { Box } from "@chakra-ui/react";
import { _COLORS } from "../../../constant";
import { useState } from "react";
import Profile from "./tabs/Profile";
// import Notifications from "./tabs/Notifications";

import { Tabs, TabList, Tab } from "@chakra-ui/react";

function Nav() {
  const [tabToShow, setTabToShow] = useState("profile");

  const activeColor = {
    bgColor: _COLORS.primaryBtn,
    color: "#fff",
    borderRadius: "4px",
  };
  return (
    <Box width={"100%"}>
      <Tabs
        variant="unstyled"
        width={"100%"}
        mb="50px"
        mt="30px"
        justifyContent="flex-start"
        alignItems="center"
        color={_COLORS.grey}
      >
        <TabList gap={["5px", 100]}>
          <Tab
            fontWeight="500"
            cursor="pointer"
            padding="5px 10px"
            _hover={{ bgColor: "#F0F0F0", color: _COLORS.primaryBtn }}
            _selected={{
              ...(tabToShow === "profile" ? activeColor : {}),
            }}
            onClick={() => setTabToShow("profile")}
            {...(tabToShow === "profile" ? activeColor : {})}
          >
            Profile
          </Tab>
          {/* <Tab
            fontWeight="500"
            cursor="pointer"
            padding="5px 10px"
            _hover={{ bgColor: "#F0F0F0", color: _COLORS.primaryBtn }}
            _selected={{
              ...(tabToShow === "notification" ? activeColor : {}),
            }}
            onClick={() => setTabToShow("notification")}
            {...(tabToShow === "notification" ? activeColor : {})}
          >
            Notification
          </Tab> */}
        </TabList>
      </Tabs>

      <Box>
        {tabToShow === "profile" ? (
          <Profile />
        ) : (
          <Profile />
        )}
      </Box>
    </Box>
  );
}

export default Nav;
