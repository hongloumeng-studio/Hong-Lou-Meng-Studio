// Utilities
// import { ref, computed } from 'vue'
import { createPinia, defineStore } from 'pinia'

export default createPinia()

let init_state = null
export const createStore = initStoreData =>{
    init_state = { ...initStoreData } // see main.js for the content
    return createPinia()
}

export const useAppStore = defineStore('AppStore',  {
    state: () => { 
        return { ...init_state
            , video: ""  // Youtube  vedio url
        }
    },
    getters: {},
    actions:{
        updateDefaultVoice( value ){
            this.$patch( (state) =>{
                state.defaultVoice = value
            })
        },
        updateDefaultOpenVersion( value ){
            this.$patch( (state) =>{
                state.defaultOpenVersion = value
            })
            window.location.reload()
        },
        updateWordSpeed( value ){
            this.$patch( (state) =>{
                state.wordSpeed = value
            })
        },
        updateFontSize( value ){
            this.$patch( (state) =>{
                state.fontSize = value
            })
        },
        updateSeparatedScroll( value ){
            this.$patch( (state) =>{
                state.separatedScroll = value
            })
        },
        updateNightMode( value ){
            this.$patch( (state) =>{
                state.nightMode = value
            })
        },
        updateDisplayCritique( value ){
            this.$patch( (state) =>{
                state.displayCritique = value
            })
        },
        updateChapterNumber( value ){
            this.$patch( (state) =>{
                state.chapterNumber = value
            })
        },
        updateHighlightColor( value ){
            this.$patch( (state) =>{
                state.highlightColor = value
            })
        },
         updateVideo( value ){
            this.$patch( (state) =>{
                state.video= value
            })
        },
        resetChpFolder(){
            this.$patch( (state) =>{
                state.chpFolder.value = {}
            })
        }
    }
})

