import { BadRequestException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';

const PASSWORD_RULE = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const PASSWORD_RULE_MESSAGE = 'Password should have 1 upper case, lowcase letter along with a number and special character.';

const VALIDATION_PIPE = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    const errorsDetails = errors.map(({ constraints }) => constraints);
    const message = errorsDetails.map((errorsDetail) => Object.values(errorsDetail).join(', ')).join(', ');

    return new BadRequestException(message);
  },
});

export const REGEX = {
  PASSWORD_RULE,
};

export const MESSAGES = {
  PASSWORD_RULE_MESSAGE,
};

export const SETTINGS = {
  VALIDATION_PIPE,
};
