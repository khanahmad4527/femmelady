type DTOInput<
  T extends
    | (string | number | Record<string, any>)[]
    | string
    | number
    | Record<string, any>
    | null
    | undefined
> = T;

export default function getFirstObjectDto<
  T extends
    | (string | number | Record<string, any>)[]
    | string
    | number
    | Record<string, any>
    | null
    | undefined
>(input: DTOInput<T>) {
  if (
    Array.isArray(input) &&
    typeof input[0] === 'object' &&
    input[0] !== null
  ) {
    // Return the first object in the array
    return input[0];
  }

  if (typeof input === 'object' && input !== null) {
    return input;
  }

  // Return undefined for null, undefined, or other cases
  return {};
}
