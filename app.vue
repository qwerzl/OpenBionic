<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { textVide } from 'text-vide'

const inputed = ref('')
</script>

<template>
  <Nav />
  <div class="w-screen flex justify-center mt-2">
    <Tabs default-value="account" class="w-screen p-4">
      <TabsList class="grid grid-cols-2">
        <TabsTrigger value="account">
          Text
        </TabsTrigger>
        <TabsTrigger value="password">
          File
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" class="grid">
        <div class="rounded border p-4">
          <div class="font-bold text-2xl">
            Text transform
          </div>
          <div class="grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-4 mt-2">
            <Textarea placeholder="Type your message here." v-model="inputed" class="h-48" />
            <div class="rounded border p-2" v-html="textVide(inputed)" />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
