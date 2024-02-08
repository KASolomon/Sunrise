import * as SecureStore from "expo-secure-store";

export const storeItem = async (key, value) => {
  try {
    const serialized = JSON.stringify(value)
    await SecureStore.setItemAsync(key, serialized);
  } catch (error) {
    console.log("Error storing cache : ", error);
  }
};
export const getItem = async (key) => {
  try {
    const data = await SecureStore.getItemAsync(key);
    const parsed = JSON.parse(data)
    return parsed;
  } catch (error) {
    console.log("Error fetching cache : ", error);
  }
};


