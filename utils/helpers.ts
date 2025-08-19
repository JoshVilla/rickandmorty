// utils/favorites.ts

import { Character } from "./types";

const FAVORITES_KEY = "favorites";

export function getFavorites(): Character[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(data: Character) {
  const favorites = getFavorites();
  const isExist = favorites.some((fav: Character) => fav.id === data.id);
  console.log(isExist);
  if (!isExist) {
    favorites.push(data);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: number) {
  const favorites = getFavorites().filter((fav: Character) => fav.id !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id: number): boolean {
  return getFavorites().some((fav: Character) => fav.id === id);
}
