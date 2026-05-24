<template>
  <v-footer height="40" app color="grey-lighten-2">
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 24"
        :title="item.title"
      />
    </a>

    <v-btn @click="scrollTop" class="ml-5">
      <v-icon size="x-large" color="success" title="跳到頂部 (Scroll top)">mdi-arrow-up-bold-box</v-icon>跳到頂部
    </v-btn>
    <v-btn @click="scrollBottom" class="ml-5">
      <v-icon size="x-large" color="success" title="跳底頂部 (Scroll bottom)">mdi-arrow-down-bold-box</v-icon>跳到底部
    </v-btn>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2019-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block"></span>
      —
      <a
        :href="yt_url"
        class="text-decoration-none on-surface font-weight-thin"
        rel="noopener noreferrer"
        target="_blank"
      >
      {{site_title}}油管頻道
      </a>
    </div>
  </v-footer>
</template>

<script setup>
import useSharedComp from '@/assets/js/SharedComp.js'
const {scrollTop, scrollBottom} = useSharedComp()

const site_title =  import.meta.env.VITE_SITE_TITLE 
const yt_url =  import.meta.env.VITE_YT_URL 
const items = [
    {
      title: 'Vue & Vuetify 技術支持',
      icon: `$vuetify`,
      info: 'Vue & Vuetify 技術支持'
      // href: 'https://vuetifyjs.com/',
    },
    {
      title: 'GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/hongloumeng-studio/Hong-Lou-Meng-Studio',
    }
    // ,{
    //   title: 'X',
    //   icon: ['M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z'],
    //   // href: 'https://x.com/vuetifyjs',
    // },
    
]

</script>

