import * as Location from 'expo-location';

/**
 * Gets the current location of the user.
 * @returns A promise that resolves to an object containing latitude and longitude.
 * Throws an error if location permissions are not granted or location cannot be fetched.
 */
export const getCurrentLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error fetching location:', error);
    throw new Error('Unable to fetch location');
  }
};
