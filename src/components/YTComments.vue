<template>
    <v-card class="overflow-auto" style="margin-top:11rem; height:calc(100vh - 16rem);">
        <div class="mt-1">
          歡迎開啓油管留言
          <v-btn :href="video" size="x-small" target="_blank" class="ml-5 float-left" title="開啓油管 Open Youtube">
              <v-icon color="error" style="font-size:215%">mdi-youtube</v-icon>
          </v-btn>
        </div>
        <v-divider></v-divider>
        <template v-if="yt_comments">
          <div v-for="comment in yt_comments.items" :key="comment.id" class="mt-5">
            <YTCommentSnippet :snippet="comment.snippet.topLevelComment.snippet"/>
            <template v-if="comment.replies?.comments.length">
              <YTCommentReplies  
                  :parentId="comment.id"
                  :comments="comment.replies?.comments"
              />
            </template>
          </div>
        </template>
    </v-card>
</template>

<script setup>
const props = defineProps({
    video:{
        type: [String], 
        required: true
    }
})
import { ref, onMounted } from 'vue'
import YTCommentSnippet from '@/components/YTCommentSnippet.vue'
import YTCommentReplies from '@/components/YTCommentReplies.vue'

import {useAppStore} from '@/stores'
const store = useAppStore()

import useEmitter from '@/assets/js/Emitter.js'
const emitter  = useEmitter()
const apikey = store.keywords.join('')
const yt_comments = ref()
const videoID = ref()

  async function loadComments(vid) {
      gapi.client.setApiKey(apikey);
      var r = await gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
          .then(function() { 
                    console.log("Youtube api v3 loaded. Now retrieve comments.")
                    return YT_CommentThreadsList(vid)
                },
                function(err) { console.error("Error loading gapi client for Youtube API", err) }
          )
      return r
  }

  async function YT_CommentThreadsList(vid) {
      var comments = await gapi.client.youtube.commentThreads.list({
        "part": [ "snippet, replies"],
        "maxResults": 50,
        "order": "time",
        "videoId": vid
      })
      .then(response=>{
          // Handle the results here (response.body is not parsed).
          // console.log("response.body:",  response.body);
          let cmt = JSON.parse(response.body)
          // Sort the response by comment published date
          cmt.items.sort((a, b) => {
              return new Date(b.snippet.topLevelComment.snippet.publishedAt) - new Date(a.snippet.topLevelComment.snippet.publishedAt)
          })
          return cmt
      })
      .catch(error=>{ console.log("Execute error", error) })  
      return comments
  }
  
onMounted(async () => {
    emitter.on('onChapterNumberChanged', async(data) => {
      if(data?.video){
          videoID.value = data.video.split('/').at(-1)
          yt_comments.value = await loadComments( videoID.value )
      }
    })
    yt_comments.value = await loadComments( props.video.split('/').at(-1))
})
</script>