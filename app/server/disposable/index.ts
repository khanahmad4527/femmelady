import { disposableDomains } from './disposable';

export const isDisposableEmail = (email: string) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return disposableDomains.has(domain);
};
