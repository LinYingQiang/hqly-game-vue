<template>
  <van-popup
    v-model:show="showLocal"
    :overlay-style="{ position: 'absolute' }"
    :style="{
      height: 'auto',
      width: '90%',
      borderRadius: '12px',
      maxHeight: '90vh',
      padding: '16px',
      position: 'absolute',
    }"
    :overlay="true"
  >
    <div class="auth-popup">
      <!-- logo -->
      <div class="logo-row">
        <img :src="logoImg" alt="logo" class="auth-logo" />
      </div>

      <!-- three lines of text -->
      <div class="text-rows">
        <div>💸新用户下载APP注册即送588元💸</div>
        <div>💰新人专享 首存豪送8888元💰</div>
        <div>🧧二存三存狂送8888元🧧</div>
      </div>

      <!-- nav: login / register -->
      <div class="nav-row">
        <button
          :class="['nav-item', mode === 'register' ? 'active' : '']"
          @click="mode = 'register'"
        >
          注册
        </button>
        <button
          :class="['nav-item', mode === 'login' ? 'active' : '']"
          @click="mode = 'login'"
        >
          登录
        </button>
      </div>

      <!-- form -->
      <div class="form-area">
        <van-form required="auto">
          <template v-if="mode === 'login'">
            <van-field
              left-icon="user"
              required
              v-model="form.username"
              placeholder="请输入用户名"
              clearable
            >
              <template #left-icon>
                <div
                  v-if="usernameType === 'phone'"
                  style="
                    width: auto;
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <img
                    :src="chineseMainlandImg"
                    style="width: 100%; height: 100%; object-fit: contain"
                  /><span>&nbsp;+86</span>
                </div>
                <van-icon
                  style="
                    font-size: 1.3rem;
                    width: auto;
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                  v-else
                  name="user"
                />
              </template>
            </van-field>
            <van-radio-group
              style="
                margin: 1rem 0;
                display: flex;
                flex-direction: row;
                justify-content: first baseline;
                gap: 2rem;
              "
              v-model="usernameType"
              shape="square"
              direction="horizontal"
            >
              <van-radio
                style="font-size: 0.9rem; color: aliceblue"
                name="phone"
                >这是手机号码</van-radio
              >
              <van-radio
                style="font-size: 0.9rem; color: aliceblue"
                name="username"
                >这是一个账号</van-radio
              >
            </van-radio-group>
            <van-radio-group
              v-if="usernameType === 'phone'"
              v-model="passwordType"
              direction="horizontal"
              style="
                margin: 1rem 0;
                display: flex;
                flex-direction: row;
                justify-content: first baseline;
                gap: 2rem;
              "
            >
              <van-radio
                name="password"
                style="font-size: 0.9rem; color: aliceblue"
              >
                <template #icon>
                  <div
                    class="type-icon"
                    :class="{ active: passwordType === 'password' }"
                  >
                    <svg
                      width="100%"
                      height="100%"
                      fill="currentColor"
                      class=""
                      viewBox="0 0 43.998 44.002"
                    >
                      <path
                        id="c5d3021dc6c9cb5c5f1081e431299067-联合_669"
                        data-name="联合 669"
                        d="M22141.994,23716v-1H22143v1Zm-42.992,0v-1h.994v1Zm42.992-43v-1H22143v1Zm-42.992,0v-1h.994v1Z"
                        transform="translate(-22099.002 -23671.998)"
                        opacity="0.04"
                      ></path>
                      <path
                        id="c5d3021dc6c9cb5c5f1081e431299067-密码"
                        d="M3381.12,1299.991v-1.8a7.158,7.158,0,0,0-6.7-7.2,7.039,7.039,0,0,0-7.411,6.992v2h-.283a1.726,1.726,0,0,0-1.732,1.719v11.562a1.726,1.726,0,0,0,1.732,1.719H3381.4a1.725,1.725,0,0,0,1.732-1.719V1301.71a1.725,1.725,0,0,0-1.732-1.719Zm-11.758-1.833a4.7,4.7,0,0,1,9.406,0v1.833h-9.406Zm6.212,12.278a.493.493,0,0,1-.126.388.508.508,0,0,1-.376.167h-2.015a.507.507,0,0,1-.376-.167.493.493,0,0,1-.125-.388l.318-2.837a1.971,1.971,0,0,1-.826-1.608,2.016,2.016,0,0,1,4.031,0,1.97,1.97,0,0,1-.824,1.608Z"
                        transform="translate(-3351.994 -1280.989)"
                      ></path>
                    </svg>
                  </div>
                </template>
                密码登录
              </van-radio>
              <van-radio
                style="font-size: 0.9rem; color: aliceblue"
                name="code"
              >
                <template #icon>
                  <div
                    class="type-icon"
                    :class="{ active: passwordType === 'code' }"
                  >
                    <svg
                      width="100%"
                      height="100%"
                      fill="currentColor"
                      class=""
                      viewBox="0 0 44 44"
                    >
                      <g
                        id="2d7c8775c0ef758f7a6be5e8d59c1f22-矩形_3452"
                        data-name="矩形 3452"
                        fill="none"
                        stroke-width="1"
                        opacity="0"
                      >
                        <rect width="44" height="44" stroke="none"></rect>
                        <rect
                          x="0.5"
                          y="0.5"
                          width="43"
                          height="43"
                          fill="none"
                        ></rect>
                      </g>
                      <path
                        id="2d7c8775c0ef758f7a6be5e8d59c1f22-路径_15116"
                        data-name="路径 15116"
                        d="M5.38.46V-12.2L2.16-9.4v-3.08l3.22-2.8H8.24V.46Zm7.98,0V-2.12l5.88-6.84a3.59,3.59,0,0,0,.62-.92,2.472,2.472,0,0,0,.18-.98,2.058,2.058,0,0,0-.48-1.42,1.775,1.775,0,0,0-1.4-.54,2.468,2.468,0,0,0-.7.1,1.743,1.743,0,0,0-.62.33,1.624,1.624,0,0,0-.45.62,2.373,2.373,0,0,0-.17.95H13.36a4.791,4.791,0,0,1,.37-1.93,4.222,4.222,0,0,1,1.01-1.44,4.34,4.34,0,0,1,1.52-.9,5.679,5.679,0,0,1,1.9-.31,5.579,5.579,0,0,1,1.92.32,4.439,4.439,0,0,1,1.51.9,4.071,4.071,0,0,1,.99,1.43,4.853,4.853,0,0,1,.36,1.91,4.128,4.128,0,0,1-.12,1.04,4.261,4.261,0,0,1-.33.87,5.166,5.166,0,0,1-.53.82q-.32.41-.7.87l-4.4,5.12h6.08V.46ZM34.72-4.1a4.938,4.938,0,0,1-.4,2.06A4.235,4.235,0,0,1,33.24-.57,4.343,4.343,0,0,1,31.65.3a6.527,6.527,0,0,1-1.93.28A6.635,6.635,0,0,1,27.85.32,4.568,4.568,0,0,1,26.26-.5a4.036,4.036,0,0,1-1.12-1.44,5.032,5.032,0,0,1-.44-2.1h2.88a2.422,2.422,0,0,0,.19.9,1.875,1.875,0,0,0,.46.64,1.91,1.91,0,0,0,.68.39,2.545,2.545,0,0,0,.81.13,2.11,2.11,0,0,0,1.53-.57,2.162,2.162,0,0,0,.59-1.63,2.192,2.192,0,0,0-.57-1.59,2.162,2.162,0,0,0-1.63-.59h-.42V-8.84h.42a1.843,1.843,0,0,0,1.52-.57,2.173,2.173,0,0,0,.46-1.41,1.878,1.878,0,0,0-.58-1.49,1.969,1.969,0,0,0-1.34-.51,1.947,1.947,0,0,0-1.36.49,1.927,1.927,0,0,0-.58,1.41H24.88a4.6,4.6,0,0,1,.41-1.89,4.293,4.293,0,0,1,1.03-1.4,4.527,4.527,0,0,1,1.51-.88,5.531,5.531,0,0,1,1.87-.31,5.426,5.426,0,0,1,1.92.33,4.594,4.594,0,0,1,1.52.92,4.154,4.154,0,0,1,1,1.42,4.551,4.551,0,0,1,.36,1.83,3.557,3.557,0,0,1-.52,2.04,3.667,3.667,0,0,1-1.3,1.18,4.038,4.038,0,0,1,1.44,1.3A3.911,3.911,0,0,1,34.72-4.1Z"
                        transform="translate(3.836 29.4)"
                      ></path>
                    </svg>
                  </div>
                </template>
                验证码登录
              </van-radio>
            </van-radio-group>
            <van-field
              left-icon="lock"
              :rules="[{ required: true }]"
              v-model="form.password"
              type="password"
              :placeholder="
                passwordType === 'password' ? '请输入密码' : '请输入手机验证码'
              "
              clearable
            >
              <template #left-icon>
                <van-icon
                  v-if="usernameType === 'phone' && passwordType === 'code'"
                  name="other-pay"
                  style="
                    font-size: 1.3rem;
                    width: auto;
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                />
                <van-icon
                  v-else
                  name="lock"
                  style="
                    font-size: 1.3rem;
                    width: auto;
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                />
              </template>
              <template
                v-if="usernameType === 'phone' && passwordType === 'code'"
                #button
              >
                <van-button
                  size="small"
                  type="primary"
                  style="
                    background: rgba(0, 0, 0, 0);
                    border: none;
                    font-size: 0.9rem;
                    color: #f0c059;
                  "
                  >发送验证码</van-button
                >
              </template>
            </van-field>
          </template>
          <template v-else>
            <van-form :model="registerForm" :rules="rules" ref="form">
              <van-field
                left-icon="user"
                required
                v-model="registerForm.username"
                placeholder="请输入账号"
                clearable
              >
                <template #left-icon>
                  <van-icon
                    style="
                      font-size: 1.3rem;
                      width: auto;
                      height: 1.5rem;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                    name="user"
                  />
                </template>
              </van-field>
              <van-field
                left-icon="lock"
                type="password"
                required
                v-model="registerForm.password"
                placeholder="请输入密码"
                clearable
              >
                <template #left-icon>
                  <van-icon
                    style="
                      font-size: 1.3rem;
                      width: auto;
                      height: 1.5rem;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                    name="lock"
                  />
                </template>
              </van-field>
              <div class="password-level">
                <span>密码强度</span>
                <div
                  class="level"
                  :class="passwordLevel >= 1 ? passwordLevelType : ''"
                ></div>
                <div
                  class="level"
                  :class="passwordLevel >= 2 ? passwordLevelType : ''"
                ></div>
                <div
                  class="level"
                  :class="passwordLevel >= 3 ? passwordLevelType : ''"
                ></div>
                <div
                  class="level"
                  :class="passwordLevel >= 4 ? passwordLevelType : ''"
                ></div>
              </div>
              <van-field
              left-icon="user"
              required
              v-model="registerForm.phone"
              placeholder="请输入手机号"
              clearable
            >
              <template #left-icon>
                <div
                  style="
                    width: auto;
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <img
                    :src="chineseMainlandImg"
                    style="width: 100%; height: 100%; object-fit: contain"
                  /><span>&nbsp;+86</span>
                </div>
              </template>
              </van-field>
              <van-field
              left-icon="lock"
              :rules="[{ required: true }]"
              v-model="registerForm.code"
              type="password"
              :placeholder="'请输入手机验证码'"
              clearable
            >
              <template #left-icon>
                <van-icon
                  name="other-pay"
                  style="
                    font-size: 1.3rem;
                    width: auto;
                    height: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                />
              </template>
              <template
                #button
              >
                <van-button
                  size="small"
                  type="primary"
                  style="
                    background: rgba(0, 0, 0, 0);
                    border: none;
                    font-size: 0.9rem;
                    color: #f0c059;
                  "
                  >获取验证码</van-button
                >
              </template>
              </van-field>
              <van-field
                left-icon="user"
                required
                v-model="registerForm.real_name"
                placeholder="请输入真实姓名"
                clearable
              >
                <template #left-icon>
                  <div class="input-icon">
                    <svg width="100%" height="100%" fill="currentColor" class="" viewBox="0 0 49.162 48">
                      <defs>
                        <clipPath id="17b56972500bae23375dbaecdf8feef8-clip-path">
                          <path id="17b56972500bae23375dbaecdf8feef8-Union_151" data-name="Union 151" d="M-137-2471v-4h4v4Zm-44,0v-4h4v4Zm44-44v-4h4v4Zm-44,0v-4h4v4Z" transform="translate(181 2519)"></path>
                        </clipPath>
                      </defs>
                      <g id="17b56972500bae23375dbaecdf8feef8-input_icon_zsxm1" transform="translate(-1873.5 -2123)">
                        <g id="17b56972500bae23375dbaecdf8feef8-底层" transform="translate(1874 2123)">
                          <g id="17b56972500bae23375dbaecdf8feef8-Mask_Group_1" data-name="Mask Group 1" opacity="0" clip-path="url(#17b56972500bae23375dbaecdf8feef8-clip-path)">
                            <path id="17b56972500bae23375dbaecdf8feef8-底层-2" data-name="底层" d="M2,1A1,1,0,0,0,1,2V46a1,1,0,0,0,1,1H46a1,1,0,0,0,1-1V2a1,1,0,0,0-1-1H2M2,0H46a2,2,0,0,1,2,2V46a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0Z"></path>
                          </g>
                        </g>
                        <g id="17b56972500bae23375dbaecdf8feef8-icon" transform="translate(1874.715 2125.651)">
                          <path id="17b56972500bae23375dbaecdf8feef8-排除_10" data-name="排除 10" d="M11.579,23.073h-.074A11.537,11.537,0,1,1,11.536,0h.042a11.537,11.537,0,0,1,0,23.073Zm-5.9-12.629a1.347,1.347,0,0,0-.984.422,1.471,1.471,0,0,0-.407.983v.071A1.471,1.471,0,0,0,4.7,12.9l3.874,4.01c.014.016.03.032.047.048a1.349,1.349,0,0,0,.916.374h.035a1.35,1.35,0,0,0,.966-.422l7.891-8.175a1.473,1.473,0,0,0,0-2.037L18.4,6.676l-.024-.025a1.357,1.357,0,0,0-1.917.05L9.55,13.857,6.659,10.865q-.023-.025-.048-.048a1.348,1.348,0,0,0-.933-.373Z" transform="translate(24.17 19.98)" stroke-miterlimit="10" stroke-width="1"></path>
                          <path id="17b56972500bae23375dbaecdf8feef8-减去_45" data-name="减去 45" d="M23.871,40H2.893A2.907,2.907,0,0,1,0,37.075v-.129a19.152,19.152,0,0,1,9.574-15.4,15.01,15.01,0,0,0,10.38,4.143,15.136,15.136,0,0,0,3.68-.455A14.657,14.657,0,0,0,23.87,40ZM19.864,21.6A10.721,10.721,0,0,1,9.14,10.963v-.01A10.8,10.8,0,0,1,19.779,0h.17A10.8,10.8,0,0,1,20.1,21.594a.188.188,0,0,1-.048,0h-.184Z" transform="translate(-0.715 -0.651)" stroke-miterlimit="10" stroke-width="1"></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </template>
              </van-field>
            </van-form>
          </template>
        </van-form>
      </div>

      <!-- user agreement -->
      <div class="agreement">
        <van-checkbox v-model="agree" icon-size="1rem" />
        <div class="agree-text">
          我已阅读并同意 <a href="#">用户协议</a> 与 <a href="#">隐私政策</a>
        </div>
      </div>

      <!-- submit button -->
      <div class="submit-row">
        <button class="submit-btn" @click="onSubmit">
          {{ mode === "login" ? "登录" : "注册" }}
        </button>
      </div>

      <!-- bottom links -->
      <div class="bottom-links">
        <a @click.prevent="onContact">联系客服</a>
        <a @click.prevent="onTrial">免费试玩</a>
      </div>

      <!-- close button -->
    </div>
  </van-popup>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useUserStore } from "@/store/user";

// 导入静态资源
import logoImg from "@/assets/images/logo.avif";
import chineseMainlandImg from "@/assets/images/ChineseMainland.png";

const props = defineProps({
  show: { type: Boolean, default: false },
  initialMode: { type: String, default: "login" },
});
const emit = defineEmits(["update:show", "success"]);

const user = useUserStore();

const showLocal = ref(props.show);
const mode = ref(props.initialMode);
const usernameType = ref("username"); // username | phone
const passwordType = ref("password"); // code
const registerForm = ref({
  username: "",
  password: "",
  phone: "",
  code: "",
  real_name: "",
});

watch(
  () => props.show,
  (v) => (showLocal.value = v)
);
watch(showLocal, (v) => emit("update:show", v));
watch(
  () => props.initialMode,
  (v) => (mode.value = v)
);

const form = ref({ username: "", password: "", confirm: "" });
const agree = ref(true);
const passwordLevel = ref(0);
const passwordLevelType = ref("info");

function checkPasswordStrength(password) {
  let strength = 0;
  const length = password.length;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);

  // 计算等级
  if (length < 6) {
    strength = 1; // 最低等级
  } else if (length >= 6 && length <= 8) {
    strength = hasNumber || hasSpecialChar ? 2 : 1; // 至少包含一个数字或特殊字符
  } else if (length > 8 && length <= 12) {
    strength = hasNumber || hasSpecialChar || hasUpperCase ? 3 : 2; // 至少包含一个数字、特殊字符或大写字母
  } else if (length > 12) {
    strength = hasNumber && hasSpecialChar && hasUpperCase ? 4 : 3; // 所有条件都满足则为最高等级
  }

  return strength;
}

watch(
  () => registerForm.value.password,
  (v) => {
    passwordLevel.value = checkPasswordStrength(v);
    if (passwordLevel.value <= 2) {
      passwordLevelType.value = "error";
    } else if (passwordLevel.value <= 3) {
      passwordLevelType.value = "warn";
    } else {
      passwordLevelType.value = "success";
    }

    console.log("password level:", passwordLevel.value);
  }
);

function close() {
  showLocal.value = false;
}

function onSubmit() {
  if (!form.value.username || !form.value.password) {
    // 简单校验
    return;
  }
  if (mode.value === "register") {
    if (form.value.password !== form.value.confirm) return;
    if (!agree.value) return;
    // 模拟注册，直接登录
    user.login(form.value.username, 0);
    emit("success", { type: "register", username: form.value.username });
    close();
  } else {
    // login
    user.login(form.value.username, 0);
    emit("success", { type: "login", username: form.value.username });
    close();
  }
}

function onContact() {
  // 可以打开客服链接或触发父级事件
  window.open("https://m.example.com/contact", "_blank");
}

function onTrial() {
  // 免费试玩行为
  window.open("https://m.example.com/trial", "_blank");
}
</script>

<style scoped>
.form-area .van-cell {
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  margin-bottom: 8px;
}
.auth-popup {
  color: #fff;
  /* 使用rem单位,相对于根元素字体大小 */
  font-size: 1rem;
}
.input-icon {
  font-size: 1.1rem;
  width: auto;
  height: 1.2rem;
}
.type-icon {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 1px solid #68707b;
  font-size: 0.9rem;
}
.type-icon.active {
  color: #f0c059;
  border: 1px solid #f0c059;
  background: #f0c059;
}

::v-deep .van-radio__icon .van-icon {
  border-radius: 0.3rem;
}

.logo-row {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}
.auth-logo {
  height: 45px;
  width: auto;
}
.text-rows {
  text-align: center;
  color: #cbd3db;
  margin-bottom: 8px;
  font-size: 0.8rem;
  line-height: 1.6;
}
.nav-row {
  display: flex;
  justify-content: center;
  gap: 154px;
  margin: 8px 0;
}
.nav-item {
  background: transparent;
  border: none;
  color: #fff;
  padding: 6px 0;
  position: relative;
  font-size: 1rem;
}
.nav-item.active {
  color: #f0c059;
}
.nav-item.active::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: #f0c059;
  color: #f0c059;
  bottom: -6px;
}
.form-area {
  padding: 8px 12px;
}
.agreement {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  color: #cbd3db;
  font-size: 0.75rem;
}
.agree-text a {
  color: #f0c059;
}
.submit-row {
  display: flex;
  justify-content: center;
  padding: 12px;
}
.submit-btn {
  background: #f0c059;
  color: #874404;
  border: none;
  padding: 0.4rem 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  width: 100%;
}
.bottom-links {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  color: #cbd3db;
  font-size: 0.9rem;
}
.bottom-links a {
  color: #f0c059;
  cursor: pointer;
}
.close-row {
  display: flex;
  justify-content: center;
  padding: 8px 12px;
  position: absolute;
  bottom: -60px;
}
.close-btn {
  background: transparent;
  color: #cbd3db;
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 6px 12px;
  border-radius: 8px;
}

.form-area ::v-deep .van-field__control {
  font-size: 0.9rem;
}

.password-level {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin: .8rem 0;
  font-size: 0.9rem;
  height: 1rem;
  width: 100%;
  padding: 0.2rem;
  color: #ffff;
}
.password-level span {
  color: #ffff;
}
.password-level div {
  color: #ffff;
  height: 100%;
  width: 2.5rem;
  background: #313843;
  border-radius: 0.3rem;
}
.level.error {
  background: #ea4e3d;
}
.level.warn {
  background: #ffaa09;
}
.level.success {
  background: #04be02;
}
</style>
