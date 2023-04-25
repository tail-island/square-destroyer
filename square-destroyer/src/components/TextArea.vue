<script setup>
defineProps([
  'caption',
  'modelValue'
])

defineEmits([
  'update:modelValue'
])
</script>

<template>
  <div class="textField">
    <p>{{ caption }}</p>
    <textarea class="textArea" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<style scoped>
.textField {
  display: flex;
  flex-flow: column;
}

.textArea {
  width: 100%;
  height: 100%;
}
</style>
