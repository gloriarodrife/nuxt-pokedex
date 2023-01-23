<template>
  <ul class="list" v-if="pokemons">
    <li v-for="pokemon in pokemons" :key="pokemon.id">
      <NuxtLink :to="`/pokemon/${pokemon.id}`">
        <PokemonCard :pokemon="pokemon" />
      </NuxtLink>
    </li>
  </ul>

  <button
    class="button"
    v-if="pokemonsCache.length <= pokemonsCount - 1"
    @click="loadMorePokemons"
  >
    More pokemons
  </button>
</template>

<script lang="ts" setup>
import type { ParamsPokemons, PokemonsApiResponse } from '~/types';
import { getPokemons } from '~/services/pokemons';

const pokemonsCache = useState<PokemonsApiResponse['items']>(() => []);
const pokemonsCount = useState<number>();

const queryParams = ref<ParamsPokemons>({
  limit: 20,
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
  pokemonsCount.value = response.count;
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

.button {
  position: relative;
  left: 50%;
  padding: 0 8px;
  font-size: 1rem;
  margin-bottom: 8px;
  border: 1px solid rgba(31, 31, 31, 0.3);
  background-color: #f3f3f3;
  box-sizing: border-box;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
  color: #000000;
}
</style>
