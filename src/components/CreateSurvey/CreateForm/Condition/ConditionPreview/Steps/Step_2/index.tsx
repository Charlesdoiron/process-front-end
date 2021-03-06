import React from "react";

import { Button, Flex } from "@chakra-ui/react";
import { operators, operatorsForMultiple } from "constants/operators";
import ICondition from "types/form/condition";
import { checkIfMultiple } from "utils/formBuilder/input";

interface Props {
  selectedCondition: ICondition;
  updateStep: (d: any) => void;
}

export const Step_2: React.FC<Props> = ({ selectedCondition, updateStep }) => {
  const authorizedOperators = () => {
    if (checkIfMultiple(selectedCondition)) {
      return operatorsForMultiple;
    } else return operators;
  };

  return (
    <Flex flexWrap="wrap" w="100%" justifyContent="center" alignItems="center">
      {authorizedOperators().map(({ id, name }) => {
        const isSelected = id === selectedCondition.operator;

        return (
          <Button
            onClick={() => updateStep({ operator: id })}
            key={id}
            variant="box"
            minW="200px"
            isSelected={isSelected}
            _hover={{ borderColor: "brand.blue", color: "brand.blue" }}
          >
            {name}
          </Button>
        );
      })}
    </Flex>
  );
};
