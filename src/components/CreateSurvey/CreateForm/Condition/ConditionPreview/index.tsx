import React from "react";

import { Box, Button, ButtonGroup, Container } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Step_1 } from "components/CreateSurvey/CreateForm/Condition/ConditionPreview/Steps/Step_1";
import { Step_2 } from "./Steps/Step_2";
import { Step_3 } from "./Steps/Step_3";
import { StepCounter } from "./Steps/StepCounter";
import { checkStepValidation } from "./Steps/utils";
import ICondition from "types/form/condition";
import { Loader } from "components/Spinner";
import { actions, selectors } from "redux/slices/scientistData";

interface Props {
  selectedCondition: ICondition;
}

export const ConditionPreview: React.FC<Props> = ({ selectedCondition }) => {
  const dispatch = useAppDispatch();
  const step = useAppSelector(selectors.conditions.getStep);

  const handleUpdate = (changes: Record<string, any>) => {
    dispatch(
      actions.updateCondition({
        id: selectedCondition.id,
        changes: {
          ...changes,
        },
      })
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step_1
            selectedCondition={selectedCondition}
            updateStep={(changes) => handleUpdate(changes)}
          />
        );
        break;
      case 2:
        return (
          <Step_2
            selectedCondition={selectedCondition}
            updateStep={(changes) => handleUpdate(changes)}
          />
        );
        break;
      case 3:
        return (
          <Step_3
            selectedCondition={selectedCondition}
            updateStep={(changes) => handleUpdate(changes)}
          />
        );
        break;

      default:
        break;
    }
  };

  if (selectedCondition === undefined) {
    return <Loader />;
  }

  const handleNavigation = (to: number) => {
    dispatch(actions.setStepCondition(to));
  };

  const saveCondition = () => {
    dispatch(actions.saveCondition());
  };

  return (
    <Container w="90%" maxW="unset" h="100%" pos="relative">
      <StepCounter
        step={step}
        isDisabled={checkStepValidation()}
        navigateTo={(to) => handleNavigation(to)}
      />
      <Box h="80%" pt={10} w="100%" d="flex" justifyContent="center">
        {renderStep()}
      </Box>

      <Box pos="relative" bottom="110px" left="0" right="0" w="100%">
        <ButtonGroup justifyContent="space-between" w="70%">
          <Button
            visibility={step !== 1 ? "visible" : "hidden"}
            variant="link"
            onClick={() => handleNavigation(step - 1)}
          >
            Retour
          </Button>

          {step === 3 ? (
            <Button
              variant="rounded"
              backgroundColor="green.400"
              isDisabled={checkStepValidation()}
              onClick={saveCondition}
            >
              Enregistrer la condition
            </Button>
          ) : (
            <Button
              variant="roundedBlue"
              isDisabled={checkStepValidation()}
              onClick={() => handleNavigation(step + 1)}
            >
              Suivant
            </Button>
          )}
        </ButtonGroup>
      </Box>
    </Container>
  );
};
