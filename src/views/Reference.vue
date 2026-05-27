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
                    <h1>相關文獻與資源</h1>
                    <v-data-table 
                        :items="references"
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

const references = [
    { "簡稱": "維基文庫《脂硯齋重評石頭記》", "資源位置": "https://zh.wikisource.org/wiki/脂硯齋重評石頭記"},
    { "簡稱": "《紅樓夢•精緻乙版》因時間久遠此網頁已不復存在。", "資源位置": "http://www.speedy7.com/cn/stguru/gb2312/redmansions.htm"},
    { "簡稱": "《癸酉本石頭記》後二十八回。 原始簡體版網頁已不復存在。目前GitHub可查内容。", "資源位置": "https://vicalloy.github.io/the-guiyou-version-of-dream-of-the-red-chamber/ "},
    { "簡稱": "維基文庫《紅樓夢（程甲本）》", "資源位置": "https://zh.wikisource.org/wiki/紅樓夢（程甲本）"},
    { "簡稱": "清•孫温《紅樓夢•繪本》GitHub資源", "資源位置": "https://github.com/changren-wcr/sunwen"},
    { "簡稱": "清•孫温繪全本紅樓夢 PDF資源", "資源位置": "https://www.scribd.com/document/711727966/清-孙温绘全本红楼梦01"},
    { "簡稱": "台灣教育部《重編國語辭典修訂本》", "資源位置": "https://dict.revised.moe.edu.tw/index.jsp"},
    { "簡稱": "台灣教育部《異體字字典》", "資源位置": "https://dict.variants.moe.edu.tw/"},
    { "簡稱": "維基文庫《鶯鶯傳》", "資源位置": "https://zh.wikisource.org/zh-hant/鶯鶯傳"},
    { "簡稱": "紅樓夢(通行本)全一冊 pdf", "資源位置": "https://archive.org/details/20210126_20210126_1456/mode/2up"},
    { "簡稱": "第50回燈謎詩解釋", "資源位置": "https://www.newton.com.tw/wiki/燈謎詩/794665"},
    { "簡稱": "《女兒芙蓉誄》解釋（中華古詩文古書籍網）", "資源位置": "https://www.arteducation.com.tw/shiwenv_e6d2a3f7c6bc.html"},
    { "簡稱": "", "資源位置": ""},
]
</script>

