interface FieldValidation {
    value: string;
    validation: (value: string) => boolean;
    errorMessage: string;
  }
  
  interface FormValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
  }
  
  function validateForm(fields: { [key: string]: FieldValidation }): FormValidationResult {
    const errors: { [key: string]: string } = {};
  
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const isValid = field.validation(field.value);
  
      if (!isValid) {
        errors[fieldName] = field.errorMessage;
      }
    });
  
    const isValid = Object.keys(errors).length === 0;
  
    return {
      isValid,
      errors,
    };
  }
  