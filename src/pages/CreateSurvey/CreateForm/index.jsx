import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import ToolBox from "components/CreateSurvey/ToolBox";
import Preview from "components/CreateSurvey/Preview";

import IPage from "interfaces/page";
import IInput from "interfaces/inputs";
import Drawer from "components/Drawer";
import InputForm from "components/CreateSurvey/ToolBox/InputForm";
import PageBuilder from "components/CreateSurvey/PageBuilder";

export const CreateForm: React.FC<IPage> = () => {
  const color = useColorModeValue("gray.800", "white");
  const bg = useColorModeValue("gray.100", "gray.700");
  const [selectedInput, setSelectedInput] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (id: IInput) => {
    setSelectedInput(id);
    setIsOpen(true);
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOverlayClick={() => setIsOpen(false)}
        size="md"
        content={<InputForm selectedInput={selectedInput} />}
      />
      <Box d="flex" justifyContent="space-around" w="100%" overflow="hidden">
        <Box
          bg={bg}
          color={color}
          w="50px"
          h="100vh"
          d="flex"
          justifyContent="center">
          <PageBuilder />
        </Box>
        <Box
          bg={bg}
          color={color}
          w="62%"
          h="100vh"
          d="flex"
          justifyContent="center"
          alignItems="center">
          <Preview />
        </Box>
        <Box
          w="28%"
          minW="250px"
          h="100vh"
          d="flex"
          justifyContent="center"
          alignItems="center"
          overflowY="auto">
          <ToolBox onSelect={(id) => handleSelect(id)} />
        </Box>
      </Box>
    </>
  );
};
