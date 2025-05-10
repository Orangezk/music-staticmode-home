import { defineStore } from 'pinia'
import { ref } from 'vue'
import link1 from '@/assets/music/aicuo.mp3'
import pic1 from '@/assets/aicuo.png'
import link2 from '@/assets/music/三人游.mp3'
import pic2 from '@/assets/三人游.png'
import link3 from '@/assets/music/love song.mp3'
import pic3 from '@/assets/love song.png'
import link4 from '@/assets/music/爱爱爱.mp3'
import pic4 from '@/assets/爱爱爱.png'
import link5 from '@/assets/music/特别的人.mp3'
import pic5 from '@/assets/特别的人.png'
import link6 from '@/assets/music/瘦子.mp3'
import pic6 from '@/assets/瘦子.png'
import link7 from '@/assets/music/那个女孩.mp3'
import pic7 from '@/assets/那个女孩.png'
import link8 from '@/assets/music/春风吹.mp3'
import pic8 from '@/assets/春风吹.png'

export const useSysMusic = defineStore(
  'sysmusic',
  () => {
    const list = ref([
      {
        id: 1,
        name: '爱错',
        artist: '王力宏',
        link: link1,
        pic: pic1
      },
      {
        id: 2,
        name: '三人游',
        artist: '方大同',
        link: link2,
        pic: pic2
      },
      {
        id: 3,
        name: 'love song',
        artist: '方大同',
        link: link3,
        pic: pic3
      },
      {
        id: 4,
        name: '爱爱爱',
        artist: '方大同',
        link: link4,
        pic: pic4
      },
      {
        id: 5,
        name: '特别的人',
        artist: '方大同',
        link: link5,
        pic: pic5
      },
      {
        id: 6,
        name: '瘦子',
        artist: '丁世光',
        link: link6,
        pic: pic6
      },
      {
        id: 7,
        name: '那个女孩',
        artist: '陶喆&卢广仲',
        link: link7,
        pic: pic7
      },
      {
        id: 8,
        name: '春风吹',
        artist: '方大同',
        link: link8,
        pic: pic8
      }
    ])
    return {
      list
    }
  },
  {
    persist: true
  }
)
