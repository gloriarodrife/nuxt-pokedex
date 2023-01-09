<template>
  <div v-if="pending">Loading ...</div>
  <div v-else>
    <div class="detail-container" v-if="pokemon">
      <div class="pokemon">
        <img class="pokemon__image" :src="pokemon.image" :alt="pokemon.name" />

        <div class="pokemon__sound"></div>
        <section class="pokemon__detail">
          <section class="pokemon__description">
            <div>
              <h1 class="pokemon__name">{{ pokemon.name }}</h1>
              <span class="pokemon__types">{{ pokemon.types.join(', ') }}</span>
            </div>
          </section>
          <section class="pokemon__stats">
            <div class="pokemon__stat">
              <div class="bar bar-top"></div>
              <span class="stat">CP: {{ pokemon.maxCP }}</span>
            </div>
            <div class="pokemon__stat">
              <div class="bar bar-bottom"></div>
              <span class="stat">HP: {{ pokemon.maxHP }}</span>
            </div>
          </section>
          <section class="pokemon__features">
            <div class="pokemon__feature">
              <span class="feature__title">Weight</span>
              <span>
                {{ pokemon.weight.maximum }} - {{ pokemon.weight.minimum }}
              </span>
            </div>
            <div class="pokemon__feature">
              <span class="feature__title">Height</span>
              <span>
                {{ pokemon.height.maximum }} - {{ pokemon.height.minimum }}
              </span>
            </div>
          </section>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PokemonResponse } from '~/types';

const route = useRoute();
const config = useRuntimeConfig();

const pokemonId = route.params.id;

const { pending, data: pokemon } = await useLazyFetch<PokemonResponse>(
  `${config.public.API_BASE_URL}/pokemon/${pokemonId}`
);
</script>

<style lang="scss" setup>
.detail-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem;
}

.pokemon {
  --pokemon-border-color: #dfdfdf;
  --pokemon-background-color: #f3f3f3;
  --pokemon-border-radius: 10px;

  border-radius: var(--pokemon-border-radius);
  max-width: 600px;
  width: 100%;
  border: 1px solid var(--pokemon-border-color);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__description {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &__image {
    width: 200px;
    margin: 2rem;
  }

  &__sound {
    width: 100%;
    padding: 0 0 1rem 1rem;

    > svg {
      cursor: pointer;
      width: 25px;
      height: 25px;
      fill: #70c1a1;
    }
  }

  &__name {
    margin: 0 0 0.5rem 0;
  }

  &__stats {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem 1rem;
    font-weight: bold;
    text-align: right;
    font-size: 0.9rem;
  }

  &__stat {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__detail {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--pokemon-background-color);
    border-bottom-right-radius: var(--pokemon-border-radius);
    border-bottom-left-radius: var(--pokemon-border-radius);
  }

  &__features {
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 1px;
    padding-top: 1px;
    background-color: var(--pokemon-border-color);
    border-bottom-right-radius: var(--pokemon-border-radius);
    border-bottom-left-radius: var(--pokemon-border-radius);
  }

  &__feature {
    background-color: var(--pokemon-background-color);
    flex: 1;
    padding: 1rem;

    &:first-child {
      border-bottom-left-radius: var(--pokemon-border-radius);
    }

    &:last-child {
      border-bottom-right-radius: var(--pokemon-border-radius);
    }
  }
}

.feature {
  &__title {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }
}

.loading {
  text-align: center;
}

.evolutions {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;

  &__detail {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}

.bar {
  width: 100%;
  height: 5px;
  border-radius: 10px;

  &-top {
    background-color: #9e9eff;
  }
  &-bottom {
    background-color: #71c1a1;
  }
}

.stat {
  width: 100px;
  text-align: left;
  padding-left: 0.5rem;
}
</style>
