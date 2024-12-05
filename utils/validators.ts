/**
 * Validates a title or text input to ensure it is not empty.
 * @param text The input string to validate.
 * @returns `true` if the input is valid (not empty), otherwise `false`.
 */
export const isValidText = (text: string): boolean => {
    return text.trim().length > 0;
  };
  
  /**
   * Validates if a given object contains latitude and longitude.
   * @param location The location object to validate.
   * @returns `true` if the location object is valid, otherwise `false`.
   */
  export const isValidLocation = (location: { lat: number; lng: number } | null): boolean => {
    if (!location) return false;
    const { lat, lng } = location;
    return typeof lat === 'number' && typeof lng === 'number';
  };
  