<template>
    <v-dialog v-model="showDialog">
            <v-card>
                <v-row no-gutters class="row-bg-grey">
                    <v-col cols="11" class="text-h6 pl-5">
                        {{dialogTitle}}
                    </v-col>
                    <v-col cols="1" class="text-right pr-5">
                        <v-btn 
                            @click="showDialog = false" 
                            icon size="xsmall" 
                            color="primary">
                                <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row> 

                <UserSettings v-if="dialogTitle=='設定 Settings'" class="overflow-auto" /> 
                <About v-if="dialogTitle.includes('About')" :data="versionId" class="overflow-auto" /> 

                <!-- <div v-if="image_url" style="margin: 1rem auto; width:75%;">
                    <img :src="`${image_url}`" style="width:100%;">
                </div> -->
                <div v-if="image" style="margin: 1rem auto; width:75%;">
                    <ImageCarousel :figure="figure" :index="figureIndex" :showFunctionButton="false"/>
                </div>
            </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserSettings from '@/components/UserSettings.vue'
import About from '@/components/About.vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import useEmitter from '@/assets/js/Emitter.js' // Import the Emitter utility
const emitter = useEmitter() // Create an instance of the Emitter

const showDialog = ref(false)
const dialogTitle= ref('')
const versionId=ref()
const image = ref(false)
const figure = ref()
const figureIndex = ref()

onMounted(() => {
    emitter.on('openDialog', (data) => {
        // console.log('Dialog opened with data:', data.dialog); // Log the dialog type
        if(data.dialog.includes('About')){
            let [title, id] = data.dialog.split('_')
            dialogTitle.value = title
            versionId.value = id 
            image.value=false
        } else if(data.dialog.includes('[{"caption"')){
            let [figIndex, fig] = data.dialog.split('_' , 2)
            image.value=true
            dialogTitle.value = ''
            figure.value = JSON.parse(fig)
            figureIndex.value = parseInt(figIndex)
        }
        else {
            dialogTitle.value = data.dialog 
            image.value=false
        }
        showDialog.value = true  // Set the dialog to open
    }) 
})
</script>

<style scoped>
.row-bg-grey {background-color: #f6f6f6;}
</style>