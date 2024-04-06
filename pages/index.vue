<script setup lang="ts">
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

</script>

<template>
  <Nav />
  <div class="w-screen flex justify-center mt-2">
    <Tabs default-value="account" class="w-screen p-4">
      <TabsList class="grid grid-cols-2">
        <TabsTrigger value="text">
          Text
        </TabsTrigger>
        <TabsTrigger value="file">
          File
        </TabsTrigger>
      </TabsList>
      <TabsContent value="text">
        <TransformersText />
      </TabsContent>
      <TabsContent value="file">
        <TransformersFile />
      </TabsContent>
    </Tabs>
  </div>
</template>
