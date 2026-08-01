// ==UserScript==
// @name         Zhihu enhancement
// @name:zh-CN   知乎增强 (极速精简版)
// @name:zh-TW   知乎增強
// @name:ru      Улучшение Zhihu
// @version      2.3.32-Cleaned
// @author       X.I.U (Optimized & Cleaned)
// @description  移除登录弹窗、屏蔽指定类别、屏蔽低赞/低评（修复首页生效）、屏蔽用户、屏蔽关键词等（极速防闪现纯净版）
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @exclude      https://www.zhihu.com/signin*
// @icon         data:image/png;base64,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
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
// @run-at       document-start
// @namespace    https://greasyfork.org/scripts/4122051
// ==/UserScript==

'use strict';

// 样式先行（防闪现）
const earlyStyle = document.createElement('style');
earlyStyle.id = 'zhihu-enhancement-early-style';
earlyStyle.textContent = `
    .zhi-e-hidden { display: none !important; }
`;
(document.head || document.documentElement).appendChild(earlyStyle);

// 已经过清理：剔除了在源码1中未实现逻辑的冗余菜单项
var menu_ALL = [
    ['menu_blockLowCount', '屏蔽低赞低评', '设置要屏蔽 低于多少赞同/评价 的回答/文章...', ''],
    ['menu_blockLowUpvoteCount', '最低赞同数 [首页]', '最低赞同数（首页）', ''],
    ['menu_blockLowCommentCount', '最低评价数 [首页]', '最低评价数（首页）', ''],
    ['menu_blockLowUpvoteCountQuestion', '最低赞同数 [问题页]', '最低赞同数（问题页）', ''],
    ['menu_blockLowCommentCountQuestion', '最低评价数 [问题页]', '最低评价数（问题页）', ''],
    ['menu_blockLowUpvoteCountFollow', '最低赞同数 [关注页]', '最低赞同数（关注页）', ''],
    ['menu_blockLowCommentCountFollow', '最低评价数 [关注页]', '最低评价数（关注页）', ''],
    ['menu_blockUsers', '屏蔽指定用户', '屏蔽指定用户', true],
    ['menu_customBlockUsers', '自定义屏蔽用户', '自定义屏蔽用户', ['故事档案局', '盐选推荐', '盐选科普', '盐选成长计划', '知乎盐选会员', '知乎盐选创作者', '盐选心理', '盐选健康必修课', '盐选奇妙物语', '盐选生活馆', '盐选职场', '盐选文学甄选', '盐选作者小管家', '盐选博物馆', '盐选点金', '盐选测评室', '盐选科技前沿', '盐选会员精品']],
    ['menu_blockKeywords', '屏蔽指定关键词', '屏蔽指定关键词', true],
    ['menu_customBlockKeywords', '自定义屏蔽关键词', '自定义屏蔽关键词', []],
    ['menu_addSelectedBlockKeywords', '添加选中文字到屏蔽词 ↑', '添加选中文字到屏蔽词', []]
], menu_ID = [];

for (let i = 0; i < menu_ALL.length; i++){
    if (GM_getValue(menu_ALL[i][0]) == null){GM_setValue(menu_ALL[i][0], menu_ALL[i][3])};
}
registerMenuCommand();

function registerMenuCommand() {
    if (menu_ID.length > menu_ALL.length){
        for (let i = 0; i < menu_ID.length; i++){
            GM_unregisterMenuCommand(menu_ID[i]);
        }
    }
    for (let i = 0; i < menu_ALL.length; i++){
        menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
        if (menu_ALL[i][0] === 'menu_blockLowCount') {
            menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){menu_setting('checkbox', menu_ALL[i][1], menu_ALL[i][2], true, [menu_ALL[i+1], menu_ALL[i+2], menu_ALL[i+3], menu_ALL[i+4], menu_ALL[i+5], menu_ALL[i+6]])});
        } else if (menu_ALL[i][0] === 'menu_customBlockUsers') {
            if (menu_value('menu_blockUsers')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockUsers()});
        } else if (menu_ALL[i][0] === 'menu_customBlockKeywords') {
            if (menu_value('menu_blockKeywords')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){customBlockKeywords()});
        } else if (menu_ALL[i][0] === 'menu_addSelectedBlockKeywords') {
            if (menu_value('menu_blockKeywords')) menu_ID[i] = GM_registerMenuCommand(`#️⃣ ${menu_ALL[i][1]}`, function(){addSelectedKeywordToBlocklist()});
        } else if (menu_ALL[i][0].indexOf('menu_blockLow') == -1) {
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

// 脚本设置弹窗
function menu_setting(type, title, tips, line, menu) {
    let _html = `<style class="zhihuE_SettingStyle">
.zhihuE_SettingBackdrop_1 { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 99999; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.zhihuE_SettingBackdrop_2 { position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index: 0; background-color: rgba(15, 23, 42, 0.45); }
.zhihuE_SettingRoot { position: relative; z-index: 1; width: 90%; min-width: 400px; max-width: 580px; height: auto; max-height: 80vh; display: flex; flex-direction: column; color: #334155; background-color: #ffffff; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid rgba(226, 232, 240, 0.8); overflow: hidden; font-family: sans-serif; }
.zhihuE_SettingHeader { padding: 16px 20px; color: #0f172a; font-size: 16px; font-weight: 600; background-color: #ffffff; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; user-select: none; }
.zhihuE_SettingHeader .zhihuE_SettingClose { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 8px; color: #64748b; cursor: pointer; }
.zhihuE_SettingHeader .zhihuE_SettingClose:hover { background-color: #f1f5f9; color: #0f172a; }
.zhihuE_SettingMain { padding: 20px; overflow-y: auto; flex: 1; }
.zhihuE_SettingMain p { margin: 0 0 12px 0; color: #64748b; font-size: 13px; line-height: 1.6; }
.zhihuE_SettingMain hr { border: 0; height: 1px; background-color: #f1f5f9; margin: 12px 0 16px 0; }
.zhihuE_SettingGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 10px 14px; align-items: center; }
.zhihuE_SettingList { display: flex; flex-direction: column; gap: 10px; }
.zhihuE_SettingMain label { display: inline-flex; align-items: center; justify-content: space-between; font-size: 14px; color: #334155; cursor: pointer; padding: 8px 10px; border-radius: 8px; background-color: #f8fafc; border: 1px solid #f1f5f9; }
.zhihuE_SettingMain input[type=checkbox] { appearance: none; -webkit-appearance: none; width: 18px; height: 18px; border: 1.5px solid #cbd5e1; border-radius: 5px; outline: none; margin: 0 10px 0 0; cursor: pointer; position: relative; background-color: #fff; flex-shrink: 0; }
.zhihuE_SettingMain input[type=checkbox]:checked { background-color: #056de8; border-color: #056de8; }
.zhihuE_SettingMain input[type=checkbox]:checked::after { content: ''; position: absolute; left: 5px; top: 2px; width: 5px; height: 9px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.zhihuE_SettingMain input[type=text] { padding: 5px 8px; border: 1px solid #cbd5e1; border-radius: 6px; outline: none; font-size: 13px; color: #0f172a; text-align: center; background-color: #fff; }
.zhihuE_SettingFooter { padding: 12px 20px; background-color: #ffffff; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; }
.zhihuE_SettingBtn { padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; background-color: #056de8; color: #ffffff; border: none; cursor: pointer; }
</style>
<div class="zhihuE_SettingBackdrop_1">
    <div class="zhihuE_SettingBackdrop_2"></div>
    <div class="zhihuE_SettingRoot">
        <div class="zhihuE_SettingHeader"><span>${title}</span><span class="zhihuE_SettingClose" title="关闭">×</span></div>
        <div class="zhihuE_SettingMain"><p>${tips}</p><hr><div class="${line ? 'zhihuE_SettingList' : 'zhihuE_SettingGrid'}">`;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i][0].indexOf('menu_blockLow') === 0) {
            _html += `<label><span>${menu[i][1]}</span><input name="${menu[i][0]}" type="text" oninput="value=value.replace(/[^\\d]/g,'')" value="${GM_getValue(menu[i][0])}" style="width: 60px;"></label>`;
        } else if (GM_getValue(menu[i][0])) {
            _html += `<label><span><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${menu[i][0]}" checked="checked"> <span>${menu[i][1]}</span></span></label>`;
        } else {
            _html += `<label><span><input name="zhihuE_Setting_Checkbox" type="checkbox" value="${menu[i][0]}"> <span>${menu[i][1]}</span></span></label>`;
        }
    }
    _html += `</div></div><div class="zhihuE_SettingFooter"><button type="button" class="zhihuE_SettingBtn zhihuE_SettingCloseBtn">完成</button></div></div></div>`;

    document.body.insertAdjacentHTML('beforeend', _html);
    setTimeout(function() {
        const doc = document.querySelector('.zhihuE_SettingBackdrop_1');
        if (!doc) return;
        const closeFunc = function() { doc.remove(); document.querySelector('.zhihuE_SettingStyle')?.remove(); };
        doc.querySelector('.zhihuE_SettingClose').onclick = closeFunc;
        doc.querySelector('.zhihuE_SettingCloseBtn').onclick = closeFunc;
        doc.querySelector('.zhihuE_SettingBackdrop_2').onclick = function(event) { if (event.target === this) closeFunc(); };
        doc.querySelectorAll('input[name=zhihuE_Setting_Checkbox]').forEach(function (checkBox) {
            checkBox.addEventListener('click', function(){ GM_setValue(this.value, this.checked); });
        });
        doc.querySelectorAll('input[type=text]').forEach(function (textBox) {
            textBox.onchange = function(){ GM_setValue(this.name, this.value); };
        });
    }, 50);
}

// 极速拦截处理核心：合并 MutationObserver，在节点诞生之初即完成解析与屏蔽
function initFastMutationObserver() {
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const target of mutation.addedNodes) {
                if (target.nodeType !== Node.ELEMENT_NODE) continue;

                // 1. 极速处理图片高清化
                target.querySelectorAll?.('img[data-original][data-original-token]:not([data-original-xiu])').forEach(function(one){
                    one.src = 'https://' + one.dataset.original.split('/')[2] + '/' + one.dataset.originalToken + '.webp';
                    one.dataset.originalXiu = 'true';
                });

                // 2. 极速处理直链
                target.querySelectorAll?.('a.external[href*="link.zhihu.com/?target="], a.LinkCard[href*="link.zhihu.com/?target="]').forEach(function(_this){
                    let idx = _this.href.indexOf('link.zhihu.com/?target=');
                    if (idx !== -1) _this.href = decodeURIComponent(_this.href.substring(idx + 23));
                });

                // 3. 实时评估并屏蔽内容
                processBlocking(target);
            }
        }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
}

// 精确判断页面类型，正确获取并匹配“首页/关注页/问题页”的最低赞同与评价设置
function processBlocking(target) {
    if (!target.querySelector) return;

    // 适配各类卡片节点（包括首页、关注页、问题页）
    let item = target.matches?.('.Card.TopstoryItem, .List-item, .Card.AnswerCard') ? target : target.querySelector('.Card.TopstoryItem, .List-item, .Card.AnswerCard');
    if (!item) return;

    // --- 1. 屏蔽低赞低评逻辑 ---
    let menuUpvote = 'menu_blockLowUpvoteCount';
    let menuComment = 'menu_blockLowCommentCount';

    if (location.pathname.indexOf('/follow') > -1) {
        menuUpvote = 'menu_blockLowUpvoteCountFollow';
        menuComment = 'menu_blockLowCommentCountFollow';
    } else if (location.pathname.indexOf('/question') > -1) {
        menuUpvote = 'menu_blockLowUpvoteCountQuestion';
        menuComment = 'menu_blockLowCommentCountQuestion';
    }

    let minUpvote = GM_getValue(menuUpvote);
    let minComment = GM_getValue(menuComment);

    if (minUpvote || minComment) {
        let item_ContentItem = item.querySelector('.ContentItem');
        if (item_ContentItem && item_ContentItem.dataset.zaExtraModule) {
            try {
                let extraData = JSON.parse(item_ContentItem.dataset.zaExtraModule);
                let contentData = extraData?.card?.content;
                if (contentData) {
                    if (minUpvote && contentData.upvote_num !== undefined && Number(contentData.upvote_num) < Number(minUpvote)) {
                        item.classList.add('zhi-e-hidden');
                        item.style.display = 'none';
                        return;
                    }
                    if (minComment && contentData.comment_num !== undefined && Number(contentData.comment_num) < Number(minComment)) {
                        item.classList.add('zhi-e-hidden');
                        item.style.display = 'none';
                        return;
                    }
                }
            } catch (e) {}
        }
    }

    // --- 2. 屏蔽用户逻辑 ---
    if (menu_value('menu_blockUsers')) {
        let customUsers = menu_value('menu_customBlockUsers');
        let contentEl = item.querySelector('.ContentItem.AnswerItem, .ContentItem.ArticleItem');
        if (contentEl && contentEl.dataset.zop && customUsers) {
            for (const user of customUsers) {
                if (user != '' && contentEl.dataset.zop.indexOf('authorName":"' + user + '",') > -1) {
                    item.classList.add('zhi-e-hidden');
                    item.style.display = 'none';
                    return;
                }
            }
        }
    }

    // --- 3. 屏蔽关键词逻辑 ---
    if (menu_value('menu_blockKeywords')) {
        let customKeywords = menu_value('menu_customBlockKeywords');
        let titleMeta = item.querySelector('h2.ContentItem-title meta[itemprop="name"], meta[itemprop="headline"], h2.HotItem-title');
        if (titleMeta && customKeywords) {
            let text = titleMeta.content || titleMeta.textContent || '';
            for (const keyword of customKeywords) {
                if (keyword != '' && text.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                    item.classList.add('zhi-e-hidden');
                    item.style.display = 'none';
                    return;
                }
            }
        }
    }
}

function customBlockUsers() {
    let nowBlockUsers = '';
    menu_value('menu_customBlockUsers').forEach(function(item){nowBlockUsers += '|' + item})
    let newBlockUsers = prompt('编辑 [自定义屏蔽用户]\n（不同用户名之间使用 "|" 分隔）', nowBlockUsers.replace('|',''));
    if (newBlockUsers === '') {
        GM_setValue('menu_customBlockUsers', []);
        registerMenuCommand();
    } else if (newBlockUsers != null) {
        GM_setValue('menu_customBlockUsers', newBlockUsers.split('|'));
        registerMenuCommand();
    }
};

var selectedTextForBlockKeywords = '';
function normalizeBlockKeywordText(text) { return (text || '').replace(/\s+/g, ' ').trim(); }
function getSelectedBlockKeywordText() {
    let text = '';
    if (window.getSelection) { text = window.getSelection().toString(); }
    return normalizeBlockKeywordText(text);
}
function rememberSelectedBlockKeyword() {
    document.addEventListener('selectionchange', function() { selectedTextForBlockKeywords = getSelectedBlockKeywordText(); });
}
function addSelectedKeywordToBlocklist() {
    const keyword = getSelectedBlockKeywordText() || selectedTextForBlockKeywords;
    if (!keyword) { GM_notification({text: '未检测到选中的文字~', timeout: 3000}); return; }
    let keywords = (GM_getValue('menu_customBlockKeywords') || []);
    keywords.push(keyword);
    GM_setValue('menu_customBlockKeywords', keywords);
    registerMenuCommand();
    GM_notification({text: `已添加屏蔽词 [${keyword}]`, timeout: 3000});
}
function customBlockKeywords() {
    let nowBlockKeywords = '';
    menu_value('menu_customBlockKeywords').forEach(function(item){nowBlockKeywords += '|' + item})
    let newBlockKeywords = prompt('编辑 [自定义屏蔽关键词]\n（使用 "|" 分隔）', nowBlockKeywords.replace('|',''));
    if (newBlockKeywords != null) {
        GM_setValue('menu_customBlockKeywords', newBlockKeywords === '' ? [] : newBlockKeywords.split('|'));
        registerMenuCommand();
    }
};

function removeLogin() {
    document.lastChild.appendChild(document.createElement('style')).textContent = '.Question-mainColumnLogin, button.AppHeader-login {display: none !important;}';
}

function addUrlChangeEvent() {
    history.pushState = ( f => function pushState(){ var ret = f.apply(this, arguments); window.dispatchEvent(new Event('urlchange')); return ret; })(history.pushState);
    history.replaceState = ( f => function replaceState(){ var ret = f.apply(this, arguments); window.dispatchEvent(new Event('replacestate')); return ret; })(history.replaceState);
    window.addEventListener('popstate',()=>{ window.dispatchEvent(new Event('urlchange')) });
}

(function() {
    if (window.onurlchange === undefined) {addUrlChangeEvent();}
    rememberSelectedBlockKeyword();
    removeLogin();

    // 启动极速防闪现监听核心
    initFastMutationObserver();

    // 页面初次加载扫描已有节点
    document.querySelectorAll('.Card.TopstoryItem, .List-item, .Card.AnswerCard').forEach(item => processBlocking(item));

    window.addEventListener('urlchange', function() {
        setTimeout(() => {
            document.querySelectorAll('.Card.TopstoryItem, .List-item, .Card.AnswerCard').forEach(item => processBlocking(item));
        }, 500);
    });
})();