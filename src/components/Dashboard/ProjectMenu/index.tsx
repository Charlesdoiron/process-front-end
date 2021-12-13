import React, { useMemo, useState } from "react";

import { Box, Button, Container, Flex, Tooltip, Text } from "@chakra-ui/react";
import { ReactComponent as Close } from "./assets/close.svg";
import { ReactComponent as Trash } from "./assets/trash.svg";

import { API_URL_ROOT } from "constants/api";
import { Filters } from "../Filters";
import {
  useDeleteSurvey,
  useGetSurveyStats,
  useUpdateSurvey,
} from "call/actions/survey";
import { useNavigator } from "components/CreateSurvey/hooks";
import { RemovingConfirmation } from "components/CreateSurvey/CreateForm/Condition/ToolBox/PageForm/Status";
import { Chart } from "../Chart";
import { renderStatus } from "utils/application/renderStatus";
import { Loader } from "components/Spinner";
import { NavLink } from "react-router-dom";
import ISurvey, { SURVEY_STATUS } from "types/survey";

// ---- STATICS

const filters = [
  { label: "24 h", id: "day" },
  { label: "7 jours", id: "week" },
  { label: "1 mois", id: "month" },
  { label: "6 mois", id: "semester" },
  { label: "1 an", id: "year" },
  { label: "Max", id: "all" },
];

// ---- TYPES

interface Props {
  menuIsOpen: boolean;
  selectedSurvey?: ISurvey | Record<string, any>;
  onClose: () => void;
}

// ---- COMPONENT

export const ProjectMenu: React.FC<Props> = ({
  menuIsOpen,
  selectedSurvey,
  onClose,
}) => {
  if (!menuIsOpen || !selectedSurvey) return <></>;

  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const { mutateAsync: deleteSurvey } = useDeleteSurvey();
  const { mutateAsync: udpateSurvey } = useUpdateSurvey();

  const {
    title,
    description,
    date,
    // stepsLeft,
    statistics,
    exportURL,
    isLoadingStats,
  } = useSurveyData(selectedSurvey.id);

  const { gotToLanding, goToForm, goToConsent, goToSurveyMetadatas } =
    useNavigator(selectedSurvey);

  const [statFilter, setStatFilter] = useState(filters[0].id);

  // We should be doing that much better :/
  if (isLoadingStats) {
    return (
      <Container
        variant="rightPart"
        w="50%"
        h="93vh"
        overflow="scroll"
        pos="sticky"
        top="65px"
      >
        <Loader />
      </Container>
    );
  }

  const selectedStats = statistics[statFilter];

  if (!menuIsOpen || !selectedSurvey) {
    return <></>;
  }

  const handleTrash = () => {
    setIsRemoving(true);
  };

  const handleDelete = () => {
    deleteSurvey(selectedSurvey.id);
    onClose();
  };

  const handleArchive = () => {
    udpateSurvey({
      id: selectedSurvey.id,
      data: {
        status: "archived",
      },
    });
  };

  const handlePublish = () => {
    udpateSurvey({
      id: selectedSurvey.id,
      data: {
        status: "pending",
      },
    });
  };

  const isDraft = selectedSurvey.status === SURVEY_STATUS.Draft;
  const hadLanding = selectedSurvey.landing !== null;
  const hadQuestion = selectedSurvey;
  console.log(hadQuestion);

  return (
    // TODO: Use a % + max-width to limit growth on big screens
    <Container
      variant="rightPart"
      w="50%"
      h="93vh"
      overflow="scroll"
      pos="sticky"
      top="65px"
    >
      {isRemoving ? (
        <RemovingConfirmation
          confirm={handleDelete}
          close={() => setIsRemoving(false)}
          content={`Voulez-vous vraiment supprimer l'enquête "${selectedSurvey.title}" ?`}
        />
      ) : (
        <Box>
          <Box p={1} d="flex" w="100%" justifyContent="space-between">
            <Tooltip label="Fermer">
              <Button onClick={onClose} variant="link">
                <Close />
              </Button>
            </Tooltip>
            <Box>
              <Tooltip label="Supprimer l'enquête">
                <Button onClick={handleTrash} variant="link">
                  <Trash />
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <Box p={5} textAlign="left">
            {/* {stepsLeft > 0 && (
              <Text variant="xs" textAlign="left" color="red">
                Il reste {stepsLeft} étapes à finaliser.
              </Text>
            )} */}
            <Tooltip label={"Voir la page d'accueil"} placement="top-start">
              <NavLink to={`/survey/${selectedSurvey.id}`}>
                <Text variant="titleParaLight" mt={4} textAlign="left">
                  {title}
                </Text>

                <Text variant="smallTitle" textAlign="left">
                  {description}
                </Text>

                <Text
                  variant="xs"
                  mb={5}
                  textAlign="left"
                  color="brand.gray.200"
                >
                  Enquête mise en ligne le {date.toLocaleDateString()}.
                </Text>
              </NavLink>
            </Tooltip>
            <Flex justifyContent="space-between" alignItems="center">
              {isDraft ? (
                <Button
                  disabled={!hadLanding}
                  variant="roundedBlue"
                  onClick={handlePublish}
                >
                  Publier
                </Button>
              ) : (
                <Text variant="xs">
                  Etat : {renderStatus(selectedSurvey.status)}
                </Text>
              )}
              <Tooltip label={"Exporter les données"} placement="top-start">
                <a href={exportURL} download>
                  <Button variant="roundedTransparent" size="xs" p={2}>
                    CSV ⇣
                  </Button>
                </a>
              </Tooltip>
            </Flex>
          </Box>
          {!hadLanding && (
            <Box pl={5} d="flex" alignContent="flex-start">
              <Text variant="current">
                ⚠️ L'enquête n'a pas de page d'accueil
              </Text>
            </Box>
          )}

          <Box mt={4}>
            <Flex>
              <ActionButton
                top
                right
                label={` ${
                  hadLanding ? "Modifier" : "Créer"
                } la page d'accueil`}
                onClick={gotToLanding}
              />
              <ActionButton
                top
                right
                disabled={!isDraft && process.env.NODE_ENV !== "development"}
                label={"Modifier le questionnaire"}
                onClick={goToForm}
              />
              <ActionButton
                top
                label={"Modifier le consentement"}
                onClick={goToConsent}
              />
              <ActionButton
                top
                left
                label={"Modifier les données de l'enquête"}
                onClick={goToSurveyMetadatas}
              />
            </Flex>
            <Flex>
              <ActionButton
                top
                right
                bottom
                label={"Dupliquer"}
                onClick={nyi}
              />
              <ActionButton
                top
                right
                bottom
                label={"Archiver"}
                onClick={handleArchive}
              />
              <ActionButton
                top
                bottom
                label={"Archiver & Dupliquer"}
                onClick={handleArchive}
              />
            </Flex>
          </Box>

          <Box mt={10} mb={20}>
            <Text variant="baseline" textAlign="center" mb={8}>
              Statistiques
            </Text>

            <Filters
              filters={filters}
              handleClick={setStatFilter}
              currentFilter={statFilter}
              center
            />

            <Flex mt={5} ml={50} mr={50} justifyContent="space-around">
              <BigNumber value={selectedStats.consented} label={"consentis"} />
              <BigNumber value={selectedStats.completed} label={"terminés"} />
            </Flex>

            <Flex
              mt={55}
              ml={50}
              mr={50}
              flexDirection="column"
              alignItems="flex-start"
            >
              <div>Progression de la complétion</div>
              <Chart />
            </Flex>
          </Box>
        </Box>
      )}
    </Container>
  );
};

// ---- HOOKS

function useSurveyData(surveyId: string) {
  const { data, isLoading } = useGetSurveyStats(surveyId);
  const exportURL = `${API_URL_ROOT}/surveys/${surveyId}/export`;

  // TODO: compute this ?
  const stepsLeft = 2;

  return {
    title: data?.surveyStats?.title,
    description: data?.surveyStats?.description,
    date: new Date(
      data?.surveyStats?.publishedAt ?? data?.surveyStats?.createdAt
    ),
    stepsLeft,
    statistics: data?.surveyStats?.statistics,
    exportURL,
    isLoadingStats: isLoading,
  };
}

// ---- SUB COMPONENTS

// -- Big Numbers

interface BigNumberProps {
  value: number;
  label: string;
}

const BigNumber = ({ value, label }: BigNumberProps) => {
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <Text variant="statsDashboard">{value}</Text>
      <Text variant="currentLight">{label}</Text>
    </Flex>
  );
};

// -- Actions

interface ActionButtonProps {
  disabled?: boolean;
  label: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  onClick?: () => void;
}

const borderStyle = "1px solid";
const disabledStyle = { backgroundColor: "grey" };

const ActionButton = ({
  disabled,
  top,
  right,
  bottom,
  left,
  label,
  onClick,
}: ActionButtonProps) => {
  const borders = {
    borderTop: top ? borderStyle : undefined,
    borderBottom: bottom ? borderStyle : undefined,
    borderLeft: left ? borderStyle : undefined,
    borderRight: right ? borderStyle : undefined,
  };

  const hoverStyle = useMemo(() => {
    return disabled ? { cursor: "not-allowed" } : { cursor: "pointer" };
  }, [disabled]);

  return (
    <Box
      disabled={disabled}
      _disabled={disabledStyle}
      p={3}
      w="calc(100% / 3)"
      {...borders}
      _hover={hoverStyle}
      onClick={onClick}
    >
      <Text variant="xs">{label}</Text>
    </Box>
  );
};

// ---- HELPERS

// Good job reading up until here, you found the goodies :D

const nyiMsg = [
  "Not yet implemented... 🚧",
  "Come back later... 🏗",
  "Come on, we are not done yet ! 👷‍♂️",
  "Man... just give us room to build this ! 🧱",
];

function nyi() {
  alert(nyiMsg[Math.floor(Math.random() * nyiMsg.length)]);
}
