<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/toast/use-toast'

import { Slider } from '~/components/ui/slider'

const { toast } = useToast()

const config = ref<Config>({
  fixation: [3],
  opacityDefault: [100],
  opacityHighlighted: [100],
})

const configSchema = toTypedSchema(z.object({
  fixation: z.array(z.number()).length(1).default(config.value.fixation),
  opacityDefault: z.array(z.number()).length(1).default(config.value.opacityDefault),
  opacityHighlighted: z.array(z.number()).length(1).default(config.value.opacityHighlighted),
}))

const { handleSubmit } = useForm({
  validationSchema: configSchema,
})

const onSubmit = handleSubmit((values) => {
  config.value = values
  toast({
    description: 'Configuration saved!',
  })
})
</script>

<template>
  <Nav />
  <Dialog>
    <div class="w-screen flex justify-center mt-2">
      <Tabs default-value="text" class="w-screen p-4">
        <div class="flex space-x-2">
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="text">
              Text
            </TabsTrigger>
            <TabsTrigger value="file">
              File
            </TabsTrigger>
          </TabsList>
          <DialogTrigger as-child>
            <Button variant="outline">
              <Icon name="lucide:settings" />
            </Button>
          </DialogTrigger>
        </div>
        <TabsContent value="text">
          <TransformersText :config="config" />
        </TabsContent>
        <TabsContent value="file">
          <TransformersFile :config="config" />
        </TabsContent>
      </Tabs>
    </div>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit configuration</DialogTitle>
        <DialogDescription>
          Make changes to your configurations here.
        </DialogDescription>
      </DialogHeader>
      <form class="space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField, value }" name="fixation">
          <FormItem>
            <FormLabel>Fixation Level</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="config.fixation"
                :max="5"
                :min="1"
                :step="1"
              />
            </FormControl>
            <FormDescription class="flex justify-between">
              <span>How much boldness would you like?</span>
              <span>Level {{ value?.[0] ?? config.fixation[0] }}</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>

        <hr>
        <FormField v-slot="{ componentField, value }" name="opacityHighlighted">
          <FormItem>
            <div class="font-bold mb-4">
              Opacity
            </div>
            <FormLabel>Highlighted</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="config.opacityHighlighted"
                :max="100"
                :min="1"
                :step="1"
              />
            </FormControl>
            <FormDescription class="flex justify-between">
              <span>Choose an opacity.</span>
              <span>{{ value?.[0] ?? config.opacityHighlighted[0] }}%</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField, value }" name="opacityDefault">
          <FormItem>
            <FormLabel>Default</FormLabel>
            <FormControl>
              <Slider
                v-bind="componentField"
                :default-value="config.opacityDefault"
                :max="100"
                :min="1"
                :step="1"
              />
            </FormControl>
            <FormDescription class="flex justify-between">
              <span>Choose an opacity.</span>
              <span>{{ value?.[0] ?? config.opacityDefault[0] }}%</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
        <DialogFooter>
          <Button type="submit">
            Save changes
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
