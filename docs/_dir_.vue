<!-- docs/blog/_dir_.vue -->
<template>
  <div>
    <h1>博客文章</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <router-link :to="post.path">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme } = useData()

const posts = computed(() => {
  return theme.value.posts || []
})
</script>
