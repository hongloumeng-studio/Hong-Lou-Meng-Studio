<template>
<v-card-text 
    class="text-h4 font-weight-bold my-5" 
    :title="title.text"
>
    <template v-if="titleArray">
        <template v-for="(segment, ind) in titleArray">
            <span v-if="critiques && critiques.includes(segment)"
                @click="getCritique(segment)" 
                class="annotation text-blue verse"
            >
                {{ segment }}<span class="critique-icon">批</span>
                <span v-if="critiqueText" class="text-red critique">{{ critiqueText[segment] }}</span>
            </span>
            <span v-else>{{ segment }}</span>
        </template>
    </template>
    <template v-else>
        {{ title.text }}
    </template>
</v-card-text>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
const critiqueText = ref(null)
const props=defineProps({
    title:{
        type: [Object], 
        required: true
    }
})
const critiques = computed(()=>{
    if(props.title.critique){
        let critiqueKeys=[]
        if(props.title.critique[0] instanceof Object ){
            props.title.critique.forEach(c=>{
                critiqueKeys.push( Object.keys(c)[0])
            })
            return critiqueKeys
        } else {
            return props.title.critique
        } 
    }
})
const titleText =ref(props.title.text)
const titleArray= computed(()=>{ 
    if(props.title.critique){
        let array = null
        if(props.title.critique[0] instanceof Object ){
            props.title.critique.forEach(c=>{
                let key= Object.keys(c)[0]
                array = props.title.text.split( key)
                var count = array.length
            // INSERT keyword reversely to keep original array index at the insert point
            for(let i=count-1; i>0; i--){  array.splice(i, 0, key)}
            })
            return array
        }
    }
})
function getCritique(a){
    if(critiqueText.value==null){
    if(props.title.critique[0] instanceof Object ){
        var phrase= props.title.critique.find(k=>k.hasOwnProperty(a))
        let comment=''
        if(phrase[a].constructor == Object){
            comment = '【'+ phrase[a].critic+ '：' + phrase[a].comment +'】'
        } else if(phrase[a].constructor == Array) {
            phrase[a].forEach(c=>{
                console.log(JSON.stringify(c))
                comment += '【'+ c.critic+ '：' + c.comment +'】'
            })
        }
        critiqueText.value = JSON.parse('{"'+a+'":"'+comment +'"}')
    } } else (critiqueText.value=null)
}

function getTitleCritique(){
    let titleCritiqueText=""
    if(props.title.critique){
        props.title.critique.forEach(item=>{
            let key = Object.keys(item)
            let tit = props.title.text.split(key) 
            titleCritiqueText= `${key}: 【 ${item[key].critic} ： ${item[key].comment } 】` 
        })
    }
    return titleCritiqueText

  }
</script>

