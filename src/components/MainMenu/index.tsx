import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { ColorModeSwitcher } from "ColorModeSwitcher";

import routes from "routes";

const MainMenu: React.FC = () => {
  return (
    <Flex>
      <Box
        p={5}
        d="flex"
        justifyContent="space-around"
        alignItems="center"
        w="80%"
        m="0 auto"
        fontSize="13"
        h="fit-content">
        {routes.map(({ name, path }) => {
          return (
            <NavLink
              key={name}
              to={path}
              exact
              activeStyle={{
                fontStyle: "italic",
              }}>
              {name}
            </NavLink>
          );
        })}
      </Box>
      <Box>
        <ColorModeSwitcher p="30px 30px 10px 0" />
      </Box>
    </Flex>
  );
};

export default MainMenu;