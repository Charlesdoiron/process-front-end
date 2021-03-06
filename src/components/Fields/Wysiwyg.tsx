import React from "react";
import JoditReact from "jodit-react-ts";
import { useFormikContext } from "formik";
import { FormControl } from "@chakra-ui/react";
import IQuestion from "types/form/question";

interface Props {
  id: string;
  simpleMode?: boolean;
}

export const Wysiwyg: React.FC<Props> = ({ id, simpleMode }) => {
  const { setFieldValue, values } = useFormikContext<IQuestion>();

  console.log("VAL", values);

  return React.useMemo(
    () => (
      <FormControl id={id} textAlign="left">
        <JoditReact
          onChange={(newContent: string) => {
            setFieldValue(id, newContent);
          }}
          config={{
            tabIndex: -1,
            namespace: id,

            allowTabNavigation: true,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            uploader: {
              insertImageAsBase64URI: true,
            },
            readonly: false,
            enableDragAndDropFileToEditor: true,
            language: "fr",
            toolbarButtonSize: "middle",
            showCharsCounter: false,
            showWordsCounter: false,
            showPlaceholder: false,
            buttonsMD: [
              "bold",
              "italic",
              "underline",
              "link",
              "indent",
              "ul",
              "ol",
              !simpleMode ? "image" : "",
            ],
            buttonsSM: [
              "bold",
              "italic",
              "underline",
              "link",
              "indent",
              "ul",
              "ol",
              !simpleMode ? "image" : "",
            ],
            buttonsXS: [
              "bold",
              "italic",
              "underline",
              "link",
              "indent",
              "ul",
              "ol",
              !simpleMode ? "image" : "",
            ],
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // value={values[id]}
          defaultValue={values.wysiwyg}
        />
      </FormControl>
    ),
    []
  );
};
