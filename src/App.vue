<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
import {useAppStore} from '@/stores'
const store = useAppStore()
theme.global.name.value = store.nightMode? 'dark' : 'light'
</script>