<template>
    <div :id="`vid_${ver_chp_id}_${id}`" class="d-inline">
        <v-chip v-if="id" class="mr-2 d-inline verse-num" variant="elevated" >
            <!--Set an ancher name for this sentence-->
            <a :name="`V${ver_chp_id}V${id}`" :id="`V${ver_chp_id}V${id}`"> {{ id }} </a>
        </v-chip>
    
        <template v-for="(segment, i) in parsedText">
            <template v-if="store.displayCritique">
                <!--Display text segment that contains annotations 附注解釋-->
                <span v-if="annotate && annotations.includes(segment)"
                    @click="getAnnotation(segment)" :key="'seg'+i"
                    class="annotation text-green verse"
                > 
                    <template v-if="segment.indexOf('（')==0 && segment.indexOf('）'== segment.length-1)">
                        <!--Display 異體字 (character combination) as an image character-->
                        <span style="background-color: rgb(180, 255, 180);">
                            <img height="36" :src="getImageUrl(segment)" style="vertical-align:text-bottom;margin-bottom:2px;" />
                        </span>
                    </template>
                    <template v-else>
                        {{ segment }}
                    </template>
                </span>

                <!--Display text segment that contains notes 註 or critiques 批-->
            
                    <span v-else-if="critique && critiques.includes(segment)"
                     @click="getCritique(segment)" 
                        class="text-blue-darken-2 verse"
                    >
                            <template v-if="segment.match(regex)">
                                <!--Text segment is a 註 (note index number) ; therefore, display a 註 index icon-->
                                <span class="numberCircle">註{{segment}}</span>
                                <span v-if="critiqueText" class="text-red critique" v-html="critiqueText[segment]">
                                </span>
                            </template>
                            <template v-else>
                                <!--Text segment contains critique; therefore, display segment with a 批 icon-->
                                <span>{{segment }}</span> 
                                    <span class="critique-icon">批</span>
                                    <!--Display critique 批語-->
                                    <template v-for="c in critique">
                                            <template v-if="c[segment] instanceof Array==true">
                                                <template v-for="cs in c[segment]">
                                                    <span :class="`text-red${cs?.critic=='飲者'? '-lighten-3':''} critique`">【{{cs?.critic }}: {{cs?.comment}}】</span>
                                                </template>
                                            </template>
                                        <template v-else-if="c[segment]?.comment">
                                                <span :class="`text-red${c[segment]?.critic=='飲者'? '-lighten-3':''} critique`">【{{c[segment]?.critic }}: {{c[segment]?.comment}}】</span>
                                            </template>
                                    </template> 
                            </template>
                    </span> 

                    <!--Display text segment that has no critique-->
                    <span v-else class="verse">
                        {{ segment??'\n\n' }}
                    </span>
            
            </template>
            <template v-else>
            <!--Display text segment that contains annotations 附注解釋-->
            <span v-if="annotate && annotations.includes(segment)"
                @click="getAnnotation(segment)" :key="'seg'+i"
                class="annotation text-green verse"
            > 
                <template v-if="segment.indexOf('（')==0 && segment.indexOf('）'== segment.length-1)">
                    <!--Display 異體字 (character combination) as an image character-->
                    <span style="background-color: rgb(180, 255, 180);">
                        <img height="36" :src="getImageUrl(segment)" style="vertical-align:text-bottom;margin-bottom:2px;" />
                    </span>
                </template>
                <template v-else>
                    {{ segment }}
                </template>
            </span>

            <!--Display text segment that contains notes 註 or critiques 批-->
            
            <span v-else-if="critique && critiques.includes(segment)"
                @click="getCritique(segment)" 
                class="annotation text-blue-darken-2 verse"
            >
                    <template v-if="segment.match(regex)">
                        <!--Text segment is a 註 (note index number) ; therefore, display a 註 index icon-->
                        <span class="numberCircle">註{{segment }}</span>
                    </template>
                    <template v-else>
                        <!--Text segment contains critique; therefore, display segment with a 批 icon-->
                        <span>{{segment }} </span> 
                        <span class="critique-icon">批</span>
                    </template>

                    <!--Display critique 批語-->
                    <span v-if="critiqueText" class="text-red critique" v-html="critiqueText[segment]">
                    </span>
            </span> 

            <!--Display text segment that has no critique-->
           <span v-else class="verse">
                {{ segment??'\n\n' }}
            </span>
            </template>
        </template>
    </div>

    <span v-if="original" class="original-block">【底本】
        <span v-for="line in original">{{ line }}</span>
    </span>

<v-dialog  v-model="annotationDialog" width="auto">
  <v-card>
    <v-card-text class="mt-3 verse">
        <div v-html="annotationText"></div>
        <div v-if="illustationSrc" class="text-center"  style="margin:1rem auto;width:90%;">
            <a :href="illustationSrc" target="_blank">Go to <v-icon>mdi-link</v-icon></a>
            <iframe :src="illustationSrc" class="illustrate"></iframe>
        </div>
        <div v-if="videoSrc" class="text-center"  style="margin:1rem auto;width:90%;">
            <iframe width="560" height="315" :src="videoSrc" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
            ></iframe>
        </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="annotationDialog=!annotationDialog">Close</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>         
</template>

<script setup>
import { ref, onMounted, computed, toRef } from 'vue'
const props=defineProps({
    ver_chp_id:{
        type: [String, Number], 
        required: true,
    },
    id:{ 
        type: [String, Number], 
        required: true,
    },
    text:{ 
        type: String,
        required: false,
        default: ''
    },
    annotate:{ 
        type: Array,
        required: false,
        default: null
    },
    critique:{ 
        type: Array,
        required: false,
        default: null
    },
    original:{ 
        type: Array,
        required: false,
        default: null
    }
})
import {useAppStore} from '@/stores'
const store = useAppStore()
const activeVersions = store.activeVersions  // ToDo: rename openedVersions

var ver_chp_id = toRef(props, 'ver_chp_id')  // make props reactive to parent value changes
var id = toRef(props, 'id') 
var text = toRef(props, 'text') 
var annotate = toRef(props, 'annotate') 
var critique = toRef(props, 'critique') 
var original = toRef(props, 'original') 
// console.log('critique', JSON.stringify(critique))


const regex = /^\[\d+\]$/g
const hover=ref(false)
const annotationDialog = ref(false)
const annotationText = ref('')
const critiqueText = ref(null)
const illustationSrc = ref('')
const videoSrc = ref('')
function getImageUrl(img){
    return '/src/assets/images/font/'+img+'.png'
}
function getAnnotation(a){
    if(annotate.value[0] instanceof Object ){
        var phrase= annotate.value.find(k=>k.hasOwnProperty(a))
        annotationText.value = ""  // initialization
        phrase[a].forEach(n=>{
            if(n.note){
                annotationText.value += n.note + "<br>"
                if(n.illustration){
                    // illustration is a web or picture url 
                    illustationSrc.value = n.illustration
                }
                if(n.video){
                    // illustration is a web or picture url 
                    videoSrc.value = n.video
                }
                // alert(annotate.value[annotations.indexOf(a)][a])
            }
        })
        
    } else {
        annotationText.value=a
    } 
    annotationDialog.value=true
}

function getCritique(a){
   
    if(critiqueText.value==null){
    if(critique.value[0] instanceof Object ){
        var phrase= critique.value.find(k=>k.hasOwnProperty(a))
        let comment=''
        if(phrase[a].constructor == Object){
            if(a.match(regex)){
                comment = '【註：' + phrase[a].note +'】'
            }
             else {
                if(phrase[a].critic=='飲者'){
                    comment = '<span style=\'color:green;\'>【'+  phrase[a].critic+ '：'+ phrase[a].comment +'】</span>'
                } else {
                    comment = '【'+ phrase[a].critic+(phrase[a].critic!=''? '：' :'')+ phrase[a].comment +'】'
                }
            }
            
        } else if(phrase[a].constructor == Array) {

            if(a.match(regex)){
                comment = '【註：'
                phrase[a].forEach(c=>{
                    comment += c.note
                })
                comment += '】'
            } else {

                phrase[a].forEach(c=>{
                    // comment += '【'+ c.critic+(c.critic!=''? '：' : '') + c.comment.replace("【","<br><span style='color:green;'>【").replace("】","】</span>") +'】<br>'
                    if(c.critic=='飲者'){
                        comment += '<br><span style=\'color:red;\'>【'+ c.critic+ '：'  + c.comment+'】</span><br>'
                    } else {
                        comment += '【'+ c.critic+(c.critic!=''? '：' : '') + c.comment+'】'
                    }
                })
            }
        }
        critiqueText.value = JSON.parse('{"'+a+'":"'+comment +'"}')
    } } else (critiqueText.value=null)
}

const annotations = computed(()=>{
    if(annotate.value){
        if(annotate.value[0] instanceof Object ){
            let keys=[]
            for( var k=0; k<annotate.value.length; k++ ){
                keys.push(Object.keys(annotate.value[k])[0])
            }
            // console.log('keys', keys)
            return keys
            // return Object.keys(annotate.value[0])
            
        } else {
            return annotate.value
        } 
    }
})
const critiques = computed(()=>{
    if(critique.value){
        let critiqueKeys=[]
        if(critique.value[0] instanceof Object ){
            critique.value.forEach(c=>{
                critiqueKeys.push( Object.keys(c)[0])
            })
            return critiqueKeys
        } else {
            //  console.log('critique.value', JSON.stringify(critique.value))
            return critique.value
        } 
    }
})

const parsedText=ref(text.value)  // init
const delimiter = '^|^'
function setAnnontation(){
    annotate.value.forEach(a=>{
        if(typeof(a) =='string'){
            let t = parsedText.value.split(a)  // This will remove the annotation keyword
            var count = t.length
            // INSERT keyword reversely to keep original array index at the insert point
            for(let i=count-1; i>0; i--){  t.splice(i, 0, a)}
            // CONVERT array to string with delimitor for the next iteration
            parsedText.value=t.join(delimiter)
        } else if(typeof(a) =='object'){
            
            let k = Object.keys(a).join('')
            let t = parsedText.value.split(k)
            var count = t.length
            for(let i=count-1; i>0; i--){  t.splice(i, 0, k)}
            parsedText.value=t.join(delimiter)
        }
    })
    // CONVERT parsedText back to array for rendering
    parsedText.value=parsedText.value.split(delimiter)
    // console.log('setAnnontation parsedText :', JSON.stringify(parsedText.value))
}

function setCritique(){
    critique.value.forEach(c=>{
        if(typeof(c) =='string'){
            if(c){
                let t = parsedText.value.split(c)  // This will remove the critique keyword
                var count = t.length
                // INSERT keyword reversely to keep original array index at the insert point
                for(let i=count-1; i>0; i--){  t.splice(i, 0, c)}
                // CONVERT array to string with delimitor for the next iteration
                parsedText.value=t.join(delimiter)
            }    
        } else if(typeof(c) =='object'){
            // console.log('c object: ',JSON.stringify(c))
            let k = Object.keys(c).join('')
            // console.log('c object key: ',k)
            if(k){
                // console.log('parsedText: ', typeof parsedText.value, JSON.stringify(parsedText.value))
                if(typeof parsedText.value == 'string'){
                    let t = parsedText.value.split(k)
                    // console.log('parsedText split at keyword: ', t)
                    var count = t.length
                    for(let i=count-1; i>0; i--){  t.splice(i, 0, k) }
                    parsedText.value=t.join(delimiter)
                   
                    // console.log('parsedText joined: ', typeof parsedText.value, JSON.stringify(parsedText.value))
                } else if (parsedText.value instanceof Array){
                    // Have both annotate & critique
                    let tmpHolder=[]
                    parsedText.value.forEach(s=>{
                        let t = s.split(k)
                        var count = t.length
                        for(let i=count-1; i>0; i--){  t.splice(i, 0, k)}
                        tmpHolder.push( t.join(delimiter)) 
                    })
                    parsedText.value = tmpHolder.join(delimiter)
                    // console.log(parsedText.value)
                }
            }    
        }
    })

    // console.log('parsedText', JSON.stringify(parsedText.value))
    parsedText.value=parsedText.value.split(delimiter)
}

onMounted(()=>{
    if(annotate.value != null){  setAnnontation() }
    if(critique.value != null){  setCritique()    }
})
</script>
<style>
.annotation {cursor: pointer;}
.critique {font-size: 100%; display: inline; background-color: white !important;}
.critique-icon {
    font-size:35%; 
    background-color: red; 
    color:white;
    padding:0px;
    margin: 0 0 0 -0.75rem; 
    position: relative;
    top:-0rem;
    z-index: 99;
    opacity: 30%;
    vertical-align:top !important; 
    border-radius: 20%;}
.v-chip.verse-num {
    font-size:50% !important; 
    vertical-align:text-top !important; 
    padding: 0 2px !important;
    }
.verse {white-space: pre-wrap; line-height:120%;}
.yiti-font{height:36px;}
.illustrate{height:300px;width:100%;border:none; }
.v-tooltip__content {
  font-size: 50px !important;
  opacity: 1 !important;
  display: block !important;
}
.numberCircle{
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    padding: .25rem;
    background: #fff;
    border: 1px solid grey;
    text-align: center;
    font:.75rem Arial, sans-serif;
}
.original-block{
    height: 16px;
    padding: 4px;
    border-top: 2px solid rgb(108, 108, 108);
    border-bottom: 2px solid rgb(108, 108, 108);
    font:12px Arial, sans-serif;
}
</style>