import React, { useCallback, useMemo } from "react";
import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { ReduxPage } from "redux/slices/participation/page";

import IPage from "types/form/page";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { SummaryMobile } from "./SummaryMobile";

// MENU

interface MenuProps {
  pages: ReduxPage[];
  selectIndex: (index: number) => void;
  color: string;
  author: string | undefined;
  logo: string | undefined;
  selectedPage: IPage | undefined;
}

export const ParticipationMenu: React.FC<MenuProps> = ({
  pages,
  selectIndex,
  color,
  author,
  logo,
  selectedPage,
}) => {
  const { isTablet } = useMediaQueries();

  const navigables = useMemo(() => {
    let isBlocked = false;

    return pages.map((p, idx) => {
      const prevIdx = idx === 0 ? 0 : idx - 1;
      // We can navigate to a page if:
      // first page (idx = 0) OR the previous page is submitable (= valid)
      // AND there is no unnavigable page already up the chain
      // |-> edge case like: P1 unvalid (accessible) P2 valid (not accessible) P3 (accessible)
      const isNavigable =
        ((pages[prevIdx].submitable ?? false) || idx === 0) && !isBlocked;

      if (!isNavigable) isBlocked = true;
      return isNavigable;
    });
  }, [pages]);

  return (
    <Box
      pos="sticky"
      top="0"
      h={isTablet ? "60px" : "unset"}
      d="flex"
      alignItems="center"
      flexDirection={isTablet ? "row" : "column"}
    >
      {!isTablet && (
        <Flex
          textAlign="right"
          py="19.5px"
          px="20px"
          borderBottom="1px solid"
          borderColor={color}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          {!!logo && logo.length !== 0 ? (
            <img src={logo} alt="Logo" style={{ maxHeight: "30px" }} />
          ) : (
            <Box minH="30px" />
          )}

          <Text textDecoration="underline" variant="xs">
            <a href={`mailto: ${author}`}>{author}</a>
          </Text>
        </Flex>
      )}
      <Box
        d="flex"
        flexDirection={isTablet ? "row" : "column"}
        justifyContent={logo?.length === 0 ? "flex-end" : "space-between"}
        alignItems="center"
        w="90%"
        mx="auto"
      >
        {isTablet && !!logo && logo.length !== 0 ? (
          <img src={logo} alt="Logo" style={{ maxHeight: "30px" }} />
        ) : (
          <Box minH="30px" />
        )}
        {isTablet && (
          <SummaryMobile
            pages={pages}
            navigables={navigables}
            color={color}
            selectedPage={selectedPage}
            selectIndex={selectIndex}
          />
        )}

        {!isTablet &&
          pages.map((p, idx) => {
            return (
              <PageEntry
                key={p.id}
                index={idx}
                page={p}
                color={color}
                isNavigable={navigables[idx]}
                selectedPageId={selectedPage?.id}
                selectIndex={selectIndex}
              />
            );
          })}
      </Box>
    </Box>
  );
};

// ENTRY

interface EntryProps {
  index: number;
  page: ReduxPage;
  color: string;
  isNavigable: boolean;
  selectedPageId: string | undefined;
  selectIndex: (index: number) => void;
}

export const PageEntry: React.FC<EntryProps> = ({
  index,
  page,
  color,
  isNavigable,
  selectedPageId,
  selectIndex,
}) => {
  const isSelected = selectedPageId === page.id;

  const goTo = useCallback(() => {
    if (!isNavigable) return;
    selectIndex(index);
  }, [index, isNavigable]);

  return (
    <Box
      _hover={{ cursor: isNavigable || isSelected ? "pointer" : "not-allowed" }}
      textAlign="left"
      fontSize="14px"
      onClick={goTo}
      mb="4"
      color={color}
      d="flex"
      alignItems="center"
      textDecoration={isSelected ? "underline" : "none"}
      w="100%"
    >
      <Circle backgroundColor={color} w="10px" h="10px" mr="10px" />
      {page.short_name}
    </Box>
  );
};
