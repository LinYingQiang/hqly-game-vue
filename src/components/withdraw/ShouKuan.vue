<template>
  <div class="empty-wrap">
    <div class="empty-inner">
      <img :src="noneImg" alt="none" class="empty-img" />
      <div class="empty-text">暂无收款账户</div>
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
    value: "ABPay",
    label: "ABPay钱包",
    icon: abPayIcon,
  },
  {
    value: "sanfang",
    label: "三方钱包",
    icon: sanfangPayIcon,
  },
  {
    value: "no",
    label: "NO钱包",
    icon: noPayIcon,
  },
  {
    value: "shuzi",
    label: "数字货币",
    icon: shuziPayIcon,
  },
]);
</script>

<style>
.empty-wrap { display:flex; align-items:center; justify-content:center; height:60vh }
.empty-inner { text-align:center; color:#cbd3db }
.empty-img { width:96px; height:96px; object-fit:contain; opacity:0.9 }
.empty-text { margin-top:12px; font-size:16px; color:#fff }
</style>