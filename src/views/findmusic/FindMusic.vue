<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    router
    text-color="#fff"
    active-text-color="#fff"
  >
    <el-menu-item index="/findmusic/recommend"> 推荐 </el-menu-item>
    <el-menu-item index="/findmusic/musiclist"> 排行榜 </el-menu-item>
    <el-menu-item index="/findmusic/playlist"> 歌单 </el-menu-item>
    <el-menu-item index="/findmusic/singers"> 歌手 </el-menu-item>
  </el-menu>
  <el-main>
    <router-view></router-view>
  </el-main>
</template>
<style lang="scss" scoped>
.el-menu-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #c10c0b;
  color: #fff;
  height: 30px;
  .el-menu-item {
    font-size: 12px;
    color: #fff;
    border-bottom: none;
    margin: 0 20px;
  }
  .el-menu-item:hover {
    background-color: #9b0909;
  }
  .el-menu-item.is-active {
    background-color: #9b0909;
    border-radius: 20px;
  }
}
</style>
