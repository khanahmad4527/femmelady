import { z } from 'zod';

import { parseZodError } from '.';

export type TFetcherError = {
  title?: string;
  description?: string;
  error?: boolean;
};

const ERROR_MAP = {
  LOGIN_REQUIRED: 'LOGIN_REQUIRED',
  VERIFICATION_LIMIT_REACHED: 'VERIFICATION_LIMIT_REACHED',
  RESET_PASSWORD_LIMIT_REACHED: 'RESET_PASSWORD_LIMIT_REACHED'
};

export const throwLoginRequiredError = () => {
  throw new Error(ERROR_MAP.LOGIN_REQUIRED);
};

export const throwVerificationLimitError = () => {
  throw new Error(ERROR_MAP.VERIFICATION_LIMIT_REACHED);
};

export const throwResetPasswordLimitError = () => {
  throw new Error(ERROR_MAP.RESET_PASSWORD_LIMIT_REACHED);
};

export const handleActionError = ({
  error,
  route
}: {
  error: unknown;
  route?: 'register' | 'login';
}) => {
  console.log(error);

  if (error instanceof Error && error.message === ERROR_MAP.LOGIN_REQUIRED) {
    return {
      title: 'common.loginRequireTitle',
      description: 'common.loginRequireDescription',
      error: true
    };
  }

  if (
    error instanceof Error &&
    error.message === ERROR_MAP.VERIFICATION_LIMIT_REACHED
  ) {
    return {
      title: 'register.registrationRequestLimitTitle',
      description: 'register.registrationRequestLimitDescription',
      error: true
    };
  }

  if (
    error instanceof Error &&
    error.message === ERROR_MAP.RESET_PASSWORD_LIMIT_REACHED
  ) {
    return {
      title: 'resetPassword.resetPasswordLimitTitle',
      description: 'resetPassword.resetPasswordLimitDescription',
      error: true
    };
  }

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return parseZodError(error);
  }

  //   // Handle errors with a `response` property (e.g., HTTP errors)
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as any).response;

    // Handle specific HTTP status codes
    if (response?.status === 401) {
      return {
        title: 'loginError.title',
        description: 'loginError.description',
        error: true
      };
    }

    if (response?.status === 400 && route === 'register') {
      return {
        title: 'registerError.title',
        description: 'registerError.description',
        error: true
      };
    }

    if (response?.status === 403) {
      return {
        title: 'common.notAllowedTitle',
        description: 'common.notAllowedDescription',
        error: true
      };
    }

    // You can add more status-specific handlers here if needed
    // e.g., 404, 500, etc.
  }

  // Fallback for unhandled errors
  return {
    title: 'common.somethingWentWrong',
    description: 'common.encounteredError',
    error: true
  };
};

/************* Loader Error ********************/

export const productNotFoundError = () => {
  throw new Response('PRODUCT_NOT_FOUND', { status: 404 });
};

export const internalServerError = () => {
  throw new Response('INTERNAL_SERVER_ERROR', { status: 500 });
};

export const invalidTokenError = () => {
  throw new Response('INVALID_TOKEN', { status: 400 });
};

export const handleLoaderError = (e: any) => {
  const status = e?.status ?? e?.response?.status;
  if (status === 403) {
    return productNotFoundError();
  }
  if (status === 404) {
    return productNotFoundError();
  }
  return internalServerError();
};
