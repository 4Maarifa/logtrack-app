import { faText, faTextWidth, faDotCircle, faCaretCircleDown, faCalendarDay } from '@fortawesome/pro-light-svg-icons';
import { faText as faTextSolid, faTextWidth as faTextWidthSolid, faDotCircle as faDotCircleSolid,
  faCaretCircleDown as faCaretCircleDownSolid, faCalendarDay as faCalendarDaySolid } from '@fortawesome/pro-solid-svg-icons';

/**
 * class Form
 * a Form is a set of questions that can be answered multiple times by multiple users.
 * It can be linked to insurance claims, job offers, ...
 * 
 * companyId: string | The company that owns the form
 * identification: string | Unique name of the form
 * description: string | Description / explanation of the form
 * creator: string | The creator of the form
 * creationIsoDate: string | The creation date, as iso string
 * questions: FormQuestion[] | The array of questions
 */
class Form {
  constructor(companyId, identification, description, creator, creationIsoDate, questions) {
    this.companyId = companyId;
    this.identification = identification;
    this.description = description;
    this.creator = creator;
    this.creationIsoDate = creationIsoDate;
    this.questions = questions;
  }
}

/**
 * Enum: EFormQuestionType
 * Type of a FormQuestion
 */
export const EFormQuestionType = Object.freeze({
  TEXT: 'TEXT',
  LONG_TEXT: 'LONG_TEXT'
});

/**
 * Enum: EFormQuestionTypeDetails
 * Details about a EFormQuestionType
 */
export const EFormQuestionTypeDetails = Object.freeze({
  [EFormQuestionType.TEXT]: {
    name: 'Text',
    icon: faText,
    iconSolid: faTextSolid,
    buildMetadata: () => {},
    verifyMetadata: () => true
  },
  [EFormQuestionType.LONG_TEXT]: {
    name: 'Long Text',
    icon: faTextWidth,
    iconSolid: faTextWidthSolid,
    buildMetadata: () => {},
    verifyMetadata: () => true
  }
});

/**
 * class FormQuestion
 * a FormQuestion is part of a form
 * 
 * type: string | The type of the question from EFormQuestionType
 * name: string | text of the question
 * instructions: string | Help for the user to fulfil this question
 * required: boolean | Is the question mandatory?
 * metadata: Object | object from EFormQuestionTypeDetails
 * 
 */
export class FormQuestion {
  constructor(type, name, instructions, required, metadata) {
    this.type = EFormQuestionType[type];
    this.name = name;
    this.instructions = instructions;
    this.required = required;
    this.metadata = metadata;
  }
}

export default Form;
