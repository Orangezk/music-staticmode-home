<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { watch } from 'vue'
import avatar from '@/assets/logo.jpg'
import MusicBar from '@/components/MusicBar.vue'
import {
  CaretBottom,
  User,
  ChatDotRound,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue'
const isLogin = ref(false)
const isEnroll = ref(false)
const input = ref('')
const router = useRouter()
const defaultActivate = ref('/findmusic')
const handleSearch = () => {
  if (input.value) {
    router.push({ path: '/search', query: { key: input.value } })
  }
}
const handleKeyUp = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
const loginFormVisible = ref(false)
const enrollFormVisible = ref(false)
const formLabelWidth = '140px'
const loginForm = ref({
  name: '',
  password: ''
})
const enrollForm = ref({
  name: '',
  password: '',
  repassword: '',
  phone: '',
  code: ''
})
const form = ref()
const loginRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '输入的用户名应为3-10的长度', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6到15位的非空字符',
      trigger: 'blur'
    }
  ]
}

const enrollRules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '输入的用户名应为3-10的长度', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6到15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次确认密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须为6到15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (
        rule: unknown,
        value: string,
        callback: (error?: Error) => void
      ) => {
        if (value !== enrollForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      patten:
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码必须为4位数字', trigger: 'blur' }
  ]
}
const login = async () => {
  await form.value.validate()
  ElMessage.success('登录成功')
  loginFormVisible.value = false
  isLogin.value = true
}
watch(isLogin, () => {
  loginForm.value = {
    name: '',
    password: ''
  }
})
const enroll = async () => {
  await form.value.validate()
  isEnroll.value = true
  ElMessage.success('注册成功')
  enrollFormVisible.value = false
  loginFormVisible.value = true
}
watch(isEnroll, () => {
  enrollForm.value = {
    name: '',
    password: '',
    repassword: '',
    phone: '',
    code: ''
  }
})
const handleCommand = (key: string) => {
  if (key === 'logout') {
    isLogin.value = false
    ElMessage.success('退出登录成功')
  } else {
    router.push({ path: `/users/${key}` })
  }
}
</script>

<template>
  <el-menu
    :default-active="defaultActivate"
    class="el-menu-demo"
    mode="horizontal"
    router
    background-color="black"
    text-color="#fff"
    active-text-color="#fff"
  >
    <el-menu-item>
      <div class="logo">
        <a href="/">
          <img src="@/assets/logo.jpg" alt="" />
          ikunMusic
        </a>
      </div>
    </el-menu-item>
    <el-menu-item class="item" index="/findmusic"
      >发现音乐<el-icon><CaretTop /></el-icon>
    </el-menu-item>
    <el-menu-item class="item" index="/mymusic"
      >我的音乐<el-icon><CaretTop /></el-icon
    ></el-menu-item>
    <el-menu-item class="item" index="/concern"
      >关注<el-icon><CaretTop /></el-icon
    ></el-menu-item>
    <el-menu-item class="item" index="/market"
      >商城<el-icon><CaretTop /></el-icon
    ></el-menu-item>
    <el-menu-item class="item" index="/singer"
      >音乐人<el-icon><CaretTop /></el-icon
    ></el-menu-item>
    <el-menu-item>
      <el-input
        v-model="input"
        style="width: 240px; margin-left: 10px"
        size="large"
        placeholder="音乐/视频/电台/用户"
        :suffix-icon="Search"
        @keyup.enter="handleKeyUp"
      />
      <span v-if="!isLogin" class="login" @click="loginFormVisible = true">
        <a href="#">登录</a>
      </span>
      <el-dropdown v-else placement="bottom-end" @command="handleCommand">
        <span class="el-dropdown__box">
          <el-avatar :src="avatar" />
          <el-icon><CaretBottom /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home" :icon="User"
              >我的主页</el-dropdown-item
            >
            <el-dropdown-item command="news" :icon="ChatDotRound"
              >我的消息</el-dropdown-item
            >
            <el-dropdown-item command="settings" :icon="Setting"
              >个人设置</el-dropdown-item
            >
            <el-dropdown-item command="logout" :icon="SwitchButton"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
  </el-menu>
  <el-main>
    <router-view></router-view>
  </el-main>
  <el-dialog v-model="loginFormVisible" title="登录" width="500" align-center>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      style="width: 350px"
      ref="form"
    >
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="loginForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          text
          @click="
            () => {
              loginFormVisible = false
              enrollFormVisible = true
            }
          "
          style="margin-right: 220px"
          >去注册 --></el-button
        >
        <el-button @click="loginFormVisible = false">退出</el-button>
        <el-button type="primary" @click="login"> 登录 </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="enrollFormVisible" title="注册" width="500" align-center>
    <el-form
      :model="enrollForm"
      :rules="enrollRules"
      style="width: 350px"
      ref="form"
    >
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="name">
        <el-input v-model="enrollForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="enrollForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="再次确认"
        :label-width="formLabelWidth"
        prop="repassword"
      >
        <el-input
          v-model="enrollForm.repassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="enrollForm.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="code">
        <el-input
          style="width: 100px"
          v-model="enrollForm.code"
          autocomplete="off"
        />
        <el-button
          type="primary"
          round
          style="font-size: 12px; margin-left: 15px"
          >获取验证码</el-button
        >
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          text
          @click="
            () => {
              loginFormVisible = true
              enrollFormVisible = false
            }
          "
          style="margin-right: 250px"
          >返回</el-button
        >
        <el-button @click="enrollFormVisible = false">退出</el-button>
        <el-button type="primary" @click="enroll"> 注册 </el-button>
      </div>
    </template>
  </el-dialog>
  <musicBar></musicBar>
</template>

<style lang="scss" scoped>
.el-menu-demo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  border-bottom: #242424;
  .el-menu-item {
    font-size: 15px;
    color: #fff;
    border-bottom: none;
    &:hover {
      background-color: #242424;
    }
  }
  .item {
    color: #ccc;
    position: relative;
    &:hover {
      background-color: black;
      color: #fff;
    }
    .el-icon {
      position: absolute;
      top: 48px;
      color: #c10c0b;
      opacity: 0;
    }
  }
  .el-menu-item.is-active {
    .el-icon {
      opacity: 1;
    }
    background-color: black;
  }
  .logo {
    margin-right: 40px;
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #fff;
      font-size: 30px;
      text-decoration: none;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .login {
    margin-left: 40px;
    font-size: 14px;
    a {
      color: #787878;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  }
  .el-dropdown__box {
    margin-left: 40px;
    display: flex;
    align-items: center;
    .el-icon {
      color: #999;
      margin-left: 10px;
    }

    &:active,
    &:focus {
      outline: none;
    }
  }
}
.el-main {
  padding: 0px;
  margin-bottom: 80px;
}
</style>
