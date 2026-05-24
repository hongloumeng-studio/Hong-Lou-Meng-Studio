import { inject } from 'vue'
export default function useEmitter() {
  const emitter = inject('emitter')
    if (!emitter) {
        throw new Error('useEmitter must be used within a provider')
    }
  return emitter
}