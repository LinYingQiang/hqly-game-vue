<template>
  <div class="shoukuan-page">
    <div class="banlance-card">
      <div>
        <span>收款账户<span style="font-size: .9rem;color: #6b6c6d;">(1/25)</span></span>
        <span><van-icon color="#f0c059" name="replay" /></span>
      </div>
      <div>
        <div class="chose-balance">
          <img :src="abPayIcon" style="height: 2.5rem; width: auto;">
          <div style="margin-left: .5rem;">
            <span>ABPay钱包</span>
            <span style="color:#6b6c6d">****19dB</span>
          </div>
        </div>
      </div>
    </div>
    <div class="banlance-card" style="margin-top: .8rem;gap: .8rem;">
      <div 
      class="chose-balance" 
      style="border: 1px solid #6b6c6d;margin: 0;gap: .3rem;justify-content: first baseline;" 
      v-for="item, index in banlanceOption" 
      :key="index">
        <div style="display:flex;flex-direction:row;">
          <img :src="item.icon" style="height: 2.5rem; width: auto;display: block;">
          <div style="margin-left: .5rem;">
            <span>{{item.label}}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:row;gap: .2rem;">
          <span style="color: #f0c059;">{{ item.status ? '添加' : '立即绑定' }}</span>
          <span ><van-icon color="#f0c059" name="arrow" /></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import payIconImg from "@/assets/images/payicon/icon_cz_no.avif";
import { Divider } from "vant";
import noneImg from '@/assets/images/icon/none.avif'

import { useUserStore } from "/src/store/user";
import { ref, computed } from "vue";
import abPayIcon from "@/assets/images/payicon/icon_wallet_abpay.png";
import noPayIcon from "@/assets/images/payicon/icon_no_wallet.png";
import sanfangPayIcon from "@/assets/images/payicon/icon_wallet_normal.png";
import shuziPayIcon from "@/assets/images/payicon/icon_szhb_xnb.png";
import { PasswordInput, NumberKeyboard } from "vant";
const showPassword = ref(false);
const qianbao = ref("no");
const user = useUserStore();
const password = ref("");
const showKeyboard = ref(false);
const formattedBalance = computed(() => Number(user.balance || 0).toFixed(2));
const qianbaoSelect = ref("ABPay");
const banlanceOption = ref([
  {
    status: true,
    label: "三方钱包",
    icon: sanfangPayIcon,
  },
  {
    status: false,
    label: "NO钱包",
    icon: noPayIcon,
  },
  {
    status: true,
    label: "数字货币",
    icon: shuziPayIcon,
  },
]);
</script>

<style>
.shoukuan-page {
  padding: .3rem;
}
.chose-balance {
  display: flex;
  flex-direction: row;
  justify-content: first baseline;
  align-items: center;
  margin-top: 1rem;
  padding: .3rem .8rem;
  border: .12rem solid #f0c059;
  width: 100%;
  border-radius: .5rem;
}
.chose-balance>div {
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;
}
.banlance-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1c1e23;
  padding: 1rem .6rem;
  border-radius: .6rem;
}
.banlance-card>div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.banlance-card>div span {
  color: #fff;
}
</style>