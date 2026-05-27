import useEmitter from '@/assets/js/Emitter.js'


export default function useSharedComp() {
    const emitter  = useEmitter()
    
    function scrollTop(){
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function scrollBottom(){
        window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth' })
    }

    function openDialog(dialog){
      emitter.emit('openDialog', {dialog: dialog})
    }   

    function getViewportHeight() {
        // Cross-browser safe method
        return window.innerHeight || 
            document.documentElement.clientHeight || 
            document.body.clientHeight;
    }

    function getViewportWidth() {
        // Cross-browser safe method
        return window.innerWidth || 
            document.documentElement.clientWidth || 
            document.body.clientWidth;
    }

    function getOS() {
        // Modern Chromium-based browsers
        if (navigator.userAgentData && navigator.userAgentData.platform) {
            const platform = navigator.userAgentData.platform.toLowerCase();

            if (platform.includes("windows")) return "Windows";
            if (platform.includes("macos")) return "macOS";
        }

        // Fallback for Safari, Firefox, and older browsers
        const platform = navigator.platform.toLowerCase();
        const userAgent = navigator.userAgent.toLowerCase();

        if (platform.includes("win") || userAgent.includes("windows")) {
            return "Windows";
        }

        if (
            platform.includes("mac") ||
            userAgent.includes("mac os") ||
            userAgent.includes("macintosh")
        ) {
            return "macOS";
        }

        return "Unknown";
    }

    return{
        scrollTop
      , scrollBottom
      , openDialog
      , getViewportHeight
      , getViewportWidth
      , getOS
    }
}