<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import EditableInput from './EditableInput.vue'
import { useBlogStore } from '@/stores/blog'

const showSocialInput = ref(false)

const props = defineProps({
  minimized: {
    type: Boolean,
    default: false
  }
})

const blog = useBlogStore()

async function changeBlogName(value) {
  await blog.setName(value)
}

async function changeBlogDescription(value) {
  await blog.setDescription(value)
}

function parseAndFormSocialLink(link) {
  const [protocol, addr] = link.split('://')
  const [host, ...user] = addr.split('/')

  return {
    icon: host,
    title: '@' + user,
    link
  }
}

const socialNetworks = computed(() => {
  return blog.socialNetworks.map(s => parseAndFormSocialLink(s))
})

const newSocialNetwork = ref()
async function addSocialNetwork() {
  await blog.addSocialNetwork(newSocialNetwork.value)
  newSocialNetwork.value = undefined
}
</script>

<template>
  <header :class="{ 'minimized': props.minimized }">
    <img alt="Blog logo" class="logo" src="@/assets/logo.svg" @click="$router.push({ name: 'home' })" />

    <div class="wrapper">
      <div class="greetings">
        <EditableInput @change="changeBlogName" :value="blog.name">
          <h1 class="green">{{ blog.name }}</h1>
        </EditableInput>

        <EditableInput @change="changeBlogDescription" :value="blog.description">
          <h3>{{ blog.description }}</h3>
        </EditableInput>
      </div>

      <nav>
        <a
          v-for="social in socialNetworks"
          :key="social.title"
          :href="social.link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ social.title }}
        </a>
        <a v-show="!showSocialInput" href="#" @click.prevent="showSocialInput = true">+</a>
        <form v-show="showSocialInput" method="POST" action="#" @submit.prevent="addSocialNetwork">
          <input type="text" placeholder="Add social link" v-model="newSocialNetwork" />
          <input type="submit" value="Add" />
          <input type="button" value="Cancel" @click="showSocialInput = false" />
        </form>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  place-items: center;
  justify-content: center;
}

header .wrapper {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.logo {
  display: block;
  margin: 0 4rem 0 0;
  height: 300px;
  transform: scaleX(-1);
  cursor: pointer;
}

header.minimized .logo {
  height: 150px;
}

nav {
  width: 100%;
  text-align: left;
  margin-left: -1rem;
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 1rem;
}

header.minimized nav {
  display: none;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: left;
}
</style>
