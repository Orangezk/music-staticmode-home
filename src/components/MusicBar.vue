<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useMusicStore } from '@/stores/modules/localmusic'

// 定义 Music 接口
interface Music {
  id: number
  name: string
  artist: string
  link: string
  pic: string
}

// 定义响应式变量
const musiclist = ref<Music[]>([])
const nowmusic = ref<Music>({
  id: 0,
  name: '',
  artist: '',
  link: '',
  pic: ''
})
const audio = ref<HTMLAudioElement | null>(null)
const current = ref(0)
const duration = ref(0)
const isplay = ref(false)
const isauto = ref(false)
const cacheCurrent = ref(0)
const localMusic = useMusicStore()
onMounted(() => {
  audio.value = document.querySelector('audio')
  init()
})
// 初始化函数
const init = () => {
  isauto.value = false
  isplay.value = false
  const storedMusicList = localMusic.musiclist
  const storedNowMusic = localMusic.nowmusic

  if (storedMusicList) {
    musiclist.value = storedMusicList
  }
  if (storedNowMusic) {
    nowmusic.value = storedNowMusic
  }
}
watch(localMusic, () => {
  musiclist.value = localMusic.musiclist
  nowmusic.value = localMusic.nowmusic || {
    id: 0,
    name: '',
    artist: '',
    link: '',
    pic: ''
  }
  isauto.value = true
  isplay.value = true
})
// 时间格式化函数
const transTime = (value: number) => {
  const minute = Math.floor(value / 60)
  const second = Math.floor(value % 60)
  const formattedMinute = minute < 10 ? '0' + minute : minute
  const formattedSecond = second < 10 ? '0' + second : second
  return `${formattedMinute}:${formattedSecond}`
}

// 名称格式化函数
const transName = (value: string) => {
  return value.length > 10 ? value.substring(0, 10) + '...' : value
}

// 播放/暂停音频
const audioPlay = (status: boolean) => {
  if (audio.value) {
    if (status) {
      audio.value.play()
    } else {
      audio.value.pause()
    }
    isplay.value = status
    isauto.value = status
  }
}

// 切换音乐
const switchMusic = (key: string) => {
  if (musiclist.value.length === 0) return

  if (key === 'prev') {
    let previd =
      musiclist.value.findIndex((item) => item.id === nowmusic.value.id) - 1
    if (previd < 0) {
      previd = musiclist.value.length - 1
    }
    nowmusic.value = musiclist.value[previd]
  } else if (key === 'next') {
    let nextid =
      musiclist.value.findIndex((item) => item.id === nowmusic.value.id) + 1
    if (nextid > musiclist.value.length - 1) {
      nextid = 0
    }
    nowmusic.value = musiclist.value[nextid]
  }
  localMusic.nowmusic = nowmusic.value
}

// 更新进度
const updateProgress = (e: Event) => {
  const target = e.target as HTMLAudioElement
  current.value = target.currentTime
}
// 实时更新进度条拖动的进度
const updateProgressDuringDrag = (value: number) => {
  cacheCurrent.value = value
  if (audio.value) {
    audio.value.pause()
    audio.value.currentTime = value
  }
}
// 改变进度
const progressChange = () => {
  if (audio.value) {
    audio.value.currentTime = cacheCurrent.value
    current.value = cacheCurrent.value
    if (isplay.value) {
      audio.value.play() // 恢复播放
    }
  }
}

// 格式化秒数
const realFormatSecond = (second: number) => {
  cacheCurrent.value = second
  return transTime(second)
}

// 音乐结束事件
const end = () => {
  isplay.value = true
  switchMusic('next')
}

// 加载元数据
const loadMetadata = (e: Event) => {
  const target = e.target as HTMLAudioElement
  duration.value = target.duration
}

const handleSwitch = (id: number) => {
  const music = musiclist.value.find((item) => item.id === id)
  if (music) {
    nowmusic.value = music
    localMusic.nowmusic = music
  }
}

const handleDelete = (id: number) => {
  localMusic.removeMusic(id)
}
</script>

<template>
  <div>
    <audio
      :src="nowmusic.link"
      ref="audio"
      @timeupdate="updateProgress"
      @ended="end"
      @loadedmetadata="loadMetadata"
      :autoplay="isauto"
      controls
      style="display: none"
      preload="auto"
    ></audio>
    <div class="musicBar">
      <div style="display: flex">
        <div style="margin-top: 15px">
          <el-image
            :src="nowmusic.pic"
            style="width: 50px; height: 50px"
          ></el-image>
        </div>
        <div class="audioInfo">
          <h3>{{ transName(nowmusic.name) }}</h3>
          <p>{{ transName(nowmusic.artist) }}</p>
        </div>
      </div>
      <div class="audio_content">
        <div class="music_time">
          <div class="opentime">
            <span>{{ transTime(current) }}</span>
          </div>
          <el-slider
            @input="updateProgressDuringDrag"
            @change="progressChange"
            :format-tooltip="realFormatSecond"
            v-model="current"
            style="display: inline-block; width: 70%; height: 10px"
            :max="duration"
          >
          </el-slider>
          <div class="endtime">
            <span>{{ transTime(duration) }}</span>
          </div>
        </div>
        <div class="btn_play">
          <el-icon @click="switchMusic('prev')"><CaretLeft /></el-icon>
          <el-icon v-if="!isplay" @click="audioPlay(true)"
            ><VideoPlay
          /></el-icon>
          <el-icon v-else @click="audioPlay(false)"><VideoPause /></el-icon>
          <el-icon @click="switchMusic('next')"><CaretRight /></el-icon>
        </div>
      </div>
      <div class="btn_list">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon><Tickets /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                class="item"
                v-for="item in musiclist"
                :key="item.id"
                @click="handleSwitch(item.id)"
              >
                <el-button
                  @click="handleDelete(item.id)"
                  link
                  style="display: none; margin-right: 5px"
                  ><el-icon><CloseBold /></el-icon
                ></el-button>
                <span style="width: 120px">{{ item.name }}</span>
                <span>{{ item.artist }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.musicBar {
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  background-color: rgba(193, 190, 190, 0.2);
  display: flex;
  position: fixed;
  z-index: 999;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 65px;
  box-sizing: border-box;
}

.audioInfo {
  font-size: 12px;
  margin-left: 30px;
}
.audio_content {
  width: 70%;
}
.music_time {
  text-align: center;
  margin-top: 20px;
  width: 100%;
}
.btn_play {
  font-size: 25px;
  text-align: center;
}
.el-dropdown-link {
  font-size: 25px;
  outline: none !important;
}
.el-dropdown-link:hover {
  color: #000;
  outline: none !important;
}
.el-dropdown {
  border: none !important;
}
.el-dropdown-menu {
  width: 250px;
  backdrop-filter: blur(10px);
  background-color: rgba(193, 190, 190, 0.2);
  border-radius: 5px;
}
::v-deep(.el-dropdown-menu__item:hover) {
  background-color: rgba(160, 190, 190, 0.2);
  color: #000;
  .el-button {
    display: block !important;
  }
}
.opentime {
  font-size: 15px;
  height: 20px;
  margin-right: 20px;
  display: inline-block;
}
.endtime {
  height: 20px;
  font-size: 15px;
  margin-left: 20px;
  display: inline-block;
}
.foot {
  color: #6b6b6c;
  margin-top: 50px;
}
</style>
