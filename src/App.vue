<script setup>
import { RouterView } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

async function main() {
  await window.ethereum.enable()
  const blog = useBlogStore()
  await blog.load()
}

main()
</script>

<template>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}
</style>
