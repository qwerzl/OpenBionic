<script setup lang="ts">

import {textVide} from "text-vide";
import {Textarea} from "~/components/ui/textarea";

const inputed = ref('')
</script>

<template>
  <div class="grid">
    <div class="rounded border p-4">
      <div class="font-bold text-2xl">
        Text transform
      </div>
      <div class="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 mt-2">
        <Textarea placeholder="Type your message here." v-model="inputed" class="h-48" />
        <div class="rounded border p-2" v-html="textVide(inputed, { ignoreHtmlTag: false })" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
