// ==UserScript==
// @name         Zhihu enhancement
// @name:zh-CN   知乎增强
// @name:zh-TW   知乎增強
// @name:ru      Улучшение Zhihu
// @version      2.3.30
// @author       X.I.U
// @description  A more personalized Zhihu experience~
// @description:zh-CN  移除登录弹窗、屏蔽指定类别（视频、盐选、文章、想法、关注[赞同/关注了XX]等）、屏蔽低赞/低评、屏蔽用户、屏蔽关键词、默认收起回答、快捷收起回答/评论（左键两侧）、快捷回到顶部（右键两侧）、区分问题文章、移除高亮链接、净化搜索热门、净化标题消息、展开问题描述、显示问题作者、默认高清原图（无水印）、置顶显示时间、完整问题时间、直达问题按钮、默认站外直链...
// @description:zh-TW  移除登錄彈窗、屏蔽指定類別（視頻、鹽選、文章、想法、關注[讚同/關注了XX]等）、屏蔽低讚/低評、屏蔽用戶、屏蔽關鍵詞、默認收起回答、快捷收起回答/評論、快捷回到頂部、區分問題文章、移除高鏈鏈接、默認高清原圖（無水印）、默認站外直鏈...
// @description:ru  Более персонализированный опыт пользования сайтом Zhihu~
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @exclude      https://www.zhihu.com/signin*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFo0lEQVR4nJWXT4hlVxHGf9/tJyYuzJtxIziQN8RBFDEtIWB0MW+Mi4CIk4UuAtqvAxPcqAkJRNxMshDUTc8s3TjdO3c9QbIKod+o4CIuZtRFDEi3EIgEM/02jpPIPZ+LqnPv6TeB4IHLPfeeP1X11VdV54i2vewtOhaITcQDdEgdthAdINAGNkgd0IEVbwR17rAmx1TniSVil6e0V0UKgJc8pWdfG5yvwqRhs1FQIyQ3trvcpxsVGd4xf/gelO24yV0usK1VB6APOMDMKSADBShIBWNwj1WwjClAzLEL0CMc86jj9cl/LgRs8ZjCJvexH5r/xAuJa260TatG6DosIee4lHO0ZnWDXH5bgYQ8uql122Iis2Xnj4JtRH675AIHMAQKuAsdrLV3dYXTwQ7Bir1jrzJ+Wyw698yVkLmgxgVg+PGjcPw8zD6JKcgFUcD94AoNa0eXkO600lVqXOPqPrPZNT6tjylYBRZfgp0n4GgFR7dDkEieeNys6ZPCBq4MCicXdFLWdIKBHtMFfC4JY8Hf/nxEyY0jmD+IM7Cgy77gxtto+jF4+NMj8+tY84YOLd8JnZJPpiDxI7shUigimJ2Gwxf5yLb9aryvffOj5+pXKbzJDxOVoIw7REkLhedno7+6CzffgdkpmE3z+5/Nrq7JJMfejc3bNj+TnT4tTyRtmLiAlARKliK09Uis2fsTPPcqvvwNdPlxuP4mbO+P4aQObz0cG958F77+mxMJh9kDcPh0IpCcUIerqycYuc8FGX7zczB/CI6O4cofAA9GjuRjUFhN2I0hmISlNFCUzCGMSkxqfFJw3XD6cXjuOt57A1YfpM/KSSEqY9zLo4w0psLsVnknyhkVYgNPMlRQh+qE63+GSsaBoK2VJcdTKTcKDLmhA/o1BDKFKzKl3aOJcoNBu3SHAAe4ahwwKgBkFRhdMMIc6Chzf+VphruT6urwZBh1aEQXjL/2fZidHoVP74/3xS8GP1IBLQ/hxuGonCLFxpZKjtTpDpRrSjYwYa2p4GcvoPm59ZFU5L54apvP4MZhY2XJMh1u+DB0Qk7ybaIR2EGHl34LV1/HGU5CsP8MbH4Gnvw1vPJX7G48pGw/OiLgyoEKf4PAYH0f6VtdIOAmlwCwugOrO0mDOHRodjrG/vGv9HvyQEprRwQjPB3rWg5oXBNR0A+Vf2wtJwDZaP5ZPL0fVv+B4zto5yJjKK6R0CUPMI7K6jUEsgpKGYqTwXpneGiExKnR4iuZ6d6Ggx/C7FNwdBuu/C6ROBmiUU/6PDuWhh9tEssQHxFQVlmP3wKfPY23Hotfe3+Eq8tYf/kJmE2jdK8pIPWJTDmJAFmq1We57iNnDQol9HWFDbr8rfg8eg+Wb8KV19DyrQjLa08hNal4/hD4l3D+LNr/HvhncPhC49+Ev5475DHfeUjjGrPt4jHY+upgvZOAPL0XRJ2fgwdPNS7IdvADuPgF7m15UDEDOhaXXKQT6RyAzTNw8DxMPxHWn/1p6ObMjc8+DjvfhVMvwOr9EcLjnwc6V38PL78Gq7vYG8PBxAqTzUbInJwoGtlbfA3tfCeEL/8G23sZEaAMIV99HW2egdW/m9Is/Mpf0O4bsPw7tY4os+OAbuUXHZKe8W3gVDLeEjr/uTgRHb0Hy7fyf0PUQd2YH4eZesrRmMBqDhF5gRFiIxSRQoGJxS0Kc8XNRSasHlqStOZ3Nf1aKVQzIKkMzeHTGZaRoEzWmyxIyw6zW6FRQ6c2NapC5pCjuAl5+Od7Tru41vxagEpTOeN0LAq7oe0lH0DeC6uVH0Lito03kbVUnmSrp+yE/967Y8dNfqEvdwD+L09a3BrgbqA/IZS4H4osLE3mHlDzYB30iUJ7XwwklrzPhXWk4ZIXdGxROM//g0ZbQrKXVza0EQcQiWNvcIuOXXbG6/n/AAwhLDO9HaqBAAAAAElFTkSuQmCC
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_info
// @grant        window.onurlchange
// @sandbox      JavaScript
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/4122051
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// @downloadURL https://update.greasyfork.org/scripts/419081/%E7%9F%A5%E4%B9%8E%E5%A2%9E%E5%BC%BA.user.js
// @updateURL https://update.greasyfork.org/scripts/419081/%E7%9F%A5%E4%B9%8E%E5%A2%9E%E5%BC%BA.meta.js
// ==/UserScript==

'use strict';
var menu_ALL = [
    ['menu_defaultCollapsedAnswer', '默认收起回答', '默认收起回答', true],
    ['menu_collapsedAnswer', '一键收起回答/评论', '一键收起回答/评论', true],
    ['menu_collapsedNowAnswer', '快捷收起回答/评论 (点击两侧空白处)', '快捷收起回答/评论', true],
    ['menu_backToTop', '快捷回到顶部 (右键两侧空白处)', '快捷回到顶部', true],
    ['menu_blockLowCount', '屏蔽低赞低评', '设置要屏蔽 低于多少赞同/评价 的回答/文章（默认不需要留空即可）<br/>（例如设置 0 则无人赞同/评价的回答/文章会被屏蔽<br/>（例如设置 20 则赞同/评价数量低于 20 的回答/文章会被屏蔽<br/>（修改后，后续加载的回答/文章会立即生效，但不影响当前网页已有内容', ''],
    ['menu_blockLowUpvoteCount', '最低赞同数 [首页]', '最低赞同数（首页）', ''],
    ['menu_blockLowCommentCount', '最低评价数 [首页]', '最低评价数（首页）', ''],
    ['menu_blockLowUpvoteCountQuestion', '最低赞同数 [问题页]', '最低赞同数（问题页）', ''],
    ['menu_blockLowCommentCountQuestion', '最低评价数 [问题页]', '最低评价数（问题页）', ''],
    ['menu_blockLowUpvoteCountFollow', '最低赞同数 [关注页]', '最低赞同数（关注页）', ''],
    ['menu_blockLowCommentCountFollow', '最低评价数 [关注页]', '最低评价数（关注页）', ''],
    ['menu_blockUsers', '屏蔽指定用户', '屏蔽指定用户', true],
    ['menu_customBlockUsers', '自定义屏蔽用户', '自定义屏蔽用户', ['故事档案局', '盐选推荐', '盐选科普', '盐选成长计划', '知乎盐选会员', '知乎盐选创作者', '盐选心理', '盐选健康必修课', '盐选奇妙物语', '盐选生活馆', '盐选职场', '盐选文学甄选', '盐选作者小管家', '盐选博物馆', '盐选点金', '盐选测评室', '盐选科技前沿', '盐选会员精品']],
    ['menu_blockKeywords', '屏蔽指定关键词', '屏蔽指定关键词', true],
    ['menu_blockKeywordsComment', '屏蔽关键词 - 评论区', '屏蔽关键词 - 评论区', true],
    ['menu_customBlockKeywords', '自定义屏蔽关键词', '自定义屏蔽关键词', []],
    ['menu_addSelectedBlockKeywords', '添加选中文字到屏蔽词 ↑', '添加选中文字到屏蔽词', []],
    ['menu_blockType', '屏蔽指定类别 (视频/文章等)', '勾选 = 屏蔽该类别的信息流', ''],
    ['menu_blockTypeVideo', '视频 [首页、搜索页、问题页、关注页]', '视频（首页、搜索页、问题页、关注页）', true],
    ['menu_blockTypeArticle', '文章 [首页、搜索页、关注页]', '文章（首页、搜索页、关注页）', false],
    ['menu_blockTypePin', '想法 [首页、关注页]', '想法（首页、关注页）', false],
    ['menu_blockTypeFollowAgree', '赞同了XX [关注页]', '赞同了XX（关注页）', false],
    ['menu_blockTypeFollowQuestion', '关注了XX [关注页]', '关注了XX（关注页）', false],
    ['menu_blockTypeTopic', '话题 [搜索页]', '话题（搜索页）', false],
    ['menu_blockTypeSearch', '杂志文章、盐选专栏、相关搜索等 [搜索页]', '相关搜索、杂志、盐选等（搜索页）', false],
    ['menu_blockYanXuan', '盐选内容 [问题页]', '盐选内容（问题页）', false],
    ['menu_blockTypeLiveHot', '热榜文章、直播、广告等 [热榜]', '热榜文章、直播、广告等 [热榜]', true],
    ['menu_cleanHighlightLink', '移除高亮链接 (高亮的文字链接)', '移除高亮链接', true],
    ['menu_cleanSearch', '净化搜索热门 (默认搜索词及热门搜索)', '净化搜索热门', false],
    ['menu_cleanTitles', '净化标题消息 (标题中的私信/消息)', '净化标题提醒', false],
    ['menu_questionRichTextMore', '展开问题描述', '展开问题描述', false],
    ['menu_publishTop', '置顶显示时间', '置顶显示时间', true],
    ['menu_typeTips', '区分问题文章', '区分问题文章', true],
    ['menu_toQuestion', '直达问题按钮', '直达问题按钮', true]
], menu_ID = [];
for (let i=0;i<menu_ALL.length;i++){
    if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
}
registerMenuCommand();

function registerMenuCommand() {
    if (menu_ID.length > menu_ALL.length){
        for (let i=0;i<menu_ID.length;i++){
            GM_unregisterMenuCommand(menu_ID[i]);
        }
    }
    for (let i=0;i<menu_ALL.length;i++){
        menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
        if (menu_ALL[i][0] === 'menu_blockLowCount') {
            menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_setting('checkbox', menu_ALL[i][1], menu_ALL[i][2], true, [menu_ALL[i+1], menu_ALL[i+2], menu_ALL[i+3], menu_ALL[i+4], menu_ALL[i+5], menu_ALL[i+6]])});
        } else if (menu_ALL[i][0] === 'menu_customBlockUsers') {
            if (menu_value('menu_blockUsers')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockUsers()});
        } else if (menu_ALL[i][0] === 'menu_blockKeywordsComment') {
            if (menu_value('menu_blockKeywords')) menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        } else if (menu_ALL[i][0] === 'menu_customBlockKeywords') {
            if (menu_value('menu_blockKeywords')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockKeywords()});
        } else if (menu_ALL[i][0] === 'menu_addSelectedBlockKeywords') {
            if (menu_value('menu_blockKeywords')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){addSelectedKeywordToBlocklist()});
        } else if (menu_ALL[i][0] === 'menu_blockType') {
            menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_setting('checkbox', menu_ALL[i][1], menu_ALL[i][2], true, [menu_ALL[i+1], menu_ALL[i+2], menu_ALL[i+3], menu_ALL[i+4], menu_ALL[i+5], menu_ALL[i+6], menu_ALL[i+7], menu_ALL[i+8], menu_ALL[i+9]])});
        } else if (menu_ALL[i][0].indexOf('menu_blockType') == -1 && menu_ALL[i][0] != 'menu_blockYanXuan' && menu_ALL[i][0].indexOf('menu_blockLow') == -1) {
            menu_ID[i] = GM_registerMenuCommand(`${menu_ALL[i][3]?'✅':'❌'} ${menu_ALL[i][1]}`, function(){menu_switch(`${menu_ALL[i][3]}`,`${menu_ALL[i][0]}`,`${menu_ALL[i][2]}`)});
        }
    }
    menu_ID[menu_ID.length] = GM_registerMenuCommand('💬 反馈 & 建议', function () {window.GM_openInTab('https://github.com/XIU2/UserScript#xiu2userscript', {active: true,insert: true,setParent: true});window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/419081/feedback', {active: true,insert: true,setParent: true});});
}

function menu_switch(menu_status, Name, Tips) {
    if (menu_status == 'true'){
        GM_setValue(`${Name}`, false);
        GM_notification({text: `已关闭 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
    }else{
        GM_setValue(`${Name}`, true);
        GM_notification({text: `已开启 [${Tips}] 功能\n（点击刷新网页后生效）`, timeout: 3500, onclick: function(){location.reload();}});
    }
    registerMenuCommand();
};

function menu_value(menuName) {
    for (let menu of menu_ALL) {
        if (menu[0] == menuName) {
            return menu[3]
        }
    }
}

// 脚本设置（UI 完美精修版）
function menu_setting(type, title, tips, line, menu) {
    let _html = `<style class="zhihuE_SettingStyle">
/* ===== 全局容器与遮罩 ===== */
.zhihuE_SettingBackdrop_1 {
    position: fixed; top: 0; right: 0; bottom: 0; left: 0;
    z-index: 99999; display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    overflow: hidden;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    transition: all 0.25s ease-in-out;
}
.zhihuE_SettingBackdrop_2 {
    position: absolute; top: 0; right: 0; bottom: 0; left: 0;
    z-index: 0; background-color: rgba(15, 23, 42, 0.45);
}

/* ===== 弹窗主体 ===== */
.zhihuE_SettingRoot {
    position: relative; z-index: 1;
    width: 90%; min-width: 400px; max-width: 580px;
    height: auto; max-height: 80vh; display: flex; flex-direction: column;
    color: #334155; background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(226, 232, 240, 0.8);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    animation: zhihuE_pop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes zhihuE_pop {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
}

/* ===== 头部 ===== */
.zhihuE_SettingHeader {
    padding: 16px 20px; color: #0f172a; font-size: 16px; font-weight: 600;
    background-color: #ffffff; border-bottom: 1px solid #f1f5f9;
    display: flex; justify-content: space-between; align-items: center;
    user-select: none;
}
.zhihuE_SettingHeader .zhihuE_SettingClose {
    display: inline-flex; align-items: center; justify-content: center;
    width: 30px; height: 30px; border-radius: 8px; color: #64748b;
    cursor: pointer; transition: all 0.15s ease;
}
.zhihuE_SettingHeader .zhihuE_SettingClose:hover {
    background-color: #f1f5f9; color: #0f172a;
}

/* ===== 主体内容区与自定义滚动条 ===== */
.zhihuE_SettingMain {
    padding: 20px; overflow-y: auto; flex: 1;
}
.zhihuE_SettingMain::-webkit-scrollbar {
    width: 6px;
}
.zhihuE_SettingMain::-webkit-scrollbar-thumb {
    background-color: #cbd5e1; border-radius: 3px;
}
.zhihuE_SettingMain p {
    margin: 0 0 12px 0; color: #64748b; font-size: 13px; line-height: 1.6;
}
.zhihuE_SettingMain hr {
    border: 0; height: 1px; background-color: #f1f5f9; margin: 12px 0 16px 0;
}

/* ===== 布局控制 ===== */
.zhihuE_SettingGrid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 10px 14px;
    align-items: center;
}
.zhihuE_SettingList {
    display: flex; flex-direction: column; gap: 10px;
}

.zhihuE_SettingMain label {
    display: inline-flex; align-items: center; justify-content: space-between;
    font-size: 14px; color: #334155; cursor: pointer; user-select: none;
    padding: 8px 10px; border-radius: 8px; transition: background-color 0.15s ease;
    background-color: #f8fafc; border: 1px solid #f1f5f9;
}
.zhihuE_SettingMain label:hover {
    background-color: #f1f5f9; border-color: #e2e8f0;
}

/* ===== 自定义 Checkbox 样式 ===== */
.zhihuE_SettingMain label .zhihuE_LabelText {
    display: inline-flex; align-items: center;
}
.zhihuE_SettingMain input[type=checkbox] {
    appearance: none; -webkit-appearance: none;
    width: 18px; height: 18px; border: 1.5px solid #cbd5e1; border-radius: 5px;
    outline: none; margin: 0 10px 0 0; cursor: pointer;
    position: relative; transition: all 0.2s ease;
    background-color: #fff; flex-shrink: 0;
}
.zhihuE_SettingMain input[type=checkbox]:checked {
    background-color: #056de8; border-color: #056de8;
}
.zhihuE_SettingMain input[type=checkbox]:checked::after {
    content: ''; position: absolute; left: 5px; top: 2px;
    width: 5px; height: 9px;
    border: solid white; border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

/* ===== 文本输入框样式 ===== */
.zhihuE_SettingMain input[type=text] {
    padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px;
    outline: none; font-size: 13px; color: #0f172a; text-align: center;
    transition: all 0.2s ease; background-color: #fff;
}
.zhihuE_SettingMain input[type=text]:focus {
    border-color: #056de8; box-shadow: 0 0 0 3px rgba(5, 109, 232, 0.15);
}

/* ===== 底部操作栏 ===== */
.zhihuE_SettingFooter {
    padding: 12px 20px; background-color: #ffffff; border-top: 1px solid #f1f5f9;
    display: flex; justify-content: flex-end;
}
.zhihuE_SettingBtn {
    padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 500;
    background-color: #056de8; color: #ffffff; border: none; cursor: pointer;
    transition: all 0.15s ease; box-shadow: 0 2px 4px rgba(5, 109, 232, 0.2);
}
.zhihuE_SettingBtn:hover {
    background-color: #0452b3;
}

/* ===== 暗黑模式 (Dark Mode) ===== */
[data-theme="dark"] .zhihuE_SettingRoot {
    color: #e2e8f0; background-color: #0f172a;
    border-color: #1e293b; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
}
[data-theme="dark"] .zhihuE_SettingHeader {
    color: #f8fafc; background-color: #0f172a; border-bottom-color: #1e293b;
}
[data-theme="dark"] .zhihuE_SettingHeader .zhihuE_SettingClose:hover {
    background-color: #1e293b; color: #fff;
}
[data-theme="dark"] .zhihuE_SettingMain p { color: #94a3b8; }
[data-theme="dark"] .zhihuE_SettingMain hr { background-color: #1e293b; }
[data-theme="dark"] .zhihuE_SettingMain label { color: #cbd5e1; background-color: #1e293b; border-color: #334155; }
[data-theme="dark"] .zhihuE_SettingMain label:hover { background-color: #334155; }
[data-theme="dark"] .zhihuE_SettingMain input[type=checkbox] {
    border-color: #475569; background-color: #0f172a;
}
[data-theme="dark"] .zhihuE_SettingMain input[type=text] {
    border-color: #475569; background-color: #0f172a; color: #f8fafc;
}
[data-theme="dark"] .zhihuE_SettingFooter {
    background-color: #0f172a; border-top-color: #1e293b;
}
</style>
        <div class="zhihuE_SettingBackdrop_1">
            <div class="zhihuE_SettingBackdrop_2"></div>
            <div class="zhihuE_SettingRoot">
                <div class="zhihuE_SettingHeader">
                    <span>${title}</span>
                    <span class="zhihuE_SettingClose" title="关闭"><svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M13.486 12l5.208-5.207a1.048 1.048 0 0 0-.006-1.483 1.046 1.046 0 0 0-1.482-.005L12 10.514 6.793 5.305a1.048 1.048 0 0 0-1.483.005 1.046 1.046 0 0 0-.005 1.483L10.514 12l-5.208 5.207a1.048 1.048 0 0 0 .006 1.483 1.046 1.046 0 0 0 1.482.005L12 13.486l5.207 5.208a1.048 1.048 0 0 0 1.483-.006 1.046 1.046 0 0 0 .005-1.482L13.486 12z" fill-rule="evenodd"></path></svg></span>
                </div>
                <div class="zhihuE_SettingMain">
                    <p>${tips}</p>
                    <hr>
                    <div class="${line ? 'zhihuE_SettingList' : 'zhihuE_SettingGrid'}">`;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i][0].indexOf('menu_blockLow') === 0) {
            _html += `<label><span>${menu[i][1]}</span><input name="${menu[i][0]}" type="text" oninput="value=value.replace(/[^\\d]/g,'')" value="${GM_getValue(menu[i][0])}" style="width: 60px;"></label>`;
        } else if (GM_getValue(menu[i][0])) {
            _html += `<label><span class="zhihuE_LabelText"><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${menu[i][0]}" checked="checked"><span>${menu[i][1]}</span></span></label>`;
        } else {
            _html += `<label><span class="zhihuE_LabelText"><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${menu[i][0]}"><span>${menu[i][1]}</span></span></label>`;
        }
    }

    _html += `      </div>
                </div>
                <div class="zhihuE_SettingFooter">
                    <button type="button" class="zhihuE_SettingBtn zhihuE_SettingCloseBtn">完成</button>
                </div>
            </div>
        </div>`;

    document.body.insertAdjacentHTML('beforeend', _html);

    setTimeout(function() {
        const doc = document.querySelector('.zhihuE_SettingBackdrop_1');
        if (!doc) return;

        const closeFunc = function() {
            doc.remove();
            document.querySelector('.zhihuE_SettingStyle')?.remove();
        };

        doc.querySelector('.zhihuE_SettingClose').onclick = closeFunc;
        doc.querySelector('.zhihuE_SettingCloseBtn').onclick = closeFunc;
        doc.querySelector('.zhihuE_SettingBackdrop_2').onclick = function(event) {
            if (event.target === this) closeFunc();
        };

        doc.querySelectorAll('input[name=zhihuE_Setting_Checkbox]').forEach(function (checkBox) {
            checkBox.addEventListener('click', function(){
                GM_setValue(this.value, this.checked);
            });
        });

        doc.querySelectorAll('input[type=text]').forEach(function (textBox) {
            textBox.onchange = function(){
                GM_setValue(this.name, this.value);
            };
        });
    }, 50);
}

function waitForElement(selector, callback, maxTries = 20) {
    let count = 0;
    const timer = setInterval(() => {
        const el = document.querySelector(selector);
        if (el || count >= maxTries) {
            clearInterval(timer);
            if (el) callback(el);
        }
        count++;
    }, 200);
}

function getCollapsedAnswerObserver() {
    if (!window._collapsedAnswerObserver) {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                if (mutation.target.hasAttribute('script-collapsed')) return
                if (mutation.target.classList.contains('RichContent')) {
                    for (const addedNode of mutation.addedNodes) {
                        if (addedNode.nodeType != Node.ELEMENT_NODE) continue
                        if (addedNode.className != 'RichContent-inner') continue
                        if (addedNode.offsetHeight < 400) break
                        const button = mutation.target.querySelector('.ContentItem-actions.Sticky [data-zop-retract-question]');
                        if (button) {
                            mutation.target.setAttribute('script-collapsed', '');
                            button.click();
                            return
                        }
                    }
                } else if (mutation.target.tagName === 'DIV' && !mutation.target.style.cssText && !mutation.target.className) {
                    if (mutation.target.parentElement?.hasAttribute('script-collapsed')) return
                    const button = mutation.target.querySelector('.ContentItem-actions.Sticky [data-zop-retract-question]');
                    if (button) {
                        mutation.target.parentElement.setAttribute('script-collapsed', '');
                        button.click();
                        return
                    }
                }
            }
        })

        observer.start = function() {
            if (!this._active) {
                this.observe(document, { childList: true, subtree: true });
                this._active = true;
            }
        }
        observer.end = function() {
            if (this._active) {
                this.disconnect();
            }
        }

        window.addEventListener('urlchange', function() {
            observer[location.href.indexOf('/answer/') === -1 ? 'start' : 'end']();
        })
        window._collapsedAnswerObserver = observer;
    }
    return window._collapsedAnswerObserver
}

function defaultCollapsedAnswer() {
    if (!menu_value('menu_defaultCollapsedAnswer')) return
    const observer = getCollapsedAnswerObserver();
    if (location.href.indexOf('/answer/') === -1) {
        observer.start();
    }
}

function collapsedAnswer() {
    if (!menu_value('menu_collapsedAnswer')) return
    if (document.querySelector('.CornerAnimayedFlex') && !document.getElementById('collapsed-button')) {
        document.head.appendChild(document.createElement('style')).textContent = '.CornerButton{margin-bottom:8px !important;}.CornerButtons{bottom:45px !important;}';
        document.querySelector('.CornerAnimayedFlex').insertAdjacentHTML('afterBegin', '<button id="collapsed-button" data-tooltip="收起全部回答/评论" data-tooltip-position="left" data-tooltip-will-hide-on-click="false" aria-label="收起全部回答/评论" type="button" class="' + document.querySelector('.CornerAnimayedFlex>button').className + '"><svg class="ContentItem-arrowIcon is-active" aria-label="收起全部回答/评论" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button>');
        document.getElementById('collapsed-button').onclick = function () {
            document.querySelectorAll('.Comments-container').forEach(function (el) {
                let commentCollapseButton = getXpath('//button[text()="收起评论"]', el)
                if (commentCollapseButton) commentCollapseButton.click();
            });
            document.querySelectorAll('.RichContent >.ContentItem-actions>button:first-of-type').forEach(function (el) {
                if (el.textContent.indexOf('收起评论') > -1) el.click()
            });

            if (location.pathname === '/' || location.pathname === '/hot' || location.pathname === '/follow') {
                document.querySelectorAll('.ContentItem-rightButton').forEach(function (el) {if (el.hasAttribute('data-zop-retract-question')) {el.click();};});
            } else {
                document.querySelectorAll('[script-collapsed]').forEach(function(scriptCollapsed) {scriptCollapsed.querySelectorAll('.ContentItem-actions [data-zop-retract-question], .ContentItem-actions.Sticky [data-zop-retract-question]').forEach(function(button) {button.click();});})
                document.querySelectorAll('.RichContent:not([script-collapsed]) .ContentItem-actions.Sticky [data-zop-retract-question]').forEach(function(button) {
                    let el = button.parentElement;
                    while (el && !el.classList.contains('RichContent')) {el = el.parentElement;}
                    if (el) el.setAttribute('script-collapsed', '');
                    button.click();
                })

                const observer = getCollapsedAnswerObserver();
                observer.start();

                if (!menu_value('menu_defaultCollapsedAnswer') && !observer._disconnectListener) {
                    window.addEventListener('urlchange', function() {
                        observer.end();
                        window._collapsedAnswerObserver = null;
                    })
                    observer._disconnectListener = true;
                }
            }
        }
    }
}

function collapsedNowAnswer(selectors) {
    backToTop(selectors)
    if (!menu_value('menu_collapsedNowAnswer')) return
    let targetEl = document.querySelector(selectors);
    if (!targetEl) return;
    targetEl.onclick = function(event){
        if (event.target == this) {
            let rightButton = document.querySelector('.ContentItem-actions.Sticky.RichContent-actions.is-fixed.is-bottom')
            if (rightButton) {
                let commentCollapseButton = rightButton.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) commentCollapseButton.click();
                rightButton = rightButton.querySelector('.ContentItem-rightButton[data-zop-retract-question]')
                if (rightButton) rightButton.click();
            } else {
                let answerCollapseButton_ = false;
                for (let el of document.querySelectorAll('.ContentItem-rightButton[data-zop-retract-question]')) {
                    if (isElementInViewport(el)) {
                        let commentCollapseButton = el.parentNode.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                        if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                            commentCollapseButton.click();
                            if (!isElementInViewport(commentCollapseButton)) scrollTo(0,el.offsetTop+50)
                        }
                        el.click()
                        answerCollapseButton_ = true;
                        break
                    }
                }
                if (!answerCollapseButton_) {
                    for (let el of document.querySelectorAll('.List-item, .Card.AnswerCard, .Card.TopstoryItem')) {
                        if (isElementInViewport_(el)) {
                            let commentCollapseButton = el.querySelector('button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                            if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                commentCollapseButton.click();
                                if (!isElementInViewport(commentCollapseButton)) scrollTo(0,el.offsetTop+50)
                            }
                            let answerCollapseButton__ = el.querySelector('.ContentItem-rightButton[data-zop-retract-question]');
                            if (answerCollapseButton__) answerCollapseButton__.click()
                            break
                        }
                    }
                }
            }

            let commentCollapseButton_ = false, commentCollapseButton__ = false;
            let commentCollapseButton = getXpath('//button[text()="收起评论"]',document.querySelector('.Comments-container'))
            if (commentCollapseButton) {
                commentCollapseButton.click();
            } else {
                let commentCollapseButton_1 = document.querySelectorAll('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type, .ContentItem-action > button.Button.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                if (commentCollapseButton_1.length > 0) {
                    for (let el of commentCollapseButton_1) {
                        if (el.textContent.indexOf('收起评论') > -1) {
                            if (isElementInViewport(el)) {
                                el.click()
                                commentCollapseButton_ = true
                                break
                            }
                        }
                    }
                }
                if (commentCollapseButton_ == false) {
                    let commentCollapseButton_1 = document.querySelectorAll('.Comments-container')
                    if (commentCollapseButton_1.length > 0) {
                        for (let el of commentCollapseButton_1) {
                            if (isElementInViewport(el)) {
                                let parentElement = findParentElement(el, 'List-item') || findParentElement(el, 'Card '),
                                    commentCollapseButton = parentElement?.querySelector('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                                if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                    commentCollapseButton.click()
                                    if (!isElementInViewport(commentCollapseButton)) {scrollTo(0,parentElement.offsetTop+parentElement.offsetHeight-50)}
                                    commentCollapseButton__ = true
                                    break
                                }
                            }
                        }
                    }
                    if (commentCollapseButton__ == false) {
                        let commentCollapseButton_2 = document.querySelectorAll('.Editable-content')
                        if (commentCollapseButton_2.length > 0) {
                            for (let el of commentCollapseButton_2) {
                                if (isElementInViewport(el)) {
                                    let parentElement = findParentElement(el, 'List-item') || findParentElement(el, 'Card '),
                                    commentCollapseButton = parentElement?.querySelector('.ContentItem-actions > button.Button.ContentItem-action.Button--plain.Button--withIcon.Button--withLabel:first-of-type')
                                    if (commentCollapseButton && commentCollapseButton.textContent.indexOf('收起评论') > -1) {
                                        commentCollapseButton.click()
                                        if (!isElementInViewport(commentCollapseButton)) {scrollTo(0,parentElement.offsetTop+parentElement.offsetHeight-50)}
                                        break
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function backToTop(selectors) {
    if (!menu_value('menu_backToTop')) return
    let targetEl = document.querySelector(selectors);
    if (!targetEl) return;
    targetEl.oncontextmenu = function(event){
        if (event.target == this) {
            event.preventDefault();
            window.scrollTo(0,0)
        }
    }
}

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function isElementInViewport_(el) {
    let rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

function blockLowCount(type) {
    switch(type) {
        case 'index':
            blockLowCount_('.Card.TopstoryItem.TopstoryItem-isRecommend', 'Card TopstoryItem TopstoryItem-isRecommend', 'menu_blockLowUpvoteCount', 'menu_blockLowCommentCount');
            break;
        case 'follow':
            blockLowCount_('.Card.TopstoryItem.TopstoryItem-isFollow', 'Card TopstoryItem TopstoryItem-isFollow', 'menu_blockLowUpvoteCountFollow', 'menu_blockLowCommentCountFollow');
            break;
        case 'question':
            blockLowCount_('.List-item', 'List-item', 'menu_blockLowUpvoteCountQuestion', 'menu_blockLowCommentCountQuestion');
            break;
    }

    function blockLowCount_(className1, className2, menuUpvote, menuComment) {
        function blockLowCount_now() {
            document.querySelectorAll(className1).forEach(function(item1){
                blockLowCount_1(item1,menuUpvote,'upvote_num');
                blockLowCount_1(item1,menuComment,'comment_num');
            })
        }

        blockLowCount_now();
        window.addEventListener('urlchange', function(){
            setTimeout(blockLowCount_now, 1000);
        })

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === className2) {
                        blockLowCount_1(target,menuUpvote,'upvote_num');
                        blockLowCount_1(target,menuComment,'comment_num');
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockLowCount_1(item, menu, type) {
        if (GM_getValue(menu)) {
            let item_ContentItem = item.querySelector('.ContentItem')
            if (item_ContentItem && item_ContentItem.dataset.zaExtraModule) {
                try {
                    let item2 = JSON.parse(item_ContentItem.dataset.zaExtraModule);
                    if (item2 && item2.card?.content && Number(item2.card.content[type]) < Number(GM_getValue(menu))) {
                        item.hidden = true;
                        item.style.display = 'none';
                    }
                } catch(e){}
            }
        }
    }
}

function customBlockUsers() {
    let nowBlockUsers = '';
    menu_value('menu_customBlockUsers').forEach(function(item){nowBlockUsers += '|' + item})
    let newBlockUsers = prompt('编辑 [自定义屏蔽用户]\n（不同用户名之间使用 "|" 分隔，例如：用户A|用户B|用户C ）', nowBlockUsers.replace('|',''));
    if (newBlockUsers === '') {
        GM_setValue('menu_customBlockUsers', []);
        registerMenuCommand();
    } else if (newBlockUsers != null) {
        GM_setValue('menu_customBlockUsers', newBlockUsers.split('|'));
        registerMenuCommand();
    }
};

function blockUsers(type) {
    if (!menu_value('menu_blockUsers')) return
    if (!menu_value('menu_customBlockUsers') || menu_value('menu_customBlockUsers').length < 1) return
    switch(type) {
        case 'index':
            blockUsers_('.Card.TopstoryItem.TopstoryItem-isRecommend', 'Card TopstoryItem TopstoryItem-isRecommend');
            break;
        case 'follow':
            blockUsers_('.Card.TopstoryItem.TopstoryItem-isFollow', 'Card TopstoryItem TopstoryItem-isFollow');
            break;
        case 'question':
            blockUsers_question();
            break;
        case 'search':
            blockUsers_search();
            break;
        case 'topic':
            blockUsers_('.List-item.TopicFeedItem', 'List-item TopicFeedItem');
            break;
        case 'people':
            blockUsers_button_people();
            break;
    }
    blockUsers_comment();
    blockUsers_button();

    function blockUsers_(className1, className2) {
        function blockKeywords_now() {
            document.querySelectorAll(className1).forEach(function(item1){
                let item = item1.querySelector('.ContentItem.AnswerItem, .ContentItem.ArticleItem');
                if (item && item.dataset.zop) {
                    for (const keyword of menu_value('menu_customBlockUsers')) {
                        if (keyword != '' && item.dataset.zop.indexOf('authorName":"' + keyword + '",') > -1) {
                            item1.hidden = true;
                            break;
                        }
                    }
                }
            })
        }

        blockKeywords_now();
        window.addEventListener('urlchange', function(){
            setTimeout(blockKeywords_now, 1000);
        })

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === className2) {
                        let item = target.querySelector('.ContentItem.AnswerItem, .ContentItem.ArticleItem');
                        if (item && item.dataset.zop) {
                            for (const keyword of menu_value('menu_customBlockUsers')) {
                                if (keyword != '' && item.dataset.zop.indexOf('authorName":"' + keyword + '",') > -1) {
                                    target.hidden = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockUsers_question() {
        const blockUsers_question_ = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === 'List-item' || target.className === 'Card AnswerCard') {
                        let item1 = target.querySelector('.ContentItem.AnswerItem');
                        if (item1 && item1.dataset.zop) {
                            menu_value('menu_customBlockUsers').forEach(function(item2){
                                if (item1.dataset.zop.indexOf('authorName":"' + item2 + '",') > -1) {
                                    target.hidden = true;
                                }
                            })
                        }
                    }
                }
            }
        };

        const blockUsers_question_answer_ = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    target.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
                        let item1 = item.querySelector('.ContentItem.AnswerItem');
                        if (item1 && item1.dataset.zop) {
                            menu_value('menu_customBlockUsers').forEach(function(item2){
                                if (item1.dataset.zop.indexOf('authorName":"' + item2 + '",') > -1) {
                                    item.hidden = true;
                                }
                            })
                        }
                    })
                }
            }
        };

        if (location.pathname.indexOf('/answer/') > -1) {
            const observer = new MutationObserver(blockUsers_question_answer_);
            observer.observe(document, { childList: true, subtree: true });
        } else {
            const observer = new MutationObserver(blockUsers_question_);
            observer.observe(document, { childList: true, subtree: true });
        }

        document.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
            let item1 = item.querySelector('.ContentItem.AnswerItem');
            if (item1 && item1.dataset.zop) {
                menu_value('menu_customBlockUsers').forEach(function(item2){
                    if (item1.dataset.zop.indexOf('authorName":"' + item2 + '",') > -1) {
                        item.hidden = true;
                    }
                })
            }
        })
    }

    function blockUsers_search() {
        function blockUsers_now() {
            if (location.search.indexOf('type=content') === -1) return
            document.querySelectorAll('.Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]').forEach(function(item1){
                let item = item1.querySelector('.RichText.ztext.CopyrightRichText-richText b');
                if (item) {
                    for (const keyword of menu_value('menu_customBlockUsers')) {
                        if (keyword != '' && item.textContent === keyword) {
                            item1.hidden = true;
                            break;
                        }
                    }
                }
            })
        }

        setTimeout(blockUsers_now, 2000);
        window.addEventListener('urlchange', function(){
            setTimeout(blockUsers_now, 1000);
        })

        const callback = (mutationsList, observer) => {
            if (location.search.indexOf('type=content') === -1) return
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    let item = target.querySelector('.Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"] .RichText.ztext.CopyrightRichText-richText b, .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"] .RichText.ztext.CopyrightRichText-richText b');
                    if (item) {
                        for (const keyword of menu_value('menu_customBlockUsers')) {
                            if (keyword != '' && item.textContent === keyword) {
                                target.hidden = true;
                                break;
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockUsers_comment() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.tagName == 'DIV' && target.className.indexOf('css-') == 0 && target.dataset.id == undefined) {
                        let item = target.querySelector('a[href^="https://www.zhihu.com/people/"]>img.Avatar[alt][loading]')
                        if (item) {
                            menu_value('menu_customBlockUsers').forEach(function(item1){
                                if (item.alt === item1) {
                                    if(item.parentElement?.parentElement?.parentElement?.parentElement) {
                                        item.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                                    }
                                }
                            })
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockUsers_button() {
        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.tagName == 'DIV' && target.className && (target.className.indexOf('css-') == 0 || target.style == 'opacity: 1;')) {
                        const item = target.querySelector('.MemberButtonGroup.ProfileButtonGroup.HoverCard-buttons'),
                              item1 = target.querySelector('img.Avatar+div span.UserLink>a.UserLink-link[data-za-detail-view-element_name=User]');
                        if (item1) {
                            const name = item1.textContent, userid = item1.href.split('/')[4], users = menu_value('menu_customBlockUsers');
                            for (let num = 0;num<users.length;num++) {
                                if (users[num] === name) {
                                    target.querySelectorAll('.Button.Button--primary.Button--red').forEach(function(item){item.style.display = 'none';})
                                    item?.insertAdjacentHTML('afterbegin', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 已屏蔽</button>`);
                                    if(item?.firstElementChild) item.firstElementChild.onclick = function(){this.disabled = true;blockUsers_button_del(this.dataset.name, this.dataset.userid, false)}
                                    return
                                }
                            };
                            if (item && !target.querySelector('button[data-name][data-userid]')) {
                                item.insertAdjacentHTML('beforeend', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red" style="width: 100%;margin: 7px 0 0 0;"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 屏蔽用户</button>`);
                                item.lastElementChild.onclick = function(){this.disabled = true;blockUsers_button_add(this.dataset.name, this.dataset.userid, false)}
                            }
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockUsers_button_people() {
        let item = document.querySelector('.MemberButtonGroup.ProfileButtonGroup.ProfileHeader-buttons'),
            name = document.querySelector('.ProfileHeader-name')?.firstChild?.textContent,
            users = menu_value('menu_customBlockUsers'),
            userid = location.href.split('/')[4];
        if(!name) return;
        for (let num = 0;num<users.length;num++) {
            if (users[num] === name) {
                document.querySelectorAll('.Button.Button--primary.Button--red').forEach(function(item){item.style.display = 'none';})
                item?.insertAdjacentHTML('afterbegin', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red" style="margin: 0 0 0 12px;"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 已屏蔽</button>`);
                if(item?.firstElementChild) item.firstElementChild.onclick = function(){this.disabled = true;blockUsers_button_del(this.dataset.name, this.dataset.userid, true)}
                return
            }
        };
        if (item) {
            item.insertAdjacentHTML('beforeend', `<button type="button" data-name="${name}" data-userid="${userid}" class="Button FollowButton Button--primary Button--red" style="margin: 0 0 0 12px;"><span style="display: inline-flex; align-items: center;">​<svg width="1.2em" height="1.2em" viewBox="0 0 24 24" class="Zi Zi--Ban" fill="currentColor"><path fill-rule="evenodd" d="M16.346 18.113a7.5 7.5 0 0 1-10.46-10.46l10.46 10.46Zm1.767-1.767L7.654 5.886a7.5 7.5 0 0 1 10.46 10.46ZM22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z" clip-rule="evenodd"></path></svg></span> 屏蔽用户</button>`);
            item.lastElementChild.onclick = function(){this.disabled = true;blockUsers_button_add(this.dataset.name, this.dataset.userid, true)}
        }
    }

    function blockUsers_button_add(name, userid, reload) {
        if (!name || !userid) return
        let users = menu_value('menu_customBlockUsers'),
            index = users.indexOf(name);
        if (index === -1) {
            users.push(name);
            GM_setValue('menu_customBlockUsers', users);
            GM_xmlhttpRequest({url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,method: 'POST',timeout: 2000});
            if (reload) {
                setTimeout(function(){location.reload()}, 200);
            } else {
                GM_notification({text: `该用户已被屏蔽~\n刷新网页后生效~`, timeout: 3000});
            }
        } else {
            GM_notification({text: `该用户已经被屏蔽啦，无需重复屏蔽~`, timeout: 3000});
        }
    }

    function blockUsers_button_del(name, userid, reload) {
        if (!name || !userid) return
        let users = menu_value('menu_customBlockUsers'),
            index = users.indexOf(name);
        if (index > -1) {
            users.splice(index, 1);
            GM_setValue('menu_customBlockUsers', users);
            GM_xmlhttpRequest({url: `https://www.zhihu.com/api/v4/members/${userid}/actions/block`,method: 'DELETE',timeout: 2000});
            if (reload) {
                setTimeout(function(){location.reload()}, 200);
            } else {
                GM_notification({text: `该用户已取消屏蔽啦~\n刷新网页后生效~`, timeout: 3000});
            }
        } else {
            GM_notification({text: `没有在屏蔽列表中找到该用户...`, timeout: 3000});
        }
    }
}

var selectedTextForBlockKeywords = '';
function normalizeBlockKeywordText(text) {
    return (text || '').replace(/\s+/g, ' ').trim();
}

function getSelectedBlockKeywordText() {
    let text = '';
    const activeElement = document.activeElement;
    if (activeElement && ((activeElement.tagName === 'TEXTAREA') || (activeElement.tagName === 'INPUT' && /^(?:text|search|url|tel|password)$/i.test(activeElement.type))) && typeof activeElement.selectionStart === 'number') {
        text = activeElement.value.slice(activeElement.selectionStart, activeElement.selectionEnd);
    }
    if (!text && window.getSelection) {
        text = window.getSelection().toString();
    }
    return normalizeBlockKeywordText(text);
}

function rememberSelectedBlockKeyword() {
    const updateSelectedBlockKeyword = function() {
        selectedTextForBlockKeywords = getSelectedBlockKeywordText();
    }
    document.addEventListener('selectionchange', updateSelectedBlockKeyword);
    document.addEventListener('contextmenu', updateSelectedBlockKeyword, true);
    window.addEventListener('urlchange', function(){selectedTextForBlockKeywords = '';});
}

function addSelectedKeywordToBlocklist() {
    if (!menu_value('menu_blockKeywords')) {
        GM_notification({text: '请先开启 [屏蔽指定关键词] 功能~', timeout: 3000});
        return
    }

    const keyword = getSelectedBlockKeywordText() || selectedTextForBlockKeywords;
    if (!keyword) {
        GM_notification({text: '未检测到选中的文字，请先选中内容后再使用该菜单~', timeout: 3000});
        return
    }

    let keywords = (GM_getValue('menu_customBlockKeywords') || []).map(function(item){return normalizeBlockKeywordText(item)}).filter(function(item){return item !== ''});
    if (keywords.some(function(item){return item.toLowerCase() === keyword.toLowerCase();})) {
        GM_notification({text: `屏蔽词 [${keyword}] 已存在，无需重复添加~`, timeout: 3000});
        return
    }

    keywords.push(keyword);
    GM_setValue('menu_customBlockKeywords', keywords);
    registerMenuCommand();
    GM_notification({text: `已添加屏蔽词 [${keyword}]\n后续加载的标题/评论会按该关键词过滤~`, timeout: 4000});
}

function customBlockKeywords() {
    let nowBlockKeywords = '';
    menu_value('menu_customBlockKeywords').forEach(function(item){nowBlockKeywords += '|' + item})
    let newBlockKeywords = prompt('编辑 [自定义屏蔽关键词]\n（不同关键词之间使用 "|" 分隔，例如：关键词A|关键词B|关键词C \n（关键词不区分大小写，支持表情如：[捂脸]|[飙泪笑]', nowBlockKeywords.replace('|',''));
    if (newBlockKeywords === '') {
        GM_setValue('menu_customBlockKeywords', []);
        registerMenuCommand();
    } else if (newBlockKeywords != null) {
        GM_setValue('menu_customBlockKeywords', newBlockKeywords.split('|'));
        registerMenuCommand();
    }
};

function blockKeywords(type) {
    if (!menu_value('menu_blockKeywords')) return
    if (!menu_value('menu_customBlockKeywords') || menu_value('menu_customBlockKeywords').length < 1) return
    switch(type) {
        case 'index':
            blockKeywords_('.Card.TopstoryItem.TopstoryItem-isRecommend', 'Card TopstoryItem TopstoryItem-isRecommend');
            break;
        case 'follow':
            blockKeywords_('.Card.TopstoryItem.TopstoryItem-isFollow', 'Card TopstoryItem TopstoryItem-isFollow');
            break;
        case 'topic':
            blockKeywords_('.List-item.TopicFeedItem', 'List-item TopicFeedItem');
            break;
        case 'people':
            blockKeywords_('.List-item', 'List-item');
            break;
        case 'collection':
            blockKeywords_('.Card.CollectionDetailPageItem', 'Card CollectionDetailPageItem');
            break;
        case 'search':
            blockKeywords_search();
            break;
        case 'comment':
            if (!menu_value('menu_blockKeywordsComment')) return
            blockKeywords_comment();
            break;
    }

    function blockKeywords_(className1, className2) {
        function blockKeywords_now() {
            if (location.pathname === '/hot') {
                document.querySelectorAll('.HotItem').forEach(function(item1){blockKeywords_1(item1, 'h2.HotItem-title');})
            } else {
                document.querySelectorAll(className1).forEach(function(item1){blockKeywords_1(item1, 'h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]');})
            }
        }

        blockKeywords_now();
        window.addEventListener('urlchange', function(){
            setTimeout(blockKeywords_now, 1000);
        })

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.className === className2) {blockKeywords_1(target, 'h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"]');}
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockKeywords_search() {
        function blockKeywords_now() {
            if (location.search.indexOf('type=content') === -1) return
            document.querySelectorAll('.HotLanding-contentItem, .Card.SearchResult-Card[data-za-detail-view-path-module="AnswerItem"], .Card.SearchResult-Card[data-za-detail-view-path-module="PostItem"]').forEach(function(item1){blockKeywords_1(item1, 'a[data-za-detail-view-id]');})
        }

        setTimeout(blockKeywords_now, 2000);
        window.addEventListener('urlchange', function(){
            setTimeout(blockKeywords_now, 1000);
        })

        const callback = (mutationsList, observer) => {
            if (location.search.indexOf('type=content') === -1) return
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.tagName === 'DIV' && target.className === '') {
                        let tt = target.querySelector('div[class="Card SearchResult-Card"][data-za-detail-view-path-module="AnswerItem"], div[class="Card SearchResult-Card"][data-za-detail-view-path-module="PostItem"]')
                        if (tt) {blockKeywords_1(target.childNodes[0], 'a[data-za-detail-view-id]');}
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockKeywords_comment() {
        function filterComment(comment) {
            let content = comment.querySelector('.CommentContent');
            if(!content) return;
            let text = content.textContent.toLowerCase();
            content.querySelectorAll('img.sticker[alt]').forEach((img)=>{text += img.alt})

            let keywords = menu_value('menu_customBlockKeywords');
            for (const keyword of keywords) {
                if (keyword != '' && text.indexOf(keyword.toLowerCase()) > -1) {
                    content.dataset.text = content.innerHTML
                    content.onclick = (e)=>{if (e.target.dataset.text) {e.target.innerHTML = e.target.dataset.text;e.target.removeAttribute('data-text');}}
                    content.textContent = '[该评论已屏蔽，可点击显示]';
                }
            }
        }

        const callback = (mutationsList, observer) => {
            for (const mutation of mutationsList) {
                for (const target of mutation.addedNodes) {
                    if (target.nodeType != 1) return
                    if (target.tagName == 'DIV' && target.className.indexOf('css-') == 0 && target.dataset.id == undefined) {
                        let item = target.querySelector('a[href^="https://www.zhihu.com/people/"]>img.Avatar[alt][loading]')
                        if (item) {
                            filterComment(item.parentElement.parentElement.parentElement.parentElement)
                        }
                    }
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(document, { childList: true, subtree: true });
    }

    function blockKeywords_1(item1, css) {
        let item = item1.querySelector(css);
        if (item) {
            for (const keyword of menu_value('menu_customBlockKeywords')) {
                let text = item.content || item.textContent;
                if (keyword != '' && text.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    item1.hidden = true;
                    item1.style.display = 'none';
                    break;
                }
            }
        }
    }
}

function blockType(type) {
    let name;
    if (type === 'search') {
        if (!menu_value('menu_blockTypeVideo') && !menu_value('menu_blockTypeArticle') && !menu_value('menu_blockTypePin') && !menu_value('menu_blockTypeTopic') && !menu_value('menu_blockTypeSearch')) return
        if (menu_value('menu_blockTypeSearch') && location.pathname === '/search') setTimeout(function(){document.querySelectorAll('.RelevantQuery').forEach((r)=>{r.parentElement.parentElement.hidden = true});}, 2000)
        name = 'h2.ContentItem-title a:not(.zhihu_e_toQuestion), a.KfeCollection-PcCollegeCard-link, h2.SearchTopicHeader-Title a'
        addSetInterval_(name);
    } else if (type === 'question') {
        if (!menu_value('menu_blockTypeVideo')) return
        document.lastChild.appendChild(document.createElement('style')).textContent = `.VideoAnswerPlayer, .VideoAnswerPlayer video, .VideoAnswerPlayer-video, .VideoAnswerPlayer-iframe {display: none !important;}`;
        name = '.VideoAnswerPlayer'
        document.querySelectorAll(name).forEach(function(item){blockType_(item);})
    } else if (type === 'follow') {
        if (!menu_value('menu_blockTypeFollowAgree') && !menu_value('menu_blockTypeFollowQuestion')) return
        if (menu_value('menu_blockTypeFollowAgree')) name = '.TopstoryItem-isFollow .FeedSource-byline'
        if (menu_value('menu_blockTypeFollowQuestion')) {if (name) {name += ',.ContentItem[data-za-detail-view-path-module=QuestionItem]:not(.AnswerItem):not(.PinItem)'} else {name = '.ContentItem[data-za-detail-view-path-module=QuestionItem]:not(.AnswerItem):not(.PinItem)'}}
        if (!name) return
        document.querySelectorAll(name).forEach(function(item){blockType_(item);})
    } else {
        if (!menu_value('menu_blockTypeVideo') && !menu_value('menu_blockTypeArticle') && !menu_value('menu_blockTypePin')) return
        if (menu_value('menu_blockTypeVideo')) document.lastChild.appendChild(document.createElement('style')).textContent = `.Card .ZVideoItem-video, .VideoAnswerPlayer video, nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}`;
        name = 'h2.ContentItem-title a:not(.zhihu_e_toQuestion)'
        if (menu_value('menu_blockTypePin')) name = 'h2.ContentItem-title a:not(.zhihu_e_toQuestion), .ContentItem.PinItem'
        document.querySelectorAll(name).forEach(function(item){blockType_(item);})
    }

    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.className === "Card SearchResult-Card" && target.dataset.zaDetailViewPathModule === undefined) {
                    if (menu_value('menu_blockTypeSearch') && location.pathname === '/search' && location.search.indexOf('type=content') > -1) target.hidden = true;
                } else {
                    if (name) blockType_(target.querySelector(name));
                }
            }
        }
    });
    observer.observe(document, { childList: true, subtree: true });

    window.addEventListener('urlchange', function(){
        if(name) addSetInterval_(name);
        if (menu_value('menu_blockTypeSearch') && location.pathname === '/search' && location.search.indexOf('type=content') > -1) setTimeout(function(){document.querySelectorAll('.RelevantQuery').forEach((r)=>{r.parentElement.parentElement.hidden = true});}, 1500)
    })

    function blockType_(titleA) {
        if (!titleA) return
        if (location.pathname === '/search') {
            if (location.search.indexOf('type=content') === -1) return
            if (titleA.href.indexOf('/zvideo/') > -1 || titleA.href.indexOf('video.zhihu.com') > -1) {
                if (menu_value('menu_blockTypeVideo')) findParentElement(titleA, 'Card')?.remove();
            } else if (titleA.href.indexOf('zhuanlan.zhihu.com') > -1) {
                if (menu_value('menu_blockTypeArticle')) { let p = findParentElement(titleA, 'Card SearchResult-Card'); if(p) p.hidden = true; }
            } else if (titleA.href.indexOf('/topic/') > -1) {
                if (menu_value('menu_blockTypeTopic')) { let p = findParentElement(titleA, 'Card SearchResult-Card'); if(p) p.hidden = true; }
            } else if (titleA.href.indexOf('/market/') > -1) {
                if (menu_value('menu_blockTypeSearch')) { let p = findParentElement(titleA, 'Card SearchResult-Card'); if(p) p.hidden = true; }
            }
        } else if (location.pathname.indexOf('/question/') > -1) {
            if (menu_value('menu_blockTypeVideo')) { let p = findParentElement(titleA, 'List-item'); if(p) p.hidden = true; }
        } else if (location.pathname.indexOf('/follow') > -1) {
            if (type === 'follow') {
                if ((menu_value('menu_blockTypeFollowAgree') && titleA.className.indexOf('FeedSource-byline') != -1) || (menu_value('menu_blockTypeFollowQuestion') && titleA.dataset.zaDetailViewPathModule == 'QuestionItem')) {
                    let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isFollow'); if(p) p.hidden = true;
                }
            }
            if (titleA.className == 'ContentItem PinItem' && menu_value('menu_blockTypePin')) { let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isFollow'); if(p) p.hidden = true; }
        } else {
            if (titleA.className == 'ContentItem PinItem') {
                if (menu_value('menu_blockTypePin')) { let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isRecommend'); if(p) p.hidden = true; }
            } else if (titleA.href.indexOf('/zvideo/') > -1 || titleA.href.indexOf('video.zhihu.com') > -1) {
                if (menu_value('menu_blockTypeVideo')) { let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isRecommend'); if(p) p.hidden = true; }
            } else if (titleA.href.indexOf('/answer/') > -1) {
                let ans = findParentElement(titleA, 'ContentItem AnswerItem');
                if (ans && ans.querySelector('.VideoAnswerPlayer')) {
                    if (menu_value('menu_blockTypeVideo')) {
                        let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isRecommend'); if(p) p.hidden = true;
                        ans.remove();
                    }
                }
            } else if (titleA.href.indexOf('/education/video-course/') > -1) {
                if (menu_value('menu_blockTypeVideo')) { let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isRecommend'); if(p) p.hidden = true; }
            } else if (titleA.href.indexOf('zhuanlan.zhihu.com') > -1) {
                if (menu_value('menu_blockTypeArticle')) { let p = findParentElement(titleA, 'Card TopstoryItem TopstoryItem-isRecommend'); if(p) p.hidden = true; }
            }
        }
    }

    function addSetInterval_(A) {
        let timer = setInterval(function(){
            let aTag = document.querySelectorAll(A);
            if (aTag.length > 0) {
                clearInterval(timer);
                aTag.forEach(function(item){blockType_(item);})
            }
        }, 100);
    }
}

function findParentElement(item, className, type = false) {
    if (item && item.parentElement) {
        if (type) {
            if (item.parentElement.className && item.parentElement.className === className) {
                return item.parentElement;
            } else {
                let temp = findParentElement(item.parentElement, className, true)
                if (temp) return temp
            }
        } else {
            if (item.parentElement.className && item.parentElement.className.indexOf(className) > -1) {
                return item.parentElement;
            } else {
                let temp = findParentElement(item.parentElement, className)
                if (temp) return temp
            }
        }
    }
    return null;
}

function cleanHighlightLink() {
    if (!menu_value('menu_cleanHighlightLink')) return;
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1 || target.tagName != 'A') break
                if (target.dataset.zaNotTrackLink && target.href.indexOf('https://zhida.zhihu.com/search?') > -1) {
                    target.parentElement?.replaceWith(target.textContent);
                }
            }
        }
    };
    const observer = new MutationObserver(callback);
    observer.observe(document, { childList: true, subtree: true });

    document.querySelectorAll('span > a[data-za-not-track-link][href^="https://zhida.zhihu.com/search?"]').forEach(e => e.parentElement?.replaceWith(e.textContent))
}

function blockYanXuan() {
    if (!menu_value('menu_blockYanXuan')) return
    const blockYanXuan_question = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.className === 'List-item' || target.className === 'Card AnswerCard') {
                    if (target.querySelector('.KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn')) {
                        target.hidden = true;
                    }
                }
            }
        }
    };

    const blockYanXuan_question_answer = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                target.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
                    if (item.querySelector('.KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn')) {
                        item.hidden = true;
                    }
                })
            }
        }
    };

    if (location.pathname.indexOf('/answer/') > -1) {
        const observer = new MutationObserver(blockYanXuan_question_answer);
        observer.observe(document, { childList: true, subtree: true });
    } else {
        const observer = new MutationObserver(blockYanXuan_question);
        observer.observe(document, { childList: true, subtree: true });
    }

    document.querySelectorAll('.List-item, .Card.AnswerCard').forEach(function(item){
        if (item.querySelector('.KfeCollection-AnswerTopCard-Container, .KfeCollection-PurchaseBtn')) {
            item.hidden = true;
        }
    })
}

function addTypeTips() {
    if (!menu_value('menu_typeTips')) return
    let style = `font-weight: bold;font-size: 13px;padding: 1px 4px 0;border-radius: 2px;display: inline-block;vertical-align: top;margin: ${(location.pathname === '/search') ? '2' : '4'}px 4px 0 0;`
    document.body.appendChild(document.createElement('style')).textContent = `/* 区分问题文章 */
.AnswerItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
.HotLanding-contentItem .ContentItem[data-za-detail-view-path-module=Content] .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #f68b83;background-color: #f68b8333;${style}}
.TopstoryQuestionAskItem .ContentItem-title a:not(.zhihu_e_toQuestion)::before {content:'问题';color: #ff5a4e;background-color: #ff5a4e33;${style}}
.ZVideoItem .ContentItem-title a::before, .ZvideoItem .ContentItem-title a::before {content:'视频';color: #00BCD4;background-color: #00BCD433;${style}}
.PinItem .ContentItem-title a::before {content:'想法';color: #4CAF50;background-color: #4CAF5033;${style}}
.ArticleItem .ContentItem-title a::before {content:'文章';color: #2196F3;background-color: #2196F333;${style}}`;
}

function addToQuestion() {
    if (!menu_value('menu_toQuestion')) return

    if (location.pathname === '/search') {
        document.lastChild.appendChild(document.createElement('style')).textContent = `a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;height: 20.67px !important;line-height: 20.67px !important;margin-top: 2px !important;}`;
        addSetInterval_('h2.ContentItem-title a:not(.zhihu_e_tips)');
    } else {
        document.lastChild.appendChild(document.createElement('style')).textContent = `a.zhihu_e_toQuestion {font-size: 13px !important;font-weight: normal !important;padding: 1px 6px 0 !important;border-radius: 2px !important;display: inline-block !important;vertical-align: top !important;margin-top: 4px !important;}`;
        document.querySelectorAll('h2.ContentItem-title a:not(.zhihu_e_tips)').forEach(function(item){addTypeTips_(item);})
    }

    const observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                addTypeTips_(target.querySelector('h2.ContentItem-title a:not(.zhihu_e_tips)'));
            }
        }
    });
    observer.observe(document, { childList: true, subtree: true });

    window.addEventListener('urlchange', function(){
        addSetInterval_('h2.ContentItem-title a:not(.zhihu_e_tips)');
    })

    function addTypeTips_(titleA) {
        if (!titleA) return
        if (titleA.parentElement.querySelector('a.zhihu_e_toQuestion')) return
        if (titleA.textContent.indexOf('?') != -1) {
            titleA.innerHTML = titleA.innerHTML.replace('?', "？")
        }
        if (/answer\/\d+/.test(titleA.href)) {
            const titleA_meta = titleA.parentElement.parentElement.querySelector('meta[itemprop="url"]');
            if (!titleA_meta) return
            titleA.insertAdjacentHTML('afterend', `<a class="zhihu_e_toQuestion VoteButton" href="${titleA_meta.content}" target="_blank">直达问题</a>`);
        }
    }

    function addSetInterval_(A) {
        let timer = setInterval(function(){
            let aTag = document.querySelectorAll(A);
            if (aTag.length > 0) {
                clearInterval(timer);
                aTag.forEach(function(item){addTypeTips_(item);})
            }
        }, 100);
    }
}

function questionRichTextMore() {
    if (!menu_value('menu_questionRichTextMore')) return
    let button = document.querySelector('button.QuestionRichText-more');
    if (button) button.click()
}

function removeLogin() {
    const removeLoginModal = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                if (target.querySelector('.signFlowModal')) {
                    let button = target.querySelector('.Button.Modal-closeButton.Button--plain');
                    if (button) button.click();
                } else if (getXpath('//button[text()="立即登录/注册"]',target)) {
                    target.remove();
                }
            }
        }
    };

    if(location.hostname === 'zhuanlan.zhihu.com') {
        if (!document.querySelector('.ColumnPageHeader-profile>.AppHeader-menu')) {
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
            if (getXpath('//button[text()="登录/注册"]')) getXpath('//button[text()="登录/注册"]').outerHTML = '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录/注册</a>';
        }
    } else {
        if (!document.querySelector('.AppHeader-profile>.AppHeader-menu')) {
            const observer = new MutationObserver(removeLoginModal);
            observer.observe(document, { childList: true, subtree: true });
            document.lastElementChild.appendChild(document.createElement('style')).textContent = '.Question-mainColumnLogin, button.AppHeader-login {display: none !important;}';
            if (getXpath('//button[text()="登录/注册"]')) getXpath('//button[text()="登录/注册"]').outerHTML = '<a class="Button AppHeader-login Button--blue" href="https://www.zhihu.com/signin" target="_blank">登录/注册</a>';
        }
    }
}

function cleanTitles() {
    if (!menu_value('menu_cleanTitles')) return
    const elTitle = document.head.querySelector('title');
    if (!elTitle) return;
    const original = elTitle.textContent;
    const observer = new MutationObserver(function() {
        if (elTitle.textContent != original) {
            elTitle.textContent = original;
        }
    });
    observer.observe(elTitle, { childList: true });
}

function cleanSearch() {
    if (!menu_value('menu_cleanSearch')) return
    const el = document.querySelector('.SearchBar-input > input');
    if (!el) return;
    const observer = new MutationObserver((mutationsList, observer) => {
        if (mutationsList[0].attributeName === 'placeholder' && mutationsList[0].target.placeholder != '') mutationsList[0].target.placeholder = '';
    });
    el.placeholder = '';
    observer.observe(el, { attributes: true });
    document.documentElement.appendChild(document.createElement('style')).textContent = '.AutoComplete-group > .SearchBar-label:not(.SearchBar-label--history), .AutoComplete-group > [id^="AutoComplete2-topSearch-"], .AutoComplete-group > [id^="AutoComplete3-topSearch-"] {display: none !important;}';
}

function closeFloatingComments() {
    const closeFloatingCommentsModal = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType != 1) return
                let button = document.querySelector('button[aria-label="关闭"]');
                if (button && button.parentElement?.parentElement) {
                    button.parentElement.parentElement.onclick = function(event){if (event.target.parentElement == this) {button.click();}}
                }
            }
        }
    };
    const observer = new MutationObserver(closeFloatingCommentsModal);
    observer.observe(document, { childList: true, subtree: true });
}

function addUrlChangeEvent() {
    history.pushState = ( f => function pushState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushstate'));
        window.dispatchEvent(new Event('urlchange'));
        return ret;
    })(history.pushState);

    history.replaceState = ( f => function replaceState(){
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replacestate'));
        window.dispatchEvent(new Event('urlchange'));
        return ret;
    })(history.replaceState);

    window.addEventListener('popstate',()=>{
        window.dispatchEvent(new Event('urlchange'))
    });
}

function getXpath(xpath, contextNode, doc = document) {
    contextNode = contextNode || doc;
    try {
        const result = doc.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue && result.singleNodeValue.nodeType === 1 && result.singleNodeValue;
    } catch (err) {
        return null;
    }
}

function question_author() {
    try {
        if (document.querySelector('.BrandQuestionSymbol, .QuestionAuthor, .SpecialQuestionAuthor')) return;
        const initialDataEl = document.querySelector('#js-initialData');
        if (!initialDataEl) return;

        const initialState = JSON.parse(initialDataEl.textContent)?.initialState;
        const qIdMatches = /\d+/.exec(location.pathname);
        if (!qIdMatches) return;

        const qJson = initialState?.entities?.questions?.[qIdMatches[0]]?.author;
        if (!qJson) return;

        let html = `<div class="BrandQuestionSymbol"><a class="BrandQuestionSymbol-brandLink" href="/people/${qJson.urlToken}"><img role="presentation" src="${qJson.avatarUrl}" class="BrandQuestionSymbol-logo" alt=""><span class="BrandQuestionSymbol-name">${qJson.name}</span></a><div class="BrandQuestionSymbol-divider" style="margin-left: 5px;margin-right: 10px;"></div></div>`;
        const topicsEl = document.querySelector('.QuestionHeader-topics');
        if (topicsEl) {
            topicsEl.insertAdjacentHTML('beforebegin', html);
        }
    } catch (e) {
        console.warn('获取问题作者失败:', e);
    }
}

function topTime_(css, classs) {
    document.querySelectorAll(css).forEach(function(_this) {
        let t = _this.querySelector('.ContentItem-time'); if (!t) return
        if (!(t.classList.contains('full')) && t.querySelector('a') && t.querySelector('a').textContent != null) {
            topTime_allTime(t)
            topTime_publishTop(t, _this, classs)
        }
    });
}

function topTime_post() {
    let t = document.querySelector('.ContentItem-time:not(.xiu-time)'); if (!t) return
    if (t.textContent.indexOf('编辑于') > -1 && !(t.classList.contains('xiu-time'))) {
        let tt = t.textContent;
        t.click();
        t.textContent = (t.textContent + ' ，' + tt)
        t.classList.add('xiu-time');
    }

    if (menu_value('menu_publishTop') && !(document.querySelector('.Post-Header > .ContentItem-time')) && !(document.querySelector('.ContentItem-meta > .ContentItem-time'))) {
        let temp_time = t.cloneNode(true);
        temp_time.style.padding = '0px';
        document.querySelector('.Post-Header')?.insertAdjacentElement('beforeEnd', temp_time);
    }
}

function topTime_allTime(t) {
    let aTag = t.querySelector('a');
    if (!aTag) return;
    if (t.textContent.indexOf('发布于') > -1 && t.textContent.indexOf('编辑于') == -1) {
        aTag.textContent = aTag.dataset.tooltip || aTag.textContent;
        t.classList.add('full');
    } else if (t.textContent.indexOf('发布于') == -1 && t.textContent.indexOf('编辑于') > -1) {
        aTag.textContent = (aTag.dataset.tooltip || '') + ' ，' + aTag.textContent;
        t.classList.add('full');
    }
}

function topTime_publishTop(t, _this, _class) {
    if (!menu_value('menu_publishTop')) return
    if (!t.parentNode.classList.contains(_class)) {
        let temp_time = t.cloneNode(true);
        temp_time.style.padding = '0px';
        if (_this.offsetHeight < 600) t.style.display = 'none';
        _this.querySelector('.' + _class)?.insertAdjacentElement('beforeEnd', temp_time);
    }
}

function question_time() {
    try {
        if (document.querySelector('.QuestionPage .QuestionHeader-side .QuestionTime-xiu')) return;
        const targetSide = document.querySelector('.QuestionPage .QuestionHeader-side');
        const metaCreated = document.querySelector('.QuestionPage > meta[itemprop=dateCreated]');
        const metaModified = document.querySelector('.QuestionPage > meta[itemprop=dateModified]');

        if (targetSide && metaCreated && metaModified) {
            targetSide.insertAdjacentHTML('beforeEnd', '<div class="QuestionTime-xiu" style="color: #9098ac; margin-top: 5px; font-size: 13px; font-style: italic;"><p>创建时间：' + getUTC8(new Date(metaCreated.content)) + '</p><p>最后编辑：' + getUTC8(new Date(metaModified.content)) + '</p></div>');
        }
    } catch(e) {
        console.warn('获取问题时间失败:', e);
    }
}

function getUTC8(t) {
    return (t.getFullYear() + '-' + (((t.getMonth() + 1) < 10) ? ('0' + (t.getMonth() + 1)) : (t.getMonth() + 1)) + '-' + ((t.getDate() < 10) ? ('0' + t.getDate()) : t.getDate()) + '\xa0\xa0' + ((t.getHours() < 10) ? ('0' + t.getHours()) : t.getHours()) + ':' + ((t.getMinutes() < 10) ? ('0' + t.getMinutes()) : t.getMinutes()) + ':' + ((t.getSeconds() < 10) ? ('0' + t.getSeconds()) : t.getSeconds()));
}

function originalPic(){
    document.querySelectorAll('img[data-original][data-original-token][data-lazy-status]:not([data-original-xiu]):not(.comment_sticker):not(.Avatar)').forEach(function(one){one.src = 'https://' + one.dataset.original.split('/')[2] + '/' + one.dataset.originalToken + '.webp'; one.dataset.originalXiu = 'true';});
}

function directLink () {
    document.querySelectorAll('a.external[href*="link.zhihu.com/?target="], a.LinkCard[href*="link.zhihu.com/?target="]:not(.MCNLinkCard):not(.ZVideoLinkCard):not(.ADLinkCardContainer)').forEach(function (_this) {_this.href = decodeURIComponent(_this.href.substring(_this.href.indexOf('link.zhihu.com/?target=') + 23));});
}

function questionInvitation(){
    let time = setInterval(function(){
        let q = document.querySelector('.QuestionInvitation-content'); if (!q) return
        clearInterval(time);
        q.style.display = 'none';
        let qTitle = document.querySelector('.QuestionInvitation-title');
        if(qTitle) qTitle.innerHTML = qTitle.innerText + '<span style="cursor: pointer; font-size: 14px; color: #919aae;"> 展开/折叠</span>'

        let topbar = document.querySelector('.Topbar');
        if(topbar) {
            topbar.onclick = function(){
                let q = document.querySelector('.QuestionInvitation-content')
                if (!q) return;
                if (q.style.display == 'none') {
                    q.style.display = ''
                } else {
                    q.style.display = 'none'
                }
            }
        }
    }, 200);
}

function blockHotOther() {
    if (!menu_value('menu_blockTypeLiveHot')) return;

    const isQuestionItem = (hotItem) => {
        const linkItem = hotItem.querySelector('.HotItem-content a');
        if (linkItem === null) return false;
        return /\/question\/\d+/.test(linkItem.href);
    }

    const block = () => {
        removeLiveItems();
        fixItemRank();
    };

    const removeLiveItems = () => {
        const hotItems = document.querySelectorAll('.HotList-list .HotItem');
        for (const item of hotItems) {
            if (!isQuestionItem(item)) item.remove();
        }
    }

    const fixItemRank = () => {
        const hotItems = document.querySelectorAll('.HotList-list .HotItem:not([hidden])');
        hotItems.forEach((item, index) => {
            const rank = item.querySelector('.HotItem-index .HotItem-rank');
            if (rank !== null) rank.innerText = index + 1;
        });
    }

    const blockLive_content = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            for (const target of mutation.addedNodes) {
                if (target.classList?.contains('.HotItem')) {
                    block();
                }
            }
        }
    }

    const observer = new MutationObserver(blockLive_content);
    observer.observe(document, { childList: true, subtree: true });
    block();
}

function switchHome() {
    document.querySelectorAll('header.AppHeader nav').forEach((a)=>{a.outerHTML = a.outerHTML;})
}

function switchHomeRecommend() {
    document.querySelectorAll('header.AppHeader nav>a:not([target])[href="https://www.zhihu.com/"]').forEach((a)=>{a.addEventListener('click', function(e){e.preventDefault();document.cookie='tst=r; expires=Thu, 18 Dec 2099 12:00:00 GMT; domain=.zhihu.com; path=/';location.href=this.href;return false;})})
}

(function() {
    if (window.onurlchange === undefined) {addUrlChangeEvent();}
    rememberSelectedBlockKeyword();

    removeLogin();
    cleanTitles();

    if (GM_info.scriptHandler === 'Violentmonkey' || (GM_info.scriptHandler === 'Tampermonkey' && parseFloat(GM_info.version.slice(0,4)) >= 4.18)) {
        setTimeout(start, 200);
    } else {
        start();
    }

    function start(){
        switchHome();
        cleanHighlightLink();
        originalPic();directLink();
        setInterval(originalPic,500);
        setInterval(directLink, 500);
        if (location.hostname != 'zhuanlan.zhihu.com') {
            if (location.pathname.indexOf('/column/') === -1) cleanSearch();
            collapsedAnswer();
        }
        closeFloatingComments();
        blockKeywords('comment');

        if (location.pathname.indexOf('question') > -1 && location.href.indexOf('/log') == -1) {
            if (location.pathname.indexOf('waiting') == -1) {
                collapsedNowAnswer('.QuestionPage');
                collapsedNowAnswer('.Question-main');
                questionRichTextMore();
                if (location.pathname.indexOf('answer') == -1) {
                    blockLowCount('question');
                } else {
                    document.querySelectorAll('div.Card.ViewAll>a').forEach((a)=>{a.outerHTML = a.outerHTML;})
                }
                blockUsers('question');
                blockYanXuan();
                blockType('question');
                defaultCollapsedAnswer();
            }
            setInterval(function(){topTime_('.ContentItem.AnswerItem', 'ContentItem-meta')}, 300);

            waitForElement('.QuestionHeader-topics', () => { question_author(); });
            waitForElement('.QuestionHeader-side', () => { question_time(); });

            questionInvitation();

        } else if (location.pathname === '/search') {
            collapsedNowAnswer('main div');
            collapsedNowAnswer('.Search-container');
            setInterval(function(){topTime_('.ContentItem.AnswerItem, .ContentItem.ArticleItem', 'SearchItem-meta')}, 300);
            addTypeTips();
            addToQuestion();
            blockUsers('search');
            blockKeywords('search');
            blockType('search');

        } else if (location.pathname.indexOf('/topic/') > -1) {
            if (location.pathname.indexOf('/hot') > -1 || location.href.indexOf('/top-answers') > -1) {
                collapsedNowAnswer('main.App-main');
                setInterval(function(){topTime_('.ContentItem.AnswerItem, .ContentItem.ArticleItem', 'ContentItem-meta')}, 300);
                addTypeTips();
                addToQuestion();
                blockUsers('topic');
                blockKeywords('topic');
            }

        } else if (location.hostname === 'zhuanlan.zhihu.com'){
            backToTop('.Post-content');
            backToTop('.Post-Row-Content');
            setTimeout(topTime_post, 300);
            blockUsers();

        } else if (location.pathname.indexOf('/column/') > -1) {
            setTimeout(function(){
                collapsedAnswer();
                collapsedNowAnswer('main div');
                setInterval(function(){topTime_('.ContentItem.AnswerItem, .ContentItem.ArticleItem', 'ContentItem-meta')}, 300);
                blockUsers();
            }, 300);

        } else if (location.pathname.indexOf('/people/') > -1 || location.href.indexOf('org') > -1) {
            if (location.pathname.split('/').length === 3) addTypeTips();addToQuestion();
            collapsedNowAnswer('main div');
            collapsedNowAnswer('.Profile-main');
            setInterval(function(){topTime_('.ContentItem.AnswerItem, .ContentItem.ArticleItem', 'ContentItem-meta')}, 300);
            blockUsers('people');
            blockKeywords('people');

        } else if (location.pathname.indexOf('/collection/') > -1) {
            addTypeTips();
            addToQuestion();
            collapsedNowAnswer('main');
            collapsedNowAnswer('.CollectionsDetailPage');
            setInterval(function(){topTime_('.ContentItem.AnswerItem, .ContentItem.ArticleItem', 'ContentItem-meta')}, 300);
            blockKeywords('collection');

        } else if (location.pathname.indexOf('/pin/') > -1) {
            backToTop('main[role=main]');
            setInterval(function(){topTime_('.ContentItem.PinItem', 'ContentItem-meta')}, 300);

        } else if (['/','/hot','/follow','/column-square','/ring-feeds'].indexOf(location.pathname) !== -1) {
            switchHomeRecommend();
            document.lastElementChild.appendChild(document.createElement('style')).textContent = '.Topstory-container {min-height: 1500px;}';
            if (menu_value('menu_blockTypeVideo')) document.lastChild.appendChild(document.createElement('style')).textContent = `.Card .ZVideoItem-video, nav.TopstoryTabs > a[aria-controls="Topstory-zvideo"] {display: none !important;}`;

            collapsedNowAnswer('.App-main .Topstory');
            collapsedNowAnswer('.App-main .Topstory-container');
            if (location.pathname !== '/column-square'){
                setInterval(function(){topTime_('.TopstoryItem', 'ContentItem-meta')}, 300);
                addTypeTips();
                addToQuestion();
                if (location.pathname == '/') {
                    blockLowCount('index');
                    blockUsers('index');
                    blockKeywords('index');
                    blockType();
                } else if (location.pathname == '/hot') {
                    blockKeywords('index');
                    blockHotOther();
                } else if (location.pathname == '/follow') {
                    blockLowCount('follow');
                    blockUsers('follow');
                    blockKeywords('follow');
                    blockType();
                    blockType('follow');
                }
            }
        }
    }
})();