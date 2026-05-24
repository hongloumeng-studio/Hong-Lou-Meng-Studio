<template>
    <v-img :src="snippet.authorProfileImageUrl" inline  style="width:1rem;" class="rounded-circle"/>
    <div class="d-inline ml-2">
        <span class="author-name">{{ snippet.authorDisplayName }} </span><br/>
        <span class="text-caption font-weight-thin comment-time">{{ new Date(snippet.publishedAt).toLocaleString() }}</span>
        {{ `${snippet.publishedAt != snippet.updatedAt?' (edited)':''}`}}
    </div>
    <p v-html="snippet.textDisplay"></p>
</template>

<script setup>
import { toRef } from 'vue'
const props=defineProps({
    snippet:{
        type: Object, 
        required: true,
    }
})
var snippet = toRef(props, 'snippet')  // make props reactive to parent value changes
</script>
<style scoped>
    .author-name { font-size:75% !important;}
    .comment-time {font-size:65% !important; line-height: 0.7;}
</style> 
