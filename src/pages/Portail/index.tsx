import { Box, Text, Center, Input } from "@chakra-ui/react";
import { SurveyGrid } from "components/SurveyGrid";
import React, { useState, useMemo, useEffect } from "react";
import IRoute from "types/routes/route";
import { Image } from "@chakra-ui/react";

import Hero from "assets/hero.jpg";
import { Filters } from "components/Dashboard/Filters";
import { NoData } from "components/SurveyGrid/noData";
import {
  ITEMS_PER_PAGE,
  useGetPublishedSurvey,
  useSearchSurvey,
} from "./portal.queries";
import { Loader } from "components/Spinner";

import { ReactComponent as ShowMore } from "./assets/ShowMore.svg";
// ---- STATIC

const t = {
  title:
    "Une plateforme de curation scientifique curabitur blandit tempus porttitor.",
  filters: [
    { label: "Tout voir", id: "all" },
    // { label: "Les plus populaires", id: "mostViewed" },
    // { label: "Les plus récents", id: "newest" },
    { label: "En cours", id: "pending" },
    { label: "Archivés", id: "archived" },
  ],
};

// ---- COMPONENT

export const Portail: React.FC<IRoute> = () => {
  const [currentFilter, setCurrentFilter] = useState<string>(t.filters[0].id);
  const [query, setQuery] = useState<string>("");
  const [pagination, setPagination] = useState<number>(0);

  const { data: surveys, isLoading } = useGetPublishedSurvey(pagination);
  const { data: surveysFound, isLoading: loadingSearch } =
    useSearchSurvey(query);

  const [state, setState] = useState<any>([]);

  const filteredSurveys = useMemo(() => {
    return surveys?.surveys?.filter(
      (survey) => currentFilter === "all" || survey.status === currentFilter
    );
  }, [currentFilter, surveys]);

  useEffect(() => {
    if (state !== surveys?.surveys && filteredSurveys) {
      setState([...state, ...filteredSurveys]);
    }
  }, [filteredSurveys]);

  const totalCount = surveys?.surveysConnection?.aggregate.count;
  const isSearching = query !== "";

  return (
    <Box>
      <Box>
        <Center
          position="absolute"
          color="white"
          textAlign="left"
          p="10%"
          h="90vh"
          d="flex"
          flexDir="column"
        >
          <Text variant="xxl" maxW="1000px">
            {t.title}
          </Text>
          <Text variant="baseline" maxW="1000px" pt="15px">
            Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas sed
            diam eget risus varius blandit sit amet non magna. Aenean eu leo
            quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </Text>
        </Center>
        <Image
          src={Hero}
          alt="Process"
          boxSize="100%"
          h="90vh"
          objectFit="cover"
        />
      </Box>

      <Box pt="110px" pb="160px" maxW="80%" margin="0 auto">
        <Text variant="xl">
          Une plateforme de curation scientifique{" "}
          <strong>{totalCount} projets en cours</strong> tempus porttitor. Duis
          mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit.
        </Text>
      </Box>

      <Box pb="80px">
        <Box
          px="10%"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Filters
            filters={t.filters}
            handleClick={(id) => setCurrentFilter(id)}
            currentFilter={currentFilter}
          />
          <Box w="50%">
            <Input
              height="55px"
              name="search"
              label="Recherche de projet par titre"
              placeholder="Recherche de projet par titre"
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </Box>

        {isSearching ? (
          surveysFound && surveysFound?.surveys?.length > 0 ? (
            <SurveyGrid
              surveys={surveysFound?.surveys}
              isLoading={loadingSearch}
            />
          ) : loadingSearch ? (
            <Loader />
          ) : (
            <NoData content="Nous n'avons pas trouvé d'enquêtes pour votre recherche." />
          )
        ) : state.length > 0 ? (
          <SurveyGrid surveys={state} isLoading={isLoading} />
        ) : isLoading ? (
          <Loader />
        ) : (
          <NoData content="Nous n'avons pas trouvé d'enquêtes pour votre recherche." />
        )}
      </Box>
      {totalCount && state.length < totalCount && (
        <Box
          pos="relative"
          margin="0 auto"
          textAlign="center"
          mb="50px"
          onClick={() => setPagination(pagination + ITEMS_PER_PAGE)}
          _hover={{ cursor: "pointer", opacity: 0.6 }}
        >
          <Text variant="current">Afficher plus de Projets</Text>
          <Box margin="0 auto" d="flex" justifyContent="center">
            <ShowMore />
          </Box>
        </Box>
      )}
    </Box>
  );
};
