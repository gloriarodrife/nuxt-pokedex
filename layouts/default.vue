<template>
  <header>
    <Header />
  </header>

  <slot />
</template>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>
