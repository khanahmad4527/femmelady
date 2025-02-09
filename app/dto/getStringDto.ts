type DTOInput<T extends Record<string, any> | string | null | undefined> = T;

export default function getStringDto<
  T extends Record<string, any> | string | null | undefined
>(
  input: DTOInput<T>,
  field: string = 'id' // Optional field to extract, defaults to 'id'
): string | undefined {
  if (typeof input === 'string') {
    // If the input is a string, return it directly
    return input;
  }

  if (input && typeof input === 'object') {
    // If a specific field is provided, return its value
    return input[field as 'id'] as string | undefined;
  }

  // For null, undefined, or any other cases, return undefined
  return undefined;
}
