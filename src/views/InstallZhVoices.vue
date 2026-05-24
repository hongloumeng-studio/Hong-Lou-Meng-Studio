<template>
  <main>
    <AppHeader :showNavigation="false" />
    <TheDialog />

    <v-card>
        <v-card-text class="text-h6">
             <v-row>
                <v-col cols="12" style="margin-top:1rem;">&nbsp;</v-col>
            </v-row>
            <v-row>
                <v-col cols="1">&nbsp;</v-col>
                <v-col cols="10">
                <div class="" style="width:75%; margin:0 auto;">
<v-btn to="/" color="success" class="float-right">回首頁 <v-icon>mdi-home</v-icon></v-btn>                  
<h1>安裝中文語音</h1>
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
  </main>
</template>
<script setup>
import AppHeader from '../components/AppHeader.vue' 
import TheDialog from '../components/TheDialog.vue'

import {useAppStore} from '@/stores'
const store = useAppStore()
</script>
<style scoped>
p {font-size:150%;}
ol li {font-size:135%;}
ul li {font-size:135%;}
</style>
