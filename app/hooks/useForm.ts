import { useForm as useFormMantine } from '@mantine/form';
import { useEffect } from 'react';
import { FetcherWithComponents, useFetcher } from 'react-router';
import { z } from 'zod';

import useTranslation from '~/hooks/useTranslation';
import { parseZodError, translateErrors } from '~/utils';

type UseFormProps = {
  schema: z.ZodSchema;
  initialValues: Record<string, any>;
};

export const useForm = <T = Record<string, string>>({
  schema,
  initialValues
}: UseFormProps) => {
  const t = useTranslation();
  const fetcher = useFetcher(); // Use the extended type

  const state = fetcher.state;

  const form = useFormMantine({
    initialValues,
    validate: (values): any => {
      try {
        schema.parse(values);
        return {}; // No errors
      } catch (error) {
        if (error instanceof z.ZodError) {
          const rawErrors = parseZodError(error).errors;
          return translateErrors(rawErrors, t);
        }
      }
    }
  });

  // Automatic submission handler using form.onSubmit
  const handleSubmit = form.onSubmit(values => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetcher.submit(formData, { method: 'POST' });
  });

  useEffect(() => {
    if (fetcher.data?.errors) {
      form.setErrors(translateErrors(fetcher.data.errors, t));
    }
  }, [fetcher]);

  return {
    Form: fetcher.Form,
    form, // expose form methods and properties if needed
    errors: form.errors, // expose errors if needed,
    state,
    fetcher: fetcher as FetcherWithComponents<T>,
    handleSubmit
  };
};
