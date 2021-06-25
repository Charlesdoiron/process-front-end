import { FormBuilder } from "redux/slices/formBuilder";

export const formMock: FormBuilder = {
  pages: [
    {
      name: "Première page de la recherche B2716",
      id: "page-bcc2b551-642d-44da-94bf-478444805d25",
      is_locked: false,
      condition: [],
      short_name: "P1",
      survey_id: "survey-bcc2b551",
    },
    {
      name: "Deuxième page de la recherche B2716",
      id: "page-f7a1f940-f68c-4c86-9d87-3449c2317d5a",
      condition: [],
      is_locked: false,
      short_name: "P2",
      survey_id: "survey-bcc2b551",
    },
    {
      name: "Troisième page de la recherche B2716",
      id: "page-9fd74940-a9a3-40cd-b56b-d03eceab788f",
      condition: [],
      is_locked: false,
      short_name: "P3",
      survey_id: "survey-bcc2b551",
    },
  ],
  input_order: [
    "text-area-1a55f31a-38a1-4e37-a31f-f8f122141bf",
    "text-area-cc997b41-bae9-4965-9472-1acf9540225d",
    "select-8d6b931f-c2db-42c1-9b56-3dbc1cbff3a8",
    "radio-332a5e97-8596-4dbc-a79b-96d77b4ddc6e",
    "date-picker-8d705caa-e037-4c2c-add6-4ad82f0c50fc",
    "date-picker-11fddd60-bfab-4337-8c96-fe9366e1aa1f",
    "number-input-bb3379ec-69fc-4bf9-ba66-b971d952b9ad",
    "checkbox-75f5d57c-4de9-46bb-8b2e-6f22dcd5e887",
  ],
  inputs: [
    {
      type: "text",
      name: "Question texte",
      label: "Quel est votre ville de naissance ?",
      help_text: "",
      internal_title: "text-area-1a55f31a-38a1-4e37-a31f-f8f442c341bf",
      internal_description: "",
      required: false,
      placeholder: "Votre ville de naissance :",
      min_length: "",
      max_length: "",
      rows: "small",
      input_type: "text-area",
      id: "text-area-1a55f31a-38a1-4e37-a31f-f8f122141bf",
      page_id: "page-bcc2b551-642d-44da-94bf-478444805d25",
    },
    {
      type: "text",
      name: "Question texte",
      label: "Quel est votre ville préférée ?",
      help_text: "",
      internal_title: "text-area-cc997b41-bae9-4965-9472-1acf9540225d",
      internal_description: "",
      required: false,
      placeholder: "Saint Malo ? Marseille ?",
      min_length: "",
      max_length: "",
      rows: "small",
      input_type: "text-area",
      id: "text-area-cc997b41-bae9-4965-9472-1acf9540225d",
      page_id: "page-bcc2b551-642d-44da-94bf-478444805d25",
    },
    {
      type: "text",
      name: "Questions liste déroulante",
      label: "Quel fruit mangez vous en vacances ?",
      help_text: "",
      internal_title: "select-8d6b931f-c2db-42c1-9b56-3dbc1cbff3a8",
      internal_description: "",
      required: false,
      options: {
        option_0: "pomme",
        option_1: "bannane",
        option_2: "orange",
      },
      input_type: "select",
      id: "select-8d6b931f-c2db-42c1-9b56-3dbc1cbff3a8",
      page_id: "page-bcc2b551-642d-44da-94bf-478444805d25",
    },
    {
      type: undefined,
      name: "Question bouton radio",
      label: "Etes vous en couple ?",
      help_text: "",
      internal_title: "radio-332a5e97-8596-4dbc-a79b-96d77b4ddc6e",
      internal_description: "",
      required: false,
      options: {
        option_0: "oui",
        option_1: "non",
      },
      input_type: "radio",
      id: "radio-332a5e97-8596-4dbc-a79b-96d77b4ddc6e",
      page_id: "page-bcc2b551-642d-44da-94bf-478444805d25",
    },
    {
      type: undefined,
      name: "Question date",
      label: "Quelle est votre date de naissance ?",
      help_text: "",
      internal_title: "date-picker-8d705caa-e037-4c2c-add6-4ad82f0c50fc",
      internal_description: "",
      required: false,
      input_type: "date-picker",
      id: "date-picker-8d705caa-e037-4c2c-add6-4ad82f0c50fc",
      page_id: "page-f7a1f940-f68c-4c86-9d87-3449c2317d5a",
    },
    {
      type: undefined,
      name: "Question date",
      label: "A quelle date êtes-vous inscrit au sondage ?",
      help_text: "",
      internal_title: "date-picker-11fddd60-bfab-4337-8c96-fe9366e1aa1f",
      internal_description: "",
      required: false,
      options: undefined,
      input_type: "date-picker",
      id: "date-picker-11fddd60-bfab-4337-8c96-fe9366e1aa1f",
      page_id: "page-f7a1f940-f68c-4c86-9d87-3449c2317d5a",
    },
    {
      type: "number",
      name: "Question nombre",
      label: "Combien avez vous d'enfants ?",
      help_text: "",
      internal_title: "number-input-bb3379ec-69fc-4bf9-ba66-b971d952b9ad",
      internal_description: "",
      required: false,
      placeholder: "",
      min_length: "",
      max_length: "",
      units: "enfants",
      input_type: "number-input",
      id: "number-input-bb3379ec-69fc-4bf9-ba66-b971d952b9ad",
      page_id: "page-f7a1f940-f68c-4c86-9d87-3449c2317d5a",
    },
    {
      type: undefined,
      name: "Question case à cocher",
      label: "Dans quel logement vivez vous ?",
      help_text: "",
      internal_title: "checkbox-75f5d57c-4de9-46bb-8b2e-6f22dcd5e887",
      internal_description: "",
      required: false,
      options: {
        option_0: "Maison",
        option_1: "Appartement",
        option_2: "Chateau",
        option_3: "Caravane",
      },
      input_type: "checkbox",
      id: "checkbox-75f5d57c-4de9-46bb-8b2e-6f22dcd5e887",
      page_id: "page-9fd74940-a9a3-40cd-b56b-d03eceab788f",
    },
  ],
  selected_input: {
    id: "",
    input_type: "text-area",
    internal_title: "",
    name: "",
    page_id: "",
  },
  selected_page: {
    survey_id: "survey-bcc2b551",
    name: "Deuxième page de la recherche B2716",
    id: "page-f7a1f940-f68c-4c86-9d87-3449c2317d5a",
    is_locked: false,
    condition: [],
    short_name: "P2",
  },
  conditions: [],
  selected_condition: {
    id: "",
  },
  is_editing: false,
  is_collapse_view: false,
  is_removing: "",
};
