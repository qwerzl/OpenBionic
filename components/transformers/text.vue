<script setup lang="ts">
import { textVide } from 'text-vide'
import { Textarea } from '~/components/ui/textarea'

const props = defineProps<{
  config: Config
}>()

const inputed = ref('')

const transformed = computed(() => {
  return textVide(inputed.value, {
    ignoreHtmlTag: false,
    fixationPoint: props.config.fixation[0],
    sep: [`<b style=\"color: hsl(var(--foreground) / ${props.config.opacityHighlighted[0]}%);\">`, '</b>'],
  })
})
</script>

<template>
  <div class="grid">
    <div class="rounded border p-4">
      <div class="font-bold text-2xl">
        Text transform
      </div>
      <div class="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 mt-2">
        <Textarea v-model="inputed" placeholder="Type your message here." class="h-48" />
        <div
          class="rounded border p-2"
          :style="`color: hsl(var(--foreground) / ${config.opacityDefault[0]}%);`"
          v-html="transformed.replaceAll(&quot;\n&quot;, &quot;<br />&quot;)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
