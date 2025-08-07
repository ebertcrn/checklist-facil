import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class TodoValidators {
  /**
   * Custom validator for todo titles
   *
   * - Cannot be null, undefined or empty (whitespaces)
   * - Cannot contain only whitespace characters
   * - 3 < Length <= 50
   */
  static todoTitle(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if value is null, undefined or empty
      if (!value) {
        return { required: true };
      }

      // Convert to string if it's not
      const stringValue = String(value);

      // Check if it contains only whitespace characters
      if (stringValue.trim().length === 0) {
        return { whitespace: true };
      }

      const trimmedValue = stringValue.trim();

      if (trimmedValue.length < 3) {
        return {
          minlength: {
            requiredLength: 3,
            actualLength: trimmedValue.length,
          },
        };
      }

      if (trimmedValue.length > 50) {
        return {
          maxlength: {
            requiredLength: 50,
            actualLength: trimmedValue.length,
          },
        };
      }

      // If it passed all validations
      return null;
    };
  }
}
