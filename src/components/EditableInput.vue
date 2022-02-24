<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['value'])
const emit = defineEmits(['change'])
const edit = ref(false)

let iValue
const internalValue = computed({
  get() {
    iValue = props.value
    return iValue
  },
  set(value) {
    iValue = value
  }
})

function internalChange() {
  emit('change', iValue)
  edit.value = false
}
</script>

<template>
  <div v-if="!edit" @click="edit = true">
    <slot></slot>
  </div>
  <form v-else method="POST" action="#" @submit.prevent="internalChange">
    <input type="text" v-model="internalValue" />
    <input type="submit" value="Edit" />
    <input type="button" value="Cancel" @click="edit = false" />
  </form>
</template>
