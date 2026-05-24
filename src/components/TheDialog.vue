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

            </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserSettings from '../components/UserSettings.vue'
import About from '../components/About.vue'
import useEmitter from '@/assets/js/Emitter.js' // Import the Emitter utility
const emitter = useEmitter() // Create an instance of the Emitter

const showDialog = ref(false)
const dialogTitle= ref('')
const versionId=ref()

onMounted(() => {
    emitter.on('openDialog', (data) => {
        // console.log('Dialog opened with data:', data.dialog); // Log the dialog type
        if(data.dialog.includes('About')){
            let [title, id] = data.dialog.split('_')
            dialogTitle.value = title
            versionId.value = id 
        } else {
            dialogTitle.value = data.dialog 
        }
        showDialog.value = true  // Set the dialog to open
    }) 
})
</script>

<style scoped>
.row-bg-grey {background-color: #f6f6f6;}
</style>