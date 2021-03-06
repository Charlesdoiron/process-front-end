import { Box, Flex, Text } from "@chakra-ui/react";
import { InputIcon } from "components/CreateSurvey/CreateForm/InputIcon";
import IQuestion from "types/form/question";
import React from "react";

interface Props {
  onClick: () => void;
  input?: IQuestion;
  isSelected?: boolean;
  isOptionMode?: boolean;
  option?: string;
}

export const InputBox: React.FC<Props> = ({
  onClick,
  input,
  isSelected,
  isOptionMode,
  option,
}) => {
  return (
    <Box
      onClick={onClick}
      _hover={{
        cursor: "pointer",
        borderColor: "brand.blue",
      }}
      key={input?.id}
      border="1px solid"
      w="100%"
      borderRadius="5px"
      padding="5"
      textAlign="left"
      my={5}
      backgroundColor={isSelected ? "brand.blue" : "white"}
      color={isSelected ? "white" : "black"}
    >
      {isOptionMode && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="titleParaLight">{option}</Text>
        </Flex>
      )}
      {!isOptionMode && input && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text variant="titleParaLight">{input?.label}</Text>
          <Flex alignItems="center">
            <Text variant="xsMedium" color="brand.gray.200">
              {input?.internal_title}
            </Text>
            <Box>
              <InputIcon type={input.type} />
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
