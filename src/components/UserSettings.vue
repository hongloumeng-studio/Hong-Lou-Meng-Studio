<template>
    <v-card>
      <v-card-text class="mt-3">
        <v-row class="text-center">
            <v-col lg="2" md="4" sm="6" cols="12" class="text-center">
                <v-select v-model="_defaultOpenVersion" 
                    label="預設開啓版本"
                    :items="_versions"
                    rounded variant="outlined" density="compact"
                >
                </v-select>
            </v-col> 
            <v-col lg="3" md="4" sm="6" cols="12" class="text-center">
                <v-select v-model="_voice" 
                    label="語音設定"
                    :items="voiceMenu"
                    rounded variant="outlined" density="compact"
                >
                </v-select>
            </v-col>  
            
            <v-col  lg="2" md="4" sm="6" cols="12" class="text-left">
                <div style="margin-top:-1em;">語速： {{ `${_wordSpeed==0? '極慢': _wordSpeed} `}}</div>
                <v-slider
                    v-model="_wordSpeed"
                    thumb-label
                    prepend-icon="mdi-speedometer"
                    class="ma-0"
                    step="10"
                    color="success"
                    ></v-slider>
            </v-col> 
        </v-row>    
        <v-row class="text-center">
            <v-col lg="1" md="4" sm="3" cols="6" class="text-center"> 
                <div style="margin-top:-1em;">字體</div>
                <v-switch
                    v-model="_fontSize"
                    hide-details
                    true-value="1"
                    false-value="0"
                    style="display: inline-block; margin-top: -.25em;"
                    :label="`${_fontSize=='1'? '大': '小'}`"
                    color="success"
                ></v-switch>
            </v-col>
            <v-col lg="1" md="4" sm="3" cols="6" class="text-left">
                <div style="margin-top:-1em;">捲軸</div>
                <v-switch
                    v-model="_separatedScroll"
                    hide-details
                    :true-value ="true"
                    :false-value="false"
                    style="display: inline-block; margin-top: -.25em;"
                    :label="`${_separatedScroll? '獨立':'同步'}`"
                    color="success"
                ></v-switch>
            </v-col>
            <v-col lg="2" md="4" sm="3" cols="6" class="text-left">
                <div style="margin-top:-1em;">閲讀模式</div>
                <v-switch
                    v-model="_nightMode"
                    hide-details
                    :true-value ="true"
                    :false-value="false"
                    style="display: inline-block; margin-top: -.25em;"
                    :label="`${_nightMode? '夜':'日'}間`"
                    color="success"
                ></v-switch>
            </v-col>
            <v-col lg="2" md="4" sm="3" cols="6" class="text-left">
                <div style="margin-top:-1em;">展開批語</div>
                <v-switch
                    v-model="_displayCritique"
                    hide-details
                    :true-value ="true"
                    :false-value="false"
                    style="display: inline-block; margin-top: -.25em;"
                    :label="`${_displayCritique? '固定':'手動'}展開`"
                    color="success"
                ></v-switch>
            </v-col>
            <v-col lg="1" md="4" sm="3" cols="6" class="text-left" color="yellow">
                <div :style="`margin-top:-1em; background-color: ${swatches[`${store.nightMode}`][_highlightColor].color};`" 
                    class="text-center"
                >底標顔色</div>
                <v-select v-model="_highlightColor" 
                    :items="swatches[`${_nightMode}`]"
                    item-title="title"
                    item-value="id"
                    rounded variant="outlined" density="compact"
                >
                </v-select>
            </v-col>
        </v-row>
      </v-card-text>
    </v-card>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores'
const store = useAppStore()
const swatches = ref(store.swatches)

////// SET UP Voice Menu
const voiceMenu = ref([])  // v-select dropdown menu
const voices = synth.getVoices().filter(v=> ["zh-TW", "zh-CN"].includes(v.lang))
// Populate the voice menu with available ZH voices
voices.forEach((voice, index)=>{
    voiceMenu.value.push({value: index, title: voice.name})  // v-select menu items
})

const _versions =ref([])
store.versions.forEach(v=>{
    _versions.value.push({value: v.id, title: v.name})
})

////// USER SETTINGS DIALOG ITEMS
const _voice = ref( store.defaultVoice ??  voices.length-1) 
watch(_voice, (val)=>{ 
    window.localStorage.setItem('defaultVoice', val.toString()) 
    store.updateDefaultVoice(val)           // Integer
})

const _defaultOpenVersion = ref(store.defaultOpenVersion ?? 0)
watch(_defaultOpenVersion, (val)=>{ 
    window.localStorage.setItem('defaultOpenVersion', val.toString()) 
    store.updateDefaultOpenVersion(val)     // Integer
})

const _wordSpeed= ref(store.wordSpeed)
watch(_wordSpeed, (val)=>{ 
    window.localStorage.setItem('wordSpeed', val.toString()) 
    store.updateWordSpeed(val.toString())   // String
})

const _fontSize  = ref(store.fontSize)
watch(_fontSize, (val)=>{ 
    window.localStorage.setItem('fontSize', val.toString()) 
    store.updateFontSize(val.toString())    // String
})

const _separatedScroll = ref(store.separatedScroll)  // default to false
watch(_separatedScroll, (val)=>{ 
    window.localStorage.setItem('separatedScroll', val) 
    store.updateSeparatedScroll(val)         // Boolean
})

import { useTheme } from 'vuetify'
const theme = useTheme()
function toggleTheme () {
    theme.global.name.value = theme.global.name.value=='dark' ? 'light' : 'dark'
}

const _nightMode = ref(store.nightMode)     // Default to false => 'light' background
watch(_nightMode, (val)=>{ 
    window.localStorage.setItem('nightMode', val) 
    store.updateNightMode(val)              // Boolean
    theme.global.name.value = _nightMode.value? 'dark' : 'light'
})

const _displayCritique = ref(store.displayCritique)  // default to false => 'manually open critique'
watch(_displayCritique, (val)=>{ 
    window.localStorage.setItem('displayCritique', val) 
    store.updateDisplayCritique(val)        // Boolean
})


const _highlightColor = ref(store.highlightColor)  
watch(_highlightColor, (val)=>{ 
    window.localStorage.setItem('highlightColor', val) 
    // console.log(val)
    store.updateHighlightColor(val)          
    
})
</script>