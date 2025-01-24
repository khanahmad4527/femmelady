// Error codes as a union type
type TurnstileErrorCode =
  | 'missing-input-secret'
  | 'invalid-input-secret'
  | 'missing-input-response'
  | 'invalid-input-response'
  | 'bad-request'
  | 'timeout-or-duplicate'
  | 'internal-error';

// Metadata object (Enterprise only)
interface TurnstileMetadata {
  ephemeral_id?: string; // Ephemeral ID (Enterprise feature)
}

// Successful validation response type
interface TurnstileValidationSuccess {
  success: true;
  challenge_ts: string; // ISO timestamp for when the challenge was solved
  hostname: string; // Hostname the challenge was served for
  error_codes: []; // Empty array for successful responses
  action?: string; // Customer widget identifier
  cdata?: string; // Customer data passed to the widget
  metadata?: TurnstileMetadata; // Enterprise-specific metadata
}

// Failed validation response type
interface TurnstileValidationFailure {
  success: false;
  error_codes: TurnstileErrorCode[]; // List of error codes
}

// Combined validation response type
type TurnstileValidationResponse =
  | TurnstileValidationSuccess
  | TurnstileValidationFailure;

const NODE_ENV = process.env?.NODE_ENV;

const TURNSTILE_SECRET_KEY =
  NODE_ENV === 'development'
    ? '1x0000000000000000000000000000000AA'
    : process.env?.TURNSTILE_SECRET_KEY;

export const validateTurnstile = async ({
  request,
  token
}: {
  request: Request;
  token: string;
}): Promise<TurnstileValidationResponse> => {
  const ip = request.headers.get('CF-Connecting-IP');

  const formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET_KEY!);
  formData.append('response', token);
  if (ip) {
    formData.append('remoteip', ip);
  }

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: formData,
    method: 'POST'
  });

  const outcome = (await result.json()) as TurnstileValidationResponse;
  return outcome;
};
