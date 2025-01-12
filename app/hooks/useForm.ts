import { useForm as useFormMantine } from '@mantine/form';
import { useFetcher } from 'react-router';
import { useEffect } from 'react';
import { z } from 'zod';
import useTranslation from '~/hooks/useTranslation';
import { parseZodError, translateErrors } from '~/utils';

type UseFormProps = {
  schema: z.ZodSchema;
  initialValues: Record<string, any>;
};

export const useForm = ({ schema, initialValues }: UseFormProps) => {
  const t = useTranslation();
  const fetcher = useFetcher();

  const state = fetcher.state;

  const form = useFormMantine({
    initialValues,
    validate: (values): any => {
      try {
        schema.parse(values);
        return {};
      } catch (error) {
        if (error instanceof z.ZodError) {
          const rawErrors = parseZodError(error).errors;
          return translateErrors(rawErrors, t);
        }
      }
    }
  });

  useEffect(() => {
    if (fetcher.data?.errors) {
      form.setErrors(translateErrors(fetcher.data?.errors, t));
    }
  }, [fetcher.data]);

  return {
    Form: fetcher.Form,
    form, // expose form methods and properties if needed
    errors: form.errors, // expose errors if needed,
    state,
    fetcher
  };
};
