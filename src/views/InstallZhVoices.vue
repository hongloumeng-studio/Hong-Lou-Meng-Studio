<template>
  <main>
    <AppHeader :showNavigation="false" />
    <TheDialog />
      
    <v-tabs
      v-model="tab"
      color="primary"
      grow
      style="margin-top:5rem;"
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :text="item"
        :value="item"
      ></v-tab>
    </v-tabs>
    <v-btn to="/" color="success" class="float-right" style="margin-right:10rem;"">回首頁 <v-icon>mdi-home</v-icon></v-btn> 

<v-tabs-window v-model="tab">
  <v-tabs-window-item
    value="Windows"
  >
    <v-card>
        <v-card-text class="text-h6">
             <v-row>
                <v-col cols="12" style="margin-top:1rem;">&nbsp;</v-col>
            </v-row>
            <v-row>
                <v-col cols="1">&nbsp;</v-col>
                <v-col cols="10">
                <div class="" style="width:75%; margin:0 auto;">
               
<h1>Windows 11 安裝中文語音</h1>

<p>以下步驟說明如何在 Windows 11 中，安裝中文語音（Text-to-Speech, TTS）語音包。</p>

<h2>步驟 1：開啟設定 (Settings)</h2>
<p>按下鍵盤上的 <strong>Windows + I</strong>，開啟 Windows「設定」。</p>

<h2>步驟 2：進入語言與地區設定 (Time & language &gt; Language & region)</h2>
<p>在設定視窗中，依序選擇：</p>
<p><strong>時間與語言 (Time & language) &gt; 語言與地區 (Language & region)</strong></p>

<h2>步驟 3：新增中文語言 (Add a language)</h2>
<ol>
  <li>點選 <strong>新增語言 (Add a language)</strong>。</li>
  <li>在搜尋欄中輸入並選擇所需的中文語言，例如：
    <ul>
      <li><strong>中文（繁體，台灣 Chinese Traditional）</strong></li>
      <li><strong>中文（繁體，香港特別行政區）</strong></li>
      <li><strong>中文（簡體，中國 Chinese Simplified）</strong></li>
    </ul>
  </li>
  <li>選擇語言後，點選 <strong>下一步 (Next)</strong>。</li>
</ol>

<h2>步驟 4：安裝語音相關功能</h2>
<p>如果系統顯示可選功能，請確認已勾選下列項目：</p>
<ul>
  <li><strong>語言套件 (Install language pack)</strong></li>
  <li><strong>文字轉語音 (Text-to-speech)</strong></li>
  <li><strong>語音辨識 (Speech recognition)</strong>，如有需要 (optional)</li>
</ul>
<p>接著點選 <strong>安裝 (Install)</strong>。</p>

<h2>步驟 5：選擇Text-to-Speech語音</h2>
<p>安裝完成後，前往：</p>
<p><strong>設定 &gt; 時間與語言 &gt; 語音 (Settings &gt; Time & language &gt; Speech )</strong></p>
<p>在「語音」或「文字轉語音」相關設定中，選擇已安裝的中文語音。</p>
<p>比如，本平臺測試時所使用的語音， Microsoft Hanhan。</p>
<img src="@/assets/images/Install_ZH_Voices.png"></img>

<h2>步驟 6：重新啟動相關應用程式</h2>
<p>安裝完成後，請關閉並重新開啟需要使用文字轉語音的應用程式，例如：</p>
<ul>
  <li>Microsoft Edge</li>
  <li>Microsoft Word</li>
  <li>OneNote</li>
  <li>其他支援文字轉語音的應用程式</li>
</ul>

<h2>注意事項</h2>
<ul>
  <li>中文語音是否可用，可能會受到 Windows 版本、地區設定與系統更新狀態影響。</li>
  <li>如果安裝後沒有看到中文語音，請執行 <strong>Windows Update</strong>，然後重新啟動電腦。</li>
  <li>部分應用程式使用 Windows 本機語音，部分應用程式則使用 Microsoft 線上語音。</li>
  <li>Microsoft Edge 的「大聲朗讀 (Read aloud)」功能通常會提供更多中文語音選項。</li>
</ul>
                </div>
                <v-btn to="/" color="success">回首頁 <v-icon>mdi-home</v-icon></v-btn>
                </v-col>
                <v-col cols="1">&nbsp;</v-col>
            </v-row>
            <v-row><v-col cols="12" class="text-left"></v-col></v-row>
        </v-card-text>
    </v-card>
  </v-tabs-window-item>

  <v-tabs-window-item
    value="Mac"
  >
    <v-card>
        <v-card-text class="text-h6">
             <v-row>
                <v-col cols="12" style="margin-top:1rem;">&nbsp;</v-col>
            </v-row>
            <v-row>
                <v-col cols="1">&nbsp;</v-col>
            <v-col cols="10">
                <div class="" style="width:75%; margin:0 auto;">
                 
<h1>Mac 安裝中文語音</h1>

  <p>
    以下說明如何在 Mac/macOS 中安裝中文朗讀語音
    （Text-to-Speech / Spoken Content）。
  </p>

  <h2>適用系統</h2>
  <p>
    適用於 macOS Ventura、Sonoma、Sequoia 或更新版本。
  </p>

  <h2>步驟 1：開啟「系統設定」</h2>
  <ol>
    <li>
      點選螢幕左上角的 <strong>Apple 選單</strong>
      <span lang="en">Apple Menu</span>。
    </li>
    <li>
      點選 <strong>系統設定</strong>
      <span lang="en">System Settings</span>。
    </li>
  </ol>

  <h2>步驟 2：進入「輔助使用」</h2>
  <ol>
    <li>
      在左側選單中，點選 <strong>輔助使用</strong>
      <span lang="en">Accessibility</span>。
    </li>
  </ol>

  <h2>步驟 3：開啟「朗讀內容」</h2>
  <ol>
    <li>
      在「輔助使用」頁面中，找到並點選
      <strong>朗讀內容</strong>
      <span lang="en">Spoken Content</span>。
    </li>
  </ol>

  <h2>步驟 4：開啟語音管理選單</h2>
  <ol>
    <li>
      在「朗讀內容」設定中，找到
      <strong>系統語音</strong>
      <span lang="en">System Voice</span>。
    </li>
    <li>
      點選目前顯示的語音名稱。
    </li>
    <li>
      點選 <strong>管理語音…</strong>
      <span lang="en">Manage Voices…</span>。
    </li>
  </ol>

  <h2>步驟 5：下載中文語音</h2>
  <ol>
    <li>
      在語音清單中，尋找中文語音，例如：
      <ul>
        <li>
          <strong>中文（台灣）</strong>
          <span lang="en">Chinese, Taiwan</span>
        </li>
        <li>
          <strong>中文（香港）</strong>
          <span lang="en">Chinese, Hong Kong</span>
        </li>
        <li>
          <strong>中文（中國大陸）</strong>
          <span lang="en">Chinese, Mainland China</span>
        </li>
        <li>
          <strong>國語 / 普通話</strong>
          <span lang="en">Mandarin</span>
        </li>
      </ul>
    </li>
    <li>
      勾選或選取你需要的中文語音。
    </li>
    <li>
      點選 <strong>下載</strong>
      <span lang="en">Download</span>。
    </li>
    <li>
      如有需要，點選 <strong>好</strong>
      <span lang="en">OK</span> 或 <strong>完成</strong>
      <span lang="en">Done</span>。
    </li>
  </ol>

  <h2>常見中文語音範例</h2>
  <p>
    可用的語音名稱會依 macOS 版本與地區設定不同而有所差異。
    常見中文語音可能包括：
  </p>

  <ul>
    <li>
      <strong>Mei-Jia</strong>：中文，台灣
      <span lang="en">Chinese, Taiwan</span>
    </li>
    <li>
      <strong>Google (台灣)</strong>：中文，台灣
      <span lang="en">Chinese, Hong Kong</span>
    </li>
    <li>
      <strong>Ting-Ting</strong>：中文，中國大陸
      <span lang="en">Chinese, Mainland China</span>
    </li>
    <li>
      <strong>Li-Mu</strong> 或其他新版自然語音，視 macOS 版本而定
      <span lang="en">Natural Voice availability depends on macOS version</span>
    </li>
  </ul>

  <h2>步驟 6：設定為預設朗讀語音</h2>
  <ol>
    <li>
      回到 <strong>系統設定</strong>
      <span lang="en">System Settings</span>。
    </li>
    <li>
      點選 <strong>輔助使用</strong>
      <span lang="en">Accessibility</span>。
    </li>
    <li>
      點選 <strong>朗讀內容</strong>
      <span lang="en">Spoken Content</span>。
    </li>
    <li>
      在 <strong>系統語音</strong>
      <span lang="en">System Voice</span> 中，選擇剛剛安裝的中文語音。
    </li>
  </ol>

  <h2>步驟 7：調整朗讀設定</h2>
  <p>
    你可以依需要調整以下設定：
  </p>

  <ul>
    <li>
      <strong>朗讀速度</strong>
      <span lang="en">Speaking Rate</span>
    </li>
    <li>
      <strong>語音音量</strong>
      <span lang="en">Voice Volume</span>
    </li>
    <li>
      <strong>朗讀所選內容</strong>
      <span lang="en">Speak Selection</span>
    </li>
  </ul>

  <h2>步驟 8：測試中文朗讀語音</h2>
  <ol>
    <li>開啟一段中文文字。</li>
    <li>選取要朗讀的中文文字。</li>
    <li>
      按下快捷鍵 <strong>Option + Esc</strong>。
    </li>
  </ol>

  <p>
    如果沒有聽到朗讀聲音，請回到
    <strong>朗讀內容</strong>
    <span lang="en">Spoken Content</span>
    設定，確認
    <strong>朗讀所選內容</strong>
    <span lang="en">Speak Selection</span>
    已啟用。
  </p>

  <h2>舊版 macOS 安裝方式</h2>
  <p>
    如果你的 Mac 使用較舊版本的 macOS，設定位置可能是：
  </p>

  <ul>
    <li>
      <strong>系統偏好設定 &gt; 輔助使用 &gt; 語音</strong>
      <span lang="en">System Preferences &gt; Accessibility &gt; Speech</span>
    </li>
    <li>
      <strong>系統偏好設定 &gt; 輔助使用 &gt; 朗讀內容</strong>
      <span lang="en">System Preferences &gt; Accessibility &gt; Spoken Content</span>
    </li>
  </ul>

  <p>
    然後在 <strong>系統語音</strong>
    <span lang="en">System Voice</span>
    中選擇
    <strong>自訂…</strong>
    <span lang="en">Customize…</span>
    或
    <strong>管理語音…</strong>
    <span lang="en">Manage Voices…</span>，
    下載中文語音。
  </p>

  <h2>注意事項</h2>
  <ul>
    <li>下載中文語音需要網路連線。</li>
    <li>不同 macOS 版本提供的中文語音名稱可能不完全相同。</li>
    <li>如果沒有看到中文語音，請先更新 macOS，然後重新開啟「系統設定」。</li>
    <li>部分應用程式可能使用自己的朗讀引擎，不一定會使用 macOS 的系統語音。</li>
    <li>Safari、Pages、Notes、Preview 等 macOS 內建應用通常可以使用系統朗讀語音。</li>
  </ul>
</div>
</v-col>
</v-row> 
            <v-row><v-col cols="12" class="text-left"></v-col></v-row>
        </v-card-text>
    </v-card>
  </v-tabs-window-item>
</v-tabs-window>
<v-btn to="/" color="success" class="float-left" style="margin-left:10rem;">回首頁 <v-icon>mdi-home</v-icon></v-btn> 
  </main>
</template>
<script setup>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue' 
import TheDialog from '../components/TheDialog.vue'

import {useAppStore} from '@/stores'
const store = useAppStore()

const tab = ref('Windows')

  const items = [
    'Windows',
    'Mac',
  ]
</script>
<style scoped>
p {font-size:150%;}
ol li {font-size:135%;}
ul li {font-size:135%;}
</style>
