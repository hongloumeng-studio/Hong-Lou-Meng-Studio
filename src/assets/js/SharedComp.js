export default function useSharedComp() {
    function scrollTop(){
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function scrollBottom(){
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth' })
    }

    return{
        scrollTop
      , scrollBottom
    }
}