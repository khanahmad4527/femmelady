import { useForm } from '@mantine/form';
import { useFetcher } from 'react-router';
import { z } from 'zod';

export const submitForm = <T extends Record<string, any>>(
  fetcher: ReturnType<typeof useFetcher>,
  form: ReturnType<typeof useForm<T>>
): React.FormEventHandler<HTMLFormElement> => {
  return event => {
    event.preventDefault(); // Prevent the default form submission behavior
    const values = form.values;

    // Convert form values to FormData
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Submit the data using fetcher
    fetcher.submit(formData, { method: 'POST' });
  };
};

export const parseZodError = (error: z.ZodError) => {
  // Return field-specific errors
  const fieldErrors = error.issues.reduce((acc, issue) => {
    const fieldName = issue.path[0]; // Get the field name
    acc[fieldName] = issue.message; // Map field to message
    return acc;
  }, {} as Record<string, string>);

  return { errors: fieldErrors };
};

/**
 * Formats a number as a currency string.
 *
 * @param value - The number to format.
 * @param currency - The currency code (e.g., "USD", "EUR").
 * @param locale - The locale to use for formatting (default is "en-US").
 * @returns The formatted currency string.
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
};
