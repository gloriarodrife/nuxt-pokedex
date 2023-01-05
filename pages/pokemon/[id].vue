<template>
  <div>Pokemon {{ pokemonId }}</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const pokemonId = route.params.id;
</script>
