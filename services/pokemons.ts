import type { ParamsPokemons, PokemonsApiResponse } from '~/types';

const URL_API = `https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest`;

export const getPokemons = async ({
  limit,
  offset,
  search,
  isFavorite,
  type,
}: ParamsPokemons) => {
  const url = new URL(`${URL_API}/pokemon`);

  if (limit) {
    url.searchParams.append('limit', String(limit));
  }
  if (offset) {
    url.searchParams.append('offset', String(offset));
  }
  if (search) {
    url.searchParams.append('search', search);
  }
  if (type) {
    url.searchParams.append('type', type);
  }
  if (isFavorite) {
    url.searchParams.append('isFavorite', String(isFavorite));
  }
  const data = await $fetch<PokemonsApiResponse>(url.href);

  return data;
};

export const getPokemonById = async (id: string) => {
  const data = await $fetch(`${URL_API}/pokemon/${id}`);

  return data;
};

export const getPokemonsTypes = async () => {
  const data = await $fetch(`${URL_API}/pokemon-types`);

  return data;
};

export const postPokemonFavorite = async (id: string) => {
  const data = await $fetch(`${URL_API}/pokemon/${id}/favorite`, {
    method: 'POST',
  });

  return data;
};

export const postPokemonUnFavorite = async (id: string) => {
  const data = await $fetch(`${URL_API}/pokemon/${id}/unfavorite`, {
    method: 'POST',
  });

  return data;
};
