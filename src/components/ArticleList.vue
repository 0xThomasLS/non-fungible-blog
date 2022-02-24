<script setup>
import ArticleItem from './ArticleItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <ArticleItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a target="_blank" href="https://vuejs.org/">official documentation</a>
    provides you with all information you need to get started.

    <RouterLink :to="{ name: 'article', params: { id: 'toto' }}">Read more...</RouterLink>
  </ArticleItem>
</template>
