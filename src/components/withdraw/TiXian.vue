<template>
  <div class="balance-row">
    <div class="bal-left">
      <span>余额</span>
      <span style="color: #ffaa09; font-weight: 700">{{formattedBalance}}</span>
      <span>
        <svg
          width="1rem"
          height="1rem"
          fill="#F0C059"
          style="display: inline"
          class=""
          viewBox="0 0 24 25.144">
          <path
            id="8c340ce2cd6f0d7c93afeea157d09bb4-comm_icon_sx"
            d="M1520.314-127.2l5.058-9.146,2.1,3.9a10.844,10.844,0,0,0,4.845-9.038c0-3.028-2-6.031-4-8,3.919,1.639,7.43,5.773,7.43,10.285a10.856,10.856,0,0,1-6.549,9.964l1.977,3.179Zm-8.572-10.858a10.86,10.86,0,0,1,6.548-9.965l-1.976-3.178,10.857,1.142-5.06,9.147-2.095-3.9a10.842,10.842,0,0,0-4.847,9.039c0,3.028,2,6.031,4,8C1515.255-129.409,1511.743-133.543,1511.743-138.055Z"
            transform="translate(-1511.743 151.198)"></path>
        </svg>
      </span>
    </div>
    <van-icon
      :name="spinning ? 'refresh' : 'refresh'"
      class="refresh"
      :class="{ spin: spinning }"
      @click="refreshBalance"
      color="#f0c059"/>
  </div>
  <Divider style="border-color: #313843" />
  <div class="body-qianbao">
    <!-- placeholder for withdraw form -->
    <div class="qianbao">
      <div
        class="qianbao-item"
        :class="{ active: qianbao === 'no' }"
        @click="qianbao = 'no'"
      >
        <img :src="payIconImg" />钱包
      </div>
      <div
        class="qianbao-item"
        :class="{ active: qianbao === 'sanfang' }"
        @click="qianbao = 'sanfang'"
      >
        三方钱包
      </div>
      <div class="qianbao-item" :class="{ active: qianbao === 'shuzi' }"
        @click="qianbao = 'shuzi'" >
        转为数字货币
      </div>
    </div>
    <Divider style="border-color: #313843" />
    <div class="qianbao-content">
        <div v-if="qianbao === 'no'">
            <div class="no">
                <div>
                    <span>已有账号，可登录绑定</span>
                    <button class="no-button" style="border: 1px solid #f0c059;background: rgba(0, 0, 0, 0);" type="primary" size="small">立即绑定</button>
                </div>
                <div>
                    <span>首次使用？只需要设置支付密码</span>
                    <button class="no-button" style="background: #f0c059;color: #874404;" type="primary" size="small">立即设置</button>
                </div>
            </div>
            <span style="font-size: .85rem;margin-top: 1rem;display: block;color: #fff;">用NO钱包：赚积分，抽大奖，最高<span style="color: #ffaa09;">88,888.88CNY</span></span>
        </div>
        <div v-if="qianbao === 'sanfang'">
            <div class="qianbao-select">
              <el-select v-model="qianbaoSelect" placeholder="选择钱包" style="width: 100%;height: 100%;flex: 8;background-color: #1c1e23;">
                <template #prefix="{ label }">
                  <div style="display: flex; align-items: center; gap: .4rem; justify-content: space-between;flex-direction: row;margin-top: .6rem;height: 100%;">
                     <span style="font-size: 1rem;">{{ label }}</span>
                  </div>
                </template>
                <el-option
                  v-for="item in banlanceOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  style="height: 3rem;background-color: #1c1e23;"
                >
                  <div style="display: flex; align-items: center; gap: .4rem; justify-content: space-between;flex-direction: row;margin-top: .6rem;">
                    <img :src="item.icon" alt="" style="width: auto; height: 1.8rem;" />
                     <span :style="`font-size: 1rem;color: ${item.value === qianbaoSelect ? '#ffaa09' : '#fff'};`">{{ item.label }}</span>
                  </div>
              </el-option>
              </el-select>
              <div style="flex: 1;">
                <svg width="70%" height="70%" fill="#f0c059" class="" viewBox="0 0 45 33">
                  <g id="7402d171f7b9e52a313cfdcc3f16a8c5-icon_tx_txgl" transform="translate(-599.998 -1034.128)">
                    <rect id="7402d171f7b9e52a313cfdcc3f16a8c5-矩形_3513" data-name="矩形 3513" width="45" height="33" transform="translate(599.998 1034.128)" opacity="0"></rect>
                    <g id="7402d171f7b9e52a313cfdcc3f16a8c5-icon_wd_txgl" transform="translate(600.448 1035.255)">
                      <path id="7402d171f7b9e52a313cfdcc3f16a8c5-Shape_19" data-name="Shape 19" d="M4.716,27.977A4.721,4.721,0,0,1,0,23.251V11.087H29.215a11.97,11.97,0,0,0-4.338,16.89ZM3.394,15.5a1.635,1.635,0,0,0,1.634,1.636H9.7a1.636,1.636,0,1,0,0-3.272H5.028A1.635,1.635,0,0,0,3.394,15.5ZM0,7.816V4.725A4.721,4.721,0,0,1,4.716,0H33.35a4.721,4.721,0,0,1,4.716,4.725v3.09Z" transform="translate(0)"></path>
                      <path id="7402d171f7b9e52a313cfdcc3f16a8c5-Shape_19-2" data-name="Shape 19" d="M676.932,1074.442l-1.68-1.317a6.874,6.874,0,0,0,.04-.692,6.711,6.711,0,0,0-.04-.692l1.683-1.317a.827.827,0,0,0,.2-1.052l-1.747-3.03a.81.81,0,0,0-1.011-.364l-1.984.8a6.851,6.851,0,0,0-1.192-.693l-.3-2.107a.81.81,0,0,0-.807-.7h-3.506a.81.81,0,0,0-.806.7l-.3,2.115a6.97,6.97,0,0,0-1.189.692l-1.988-.8a.826.826,0,0,0-1,.36l-1.75,3.034a.823.823,0,0,0,.2,1.057l1.681,1.316a6.088,6.088,0,0,0,0,1.382l-1.683,1.318a.825.825,0,0,0-.2,1.052l1.747,3.03a.81.81,0,0,0,1.012.364l1.98-.8a6.876,6.876,0,0,0,1.191.692l.3,2.106a.81.81,0,0,0,.81.7h3.5a.81.81,0,0,0,.807-.7l.3-2.115a7.02,7.02,0,0,0,1.188-.693l1.99.8a.826.826,0,0,0,.3.057.8.8,0,0,0,.7-.414l1.755-3.046A.824.824,0,0,0,676.932,1074.442Zm-8.595,2.569a4.576,4.576,0,1,1,4.568-4.576,4.576,4.576,0,0,1-4.568,4.576Z" transform="translate(-633.14 -1050.995)"></path>
                    </g>
                    <g id="7402d171f7b9e52a313cfdcc3f16a8c5-Stroke_Effect" data-name="Stroke Effect" transform="translate(599.998 1035.006)" opacity="0.01">
                      <path id="7402d171f7b9e52a313cfdcc3f16a8c5-路径_21825" data-name="路径 21825" d="M33.446,30.6a.81.81,0,0,1-.81-.7l-.3-2.107a6.88,6.88,0,0,1-1.191-.693l-1.98.8a.81.81,0,0,1-1.012-.364L26.4,24.5a.826.826,0,0,1,.2-1.052l1.683-1.318a6.106,6.106,0,0,1,0-1.383L26.6,19.43a.824.824,0,0,1-.2-1.058l1.75-3.034a.826.826,0,0,1,1-.36l1.988.8a7,7,0,0,1,1.189-.693l.3-2.115a.81.81,0,0,1,.807-.695H36.95a.81.81,0,0,1,.805.7l.3,2.108a6.8,6.8,0,0,1,1.192.693l1.984-.8a.81.81,0,0,1,1.011.364l1.747,3.031a.828.828,0,0,1-.2,1.052l-1.681,1.318a6.828,6.828,0,0,1,.04.692c0,.251-.02.489-.04.692l1.68,1.316a.825.825,0,0,1,.2,1.046l-1.755,3.047a.8.8,0,0,1-.7.414.821.821,0,0,1-.3-.056l-1.989-.8a7.006,7.006,0,0,1-1.187.693l-.3,2.115a.81.81,0,0,1-.807.7Zm-2.817-9.163A4.568,4.568,0,1,0,35.2,16.861,4.568,4.568,0,0,0,30.629,21.438ZM4.716,27.976A4.721,4.721,0,0,1,0,23.25V11.087H29.216a11.97,11.97,0,0,0-4.338,16.89ZM3.394,15.5a1.635,1.635,0,0,0,1.634,1.635H9.7a1.636,1.636,0,1,0,0-3.272H5.028A1.635,1.635,0,0,0,3.394,15.5ZM0,7.816V4.725A4.721,4.721,0,0,1,4.716,0H33.351a4.721,4.721,0,0,1,4.716,4.725v3.09Z" transform="translate(0.45 0.45)" fill="none"></path>
                      <path id="7402d171f7b9e52a313cfdcc3f16a8c5-路径_21826" data-name="路径 21826" d="M36.4,30.05a.808.808,0,0,0,.806-.7l.3-2.115a7.006,7.006,0,0,0,1.187-.693l1.99.8a.821.821,0,0,0,.3.056.8.8,0,0,0,.7-.414l1.756-3.047a.825.825,0,0,0-.2-1.046l-1.68-1.317c.02-.2.04-.44.04-.691a6.828,6.828,0,0,0-.04-.692l1.683-1.317a.828.828,0,0,0,.2-1.052l-1.747-3.031a.809.809,0,0,0-1.011-.364l-1.984.8a6.8,6.8,0,0,0-1.191-.693l-.3-2.108a.808.808,0,0,0-.806-.7H32.894a.809.809,0,0,0-.806.7l-.3,2.116a7,7,0,0,0-1.189.693l-1.988-.8a.826.826,0,0,0-1,.358l-1.75,3.034a.824.824,0,0,0,.2,1.058L27.734,20.2a6.106,6.106,0,0,0,0,1.383L26.052,22.9a.826.826,0,0,0-.2,1.052L27.6,26.98a.808.808,0,0,0,1.012.364l1.982-.8a6.882,6.882,0,0,0,1.191.692l.3,2.108a.81.81,0,0,0,.808.7h3.5M34.646,16.311a4.577,4.577,0,1,1-4.567,4.577,4.572,4.572,0,0,1,4.567-4.577M24.328,27.426a11.97,11.97,0,0,1,4.338-16.89H-.55V22.7a4.721,4.721,0,0,0,4.715,4.726H24.328M4.478,13.315H9.146a1.636,1.636,0,0,1,0,3.272H4.478a1.636,1.636,0,0,1,0-3.272M37.517,7.266V4.175A4.72,4.72,0,0,0,32.8-.55H4.165A4.721,4.721,0,0,0-.55,4.175v3.09H37.517M36.4,30.5H32.9a1.261,1.261,0,0,1-1.254-1.094l-.267-1.864a7.366,7.366,0,0,1-.837-.487l-1.756.707-.013,0a1.337,1.337,0,0,1-.463.084,1.256,1.256,0,0,1-1.1-.649l-1.745-3.027,0-.009a1.278,1.278,0,0,1,.312-1.62l0,0,1.49-1.167c-.013-.173-.019-.334-.019-.488s.006-.315.019-.488l-1.488-1.165,0,0a1.276,1.276,0,0,1-.307-1.636l1.747-3.029a1.278,1.278,0,0,1,1.109-.64,1.238,1.238,0,0,1,.449.083l.005,0,1.763.71a7.407,7.407,0,0,1,.834-.488l.267-1.873a1.258,1.258,0,0,1,1.252-1.085H36.4a1.258,1.258,0,0,1,1.252,1.093l.267,1.864a7.28,7.28,0,0,1,.838.488l1.758-.707.011,0a1.323,1.323,0,0,1,.462-.084,1.256,1.256,0,0,1,1.1.649L43.832,17.6l.005.009a1.28,1.28,0,0,1-.312,1.62l0,0L42.032,20.4c.011.147.02.313.02.489s-.009.338-.02.488l1.487,1.166,0,0a1.276,1.276,0,0,1,.319,1.614l0,.009-1.753,3.042a1.248,1.248,0,0,1-1.1.643,1.274,1.274,0,0,1-.462-.087l-.006,0-1.764-.71a7.41,7.41,0,0,1-.833.488l-.269,1.873A1.256,1.256,0,0,1,36.4,30.5ZM34.646,16.761a4.127,4.127,0,1,0,4.118,4.127A4.126,4.126,0,0,0,34.646,16.761ZM24.328,27.876H4.165A5.177,5.177,0,0,1-1,22.7V10.537a.45.45,0,0,1,.45-.45H28.666a.45.45,0,0,1,.218.844,11.52,11.52,0,0,0-4.175,16.256.45.45,0,0,1-.381.69ZM4.478,13.765a1.186,1.186,0,0,0,0,2.372H9.146a1.186,1.186,0,0,0,0-2.372ZM37.517,7.716H-.55A.45.45,0,0,1-1,7.266V4.175A5.176,5.176,0,0,1,4.165-1H32.8a5.17,5.17,0,0,1,5.166,5.175v3.09A.45.45,0,0,1,37.517,7.716Z" transform="translate(1 1)"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div>
              <el-input v-model="input" style="width: 100%; height: 2.5rem;margin-top: .8rem;" placeholder="最低100，最高10000">
                <template #prefix>
                  <span style="color: #fff;">￥</span>
                </template>
                <template #suffix>
                  <span style="color: #f0c059;">全部</span>
                </template>
              </el-input>
            </div>
            <Divider style="border-color: #313843" />
            <div style="text-align: left;font-size: .9rem;color: #fff;padding: 0 1rem;margin-bottom: .8rem;display: flex;flex-direction: row;align-items: center;justify-content: space-between;">
              <span style="color: #fff;">验证提现密码</span>
              <span @click="showPassword = !showPassword">
                <svg width="1.7rem" height="1.7rem" :fill="showPassword ? '#a8abb2' : '#f0c059'" class="" viewBox="0 0 26 21.514">
                  <g id="15de446f1eed61f1c8cd5662a718596a-comm_icon_hide" transform="translate(-1767.233 -314.086)">
                    <path id="15de446f1eed61f1c8cd5662a718596a-Path_515" data-name="Path 515" d="M1789.072,314.086l-3.3,3.3a14.338,14.338,0,0,0-5.53-1.1,13.585,13.585,0,0,0-13.012,8.88l.069.007-.069.007a12.82,12.82,0,0,0,4.592,6.156l-2.855,2.855,1.412,1.412,20.1-20.1Zm-14.792,11.032a5.935,5.935,0,0,1,8.907-5.148l-1.827,1.828a3.507,3.507,0,0,0-4.456,4.456l-1.825,1.825A5.888,5.888,0,0,1,1774.279,325.118Z"></path>
                    <path id="15de446f1eed61f1c8cd5662a718596a-Path_516" data-name="Path 516" d="M1793.172,339.617a3.516,3.516,0,0,0,3.514-3.515c0-.028,0-.056,0-.084l-3.6,3.6C1793.115,339.613,1793.143,339.617,1793.172,339.617Z" transform="translate(-12.942 -10.978)"></path>
                    <path id="15de446f1eed61f1c8cd5662a718596a-Path_517" data-name="Path 517" d="M1801.535,330.583a12.792,12.792,0,0,0-3.948-5.668l-3.507,3.507a5.934,5.934,0,0,1-7.668,7.668l-2.594,2.594a14.48,14.48,0,0,0,4.729.794,13.555,13.555,0,0,0,12.988-8.881l-.07-.007Z" transform="translate(-8.302 -5.421)"></path>
                  </g>
                </svg>
              </span>
            </div>
            <div>
              <van-password-input
                style="width: 100%;margin: 0 auto;border-radius: .5rem;"
                :value="password"
                :focused="showKeyboard"
                :mask="showPassword"
                @focus="showKeyboard = true"
              />
            </div>
            <div style="margin-top: 1rem;">
              <button style="background: #999999;border-radius: .6rem;width: 100%;color: #fff;">确认提现</button>
            </div>
        </div>
        <div v-if="qianbao === 'shuzi'">
            <div>
              <el-input v-model="input" style="width: 100%; height: 2.5rem;" placeholder="添加提现账户">
                <template #prefix>
                  <span style="color: #fff;">
                    <div>
                      <svg width="2rem" height="2rem" fill="#f0c059" class="" viewBox="0 0 45 33">
                        <g id="7402d171f7b9e52a313cfdcc3f16a8c5-icon_tx_txgl" transform="translate(-599.998 -1034.128)">
                          <rect id="7402d171f7b9e52a313cfdcc3f16a8c5-矩形_3513" data-name="矩形 3513" width="45" height="33" transform="translate(599.998 1034.128)" opacity="0"></rect>
                          <g id="7402d171f7b9e52a313cfdcc3f16a8c5-icon_wd_txgl" transform="translate(600.448 1035.255)">
                            <path id="7402d171f7b9e52a313cfdcc3f16a8c5-Shape_19" data-name="Shape 19" d="M4.716,27.977A4.721,4.721,0,0,1,0,23.251V11.087H29.215a11.97,11.97,0,0,0-4.338,16.89ZM3.394,15.5a1.635,1.635,0,0,0,1.634,1.636H9.7a1.636,1.636,0,1,0,0-3.272H5.028A1.635,1.635,0,0,0,3.394,15.5ZM0,7.816V4.725A4.721,4.721,0,0,1,4.716,0H33.35a4.721,4.721,0,0,1,4.716,4.725v3.09Z" transform="translate(0)"></path>
                            <path id="7402d171f7b9e52a313cfdcc3f16a8c5-Shape_19-2" data-name="Shape 19" d="M676.932,1074.442l-1.68-1.317a6.874,6.874,0,0,0,.04-.692,6.711,6.711,0,0,0-.04-.692l1.683-1.317a.827.827,0,0,0,.2-1.052l-1.747-3.03a.81.81,0,0,0-1.011-.364l-1.984.8a6.851,6.851,0,0,0-1.192-.693l-.3-2.107a.81.81,0,0,0-.807-.7h-3.506a.81.81,0,0,0-.806.7l-.3,2.115a6.97,6.97,0,0,0-1.189.692l-1.988-.8a.826.826,0,0,0-1,.36l-1.75,3.034a.823.823,0,0,0,.2,1.057l1.681,1.316a6.088,6.088,0,0,0,0,1.382l-1.683,1.318a.825.825,0,0,0-.2,1.052l1.747,3.03a.81.81,0,0,0,1.012.364l1.98-.8a6.876,6.876,0,0,0,1.191.692l.3,2.106a.81.81,0,0,0,.81.7h3.5a.81.81,0,0,0,.807-.7l.3-2.115a7.02,7.02,0,0,0,1.188-.693l1.99.8a.826.826,0,0,0,.3.057.8.8,0,0,0,.7-.414l1.755-3.046A.824.824,0,0,0,676.932,1074.442Zm-8.595,2.569a4.576,4.576,0,1,1,4.568-4.576,4.576,4.576,0,0,1-4.568,4.576Z" transform="translate(-633.14 -1050.995)"></path>
                          </g>
                          <g id="7402d171f7b9e52a313cfdcc3f16a8c5-Stroke_Effect" data-name="Stroke Effect" transform="translate(599.998 1035.006)" opacity="0.01">
                            <path id="7402d171f7b9e52a313cfdcc3f16a8c5-路径_21825" data-name="路径 21825" d="M33.446,30.6a.81.81,0,0,1-.81-.7l-.3-2.107a6.88,6.88,0,0,1-1.191-.693l-1.98.8a.81.81,0,0,1-1.012-.364L26.4,24.5a.826.826,0,0,1,.2-1.052l1.683-1.318a6.106,6.106,0,0,1,0-1.383L26.6,19.43a.824.824,0,0,1-.2-1.058l1.75-3.034a.826.826,0,0,1,1-.36l1.988.8a7,7,0,0,1,1.189-.693l.3-2.115a.81.81,0,0,1,.807-.695H36.95a.81.81,0,0,1,.805.7l.3,2.108a6.8,6.8,0,0,1,1.192.693l1.984-.8a.81.81,0,0,1,1.011.364l1.747,3.031a.828.828,0,0,1-.2,1.052l-1.681,1.318a6.828,6.828,0,0,1,.04.692c0,.251-.02.489-.04.692l1.68,1.316a.825.825,0,0,1,.2,1.046l-1.755,3.047a.8.8,0,0,1-.7.414.821.821,0,0,1-.3-.056l-1.989-.8a7.006,7.006,0,0,1-1.187.693l-.3,2.115a.81.81,0,0,1-.807.7Zm-2.817-9.163A4.568,4.568,0,1,0,35.2,16.861,4.568,4.568,0,0,0,30.629,21.438ZM4.716,27.976A4.721,4.721,0,0,1,0,23.25V11.087H29.216a11.97,11.97,0,0,0-4.338,16.89ZM3.394,15.5a1.635,1.635,0,0,0,1.634,1.635H9.7a1.636,1.636,0,1,0,0-3.272H5.028A1.635,1.635,0,0,0,3.394,15.5ZM0,7.816V4.725A4.721,4.721,0,0,1,4.716,0H33.351a4.721,4.721,0,0,1,4.716,4.725v3.09Z" transform="translate(0.45 0.45)" fill="none"></path>
                            <path id="7402d171f7b9e52a313cfdcc3f16a8c5-路径_21826" data-name="路径 21826" d="M36.4,30.05a.808.808,0,0,0,.806-.7l.3-2.115a7.006,7.006,0,0,0,1.187-.693l1.99.8a.821.821,0,0,0,.3.056.8.8,0,0,0,.7-.414l1.756-3.047a.825.825,0,0,0-.2-1.046l-1.68-1.317c.02-.2.04-.44.04-.691a6.828,6.828,0,0,0-.04-.692l1.683-1.317a.828.828,0,0,0,.2-1.052l-1.747-3.031a.809.809,0,0,0-1.011-.364l-1.984.8a6.8,6.8,0,0,0-1.191-.693l-.3-2.108a.808.808,0,0,0-.806-.7H32.894a.809.809,0,0,0-.806.7l-.3,2.116a7,7,0,0,0-1.189.693l-1.988-.8a.826.826,0,0,0-1,.358l-1.75,3.034a.824.824,0,0,0,.2,1.058L27.734,20.2a6.106,6.106,0,0,0,0,1.383L26.052,22.9a.826.826,0,0,0-.2,1.052L27.6,26.98a.808.808,0,0,0,1.012.364l1.982-.8a6.882,6.882,0,0,0,1.191.692l.3,2.108a.81.81,0,0,0,.808.7h3.5M34.646,16.311a4.577,4.577,0,1,1-4.567,4.577,4.572,4.572,0,0,1,4.567-4.577M24.328,27.426a11.97,11.97,0,0,1,4.338-16.89H-.55V22.7a4.721,4.721,0,0,0,4.715,4.726H24.328M4.478,13.315H9.146a1.636,1.636,0,0,1,0,3.272H4.478a1.636,1.636,0,0,1,0-3.272M37.517,7.266V4.175A4.72,4.72,0,0,0,32.8-.55H4.165A4.721,4.721,0,0,0-.55,4.175v3.09H37.517M36.4,30.5H32.9a1.261,1.261,0,0,1-1.254-1.094l-.267-1.864a7.366,7.366,0,0,1-.837-.487l-1.756.707-.013,0a1.337,1.337,0,0,1-.463.084,1.256,1.256,0,0,1-1.1-.649l-1.745-3.027,0-.009a1.278,1.278,0,0,1,.312-1.62l0,0,1.49-1.167c-.013-.173-.019-.334-.019-.488s.006-.315.019-.488l-1.488-1.165,0,0a1.276,1.276,0,0,1-.307-1.636l1.747-3.029a1.278,1.278,0,0,1,1.109-.64,1.238,1.238,0,0,1,.449.083l.005,0,1.763.71a7.407,7.407,0,0,1,.834-.488l.267-1.873a1.258,1.258,0,0,1,1.252-1.085H36.4a1.258,1.258,0,0,1,1.252,1.093l.267,1.864a7.28,7.28,0,0,1,.838.488l1.758-.707.011,0a1.323,1.323,0,0,1,.462-.084,1.256,1.256,0,0,1,1.1.649L43.832,17.6l.005.009a1.28,1.28,0,0,1-.312,1.62l0,0L42.032,20.4c.011.147.02.313.02.489s-.009.338-.02.488l1.487,1.166,0,0a1.276,1.276,0,0,1,.319,1.614l0,.009-1.753,3.042a1.248,1.248,0,0,1-1.1.643,1.274,1.274,0,0,1-.462-.087l-.006,0-1.764-.71a7.41,7.41,0,0,1-.833.488l-.269,1.873A1.256,1.256,0,0,1,36.4,30.5ZM34.646,16.761a4.127,4.127,0,1,0,4.118,4.127A4.126,4.126,0,0,0,34.646,16.761ZM24.328,27.876H4.165A5.177,5.177,0,0,1-1,22.7V10.537a.45.45,0,0,1,.45-.45H28.666a.45.45,0,0,1,.218.844,11.52,11.52,0,0,0-4.175,16.256.45.45,0,0,1-.381.69ZM4.478,13.765a1.186,1.186,0,0,0,0,2.372H9.146a1.186,1.186,0,0,0,0-2.372ZM37.517,7.716H-.55A.45.45,0,0,1-1,7.266V4.175A5.176,5.176,0,0,1,4.165-1H32.8a5.17,5.17,0,0,1,5.166,5.175v3.09A.45.45,0,0,1,37.517,7.716Z" transform="translate(1 1)"></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                  </span>
                </template>
                <template #suffix>
                  <span style="color: #f0c059;"><van-icon name="arrow" /></span>
                </template>
              </el-input>
            </div>
            <div>
              <el-input v-model="input" style="width: 100%; height: 2.5rem;margin-top: .7rem;" placeholder="请添加提现账户才能提现">
                <template #prefix>
                  <span style="color: #fff;">
                    <div>
                      <span style="color: #fff;">￥</span>
                    </div>
                  </span>
                </template>
              </el-input>
            </div>
            <div style="margin-top: 1rem;">
              <button style="background: #999999;border-radius: .6rem;width: 100%;color: #fff;">确认提现</button>
            </div>
        </div>
    </div>
    <van-number-keyboard
      v-model="password"
      :show="showKeyboard"
      @blur="showKeyboard = false"
    />
  </div>
  
</template>

<script setup>
import payIconImg from '@/assets/images/payicon/icon_cz_no.avif'
import { Divider } from 'vant';
import { useUserStore } from '/src/store/user'
import { ref, computed } from 'vue'
import abPayIcon from "@/assets/images/payicon/icon_wallet_abpay.png"
import noPayIcon from "@/assets/images/payicon/icon_no_wallet.png"
import sanfangPayIcon from "@/assets/images/payicon/icon_wallet_normal.png"
import shuziPayIcon from "@/assets/images/payicon/icon_szhb_xnb.png"
import { PasswordInput, NumberKeyboard } from 'vant';
const showPassword = ref(false)
const qianbao = ref('no')
const user = useUserStore()
const password = ref('')
const showKeyboard = ref(false)
const formattedBalance = computed(() => Number(user.balance || 0).toFixed(2))
const qianbaoSelect = ref('ABPay')
const banlanceOption = ref([
  {
    value: 'ABPay',
    label: 'ABPay钱包',
    icon: abPayIcon
  },
  {
    value: 'sanfang',
    label: '三方钱包',
    icon: sanfangPayIcon
  },
  {
    value: 'no',
    label: 'NO钱包',
    icon: noPayIcon
  },
  {
    value: 'shuzi',
    label: '数字货币',
    icon: shuziPayIcon
  }
])
</script>

<style>
    .balance-row { display:flex; align-items:center; justify-content:space-between; background: rgba(29,31,36,0.6); padding:0; border-radius:8px }
.bal-left { font-size:.9rem; display: flex;flex-direction: row;align-items: center;justify-content: center; }
.bal-left span {
  display: block;
  margin-right: .3rem;
}
.qianbao-select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: .6rem;
}
.no {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: .6rem;
}
.no>div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: .8rem;
}
.no>div span {
    font-size: .7rem;
}
.no-button {
    padding: .4rem 0;
    width: 100%;
    border-radius: .5rem;
    color: #F0C059;
    font-size: .8rem;
    border: 1px solid #f0c059;
}
    .qianbao {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: .6rem;
}
.qianbao-item {
  font-size: .68rem;
  border: 1px solid #313843;
  border-radius: .5rem;
  width: 100%;
  height: 2.3rem;
  line-height: 2.3rem;
  color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center
}
.qianbao div img {
  width: auto;
  height: .8rem;
  margin-right: .3rem;
}
.qianbao-item.active {
  border: 1px solid #F0C059;
  color: #F0C059;
}
</style>