<template>
    <!--if 版本簡介-->
    <v-card v-if="version">
        <v-card-title>{{ version.name }} 簡介</v-card-title>
        <v-card-text class="mt-5 text-h5" >
            <div style="width:70%; margin:0 auto;">
                {{ version.description }}
                <p class="mt-3">
                    <strong>附注：</strong>
                    {{ version.note }}
                </p>
            </div>
        </v-card-text>
    </v-card>

    <!--if 前言-->
    <v-card v-else id="vc_prologue">
        <v-card-text class="text-h5">
            <v-row class="mb-6" >
                <v-col cols="1">&nbsp;</v-col>
                <v-col cols="10">
                    <v-btn @click="playPrologue" title="播放前言" style="font-size:125%;">🔊</v-btn> 
                    <template v-for="(p, pi) in prologue">
                        <template v-if="p.list!==undifined && p.list==true">
                            <ul><li v-for="(txt, ti) in p.text" v-html="txt" :id="`p_${pi}_${ti}`"></li></ul>
                        </template>
                        <template v-else-if="p.text!==undifined">
                            <p><span v-for="(txt, ti) in p.text" v-html="txt" :id="`p_${pi}_${ti}`"></span></p>
                        </template>
                    </template>
                <br/><br/>    
                </v-col>
                <v-col cols="1">&nbsp;</v-col>
            </v-row>
        </v-card-text>
    </v-card>

</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import {useAppStore} from '@/stores'
const store = useAppStore()
const versions = store.versions

const props = defineProps({
    data:{
        type: [String,Number], 
        required: true
    }
})

import useSharedComp from '@/assets/js/SharedComp.js'
const {getOS} = useSharedComp()

import prologue_src from "@/assets/js/前言.json"
import globalAdj    from '@/assets/js/globalAdjustment.json'
const prologue = ref()
prologue.value = prologue_src.paragraph

const version = ref()
if(props.data!= null){
    version.value = versions.find(v=> v.id.toString()==props.data.toString())
}

const voices = synth.getVoices().filter(v=> ["zh-TW", "zh-CN"].includes(v.lang))
const hasChineseVoice = ref( voices.length > 0 )
let msg = `無安裝合適的中文語音。請安裝中文語音。\nNo suitable Chinese speech voices were found. \n
          Please install a Chinese speech voice to enable the text-to-speech feature.\n`
const voice = ref(voices[store.defaultVoice])

function playPrologue(){
     prologue.value.forEach((p, pi)=>{
        p.text.forEach((txt, ti) =>{
            TextToSpeech(txt, `p_${pi}_${ti}`)
        }) 
      })
}

function TextToSpeech(txt, paragraph_Item){
    if(hasChineseVoice.value){
        const utterance = new SpeechSynthesisUtterance()
        utterance.voice = voices[store.defaultVoice]      //voice.value                
        utterance.lang = voices[store.defaultVoice].lang  //voice.value.lang 
        utterance.rate = 1 +0.01*store.wordSpeed - (getOS==='macOS'? 0.5 : 0.25)
        utterance.pitch = store.defaultVoice? 0 : 1
        

        globalAdj.forEach(p=>{
          txt = txt.replace(new RegExp(p.char,'g') , p.readAs)
        })

        txt = txt.replace(new RegExp(/<|[a-z A-Z]+|>|\//,'g') , '')
        
        utterance.text =  txt
        utterance.onpause = (event) =>{
          console.log("Speech paused at:", event.elapsedTime, "seconds. " , txt );
        }

        let popup = document.getElementById('vc_prologue')
        let verse_box_Position = 0
        let verse_box = document.getElementById(paragraph_Item)
        utterance.onstart = (event) => {
            let color = store.swatches[`${store.nightMode}`][store.highlightColor].color
            verse_box_Position = verse_box_Position + verse_box.getBoundingClientRect().top-200 
            console.log(`Started uttering: ${paragraph_Item}`,verse_box_Position,  verse_box) 
              // highligh the target verse
              verse_box.setAttribute('style', `background-color: ${color};`)
              // Scroll to the target verse
              popup.scrollBy({ top: verse_box_Position, behavior: 'smooth' } )

        }

        utterance.onend = (event) =>{
            verse_box.setAttribute('style', 'background-color: none;')
        }

        synth.speak(utterance)
    } else {
        alert(msg)
    }

}

function stopPlayPrologue(){ 
    synth.cancel()
}

onMounted(async ()=>{

})

onUnmounted(async ()=>{
    stopPlayPrologue()
})
</script>