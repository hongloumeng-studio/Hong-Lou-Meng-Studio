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
                <div style="width:80%; margin:0 auto;">
                    <v-btn to="/" color="success" class="float-right">回首頁 <v-icon>mdi-home</v-icon></v-btn>
                    <h1>《紅樓夢》版本、批語時間公元紀年對照表</h1>
                    <v-data-table 
                        :items="yearList"
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

const yearList = [
    { "紀元": "1753", "干支": "癸酉", "年號": "乾隆十八年" },
    { "紀元": "1754", "干支": "甲戌", "年號": "乾隆十九年 脂硯齋重批" },
    { "紀元": "1755", "干支": "乙亥", "年號": "乾隆二十年" },
    { "紀元": "1756", "干支": "丙子", "年號": "乾隆二十一年" },
    { "紀元": "1757", "干支": "丁丑", "年號": "乾隆二十二年" },
    { "紀元": "1758", "干支": "戊寅", "年號": "乾隆二十三年" },
    { "紀元": "1759", "干支": "己卯", "年號": "乾隆二十四年" },
    { "紀元": "1760", "干支": "庚辰", "年號": "乾隆二十五年"},
    { "紀元": "1761", "干支": "辛巳", "年號": "乾隆二十六年"},
    { "紀元": "1762", "干支": "壬午", "年號": "乾隆二十七年。庚辰本，壬午之批，畸笏。"},
    { "紀元": "1763", "干支": "癸未", "年號": "乾隆二十八年"},
    { "紀元": "1764", "干支": "甲申", "年號": "乾隆二十九年"},
    { "紀元": "1765", "干支": "乙酉", "年號": "乾隆三十年"},
    { "紀元": "1766", "干支": "丙戌", "年號": "乾隆三十一年"},
    { "紀元": "1767", "干支": "丁亥", "年號": "乾隆三十二年"},
]
</script>

