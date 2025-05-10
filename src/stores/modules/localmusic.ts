import { defineStore } from 'pinia'
import { ref } from 'vue'
interface Music {
  id: number
  name: string
  artist: string
  link: string
  pic: string
}

export const useMusicStore = defineStore(
  'music',
  () => {
    const musiclist = ref<Music[]>([])
    const nowmusic = ref<Music | null>(musiclist.value[0] || null)
    const addMusic = (music: Music) => {
      if (!musiclist.value.some((item) => item.id === music.id)) {
        musiclist.value.unshift(music)
      }
      nowmusic.value = music
    }
    const removeMusic = (id: number) => {
      const index = musiclist.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        musiclist.value.splice(index, 1)
        if (nowmusic.value?.id === id) {
          nowmusic.value = musiclist.value[index] || null
        }
      }
    }
    return {
      musiclist,
      nowmusic,
      addMusic,
      removeMusic
    }
  },
  {
    persist: true
  }
)
