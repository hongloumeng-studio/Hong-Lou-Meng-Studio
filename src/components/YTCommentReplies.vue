<template>
    <v-chip v-if="comments?.length" 
            size="x-small"
            prepend-icon="mdi-chevron-down" variant="outlined"
            @click="toggleRepliesChip"
    >
        {{ comments.length==1? '1 reply': comments?.length+' replies' }}
    </v-chip>
    <div v-if="showReplies && comments?.length" class="ml-4 bg-grey-lighten-3">
        <template v-for="comment in comments" :key="comment.id">
            <YTCommentSnippet :snippet="comment.snippet"/>
        </template>
    </div>
</template>
<script setup>
import { toRef, ref} from 'vue'
const props=defineProps({
    parentId:{
        type: String, 
        required: true,
    },
    comments:{
        type: Object, 
        required: false,
    }
})

var comments = toRef(props, 'comments')  // make props reactive to parent value changes

const showReplies = ref(false)

function toggleRepliesChip(){
    showReplies.value = !showReplies.value
}
</script>