import { authentication, createDirectus, rest } from '@directus/sdk';
import { Schema } from '~/types/collections';
import fetchRetry from 'fetch-retry';
import { getEnv } from './env';

const { DIRECTUS_URL } = getEnv(process.env);

// Create a retry-enabled fetch implementation
const fetchWithRetry = fetchRetry(fetch);

export const directus = createDirectus<Schema>(DIRECTUS_URL ?? '', {
  globals: {
    fetch: (input, init) => {
      // Track the retry attempts
      let attempts = 0;

      return fetchWithRetry(input, {
        ...init,
        retries: 3, // Number of retry attempts
        retryDelay: attempt => {
          // Custom delays: 1st -> 1s, 2nd -> 2s, 3rd -> 3s
          return attempt * 1000; // Multiply the attempt number by 1000ms
        },
        retryOn: (attempt, _, response) => {
          attempts = attempt;

          // Retry on errors, except for final attempt
          if (response && !response.ok && attempt < 3) {
            console.log(`Attempt ${attempt}, Response: ${response?.status}`);
            return true;
          }

          // If it's the last retry (attempt 3), throw the error
          if (attempt === 3) {
            return false; // Don't retry on the last attempt
          }

          return false;
        }
      });
    }
  }
})
  .with(rest())
  .with(authentication());
