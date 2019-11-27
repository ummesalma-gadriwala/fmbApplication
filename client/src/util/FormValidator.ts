import validator from 'validator';

interface ValidationRule {
  field: string;
  [method: string]: string | any;
  args?: Array<any>;
  validWhen: boolean;
  message: string;
}

class FormValidator {
  localValidator: any = validator;

  validations: Array<ValidationRule> = [];

  constructor(validations: Array<ValidationRule>) {
    // validations is an array of validation rules specific to a form
    this.validations = validations;
  }

  validate(state: any) {
    // start out assuming valid
    const validation: any = this.valid();
    // for each validation rule
    this.validations.forEach(rule => {
      // if the field hasn't already been marked invalid by an earlier rule
      if (!validation[rule.field].isInvalid) {
        // determine the field value, the method to invoke and optional args from
        // the rule definition
        const fieldValue = state[rule.field].toString();
        const args = rule.args || [];
        const validationMethod = this.localValidator[rule.method];

        // call the validation_method with the current field value as the first
        // argument, any additional arguments, and the whole state as a final
        // argument.  If the result doesn't match the rule.validWhen property,
        // then modify the validation object for the field and set the isValid
        // field to false
        if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
          validation[rule.field] = { isInvalid: true, message: rule.message };
          validation.isValid = false;
        }
      }
    });
    return validation;
  }

  valid() {
    const validation: any = {};

    this.validations.map(
      rule => (validation[rule.field] = { isInvalid: false, message: '' })
    );

    return { isValid: true, ...validation };
  }
}

export default FormValidator;
