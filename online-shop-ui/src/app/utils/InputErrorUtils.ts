export type InputError = {
    field: string;
    message: string;
}

export const isFieldPresentInInputErrors = (field: string, inputErrors: InputError[]) => {
    for (let inputError of inputErrors) {
        if (inputError.field.localeCompare(field) == 0) {
            return true;
        }
    }

    return false;
}

export const getFieldInputErrorMessage = (field: string, inputErrors: InputError[]) => {
    for (let inputError of inputErrors) {
        if (inputError.field.localeCompare(field) == 0) {
            return inputError.message;
        }
    }

    return null;
}