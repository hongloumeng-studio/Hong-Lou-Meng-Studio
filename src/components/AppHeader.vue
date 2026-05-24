<template>
<v-app-bar>
    <v-app-bar-title style="min-width:16em;" >
      <span class="text-h4">{{`${site_title}`}}</span>
      <br>{{`${site_subtitle}`}}
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div style="width:40%;">
    <v-row class="ma-0 pa-0">
      <v-col lg="8" md="8" cols="12" class="ma-0 pa-0 text-right">
        <template v-if="props.showNavigation">
        <v-chip color="green" style="min-width:8rem"
                v-if="hasChineseVoice" 
              >   綠版第 
                  <input type="text" v-model.number="playFrom" :disabled="playMode!='stop'"
                    @focus="$event.target.select()"
                    @keyup.enter="play" class="play-from" 
                  />  
                  <v-badge content="?" color="success" class="mr-5" @click="showHelp('playFrom')" :title="helper['playFrom']" > 
                    <span class="ml-1 mr-4">節起</span> </v-badge> 
                  <v-icon v-if="playMode=='playing'" @click="pause"  title="Pause"  icon="mdi-pause" size="x-large"></v-icon>
                  <v-icon v-if="playMode=='stop'"    @click="play"   title="Play"   icon="mdi-play"  size="x-large"></v-icon>
                  <v-icon v-if="playMode=='paused'"  @click="resume" title="Resume" icon="mdi-play"  size="x-large"></v-icon>
                  <v-icon       class="ml-2"         @click="stop"   title="Stop"   icon="mdi-stop"  size="x-large"></v-icon>
        </v-chip>
        </template>
  </v-col>
  <v-col lg="4" md="4" cols="12" class="ma-0 pa-0 text-center">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn class="mx-3"
            color="primary"
            variant="outlined"
            v-bind="props"
          >
            設定 與 附錄
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openDialog('前言 About')">前言 About</v-list-item>
          <v-list-item @click="openDialog('設定 Settings')">設定 Settings<v-icon icon="mdi-cog"></v-icon></v-list-item>
          <v-list-item to="/installZhVoices">安裝中文語音</v-list-item>

          <!-- Second Layer Menu 附錄 -->
                  <v-menu
                    open-on-hover
                    offset-x
                    location="end"
                  >
                      <template #activator="{ props }">
                        <v-list-item
                          v-bind="props"
                          title="收藏的附錄"
                          prepend-icon="mdi-chevron-down"
                        />
                      </template>
                      <!-- Second Layer Menu Items -->
                      <v-list><v-list-item to="/riddles">第五十回《燈謎詩》的解釋</v-list-item></v-list>
                      <v-list><v-list-item to="/twelveActresses">十二戲子一覽表</v-list-item></v-list>
                      <v-list><v-list-item to="/correctioList">一并校正的字彙</v-list-item></v-list>
                      <v-list><v-list-item to="/timeline">時間綫 Timeline</v-list-item></v-list>
                  </v-menu>
        </v-list>
      </v-menu>
      </v-col>
    </v-row>
    </div>
    <!-- Extend to add a second line -->
    <template v-if="props.showNavigation" v-slot:extension>
      <div class="d-flex justify-center">
        <template v-for="version in versions">
          <v-chip
                size="small"
                class="d-inline-flex mx-2"
                :color="activeVersions[0]==version.name ? 'success':''"
                @click="versionToggle(version.id)"
          >   
                {{ version.name }}
                <v-icon v-if="activeVersions.includes(version.name)" size="large" icon="mdi-eye"></v-icon>
          </v-chip>
          <v-badge content="?" :color="activeVersions[0]==version.name ? 'primary':''" @click="openDialog(`About_${version.id}`)" :title="version.name+'：簡介'" 
            class="cursor-pointer" style="margin:.7em 1.5em 0 0.25em;font-size:50%;">
          </v-badge>  
        </template>
      </div>
    </template>
</v-app-bar>

<v-system-bar v-if="props.showNavigation" window class="system-bat-height">
    <v-row>
      <v-col lg="4" md="4" cols="6" class="text-left">
          <v-select v-model.number="_chapterNumber"
              :items="chapterMenu"
              item-title="title"
              item-value="id"
              label="章回"
              color="success"
              rounded variant="outlined" density="compact"
              class="ml-3"
              @update:modelValue="changeChapterNumber"
              style="margin:2rem 0 0.75rem;min-width:15rem; max-width:30rem;"
            >
              <template v-slot:append>
                <v-icon color="primary" @click="showHelp('chapterMenu')" style="margin-left:-1rem;" 
                  :title="helper['chapterMenu']"
                >
                mdi-help-circle
              </v-icon>
            </template> 
          </v-select>
      </v-col>
      <v-col lg="2" md="2" cols="3" class="text-left">
          <v-text-field v-model.number="_chapterNumber"
              label="快選"
              :rules="[rules.numeric]"
              hide-details
              type="number"
              @click:appendInner  = "_chapterNumber++"
              @click:prependInner = "_chapterNumber--"
              rounded variant="outlined" density="compact"
              @focus="$event.target.select()"
              @keydown.enter="changeChapterNumber"
              style="margin:2rem 0 0.75rem;min-width:7rem; max-width:7rem;"
          >
            <template v-slot:append>
              <v-icon color="primary" @click="showHelp('changeChapterNumber')" style="margin-left:-1rem;" 
                  :title="helper['changeChapterNumber']"
              >
                mdi-help-circle
              </v-icon>
            </template> 
        </v-text-field>
      </v-col>
      <v-col lg="1" md="1" cols="1" class="text-right">
        <v-switch
            v-model="_displayCritique"
            hide-details
            :true-value ="true"
            :false-value="false"
            style="display: inline-block; margin-top: 1.5rem;"
            label="批語"
            color="success"
          ></v-switch>
      </v-col>
      <v-col lg="3" md="1" cols="1" class="text-right">
      </v-col>
      <v-col lg="2" md="1" cols="1" class="text-right">
          <v-chip class="mr-3" 
            @click="toggleCommentBox"
            :color="`${openCommentBox? 'success':''}`"
            :append-icon="`mdi-${openCommentBox? 'close-box':'comment-plus'}`"
            style="margin:2.25rem 0 0.75rem;min-width:7rem; max-width:7rem;"
        >
          飛語留言 
        </v-chip>
      </v-col>
    </v-row>
        
</v-system-bar>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
    showNavigation :{
        type: [Boolean], 
        required: false,
        default: true}
    })
import {useAppStore} from '@/stores'
const store = useAppStore()
const versions = store.versions
const activeVersions = store.activeVersions

const site_title =  import.meta.env.VITE_SITE_TITLE 
const site_subtitle =  import.meta.env.VITE_SITE_SUBTITLE 

import axios from 'axios'

import voidChapterJSON    from "@/assets/js/chapterNotFound.json"
import versionChapterMenu from "@/assets/js/versionChapterMenu.json"
import globalAdj from '@/assets/js/globalAdjustment.json'

const chpFolder = store.chpFolder  // A collection of chapters (with same chapter number) from each active Version.
const chapterMenu = ref()
const voidChapterTemplate = ref({})
const _chapterNumber = ref(store.chapterNumber ?? 1)
const playingVersion = ref(-1)   // Default -1: no version is playing currently

/* window.speechSynthesis has been loaded on the index.html page
// This app use the Chinese voices only 
// */
// Repeat synth.getVoices() to make it for sure
  //const voices1 = synth.getVoices()
  //console.log('voices:', voices1)
  
const voices = synth.getVoices().filter(v=> ["zh-TW", "zh-CN"].includes(v.lang))
const hasChineseVoice = ref(voices.length>0)

const voice = ref(voices[store.defaultVoice])
const playFrom =ref(null)
const playMode=ref('stop')     // possible modes: stop|paused|playing
var intervalID = null  // initizlize an interval handle

const _displayCritique = ref(store.displayCritique)  // default to false => 'manually open critique'
watch(_displayCritique, (val)=>{ 
    window.localStorage.setItem('displayCritique', val) 
    store.updateDisplayCritique(val)     // Boolean
})

function play(){
  let version = versions.find(v=> v.name==activeVersions[0])
    playingVersion.value=version.id
      // showSnackbar.value=true
      let chap = chpFolder[`${version.id}_${_chapterNumber.value}`]
      
      if(! playFrom.value ){
        // read chapter title
        playVerse(chap.title)
      }
      chap.content.forEach((verse, i)=>{
        if( parseInt(verse.id) >= playFrom.value ){
          playVerse(verse);

        }
      })
      // check the SpeechSynthesis Utterance status every 5 second
      // when it ends speaking, reset the playMode & playingVersion
      intervalID = window.setInterval(checkSynthStatus, 5000) 
}
function stop(){ 
    synth.cancel()
    playMode.value='stop'
    playingVersion.value=-1
}
function pause(){ 
    synth.pause()
    playMode.value='paused'
}

function resume(){ 
    synth.resume()
    playMode.value='playing'
}

function playVerse(verse){
    let version = versions.find(v=> v.name==activeVersions[0])
    let vid = `vid_${version.id}_${_chapterNumber.value}_`
    let prev_vid = null
    if(verse.id){
      prev_vid = vid + (verse.id-1)
      vid = vid + verse.id
    } else {
      // title
      vid = vid + 'title'  // not in used by ChapterTitle.vue
    }

    if(hasChineseVoice.value){
        const utterance = new SpeechSynthesisUtterance()
        playMode.value='playing'
        let txt = ''
        if(typeof verse == 'string'){
          txt = verse
        } else {
          txt =verse.text
        }
        // utterance.voice = voices[verse.id % 3]
        utterance.voice = voices[store.defaultVoice] //voice.value                
        utterance.lang = voices[store.defaultVoice].lang  //voice.value.lang 
        utterance.rate = 1 + 0.01*store.wordSpeed
        utterance.pitch = store.defaultVoice? 0 : 1

        if(vid.includes('title')){   // a title text spread out the balnk spaces 
            txt = txt.replace(/\s/g, '。! 。！')
        }
        if(verse.pronounce){
          verse.pronounce.forEach(p=>{
            txt = txt.replace(new RegExp(p.char,'g'), p.readAs) 
          })
        } 
        globalAdj.forEach(p=>{
          txt = txt.replace(new RegExp(p.char,'g') , p.readAs)
        })

        txt = txt.replace(new RegExp(/\[\d+]/,'g') , '')
        
        utterance.text =  txt
        // utterance.onpause = (event) =>{
        //   console.log("Speech paused at:", event.elapsedTime, "seconds. " , verse );
        // }
        let verse_div_Position = 0
        let verse_div = document.getElementById(vid)
        utterance.onstart = (event) => {
            // console.log(`Started uttering: ${vid}`, event) 
            if(! vid.includes('title')){ 
              // highligh the target verse
              let color = store.swatches[`${store.nightMode}`][store.highlightColor].color
              verse_div.setAttribute('style', `background-color: ${color};`)
              // Scroll to the target verse
              verse_div_Position = verse_div_Position + verse_div.getBoundingClientRect().top+window.pageYOffset - 266    // 200 px less of the anchor position
              window.scrollTo({ top: verse_div_Position, behavior: 'smooth' })
              // update playFrom.value to cuurent playing verse
              playFrom.value = verse.id
            }
        }
        utterance.onend = (event) =>{
          if(! vid.includes('title')){ 
            verse_div.setAttribute('style', 'background-color: none;')
          }
        }
          //  console.log(verse.id.toString() + '  '+  txt)
        synth.speak(utterance)
    } else {
        alert(msg)
    }
}

function checkSynthStatus() {
      if(! synth.pending) {
        playMode.value='stop'
        // showSnackbar.value=false
        playingVersion.value=-1
        window.clearInterval(intervalID)  // clear the interval listening
      }
      // console.log(synth.pending)
}

function switchVoice(){
    voice.value = voices[voiceSelected.value]
}

const helper = {
  "playFrom":"所選綠標版本，將語音朗讀的起始章節號碼。\n(0 = 從頭開始)"
, "changeChapterNumber":"輸入阿拉伯數字，快速翻至該章回。"
, "chapterMenu":"因版本回目不同。菜單[下拉功能表]會以標記為綠色的版本回目為依歸。"
}
let msg = `無已安裝的中文語音。請安裝中文語音。\nNo suitable Chinese speech voices were found. \n
          Please install a Chinese speech voice to enable the text-to-speech feature.\n`

function showHelp(item){
    alert(helper[item])
}

import useEmitter from '@/assets/js/Emitter.js'
const emitter  = useEmitter()
function openDialog(dialog){
      emitter.emit('openDialog', {dialog: dialog})
}
const openCommentBox= ref(false)

function toggleCommentBox(){
  openCommentBox.value = !openCommentBox.value
  emitter.emit('openCommentBox', {value: openCommentBox.value })
}

const rules=ref({
      numeric: value => {
        return !value || (!isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10)) )
            || ' 1 - 120'},
})

function changeChapterNumber(){
    if(_chapterNumber.value && isInt(_chapterNumber.value)){  
        playFrom.value = 0   // When chapter # successfully changed; playFrom reset to 0

    }
}
function isInt(value){
    return !isNaN(value) &&  parseInt(Number(value)) == value &&  !isNaN(parseInt(value, 10)) 
}

function getVersionChapter(versionId, chapterID, isPlaying=false, isFirstActiveVersion=true){
  // console.log('ChapterID : ', chapterID)
  if(chapterID!==null){
    let version = versions.find(v=> v.id==versionId)
    let versionName = version.name
    let chapter_3digit = ('00'+chapterID).slice(-3)
    let file = `/versions/${versionName}/${versionName}chapter${chapter_3digit}.json`
    console.log('加載...', `${versionName} chapter ${chapter_3digit}`)
    axios.get(file)
      .then(r=>{
        // Add the version-chpater to the chpFolder
        // console.log(r)
        if(r.data.id){
          chpFolder[`${version.id}_${chapterID}`] = r.data
          if(isPlaying) play(versionId)
          if(isFirstActiveVersion && r.data?.video){
              // Store the video url in session
              store.updateVideo( r.data.video ) 
              // For the first active version, update the chapter's videoID for YTComment
              emitter.emit('onChapterNumberChanged', {video:  r.data.video})
          }
          
          
        } else {
          voidChapterTemplate.value.id = chapterID
          chpFolder[`${version.id}_${chapterID}`] = voidChapterTemplate.value
        }
        
      })
      .catch(e=>{ 
          // console.log(e)
          if(e.response.status == 404){
              // When selected veriosn-chapter file is not found
              // Use voidChapterTemplate, but replace it null-value id as the value in chapterID
              // Then add the voidChapterTemplate into chpFolder
              voidChapterTemplate.value.id = chapterID
              chpFolder[`${version.id}_${chapterID}`] = voidChapterTemplate.value
          } else {
              console.log(e)
          }
      })
  } else {

    voidChapterTemplate.value.id = 0
    chpFolder[`${versionId}_0`] = voidChapterTemplate.value
  }
}

function versionToggle(versionId){
      let version = versions.find(v=> v.id==versionId)
      let index = activeVersions.indexOf(version.name)  
      // console.log( 'The version: ', version)
      if(index != -1){ 
        //Found in activeVersions; therefore, remove it from activeVersions
        activeVersions.splice(index, 1) 
        updateChapterMenu()
        if(playingVersion.value==versionId)  stop(versionId)  //Stop the playing
      } else {  // Not found in activeVersions; therefore, add it to the activeVersions
        activeVersions.push(version.name)
        // If this version is index 0 , update the chapter menu
        
        updateChapterMenu()
        // Add version-chapter to the variable "chapter"
        if(!chpFolder.hasOwnProperty(`${versionId}_${_chapterNumber.value}`)) {
          getVersionChapter(versionId, _chapterNumber.value)
        }
      }
}

async function updateChapterMenu(){
    if( activeVersions.length > 0){
      chapterMenu.value = versionChapterMenu[activeVersions[0]]
    } // otherwise, no need to get any chapterMenu
}

onMounted(async ()=>{
    // INIT the default chapterMenu
    await updateChapterMenu()
    // LOAD the verion-chapter
    // console.log('AppHeader onMounted ', _chapterNumber.value)
    getVersionChapter(versions[store.defaultOpenVersion].id, _chapterNumber.value)

    // GET void chapter template 
    voidChapterTemplate.value = voidChapterJSON
})

watch( _chapterNumber, (val)=>{
    if (val<1)   { _chapterNumber.value=null  }
    if (val>120) { _chapterNumber.value=120 }
    window.localStorage.setItem('chapterNumber', _chapterNumber.value) 
    store.updateChapterNumber(_chapterNumber.value)          // Integer

      playFrom.value =0 
      let confirmed = true
      let isPlaying = playMode.value == 'playing'
      if(isPlaying){
        confirmed = confirm('停止語音，切換章回？')
      }
      if (confirmed){
        // RESET "chpFolder" to empty and playMode => stop
        chpFolder.value={}
        activeVersions.forEach((name, seq)=>{
          let version = versions.find(v=> v.name==name)
          let isFirstActiveVersion =  seq==0 
          stop(version.id)
          getVersionChapter(version.id, _chapterNumber.value, isPlaying, isFirstActiveVersion)
        })
        window.localStorage.setItem('chapterNumber', val)
      }
})
</script>

<style>
.setting-btn {margin:0px 6px 0 8px; font-size:75%; padding:0.25em;}
.play-from { width:40px; border:1px solid grey;color:red; margin-left: 6px;text-align:center; } 
 @media only screen and (min-width: 992px) {
    .system-bat-height {height:3.5rem !important;}
  }

  @media only screen and (max-width: 768px) {
    .system-bat-height {height:3.5rem !important;}
  }

  @media only screen and (max-width: 576px) {
    .system-bat-height {height:56px !important;}
  }

.text-h4 {
  font-size: 2.125rem !important;
  font-weight: 400;
  line-height: 1.175;
  letter-spacing: normal !important;
  text-transform: none !important;
}
  .text-h5 {
  font-size: 1.5rem !important;
  font-weight: 400;
  line-height: 1.333;
  letter-spacing: normal !important;
  text-transform: none !important;
}

</style>