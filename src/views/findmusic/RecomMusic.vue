<script setup lang="ts">
import pic1 from '@/assets/pic1.png'
import pic2 from '@/assets/pic2.png'
import pic3 from '@/assets/pic3.png'
import pic4 from '@/assets/pic4.png'
import pic5 from '@/assets/pic5.png'
import pic6 from '@/assets/pic6.png'
import pic7 from '@/assets/pic7.png'
import pic8 from '@/assets/pic8.png'
import { useMusicStore } from '@/stores/modules/localmusic'
import { useSysMusic } from '@/stores/modules/sysmusic'
import { ref } from 'vue'

const recomPic = [
  {
    id: 1,
    src: pic1
  },
  {
    id: 2,
    src: pic2
  },
  {
    id: 3,
    src: pic3
  },
  {
    id: 4,
    src: pic4
  },
  {
    id: 5,
    src: pic5
  },
  {
    id: 6,
    src: pic6
  },
  {
    id: 7,
    src: pic7
  },
  {
    id: 8,
    src: pic8
  }
]
const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 1000)
const musicstore = useMusicStore()
const musiclist = useSysMusic()
const handleAdd = (id: number) => {
  const music = musiclist.list.find((item) => item.id === id)
  if (music) {
    musicstore.addMusic(music)
  }
}
</script>

<template>
  <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in recomPic" :key="item.id">
      <img :src="item.src" alt="" />
    </el-carousel-item>
  </el-carousel>
  <el-container>
    <el-aside width="100px"></el-aside>
    <el-main>
      <div class="header">
        <el-icon style="color: #c10c0b"><VideoPlay /></el-icon>
        <el-link
          class="item"
          href="/findmusic/playlist?id=hot"
          type="info"
          underline="never"
          >热门推荐</el-link
        >
        <i>|</i>
        <el-link href="/findmusic/playlist?id=cn" type="info">华语</el-link>
        <i>|</i>
        <el-link href="/findmusic/playlist?id=popular" type="info"
          >流行</el-link
        >
        <i>|</i>
        <el-link href="/findmusic/playlist?id=rock" type="info">摇滚</el-link>
        <i>|</i>
        <el-link href="/findmusic/playlist?id=folk" type="info">民谣</el-link>
        <i>|</i>
        <el-link href="/findmusic/playlist?id=elec" type="info">电子</el-link>
      </div>
      <div class="music">
        <el-skeleton
          v-for="item in musiclist.list"
          :key="item.id"
          style="width: 250px"
          :loading="loading"
          animated
        >
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 250px; height: 250px"
            />
          </template>
          <template #default>
            <el-card body-style="padding: 0px">
              <template #header>
                <div class="card-header">
                  <span>{{ item.name }}--{{ item.artist }}</span>
                </div>
                <el-icon @click="handleAdd(item.id)"><VideoPlay /></el-icon>
              </template>
              <img
                @click="handleAdd(item.id)"
                style="width: 250px; height: 250px"
                :src="item.pic"
                alt=""
              />
            </el-card>
          </template>
        </el-skeleton>
      </div>
      <div class="header">
        <el-icon style="color: #c10c0b"><VideoPlay /></el-icon>
        <p class="item">个性化推荐</p>
      </div>
      <div class="music">
        <el-skeleton
          v-for="item in musiclist.list"
          :key="item.id"
          style="width: 250px"
          :loading="loading"
          animated
        >
          <template #template>
            <el-skeleton-item
              variant="image"
              style="width: 250px; height: 250px"
            />
          </template>
          <template #default>
            <el-card body-style="padding: 0px">
              <template #header>
                <div class="card-header">
                  <span>{{ item.name }}--{{ item.artist }}</span>
                </div>
                <el-icon @click="handleAdd(item.id)"><VideoPlay /></el-icon>
              </template>
              <img
                @click="handleAdd(item.id)"
                style="width: 250px; height: 250px"
                :src="item.pic"
                alt=""
              />
            </el-card>
          </template>
        </el-skeleton>
      </div>
      <div class="header">
        <p class="item">榜单</p>
      </div>
      <div class="list">
        <el-table :data="musiclist.list" border style="width: 100%">
          <el-table-column prop="name" label="飙升榜" width="400px" />
          <el-table-column prop="name" label="新歌榜" width="400px" />
          <el-table-column prop="name" label="原唱榜" />
        </el-table>
      </div>
    </el-main>
    <el-aside width="100px"></el-aside>
  </el-container>
</template>
<style lang="scss" scoped>
.el-carousel {
  img {
    width: 700px;
    height: 300px;
  }
}
.el-main {
  background-color: #fff;
  padding: 20px 20px;
  .header {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    margin: 10px 0px;
    border-bottom: 1px solid #9b0909;
    i {
      color: #ccc;
    }
    .el-link {
      font-size: 13px;
      line-height: 20px;
      margin: 0px 10px;
    }
    .item {
      margin: 0px 10px;
      font-size: 20px;
      color: #242424;
    }
    .el-icon {
      font-size: 20px;
    }
  }
  .music {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    justify-items: center;
    align-items: center;
    margin: 20px 0px;
  }
  .el-card {
    position: relative;
    margin-top: 20px;
    width: 250px;
    height: 250px;
    .card-header {
      font-size: 14px;
      line-height: 14px;
      color: #fff;
    }
    img:hover {
      cursor: pointer;
    }
  }
  .el-card ::v-deep .el-card__header {
    display: flex;
    position: absolute;
    align-items: center;
    backdrop-filter: blur(10px);
    background-color: rgba(193, 190, 190, 0.1);
    height: 20px;
    width: 100%;
    border-bottom: none;
    .el-icon {
      margin-left: 10px;
      font-size: 20px;
      line-height: 20px;
      color: #9b0909;
    }
    .el-icon:hover {
      cursor: pointer;
      color: #c10c0b;
    }
  }
}
</style>
