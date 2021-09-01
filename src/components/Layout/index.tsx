import { Box } from "@chakra-ui/react";
import { DashboardMenu } from "components/Menu/DashboardMenu";
import React from "react";
import { useLocation } from "react-router-dom";

import MainMenu from "../MainMenu";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const renderMenu = () => {
    const isSurveyPages = pathname.search("/survey") !== -1;
    if (isSurveyPages) return;
    switch (pathname) {
      case "/dashboard":
        return <DashboardMenu />;

      default:
        return <MainMenu />;
    }
  };
  return (
    <Box textAlign="center" fontSize="xl">
      {renderMenu()}
      {children}
    </Box>
  );
};
