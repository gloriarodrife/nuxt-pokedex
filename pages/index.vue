<template >
  <div class="home-container">
    <div>
      <div class="filters__favorites">
        <button class="filter__all" :class="{
          active: !queryParams.isFavorite,
        }" @click="filterAllPokemons">
          All
        </button>
        <button class="filter__favorites" :class="{
          active: queryParams.isFavorite,
        }" @click="filterFavorites">
          Favorites
        </button>
      </div>
    </div>
    <div class="type-favorites">
      <input class="filter__search" placeholder="Search" type="search" id="name" name="name" @input="filterByName" />
      <div class="select">
        <select name="types" id="types" class="filter__select" @change="onSelectType">
          <option :value="''">Type</option>
          <option :value="type" :key="index" v-for="(type, index) in pokemonsTypes">
            {{ type }}
          </option>
        </select>
      </div>
    </div>

    <ul class="list" v-if="pokemons">
      <li v-for="pokemon in pokemons" :key="pokemon.id">
        <NuxtLink :to="`/pokemon/${pokemon.id}`">
          <PokemonCard :pokemon="pokemon" @favoriteHasClicked="favoriteHasClicked"
            @unfavoriteHasClicked="unfavoriteHasClicked" />
        </NuxtLink>
      </li>
    </ul>

    <button class="button " v-if="pokemonsCache.length <= pokemonsCount - 1" @click="loadMorePokemons">
      More pokemons
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { ParamsPokemons, Pokemon, PokemonsApiResponse } from '~/types';
import {
  getPokemons,
  getPokemonsTypes,
  postPokemonFavorite,
  postPokemonUnFavorite,
} from '~/services/pokemons';

const pokemonsCache = useState<PokemonsApiResponse['items']>('pokemonsCache', () => []);
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
    ...queryParams.value,
    search: queryParams.value.search?.toLowerCase(),
  });
  pokemonsCount.value = response.count;

  pokemonsCache.value = [...pokemonsCache.value, ...response.items];

  return pokemonsCache.value;
});

const { data: pokemonsTypes } = await useLazyAsyncData(
  'pokemons-types',
  async () => {
    const response = await getPokemonsTypes();

    return response;
  }
);

const filterFavorites = () => {
  pokemonsCache.value = [];
  queryParams.value.offset = 0
  queryParams.value.isFavorite = true;
  refresh();
};

const filterAllPokemons = () => {
  pokemonsCache.value = [];
  queryParams.value.offset = 0
  queryParams.value.isFavorite = false;
  refresh();
};

const filterByName = (event: any) => {
  pokemonsCache.value = [];
  queryParams.value.offset = 0
  queryParams.value.search = event.target.value;
  refresh();
};

const onSelectType = (event: any) => {
  pokemonsCache.value = [];
  queryParams.value.offset = 0
  queryParams.value.type = event.target.value;
  refresh();
};

const loadMorePokemons = () => {
  queryParams.value.offset += queryParams.value.limit;
  refresh();
};

const favoriteHasClicked = async (pokemonId: string) => {
  await postPokemonFavorite(pokemonId);
  const currentPokemon = pokemonsCache.value.find(
    (pokemon) => pokemon.id === pokemonId
  )!;
  currentPokemon.isFavorite = true;
};

const unfavoriteHasClicked = async (pokemonId: string) => {
  await postPokemonUnFavorite(pokemonId);
  const currentPokemon = pokemonsCache.value.find(
    (pokemon) => pokemon.id === pokemonId
  )!;
  currentPokemon.isFavorite = false;
};
</script>

<style lang="scss">
.home-container {
  margin: 1rem auto 2rem;
  max-width: 1000px;
}

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
  color: #757575;
  border-color: #71c1a1;

}

.type-favorites {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
}

.filter {

  &__search,
  &__select,
  &__all,
  &__favorites {
    padding: 0 0.5rem;
    border: 1px solid rgba(31, 31, 31, 0.3);
    background-color: #f3f3f3;
    width: 200px;
    box-sizing: border-box;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    color: #757575;
  }

  &__search {
    width: 175px;

    @media all and (min-width: 680px) {
      width: 250px;
    }
  }

  &__select {
    width: 110px;

    @media all and (min-width: 680px) {
      width: 150px;
    }
  }

  &__all,
  &__favorites {
    width: 150px;
    border-color: #71c1a1;

    @media all and (min-width: 680px) {
      width: 208px;
    }
  }

  &__all {
    border-radius: 4px 0 0 4px;
  }

  &__favorites {
    border-radius: 0 4px 4px 0;
  }
}

.filters__favorites {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.active {
  background-color: #71c1a1;
  color: white;
}
</style>
