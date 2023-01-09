<template>
  <div class="list">
    <NuxtLink v-for="pokemon in pokemons?.items" :to="`/pokemon/${pokemon.id}`">
      <PokemonCard :pokemon="pokemon" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import type { PokemonsApiResponse } from '~/types';

const config = useRuntimeConfig();

const { pending, data: pokemons } = await useLazyFetch<PokemonsApiResponse>(
  `${config.public.API_BASE_URL}/pokemon`
);
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
