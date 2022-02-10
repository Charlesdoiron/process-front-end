<<<<<<< HEAD
import { Box, Text, Flex, Container, Image } from "@chakra-ui/react";
import { Color, Member as MemberType } from "types/landing";
=======
import { Box, Text, Flex, Container, Image, Grid } from "@chakra-ui/react";
import { IColor, ILanding, IMember } from "types/landing";
>>>>>>> 3078117 ([mobile] Fix landing and consent)
import React from "react";

type Props = {
<<<<<<< HEAD
  members: MemberType[];
  color_theme?: Color;
=======
  members: ILanding["members"];
  color_theme?: IColor;
  isUserView?: boolean;
>>>>>>> 3078117 ([mobile] Fix landing and consent)
};

export const Team: React.FC<Props> = ({ members, color_theme, isUserView }) => {
  if (members.length === 0) {
    return <></>;
  }
  return (
    <Box pb={10}>
      <Container variant="hr" maxW="unset" />
      <Text variant="xlNoMobilVariant" mb="80px" mt="45px">
        L'équipe
      </Text>
      <Grid
        mt="40px"
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap="40px 10px"
      >
        {members.map(({ job, name, image }: any, i: number) => (
          <Member
            isUserView={isUserView}
            key={i}
            job={job}
            name={name}
            image={image}
            color={color_theme?.base}
          />
        ))}
      </Grid>
    </Box>
  );
};

<<<<<<< HEAD
const Member: React.FC<MemberType> = ({ job, name, image, color }) => {
  const { isTablet } = useMediaQueries();

=======
const Member: React.FC<IMember> = ({ job, name, image, color, isUserView }) => {
>>>>>>> 3078117 ([mobile] Fix landing and consent)
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Image
        fallbackSrc={`https://via.placeholder.com/150/${color?.replace(
          "#",
          ""
        )}/${color?.replace("#", "")}`}
        borderRadius="full"
        boxSize={isUserView ? "230px" : "80px"}
        src={image}
        alt={name}
        mx="auto"
      />

      <Text variant="smallTitleBold" mt={7}>
        {name}
      </Text>
      <Text variant="current" mt={2}>
        {job}
      </Text>
    </Flex>
  );
};
