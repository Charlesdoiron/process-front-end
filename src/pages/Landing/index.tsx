import React from "react";
import IRoute from "types/routes/route";
import { useParams } from "react-router-dom";
// import { Text } from "@chakra-ui/react";
import { Loader } from "components/Spinner";
import { Error } from "components/Error";
import { Preview } from "components/CreateSurvey/CreateLanding/Preview";
import { client } from "api/gql-client";
import { useSurveyBySlugQuery } from "api/graphql/queries/survey.gql.generated";
import { useLandingQuery } from "api/graphql/queries/landing.gql.generated";
import { sanitizeEntity } from "api/entity-checker";

export const Landing: React.FC<IRoute> = () => {
  const { slug } = useParams<{ slug: string }>();

  // TODO: Annoying to fetch the survey just to fetch the landing... Search landing with survey slug ?
  const { data: survey, isLoading: surveyIsLoading } = useSurveyBySlugQuery(client, { slug });
  const fetchedSurvey = survey?.surveys?.data?.[0];
  const landingId = fetchedSurvey?.attributes?.landing?.data?.id ?? "";
  const surveyId = fetchedSurvey?.id ?? "";

  const { data: landing, isLoading, error } = useLandingQuery(client, { id: landingId }, { enabled: landingId !== "" });
  const author = fetchedSurvey?.attributes?.author;

  if (!fetchedSurvey && !surveyIsLoading) {
    return <Error message="Cette enquête n'existe pas." />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (!landing?.landing?.data) {
    return <></>;
  }

  return (
    <Preview
      surveyId={surveyId}
      data={sanitizeEntity(landing?.landing?.data)}
      isUserView
      author={author?.data?.attributes}
      needConsent={fetchedSurvey?.attributes?.need_consent}
    />
  );
};
