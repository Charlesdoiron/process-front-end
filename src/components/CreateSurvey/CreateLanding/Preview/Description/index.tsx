import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { LandingRedux } from "redux/slices/types";
import { useMediaQueries } from "utils/hooks/mediaqueries";
import { t } from "static/createLanding";

interface Props {
  data: LandingRedux | undefined;
  onParticipate: () => void;
}

export const Description: React.FC<Props> = ({ data, onParticipate }) => {
  const attributes = data?.attributes;
  const { isTablet } = useMediaQueries();

  return (
    <Box w="100%" h="100%">
      <Flex w="100%" pt="40px">
        <Box>
          <Text
            textAlign="left"
            variant="current"
            dangerouslySetInnerHTML={{
              __html: attributes?.wysiwyg ?? "",
            }}
          ></Text>
          <Flex mt={10} justifyContent="space-between" flexDirection={isTablet ? "column" : "row"}>
            <Button
              variant="rounded"
              width="90%"
              margin="0 auto"
              left="0"
              right="0"
              backgroundColor={attributes?.color_theme?.button || "brand.blue"}
              onClick={onParticipate}
            >
              {t.cta_participate}
            </Button>
            {attributes?.about_page && (
              <Button
                mt={isTablet ? "20px" : "unset"}
                variant="rounded"
                color={attributes?.color_theme?.button}
                border={`1px solid ${attributes?.color_theme?.base || "brand.blue"}`}
                backgroundColor={attributes?.color_theme?.base || "brand.blue"}
                _hover={{ backgroundColor: attributes?.color_theme?.button, color: "white" }}
              >
                {t.cta_show_more}
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
