import React from "react";

import { Flex } from "@chakra-ui/react";
import { NumberInput, Input } from "components/Fields";

import { CommonFields } from "./../index";

export const NumberInputFields: React.FC = () => {
  return (
    <>
      <CommonFields />
      <Input
        style={{ width: "100%" }}
        type="text"
        label="Unité de mesure"
        name="units"
        placeholder="cm,km, années ..."
        helpText="Cette information s'affichera à droite du champ."
      />
      <Flex justifyContent="space-between">
        <NumberInput
          style={{ width: "45%" }}
          label="Nb de charactères min"
          id="min_length"
          name="min_length"
        />
        <NumberInput
          style={{ width: "45%" }}
          label="Nb de charactères max"
          id="max_length"
          name="max_length"
          defaultValue="20"
        />
      </Flex>
    </>
  );
};
