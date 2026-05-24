<template>
  <main>
    <AppHeader :showNavigation="false" />
    <TheDialog />

    <v-card>
        <v-card-text class="text-h6">
             <v-row>
                <v-col cols="12" style="margin-top:1rem;">&nbsp;</v-col>
            </v-row>
            <v-row>
                <v-col cols="1"></v-col>
                <v-col cols="10">
                <div class="" style="width:75%; margin:0 auto;">
                    <v-btn to="/" color="success" class="float-right">回首頁 <v-icon>mdi-home</v-icon></v-btn>
                    <h1>十二戲子一覽表</h1>
                    <v-data-table 
                        :items="twelveActress"
                        :items-per-page="-1"       
                        hide-default-footer       
                        class="elevation-1"
                        
                    >
                        <!-- Custom header slot -->
                        <template v-slot:headers="{ columns }">
                            <tr>
                                <th v-for="column in columns"
                                    :key="column.key"
                                    :class="`table-header-bg-${store.nightMode}`"
                                >
                                    <!-- Custom header text -->
                                    {{ column.title}}
                                </th>
                            </tr>
                            
                        </template>
                    </v-data-table>
                </div>
                <v-btn to="/" color="success">回首頁 <v-icon>mdi-home</v-icon></v-btn>
                </v-col>
                <v-col cols="1">&nbsp;</v-col>
            </v-row>
            <v-row><v-col cols="12" class="text-left"></v-col></v-row>
        </v-card-text>
    </v-card>
  </main>
</template>
<script setup>
import AppHeader from '../components/AppHeader.vue' 
import TheDialog from '../components/TheDialog.vue'

import {useAppStore} from '@/stores'
const store = useAppStore()

const twelveActress = [
	{"名字":"文官", "行當":"小生", "去留":"賈母自使"}, 
	{"名字":"寶官", "行當":"小生", "去留":"乾娘領回"}, 
	{"名字":"齡官", "行當":"小旦", "去留":"乾娘領回"}, 
	{"名字":"玉官", "行當":"正旦", "去留":"乾娘領回"}, 
	{"名字":"菂官", "行當":"小旦", "去留":"乾娘領回　【原菂官已故，此菂官乃後補。】"}, 
	{"名字":"藕官", "行當":"小生", "去留":"指與黛玉 【與故菂官，假鳳虛凰】。後來出家跟了地藏庵的圓心。"}, 
	{"名字":"蕊官", "行當":"小旦", "去留":"跟了寶釵。後來出家跟了地藏庵的圓心。"},
	{"名字":"芳官", "行當":"正旦", "去留":"指與寶玉。後來出家跟了水月庵的智通。"}, 
	{"名字":"荳官", "行當":"小花面（丑角）", "去留":"跟了寶琴。"}, 
	{"名字":"葵官", "行當":"大花面（凈角）", "去留":"跟了湘雲。"}, 
	{"名字":"艾官", "行當":"老外（末角）", "去留":"跟了探春。"},  
	{"名字":"茄官", "行當":"老旦", "去留":"跟了尤氏。"}  
]
</script>
<style>
</style>
