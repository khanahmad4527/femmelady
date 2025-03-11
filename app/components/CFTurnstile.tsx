import { useEffect, useRef } from 'react';
import { Turnstile, TurnstileInstance } from '@marsidev/react-turnstile';
import useTurnstileSize from '~/hooks/useTurnstileSize';
import { useOutletContext } from 'react-router';
import { OutletContext } from '~/types';
import useCurrentLanguage from '~/hooks/useCurrentLanguage';
import { UseFormReturnType } from '@mantine/form';
import { FetcherWithComponents } from 'react-router';

const CFTurnstile = ({
  form,
  state,
  fetcher
}: {
  form: UseFormReturnType<
    Record<string, any>,
    (values: Record<string, any>) => Record<string, any>
  >;
  state: 'idle' | 'loading' | 'submitting';
  fetcher: FetcherWithComponents<{
    title: string;
    description: string;
  }>;
}) => {
  const { env } = useOutletContext<OutletContext>();
  const { currentLanguage } = useCurrentLanguage();
  const turnstileSize = useTurnstileSize();
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  useEffect(() => {
    if (state === 'idle' && fetcher.data) {
      turnstileRef.current?.reset();
    }
  }, [state]);

  return (
    <Turnstile
      ref={turnstileRef}
      siteKey={env.TURNSTILE_SITE_KEY}
      options={{ size: turnstileSize, language: currentLanguage }}
      onSuccess={token => {
        form.setFieldValue('cf-turnstile-response', token);
      }}
      onExpire={() => turnstileRef.current?.reset()}
    />
  );
};

export default CFTurnstile;
