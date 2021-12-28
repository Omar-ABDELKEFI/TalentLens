import { IErrortypes } from '@schemes/errorTypes';

export const constTypes: IErrortypes = {
  invalid_login: 'incorrect email or password',
  password_and_email_required: 'password and email required',
  password_required: 'password required',
  email_required: 'email required'
};

export function handleError(error: any) {
  switch (error.Tag) {
    case 'required':
      return `the ${error.Field} is required`;
    case 'oneof':
      return `the value of ${error.Field} should be one of ${error.Param} and the current value of ${error.Field} is ${error.Value}`;
    case 'min':
      return `the value of ${error.Field} should be greater or equel to ${error.Param} and the current value of ${error.Field} is ${error.Value}`;
    case 'max':
      return `the value of ${error.Field} should be less then or equel to ${error.Param} and the current value of ${error.Field} is ${error.Value}`;
    case 'gt':
      return `the number of items ${error.Field} should be less greater than  ${error.Param} and the current number of items of ${error.Field} is ${error.Value}`;
    default :
      return `Tag: ${error.Tag} Filed:${error.Field} Param:${error.Param} value:${error.Value} `;
  }
}
