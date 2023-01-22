<template>
  <ul class="list" v-if="pokemons">
    <li v-for="pokemon in pokemons.items" :key="pokemon.id">
      <NuxtLink :to="`/pokemon/${pokemon.id}`">
        <PokemonCard :pokemon="pokemon" />
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { getPokemons } from '~/services/pokemons';

const {
  pending,
  data: pokemons,
  refresh,
} = await useLazyAsyncData('pokemon-list', async () => {
  const response = await getPokemons({ limit: 20, offset: 0 });
  return response;
});
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
