import { StorageService } from "./types";
import { localStorageService } from "./localStorage";

export function getStorageService(): StorageService {
  // For now, always use localStorage
  // Easy to swap with API-based implementation later
  return localStorageService;

  // Future: Swap based on environment variable
  // const storageType = process.env.NEXT_PUBLIC_STORAGE_TYPE || "localStorage";
  // if (storageType === "api") {
  //   return apiStorageService;
  // }
  // return localStorageService;
}
