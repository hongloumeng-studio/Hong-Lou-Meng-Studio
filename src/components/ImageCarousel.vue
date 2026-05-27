<template>
    <div v-if="props.figure" :class="{'carousel-figure': props.showFunctionButton}" style="margin:0 auto;">
        <v-carousel :class="{'carousel-figure': props.showFunctionButton}"
                hide-delimiter-background
                v-model="currentIndex"
                :height="height"
        >
            <template v-for="(f, fi) in props.figure" :key="fi">
                <v-carousel-item v-if="f.url" style="margin:0 auto">
                    <template v-if="f.url.includes('docs/assets/sunwen/')">
                      <img :src="`https://cdn.jsdelivr.net/gh/changren-wcr/sunwen@master/${f.url}`" 
                           style="height:95%;"></img>
                    </template>
                    <template v-else-if="f.url.includes('http')">
                      <img :src="`${f.url}`" style="height:95%"></img>
                    </template>
                    <template v-else>
                      <img :src="`images/${f.url}`"  style="height:95%"></img>
                    </template>
                      
                </v-carousel-item>
            </template>
        </v-carousel> 
        <div style="margin:-1rem auto 0 auto;">
            {{props.figure[currentIndex]?.caption}}
            <v-btn icon="mdi-arrow-expand" class="ml-3" size="x-small" title="大圖"
                v-if="props.showFunctionButton"
                @click="openDialog(`${currentIndex}_${JSON.stringify(props.figure)}`)">
            </v-btn>
        </div>
    </div>
</template>
<script setup>
import { ref, shallowRef, onMounted } from 'vue'
const props = defineProps({
    figure:{
        type: [Object], 
        required: true
    },
    index:
    {
        type: Number, 
        required: false,
        default: 0
    },
    showFunctionButton:{
        type: Boolean, 
        required: false,
        default: true
    }
})

import useSharedComp from '@/assets/js/SharedComp.js'
    const {openDialog
        , getViewportHeight
        , getViewportWidth} = useSharedComp()

const currentIndex = shallowRef(props.index)
const width  = ref('380px')
const height = ref('229px')
if(!props.showFunctionButton){
    width.value  = `${getViewportWidth()*0.80}px`
    height.value = `${getViewportHeight()*0.80}px`
}

import useEmitter from '@/assets/js/Emitter.js'
    const emitter  = useEmitter()

onMounted(() => {
    emitter.on('onChapterNumberChanged', async(data) => {
      currentIndex.value = props.index
    })
})
</script>
<style>
@media only screen and (min-width: 992px) {
    .carousel-figure {width:30vw !important; margin:0 auto; text-align:center;}
    /* .carousel-figure {width:1500px !important; margin:0 auto; text-align:center;} */
}

@media only screen and (max-width: 768px) {
.carousel-figure, .v-window  {width:70vw !important; margin:0 auto; text-align:center;}
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
</style>
