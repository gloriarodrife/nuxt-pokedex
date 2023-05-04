<template>
  <div class="card">
    <div class="card__image">
      <img :src="pokemon.image" :alt="pokemon.name" />
    </div>
    <div class="card__footer">
      <div>
        <h2 class="card__title">{{ pokemon.name }}</h2>
        <span class="card__types" v-if="pokemon.types">{{
          pokemon.types.join(', ')
        }}</span>
      </div>
      <Heart v-if="!pokemon.isFavorite" @click="favoriteHasClicked" />
      <HeartFavorite v-if="pokemon.isFavorite" @click="unfavoriteHasClicked" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Pokemon } from '~/types';

const { pokemon } = defineProps<{ pokemon: Pokemon }>();

const emit = defineEmits(['favoriteHasClicked', 'unfavoriteHasClicked']);

const favoriteHasClicked = async (event: any) => {
  event.preventDefault();
  emit('favoriteHasClicked', pokemon.id);
};

const unfavoriteHasClicked = async (event: any) => {
  event.preventDefault();
  emit('unfavoriteHasClicked', pokemon.id);
};
</script>

<style lang="scss">
.card {
  width: 160px;
  height: 250px;
  display: flex;
  flex-direction: column;
  border: 0.4px solid #eeeeee;
  border-radius: 10px;

  &:hover {
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1),
      4px 4px 16px rgba(187, 206, 206, 0.5);
  }

  &__image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    img {
      width: 100px;
    }
  }

  &__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #f3f3f3;
    border-radius: 0 0 10px 10px;
    padding: 0.6rem;
  }

  &__title {
    font-weight: bold;
    color: rgb(76, 75, 75);
    font-size: 0.9rem;
    margin: 0;
  }

  &__types {
    font-size: 0.9rem;
  }
}
</style>
