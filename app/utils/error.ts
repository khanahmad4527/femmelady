import { z } from 'zod';

import { parseZodError } from '.';

export type TFetcherError = {
  title?: string;
  description?: string;
  error?: boolean;
};

const ERROR_MAP = {
  LOGIN_REQUIRED: 'LOGIN_REQUIRED'
};

export const throwLoginRequiredError = () => {
  throw new Error(ERROR_MAP.LOGIN_REQUIRED);
};

export const handleError = ({
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
