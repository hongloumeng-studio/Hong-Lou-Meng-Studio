import './assets/main.css'

import { createApp } from 'vue'

import App     from './App.vue'
import router  from './router'
import vuetify from './plugins/vuetify'
import { createStore } from '@/stores'
import axios   from 'axios'

// Event Hub
import mitt from 'mitt' 
const emitter = mitt()

const HLM =  import.meta.env.VITE_HONG + import.meta.env.VITE_LOU + import.meta.env.VITE_MENG
const Fb_Studio = import.meta.env.VITE_FIREBASE + import.meta.env.VITE_STUDIO
const Lonesome_Booze = import.meta.env.VITE_LONESOME + import.meta.env.VITE_BOOZE
let keywords = [HLM, Fb_Studio, Lonesome_Booze]
// import Firebase
import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey:            keywords.join(''),
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:             import.meta.env.VITE_FIREBASE_APP_ID
}
// Initialize Firebase
initializeApp(firebaseConfig)

import { ref } from 'vue'
var env = process.env.NODE_ENV==='production'? 'Production':'Development' 
const activeVersions = ref([])
const chpFolder = ref({})

const versionCollections = "/versions.json"
const voices = synth.getVoices().filter(v=> ["zh-TW", "zh-CN"].includes(v.lang))

// Load initial State data to Pinia Stores
// GET available versions, then create vue App
axios.get( versionCollections )
    .then( r => {
        let versions = r.data 
        // Add a boolean "showDescr" to hold value of Display_Mode (default to false for each version collection)
        versions.forEach((v, i) => { v["showDescr"] = false })
        // Make the default version or versions[0] as the first active version
        let defaultOpenVersion = parseInt(window.localStorage.getItem('defaultOpenVersion')) | 0
        activeVersions.value.push(versions[defaultOpenVersion].name)
        // Active versions would be displayed on the "ReaderPlatform"

        // Initialize session (State) data
        // Get previous settings by the user from localStorage if possible
       
        let defaultVoice    = parseInt(window.localStorage.getItem('defaultVoice')) | 0
        let wordSpeed       = window.localStorage.getItem('wordSpeed') ?? '50'
        let fontSize        = window.localStorage.getItem('fontSize')  ?? '1' //  0 small; 1 large
        let separatedScroll = window.localStorage.getItem('separatedScroll')=='true'? true : false
        let nightMode       = window.localStorage.getItem('nightMode')=='true'? true : false
        let displayCritique = window.localStorage.getItem('displayCritique')=='true'? true : false
        let highlightColor  = parseInt(window.localStorage.getItem('highlightColor')) | 2
        let chapterNumber   = isNaN(parseInt(window.localStorage.getItem('chapterNumber')))
                                ?  1 : parseInt(`${window.localStorage.getItem('chapterNumber')}`) 
        const sessionData = {
              env                : env
            , keywords           : keywords
            , versions           : versions
            , activeVersions     : activeVersions.value
            , chpFolder          : chpFolder.value
            , chapterNumber      : chapterNumber
            , defaultVoice       : defaultVoice
            , defaultOpenVersion : defaultOpenVersion
            , wordSpeed          : wordSpeed
            , fontSize           : fontSize
            , separatedScroll    : separatedScroll
            , nightMode          : nightMode
            , displayCritique    : displayCritique
            , highlightColor     : highlightColor
            , showCarousel       : false
            , swatches           : 
                { "false": [
                    {id: 0, title: "淡", color:"FloralWhite"}, 
                    {id: 1, title: "雅", color:"LightGrey" },
                    {id: 2, title: "素", color:"OldLace" }, 
                    {id: 3, title: "艷", color:"MistyRose" },
                    {id: 4, title: "濃", color:"Gold"}, 
                    ]
                , "true": [
                    {id: 0, title: "淡", color:"DimGray"},          //FloralWhite => LightGrey vs DimGray
                    {id: 1, title: "雅", color:"DarkSlateGrey" },   //LightGrey => DarkSlateGrey
                    {id: 2, title: "素", color:"Black" },           //OldLace => Black
                    {id: 3, title: "艷", color:"MediumVioletRed" }, //MistyRose => MediumVioletRed 
                    {id: 4, title: "濃", color:"GoldenRod"},        //Yellow => GoldenRod
                    ]
                }
            }
        const app = createApp(App)
        app.use(vuetify)
        app.use(createStore(sessionData)) // add inin state data to Stores
        app.use(router)
        app.provide('emitter', emitter) 
        app.use(vuetify)
        app.mount('#app')
        
        if (voices.length < 1){
            alert('您的機器尚未安裝中文語音，若聆聽説書，會出現錯誤。\n\n請參閲「設定 與 附錄」>「安裝中文語音」。')
        }
    })
    .catch( e=>{ console.log('main.js: ', e) } )
