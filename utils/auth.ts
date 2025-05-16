import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLoggedIn = async (value: boolean) => {
  await AsyncStorage.setItem('isLoggedIn', value ? 'true' : 'false');
};

export const getLoggedIn = async (): Promise<boolean> => {
  const value = await AsyncStorage.getItem('isLoggedIn');
  return value === 'true';
};

export const setCurrentUser = async (username: string) => {
    await AsyncStorage.setItem('currentUser', username);
};

export const getCurrentUser = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('currentUser');
};

export const logout = async () => {
  await AsyncStorage.multiRemove(['isLoggedIn', 'currentUser']);
  // Optionally clear other user-related data
};
