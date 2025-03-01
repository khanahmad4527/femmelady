import { type GetLoadContextFunction } from '@react-router/cloudflare';
import { type PlatformProxy } from 'wrangler';
import { Env } from '~/types';

type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;

declare module '@react-router/cloudflare' {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

export const getLoadContext: GetLoadContextFunction = ({ context }) => {
  return {
    ...context
  };
};
