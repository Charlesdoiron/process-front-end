import IQuestion from "./question";
import IOperator from "./operator";
import IPage from "./page";

export default interface ICondition {
  id: string;
  type: "page" | "question";
  referer_page?: IPage;
  referer_question?: IQuestion;
  referer_id?: IPage["id"] | ICondition["id"];
  target?: IQuestion;
  target_value: string;
  operator: IOperator["id"];
  group: string;
}

export interface IConditionRes {
  conditions: ICondition[];
}

type UnorderedError = {
  conditionId: string;
  targetId: string;
};

type ConditionError = {
  conditionId: string;
  message: string;
};

type QuestionStatus = {
  questionId: string;
  valid: boolean;
  errors: [ConditionError];
  unordered: [UnorderedError];
};

type PageStatus = {
  pageId: string;
  valid: boolean;
  errors: [QuestionStatus];
};

export interface CheckSurvey {
  checkSurvey: {
    valid: boolean;
    errors: [PageStatus];
  };
}
