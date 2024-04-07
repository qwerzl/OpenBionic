<script setup lang="ts">
import { Card, CardHeader, CardTitle } from '~/components/ui/card'
import epub from '~/lib/epub'

import { useToast } from '@/components/ui/toast/use-toast'

const props = defineProps<{
  config: Config
}>()

const file = ref()

const transforming = ref(false)

const { toast } = useToast()

const transformerMap = new Map<string, Function>([
  ['application/epub+zip', epub],
])

async function handleFileUpload() {
  transforming.value = true
  const fileType = file.value!.files[0].type
  if (transformerMap.has(fileType)) {
    await transformerMap.get(fileType)!(file.value!.files, props.config)
  }
  else {
    toast({
      description: 'Unsupported file type',
      variant: 'destructive',
    })
  }
  transforming.value = false
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>File Converter</CardTitle>
      <CardDescription>Currently only epub files are supported</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="flex items-center">
        <Icon v-if="transforming" name="svg-spinners:90-ring-with-bg" class="mr-2" />
        <input
          ref="file"
          :disabled="transforming"
          type="file"
          class="grow flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:mr-2 file:pr-2 file:font-medium file:text-foreground file:border-r-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'"
          @change="handleFileUpload"
        >
      </div>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
