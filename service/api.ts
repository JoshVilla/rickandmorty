import { get } from "./service";

export const getCharacter = async (id: string): Promise<any> => {
  return await get(`https://rickandmortyapi.com/api/character/${id}`);
};

export const searchCharacters = async (
  search = "",
  page = 1,
  status: "alive" | "dead" | "unknown" | "" = ""
) => {
  const params = new URLSearchParams();

  params.append("page", page.toString());

  if (search.trim()) {
    params.append("name", search.trim());
  }

  if (status) {
    params.append("status", status);
  }

  const res = await fetch(
    `https://rickandmortyapi.com/api/character/?${params.toString()}`
  );

  if (!res.ok) throw new Error("Failed to fetch characters");

  return res.json();
};
