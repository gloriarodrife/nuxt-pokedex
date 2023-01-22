<template>
  <ul class="list" v-if="pokemons">
    <li v-for="pokemon in pokemons" :key="pokemon.id">
      <NuxtLink :to="`/pokemon/${pokemon.id}`">
        <PokemonCard :pokemon="pokemon" />
      </NuxtLink>
    </li>
  </ul>

  <button @click="loadMorePokemons">More pokemons</button>
</template>

<script lang="ts" setup>
import type { ParamsPokemons, PokemonsApiResponse } from '~/types';
import { getPokemons } from '~/services/pokemons';

const pokemonsCache = useState<PokemonsApiResponse['items']>(() => []);

const queryParams = ref<ParamsPokemons>({
  limit: 4,
  offset: 0,
  search: '',
  isFavorite: false,
  type: '',
});

const {
  pending,
  data: pokemons,
  refresh,
} = await useLazyAsyncData('pokemon-list', async () => {
  const response = await getPokemons({
    limit: queryParams.value.limit,
    offset: queryParams.value.offset,
  });

  pokemonsCache.value = [...pokemonsCache.value, ...response.items];

  return pokemonsCache.value;
});

const loadMorePokemons = () => {
  queryParams.value.offset += queryParams.value.limit;
  refresh();
};
</script>

<style lang="scss">
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  justify-items: center;
  list-style: none;
  margin: 0;
  padding: 1rem;

  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
