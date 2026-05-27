<template>
<v-row>
  <v-col :cols="col_Distribution[`${showComments}`].left">
  <div v-for="version in store.versions" >
    <div v-if="store.activeVersions.includes(version.name)" 
        class="text-caption float-left"
        :style="`width:${100/store.activeVersions.length}%;`"
    >
      <div  :id="'version_'+version.id" 
            :class="store.separatedScroll? 'separated-scroll':''" 
            style="margin-top:9rem;"
      >
        <div v-if="store.chpFolder" >
          <v-card v-if="currentVersionChapter(version.id, store.chapterNumber)">
            <!--回目-->
              <ChapterTitle :title="currentVersionChapter(version.id, store.chapterNumber).title ?? voidChapterTitle(store.chapterNumber)"/>
            <!--回目-->
            <!--圖例 (upcoming feature; disabled currently )-->
            
            <template v-if="currentVersionChapter(version.id, store.chapterNumber).figure!==undefined">
              <ImageCarousel :figure="currentVersionChapter(version.id, store.chapterNumber).figure" />
            </template>
            <!--圖例-->
            
            <!--回文-->
              <v-card-text  :class="`text-h${store.fontSize=='1'? '4': '5'}`"> 
                <template v-for="(verse, index) in currentVersionChapter(version.id, store.chapterNumber).content"
                      :key="`${version.id}_${store.chapterNumber}_${verse.id}`">
                  <Sentence 
                        :ver_chp_id="`${version.id}_${store.chapterNumber}`" 
                        :id="verse.id" 
                        :text="verse.text" 
                        :annotate="verse.annotate"
                        :critique="verse.critique"
                        :original="verse.original"
                    ></Sentence>
                </template>
              </v-card-text>
            <!--回文-->
          </v-card>
        </div>
      </div>
    </div>
  </div>
  </v-col>

  <v-col :cols="col_Distribution[`${showComments}`].right">
    <div class="fixed-box border-md pa-1" >
        <YTComments v-if="showComments" :video="store.video" />
    </div>
  </v-col>

</v-row>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import ChapterTitle  from '@/components/ChapterTitle.vue'
import Sentence      from '@/components/Sentence.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import YTComments    from '@/components/YTComments.vue'

import {useAppStore} from '@/stores'
const store = useAppStore()
const showComments= ref(false)

function currentVersionChapter(versionID, chapterNumber) {
  return store.chpFolder[`${versionID}_${chapterNumber}`]
}
function voidChapterTitle(id) {
  return {"id": id,"title":{"text":"（無）"}, "content":[{"id":"1","text":"\t\t無相應章回0。\n\n"}]}
}

const col_Distribution = {
  "true":  {"left": 10, "right": 2}
, "false": {"left": 12, "right": 0}
}
  
  const playingVersion=ref(-1)   // -1: not any version is currently playing

  var intervalID = null  // initizlize an interval handle
  
  function checkSynthStatus() {
      if(! synth.pending) {
        playMode.value='stop'
        showSnackbar.value=false
        playingVersion.value=-1
        window.clearInterval(intervalID)  // clear the interval listening
      }
      // console.log(synth.pending)
   }

   import useEmitter from '@/assets/js/Emitter.js'
   const emitter  = useEmitter()

onMounted(() => {
    emitter.on('openCommentBox', (data) => {
        // console.log('Reader Platform opens Comment Box:', data.value)
        showComments.value = data.value 
    }) 
})
  
</script>
  
<style>
  @media only screen and (min-width: 992px) {
    .carousel-figure {width:30vw !important; margin:0 auto; text-align:center;}
  }

  @media only screen and (max-width: 768px) {
    .carousel-figure, .v-window  {width:50vw !important; margin:0 auto; text-align:center;}
  }

  @media only screen and (max-width: 576px) {
    .carousel-figure, .v-window  {width:100% !important; margin:0 auto; text-align:center;}
  }

  .carousel-caption {
      padding:1px 5px; border-radius: 3px; opacity: 0.8;
  }

  /* Change inactive delimiter color */
  /*.v-carousel__controls__item {
    color: #bbb !important; -- light gray 
  }
  */

  /* Change active delimiter color */
  .v-carousel__controls__item.v-btn.v-btn--active {
    color: #ff5722 !important; /* orange */
  }

  .small-chip {
      padding: 0px 8px !important;
  }
  .version-descr {
    line-height:125%;
    /* max-height:8em;min-height:5em;overflow:scroll; */
  }
  .setting-btn {margin:0px 6px 0 8px; font-size:75%;padding:0.25em;}
  .separated-scroll {height:800px;overflow:scroll;}
  .fixed-box {
      position: fixed;
      top: 200;
      left:83%;
      width: 16%; /* Adjust width as needed */
      z-index: 1000; /* Ensure it stays above other content */
      min-height: 20em;
}
</style>
  