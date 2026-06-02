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
                <div style="width:96%; margin:0 auto;">
                    <v-btn to="/" color="success" class="float-right">回首頁 <v-icon>mdi-home</v-icon></v-btn>
                    <h1>紅樓夢版本一覽表</h1>
                    <v-data-table 
                        :items="versions"
                        :items-per-page="-1"       
                        hide-default-footer       
                        class="elevation-1"
                        style="font-size:150%;"
                    >
                        <!-- Custom header slot -->
                        <template v-slot:headers="{ columns }">
                            <tr>
                                <th v-for="column in columns"
                                    :key="column.key"
                                    :class="`table-header-bg-${store.nightMode}`"
                                > {{ column.title}} </th>
                            </tr>
                        </template>
                        <template v-slot:item="{item}">
                        <tr>
                            <td>{{ item.簡稱 }}</td>
                            <td><a :href="item.資源位置" target="_blank">{{ item.資源位置 }}</a></td>
                        </tr>
                        </template>
                    </v-data-table>
                </div>
                <v-btn to="/" color="success">回首頁 <v-icon>mdi-home</v-icon></v-btn>
                </v-col>
                <v-col cols="1"></v-col>
            </v-row>
            <v-row><v-col cols="12" class="text-left">
            </v-col></v-row>
        </v-card-text>
    </v-card>
  </main>
</template>
<script setup>
import AppHeader from '../components/AppHeader.vue'
import TheDialog from '../components/TheDialog.vue'

import {useAppStore} from '@/stores'
const store = useAppStore()

const versions = [
    { "簡稱": "《楊藏本》又稱《夢稿本》", "資源位置": ""},
    { "簡稱": "《甲戌本》", "資源位置": ""},
    { "簡稱": "《己卯本》", "資源位置": ""},
    { "簡稱": "《庚辰本》", "資源位置": ""},
    
    { "簡稱": "《程甲本》", "資源位置": ""},
    
    { "簡稱": "《戚序本》", "資源位置": ""},
    { "簡稱": "《夢覺本》", "資源位置": ""},
    { "簡稱": "《列藏本》", "資源位置": ""},
    { "簡稱": "《舒序本》", "資源位置": ""},
    { "簡稱": "《蒙古藏本》", "資源位置": ""},
    { "簡稱": "《鄭本》", "資源位置": ""},
    { "簡稱": "《卞藏本》", "資源位置": ""},
    { "簡稱": "《吳藏抄本》", "資源位置": ""},
    { "簡稱": "《吳藏殘抄本》", "資源位置": ""},
    { "簡稱": "《戩穀抄本》", "資源位置": ""},
    { "簡稱": "《靖藏本》", "資源位置": ""},
    { "簡稱": "《癸酉本》", "資源位置": ""},
]
</script>

