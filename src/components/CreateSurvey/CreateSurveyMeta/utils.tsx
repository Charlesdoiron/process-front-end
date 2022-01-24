import { Box } from "@chakra-ui/react";
import { Select, Textarea } from "components/Fields";
import { CustomCreatableSelect } from "components/Fields/SelectCreatable";
import { FormikErrors } from "formik";
import { SurveyBuilder } from "redux/slices/surveyBuilder";

// TODO : Get the list of all the tags from the backend
const t = {
  language: [
    { label: "Français", value: "Français" },
    { label: "Anglais", value: "Anglais" },
    { label: "Allemand", value: "Allemand" },
  ],
  keywords: [
    { label: "Médecine générale", value: "Médecine générale" },
    { label: "Pédiatrie", value: "Pédiatrie" },
    { label: "Epidémiologie", value: "Epidémiologie" },
    { label: "Neuro-chirurgie", value: "Neuro-chirurgie" },
    { label: "Dentaire", value: "Dentaire" },
  ],
  categories: [
    { label: "Recherche structurelle", value: "Recherche structurelle" },
    { label: "En dévéloppement", value: "En dévéloppement" },
    { label: "En phase de test", value: "En phase de test" },
    { label: "ENS 89", value: "ENS 89" },
    { label: "ADN RNME", value: "ADN RNME" },
  ],
};

export const renderInputs = (step: number): React.ReactElement => {
  switch (step) {
    case 1:
      return (
        <Textarea
          appearance="light"
          id="title"
          rows="small"
          placeholder="Titre du projet"
          label="Renseigner le titre du projet"
        />
      );
      break;
    case 2:
      return (
        <Textarea
          appearance="light"
          id="slug"
          rows="small"
          placeholder="Url du projet"
          label="Valider ou modifier l'url du projet"
        />
      );
      break;
    case 3:
      return (
        <Box
          border="1px solid black"
          w="100%"
          borderRadius="5px"
          p="20px 20px 0 20px"
          backgroundColor="white"
        >
          <Textarea
            appearance="light"
            id="description"
            rows="medium"
            placeholder="Description"
            label="Renseigner la description du projet"
            helpText="Description publique, affichée aux utilisateurs de PROCESS. 500 signes max"
          />
        </Box>
      );
      break;

    case 4:
      return (
        <CustomCreatableSelect
          name="keywords"
          id="keywords"
          placeholder="Mots clés publics"
          label="Renseigner les mots clés"
          helpText="Ces mots clés serviront à référencer votre projet sur la page Process, ils sont publiques."
          answers={t.keywords}
          isMulti
        />
      );
      break;
    case 5:
      return (
        <Select
          id="language"
          placeholder="Langue du projet"
          label="Renseigner la langue du projet"
          answers={t.language}
          defaultValue={t.language[0].value}
        />
      );
      break;
    case 6:
      return (
        <Textarea
          appearance="light"
          id="email"
          rows="small"
          placeholder="Email de contact"
          label="Renseigner l'email de contact"
        />
      );
      break;

    default:
      return <></>;
      break;
  }
};

export const checkValidity = (
  step: number,
  values: SurveyBuilder["survey"],
  errors: FormikErrors<SurveyBuilder["survey"]>
): boolean => {
  const { title, description, keywords, language, email, categories, slug } =
    values;

  if (step === 1) {
    return title !== "" && !errors.title;
  }
  if (step === 2) {
    return slug !== "" && !errors.slug;
  }
  if (step === 3) {
    return description !== "" && !errors.description;
  }
  if (step === 4 && keywords) {
    return keywords?.length !== 0 && !errors.keywords;
  }
  if (step === 5) {
    return language !== "" && !errors.language;
  }
  if (step === 6) {
    return email !== "" && !errors.email;
  }
  if (step === 7 && categories) {
    return categories?.length !== 0 && !errors.categories;
  } else return false;
};

// remove unused values
export const formatValues = (
  data: Partial<SurveyBuilder["survey"]> | undefined
): Partial<SurveyBuilder["survey"]> => {
  return {
    title: data?.title,
    slug: data?.slug,
    email: data?.email,
    language: data?.language,
    description: data?.description,
    keywords: data?.keywords,
    categories: data?.categories,
  };
};
