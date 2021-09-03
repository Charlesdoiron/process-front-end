import { Grid } from "@chakra-ui/react";
import React from "react";
import { Loader } from "components/Spinner";
import { NavLink } from "react-router-dom";
import { ISurveysRes } from "types/survey";
import { Card } from "./Card";

const t = {
  noData: "No surveys here ....",
};

interface Props {
  surveys: ISurveysRes | undefined;
  isLoading: boolean;
}

export const SurveyGrid: React.FC<Props> = ({ surveys, isLoading }) => {
  if (isLoading) {
    return <Loader />;
  }

  if (surveys === undefined) {
    return <p>{t.noData}</p>;
  }

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={10} pt="80px" px="10%">
      {surveys.surveys.map((survey) => {
        return (
          <NavLink to={`/survey/${survey.id}`}>
            <Card data={survey} />
          </NavLink>
        );
      })}
    </Grid>
  );
};
