import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";

import { fields } from "components/CreateSurvey/ToolBox/InputForm/Template/logic/initialValues";
import {
  addCondition,
  addInput,
  removePage,
  selectCondition,
  selectConditonInCurrentPage,
  selectInput,
  updatePage,
} from "redux/slices/formBuilder";
import { toogleDrawer } from "redux/slices/application";
import { Box, Button, Flex } from "@chakra-ui/react";
import { t } from "static/survey";
import ToolBox from "../InputsButton";
import { Formik, Form } from "formik";
import { Switch, Textarea } from "components/Fields";
import IInput from "interfaces/form/input";
import { RemovingConfirmation } from "./Status";
import { v4 as uuidv4 } from "uuid";

export const PageForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selected_page, pages, selected_condition } = useAppSelector(
    (state) => state.formBuilder
  );
  const condtions = useAppSelector(selectConditonInCurrentPage);
  const isFirstPage =
    pages.findIndex((page) => page.id === selected_page.id) === 0;

  const [isRemoving, setRemoving] = React.useState(false);
  const condition_id = uuidv4();

  const handleSelect = (
    input_type: IInput["input_type"],
    name: string,
    id: string,
    internal_title: string | undefined
  ) => {
    if (id) {
      const data = {
        ...fields[input_type],
        input_type,
        name,
        id,
        internal_title,
        page_id: selected_page.id,
      };
      dispatch(selectInput(data));
      dispatch(addInput(data));
      dispatch(toogleDrawer());
    }
  };

  const onChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLFormElement;
    if (target !== null) {
      dispatch(
        updatePage({
          id: selected_page.id,
          data: {
            [target.id]: target.checked ? target.checked : target.value,
          },
        })
      );
    }
  };

  if (isRemoving) {
    return (
      <RemovingConfirmation
        confirm={() => {
          dispatch(removePage(selected_page));
          setRemoving(false);
        }}
        close={() => setRemoving(false)}
      />
    );
  }

  return (
    <Box p={4}>
      <Formik
        validateOnBlur={false}
        initialValues={selected_page}
        enableReinitialize
        onSubmit={(data, { setSubmitting, validateForm }) => {
          validateForm(data);
          setSubmitting(true);
          dispatch(toogleDrawer());
        }}>
        {() => {
          return (
            <Form
              onChange={(event) => onChange(event)}
              style={{ width: "100%" }}>
              <Flex w="100%" justifyContent="space-between">
                <Switch
                  size="sm"
                  id="is_locked"
                  label={
                    selected_page.is_locked
                      ? "🔒 Page non modifiable"
                      : "🔓  Page modifiable"
                  }
                />
                {!isFirstPage ? (
                  <Button
                    variant="ghost"
                    fontSize="13px"
                    onClick={() => {
                      setRemoving(true);
                    }}>
                    🗑
                  </Button>
                ) : (
                  <Box mt={10} />
                )}
              </Flex>

              <Box pt={10}>
                <Textarea
                  id="name"
                  label="Nom de la page"
                  rows="small"
                  placeholder="Page 1"
                  helpText="100 signes maximum"
                />
                <Textarea
                  id="short_name"
                  label="Nom court pour la navigation rapide"
                  rows="small"
                  placeholder="Page 1"
                  helpText="40 signes maximum"
                />
                <ToolBox
                  onSelect={(input_type, name, id, internal_title) =>
                    handleSelect(input_type, name, id, internal_title)
                  }
                />
              </Box>

              {!isFirstPage && (
                <Flex
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between"
                  mt={5}>
                  {condtions.length === 0 ? (
                    <Button
                      variant="link"
                      color="brand.blue"
                      onClick={() => {
                        dispatch(
                          addCondition({
                            id: condition_id,
                            condition_type: "page",
                            referer_entity_id: selected_page.id,
                            step: 1,
                            group: 1,
                            is_valid: false,
                          })
                        );
                        dispatch(
                          selectCondition({
                            id: condition_id,
                          })
                        );
                      }}>
                      {t.add_condition}
                    </Button>
                  ) : (
                    <Button
                      variant="link"
                      color="brand.blue"
                      onClick={() =>
                        dispatch(selectCondition({ id: selected_condition.id }))
                      }>
                      {t.edit_condition}
                    </Button>
                  )}
                </Flex>
              )}
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};
