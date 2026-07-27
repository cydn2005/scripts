// ==UserScript==
// @name         微博知乎B站小红书关键词屏蔽器
// @namespace    http://tampermonkey.net/
// @version      2.6.0
// @description  屏蔽微博、知乎、小红书、B站含关键词的内容，全平台跨域实时同步、支持查询与直接编辑修改
// @author       KasenRi
// @match        https://www.zhihu.com/
// @match        https://www.xiaohongshu.com/*
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/?*
// @match        https://www.bilibili.com/v/*
// @match        https://weibo.com/*
// @match        https://www.weibo.com/*
// @match        https://s.weibo.com/*
// @icon         https://picx.zhimg.com/v2-fab9e4d5ddf148b93df597a86b0525fd_l.jpg?source=32738c0c&needBackground=1
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addValueChangeListener
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const DEFAULT_KEYWORDS = [
        '男','女','父亲','母亲','大龄剩女','男性','女性','coser','儿子','体育生',
        '女儿','迪士尼','盲盒','奶茶','COSER','漫展','小孩','结婚','生娃','华为',
        '大龄女','大妈','单亲','女生','美女','女神','小姐姐','男子','女演员',
        '健身房','JK','身材','985','211','小米','妈','妈妈','生物爹','原生家庭',
        '今日俄罗斯'
    ];

    const STORAGE_KEY = 'keyword_blocker_words';
    const DISABLED_SITES_KEY = 'keyword_blocker_disabled_sites';
    const DEEP_SPLIT_KEY = 'keyword_blocker_deep_split';

    let cachedDeepSplit = GM_getValue(DEEP_SPLIT_KEY, 'false') === 'true';

    function saveKeywords(keywords) {
        GM_setValue(STORAGE_KEY, JSON.stringify(keywords));
    }

    function loadKeywords() {
        try {
            const saved = GM_getValue(STORAGE_KEY, null);
            return saved ? JSON.parse(saved) : [...DEFAULT_KEYWORDS];
        } catch (e) {
            return [...DEFAULT_KEYWORDS];
        }
    }

    function saveDisabledSites(sites) {
        GM_setValue(DISABLED_SITES_KEY, JSON.stringify(sites));
    }

    function loadDisabledSites() {
        try {
            const saved = GM_getValue(DISABLED_SITES_KEY, null);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    }

    function setDeepSplit(enabled) {
        cachedDeepSplit = enabled;
        GM_setValue(DEEP_SPLIT_KEY, enabled ? 'true' : 'false');
    }

    function isCurrentSiteDisabled() {
        return loadDisabledSites().includes(getCurrentSite());
    }

    function disableCurrentSite() {
        const disabledSites = loadDisabledSites();
        const currentSite = getCurrentSite();
        if (!disabledSites.includes(currentSite)) {
            disabledSites.push(currentSite);
            saveDisabledSites(disabledSites);
        }
    }

    function enableCurrentSite() {
        const disabledSites = loadDisabledSites();
        const currentSite = getCurrentSite();
        const index = disabledSites.indexOf(currentSite);
        if (index > -1) {
            disabledSites.splice(index, 1);
            saveDisabledSites(disabledSites);
        }
    }

    let BLOCK_KEYWORDS = loadKeywords();

    // 跨域/跨标签页数据变动实时监听器
    if (typeof GM_addValueChangeListener === 'function') {
        GM_addValueChangeListener(STORAGE_KEY, function(name, oldValue, newValue, remote) {
            if (remote) {
                BLOCK_KEYWORDS = loadKeywords();
                const searchInput = document.getElementById('kb-search-input');
                renderKeywordList(searchInput ? searchInput.value : '');
                processAllContent();
            }
        });

        GM_addValueChangeListener(DEEP_SPLIT_KEY, function(name, oldValue, newValue, remote) {
            if (remote) {
                cachedDeepSplit = newValue === 'true';
                const deepSwitch = document.getElementById('kb-deep-switch');
                if (deepSwitch) deepSwitch.checked = cachedDeepSplit;
                processAllContent();
            }
        });
    }

    function getCurrentSite() {
        const hostname = window.location.hostname;
        if (hostname.includes('zhihu.com')) return 'zhihu';
        if (hostname.includes('xiaohongshu.com')) return 'xiaohongshu';
        if (hostname.includes('bilibili.com')) return 'bilibili';
        if (hostname.includes('weibo.com')) return 'weibo';
        return 'unknown';
    }

    const siteConfigs = {
        zhihu: {
            containerSelector: '.ContentItem',
            titleSelector: '.ContentItem-title a, .RichContent-inner, .CopyrightRichText-richText',
            logPrefix: '已屏蔽知乎内容'
        },
        xiaohongshu: {
            containerSelector: 'section.note-item',
            titleSelector: 'a.title, .title',
            logPrefix: '已屏蔽小红书内容'
        },
        bilibili: {
            containerSelector: '.bili-feed-card, .bili-video-card',
            titleSelector: '.bili-video-card__info--tit, .bili-video-card__info--tit a',
            logPrefix: '已屏蔽B站内容'
        },
        weibo: {
            containerSelector: '.wbpro-scroller-item',
            titleSelector: '.wbpro-feed-content .detail_wbtext_4CRf9',
            logPrefix: '已屏蔽微博内容'
        }
    };

    function createManagementUI() {
        const style = document.createElement('style');
        style.textContent = `
            #keyword-blocker-panel, #keyword-blocker-panel * {
                box-sizing: border-box !important;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
            }
            #keyword-blocker-toggle {
                position: fixed; left: 20px; top: 50%; transform: translateY(-50%); z-index: 10000;
                background: #1890ff; color: white; border: none; border-radius: 6px;
                padding: 12px 8px; cursor: pointer; font-size: 14px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15); transition: all 0.3s ease;
                writing-mode: vertical-lr; text-orientation: mixed;
            }
            #keyword-blocker-toggle:hover { background: #40a9ff; transform: translateY(-50%) scale(1.05); }
            #keyword-blocker-panel {
                position: fixed; left: -350px; top: 50%; transform: translateY(-50%); z-index: 9999;
                width: 320px; max-height: 80vh; background: white; border: 1px solid #d9d9d9;
                border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);
                transition: left 0.3s ease;
            }
            #keyword-blocker-panel.show { left: 20px; }
            .kb-panel-header { padding: 16px; border-bottom: 1px solid #f0f0f0; background: #fafafa; border-radius: 8px 8px 0 0; }
            .kb-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
            .kb-panel-title { margin: 0; font-size: 16px; font-weight: 500; color: #262626; flex: 1; }
            .kb-input-group { display: flex; gap: 8px; margin-bottom: 8px; }
            .kb-input { flex: 1; padding: 6px 10px; border: 1px solid #d9d9d9; border-radius: 4px; font-size: 13px; outline: none; }
            .kb-input:focus { border-color: #1890ff; box-shadow: 0 0 0 2px rgba(24,144,255,0.2); }
            .kb-btn { padding: 6px 14px; background: #1890ff; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px; transition: background 0.3s; white-space: nowrap; }
            .kb-btn:hover { background: #40a9ff; }
            .kb-switch-row { display: flex; justify-content: space-between; align-items: center; background: #f0f5ff; padding: 6px 10px; border-radius: 4px; font-size: 12px; color: #1890ff; border: 1px solid #adc6ff; }
            .kb-switch-label { font-weight: 500; }
            .kb-switch { position: relative; display: inline-block; width: 36px; height: 20px; }
            .kb-switch input { opacity: 0; width: 0; height: 0; }
            .kb-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .3s; border-radius: 20px; }
            .kb-slider:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
            input:checked + .kb-slider { background-color: #1890ff; }
            input:checked + .kb-slider:before { transform: translateX(16px); }
            .kb-list-container { max-height: calc(80vh - 250px); overflow-y: auto; padding: 0; }
            .kb-list { list-style: none; margin: 0; padding: 0; }
            .kb-list-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; border-bottom: 1px solid #f0f0f0; gap: 6px; }
            .kb-list-item:hover { background: #f5f5f5; }
            .kb-keyword { flex: 1; font-size: 13px; color: #262626; word-break: break-all; }

            /* 操作按钮组样式 */
            .kb-action-group { display: flex; gap: 4px; }
            .kb-edit-btn { padding: 3px 6px; background: #faad14; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; }
            .kb-edit-btn:hover { background: #ffc53d; }
            .kb-delete-btn { padding: 3px 6px; background: #ff4d4f; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; }
            .kb-delete-btn:hover { background: #ff7875; }
            .kb-save-btn { padding: 3px 6px; background: #52c41a; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; }
            .kb-save-btn:hover { background: #73d13d; }

            .kb-confirm-group { display: flex; gap: 6px; }
            .kb-confirm-btn { padding: 3px 6px; border: none; border-radius: 3px; cursor: pointer; font-size: 12px; }
            .kb-confirm-delete { background: #ff4d4f; color: white; }
            .kb-confirm-delete:hover { background: #ff7875; }
            .kb-confirm-cancel { background: #8c8c8c; color: white; }
            .kb-confirm-cancel:hover { background: #a6a6a6; }
            .kb-stats {
                padding: 10px 16px; background: #f9f9f9; border-top: 1px solid #f0f0f0;
                font-size: 12px; color: #666; text-align: center;
                border-radius: 0 0 8px 8px; display: flex; justify-content: center; align-items: center; gap: 10px; flex-wrap: wrap;
            }
            .kb-close-btn { position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 18px; cursor: pointer; color: #999; padding: 4px; border-radius: 3px; }
            .kb-close-btn:hover { background: #f0f0f0; color: #666; }
            .kb-disable-site-btn { padding: 4px 8px; background: #8c8c8c; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 10px; white-space: nowrap; margin-left: 12px; }
            .kb-disable-site-btn:hover { background: #a6a6a6; }
        `;
        document.head.appendChild(style);

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'keyword-blocker-toggle';
        toggleBtn.textContent = '屏蔽词管理';
        document.body.appendChild(toggleBtn);

        const panel = document.createElement('div');
        panel.id = 'keyword-blocker-panel';
        const currentSite = getCurrentSite();
        const siteNames = { zhihu:'知乎', xiaohongshu:'小红书', bilibili:'B站', weibo:'微博' };
        const siteName = siteNames[currentSite] || '当前网站';
        const isDisabled = isCurrentSiteDisabled();
        const btnText = isDisabled ? `重新启用${siteName}屏蔽` : `有BUG？停止屏蔽${siteName}`;
        const statusText = isDisabled ? `⚠️ ${siteName}屏蔽功能已停用` : '屏蔽词管理';
        const isDeepChecked = cachedDeepSplit ? 'checked' : '';

        panel.innerHTML = `
            <button class="kb-close-btn" id="kb-close">×</button>
            <div class="kb-panel-header">
                <div class="kb-title-row">
                    <h3 class="kb-panel-title">${statusText}</h3>
                    <button class="kb-disable-site-btn" id="kb-disable-site">${btnText}</button>
                </div>
                <div class="kb-input-group">
                    <input type="text" id="kb-input" class="kb-input" placeholder="新增屏蔽词，用 , 或 / 分隔" />
                    <button id="kb-add-btn" class="kb-btn">新增</button>
                </div>
                <div class="kb-input-group">
                    <input type="text" id="kb-search-input" class="kb-input" placeholder="🔍 查找已有屏蔽词..." style="background: #fafafa;" />
                </div>
                <div class="kb-switch-row">
                    <span class="kb-switch-label" title="开启后，长屏蔽词会被拆解为每2个字组合，只要匹配到任意2个字就屏蔽">⚡ 极细拆词模式（2字组合即屏蔽）</span>
                    <label class="kb-switch">
                        <input type="checkbox" id="kb-deep-switch" ${isDeepChecked}>
                        <span class="kb-slider"></span>
                    </label>
                </div>
            </div>
            <div class="kb-list-container">
                <ul id="kb-list" class="kb-list"></ul>
            </div>
            <div class="kb-stats">
                <span>显示 <span id="kb-count">0</span> 个屏蔽词</span>
                <button id="kb-copy-btn" class="kb-btn" style="padding:3px 10px; font-size:12px;">复制全部</button>
                <button id="kb-clear-all-btn" class="kb-btn" style="padding:3px 10px; font-size:12px; background:#ff4d4f;">清空全部</button>
            </div>
        `;
        document.body.appendChild(panel);

        return { toggleBtn, panel };
    }

    function renderKeywordList(filterText = '') {
        const list = document.getElementById('kb-list');
        const count = document.getElementById('kb-count');
        if (!list || !count) return;
        list.innerHTML = '';

        const searchText = filterText.trim().toLowerCase();
        let displayCount = 0;

        BLOCK_KEYWORDS.forEach((keyword, index) => {
            if (searchText && !keyword.toLowerCase().includes(searchText)) {
                return;
            }
            displayCount++;
            const li = document.createElement('li');
            li.className = 'kb-list-item';
            li.dataset.index = index;
            li.innerHTML = `
                <span class="kb-keyword">${keyword}</span>
                <div class="kb-action-group">
                    <button class="kb-edit-btn" data-index="${index}">修改</button>
                    <button class="kb-delete-btn" data-index="${index}">删除</button>
                </div>
            `;
            list.appendChild(li);
        });

        if (searchText) {
            count.textContent = `${displayCount} / ${BLOCK_KEYWORDS.length}`;
        } else {
            count.textContent = BLOCK_KEYWORDS.length;
        }
    }

    // 切换为输入框修改模式
    function showEditMode(listItem, index) {
        const currentWord = BLOCK_KEYWORDS[index];
        listItem.innerHTML = `
            <input type="text" class="kb-input kb-edit-input" value="${currentWord}" style="padding:2px 6px; font-size:13px;" />
            <div class="kb-confirm-group">
                <button class="kb-save-btn" data-index="${index}">保存</button>
                <button class="kb-confirm-btn kb-confirm-cancel" data-index="${index}">取消</button>
            </div>
        `;
        const editInput = listItem.querySelector('.kb-edit-input');
        if (editInput) {
            editInput.focus();
            editInput.select();
        }
    }

    function showDeleteConfirm(listItem, index) {
        listItem.innerHTML = `
            <span class="kb-keyword">${BLOCK_KEYWORDS[index]}</span>
            <div class="kb-confirm-group">
                <button class="kb-confirm-btn kb-confirm-delete" data-index="${index}">确认删除</button>
                <button class="kb-confirm-btn kb-confirm-cancel" data-index="${index}">取消</button>
            </div>
        `;
    }

    function restoreNormalView(listItem, index) {
        listItem.innerHTML = `
            <span class="kb-keyword">${BLOCK_KEYWORDS[index]}</span>
            <div class="kb-action-group">
                <button class="kb-edit-btn" data-index="${index}">修改</button>
                <button class="kb-delete-btn" data-index="${index}">删除</button>
            </div>
        `;
    }

    function updateKeyword(index, newWord) {
        newWord = newWord.replace(/\s+/g, '').trim();
        if (newWord && index >= 0 && index < BLOCK_KEYWORDS.length) {
            if (BLOCK_KEYWORDS.includes(newWord) && BLOCK_KEYWORDS[index] !== newWord) {
                alert('修改后的屏蔽词已存在！');
                return false;
            }
            BLOCK_KEYWORDS[index] = newWord;
            saveKeywords(BLOCK_KEYWORDS);
            const searchInput = document.getElementById('kb-search-input');
            renderKeywordList(searchInput ? searchInput.value : '');
            processAllContent();
            return true;
        }
        return false;
    }

    function addKeywords(input) {
        const words = input.split(/[,，/]/).map(w => w.replace(/\s+/g, '')).filter(w => w.length > 0 && !BLOCK_KEYWORDS.includes(w));
        if (words.length > 0) {
            BLOCK_KEYWORDS.unshift(...words);
            saveKeywords(BLOCK_KEYWORDS);

            const searchInput = document.getElementById('kb-search-input');
            if (searchInput) searchInput.value = '';
            renderKeywordList();
            return true;
        }
        return false;
    }

    function removeKeyword(index) {
        if (index >= 0 && index < BLOCK_KEYWORDS.length) {
            BLOCK_KEYWORDS.splice(index, 1);
            saveKeywords(BLOCK_KEYWORDS);
            const searchInput = document.getElementById('kb-search-input');
            renderKeywordList(searchInput ? searchInput.value : '');
            return true;
        }
        return false;
    }

    function initUIEvents() {
        const toggleBtn = document.getElementById('keyword-blocker-toggle');
        const panel = document.getElementById('keyword-blocker-panel');
        const closeBtn = document.getElementById('kb-close');
        const addBtn = document.getElementById('kb-add-btn');
        const input = document.getElementById('kb-input');
        const searchInput = document.getElementById('kb-search-input');
        const list = document.getElementById('kb-list');
        const disableSiteBtn = document.getElementById('kb-disable-site');
        const deepSwitch = document.getElementById('kb-deep-switch');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                renderKeywordList(e.target.value);
            });
        }

        if (deepSwitch) {
            deepSwitch.addEventListener('change', (e) => {
                setDeepSplit(e.target.checked);
                processAllContent();
            });
        }

        const copyBtn = document.getElementById('kb-copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = BLOCK_KEYWORDS.join(', ');
                navigator.clipboard.writeText(text).then(() => {
                    alert('已复制所有屏蔽词！');
                }).catch(() => {
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('已复制（降级方式）');
                });
            });
        }

        const clearAllBtn = document.getElementById('kb-clear-all-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('确定要删除所有屏蔽词吗？此操作不可恢复！')) {
                    BLOCK_KEYWORDS = [];
                    saveKeywords(BLOCK_KEYWORDS);
                    renderKeywordList();
                    alert('已清空全部屏蔽词。');
                }
            });
        }

        toggleBtn.addEventListener('click', () => {
            if (panel.classList.contains('show')) {
                panel.classList.remove('show');
                toggleBtn.style.display = 'block';
            } else {
                BLOCK_KEYWORDS = loadKeywords();
                renderKeywordList(searchInput ? searchInput.value : '');
                panel.classList.add('show');
                toggleBtn.style.display = 'none';
            }
        });

        function closePanel() {
            panel.classList.remove('show');
            toggleBtn.style.display = 'block';
        }

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closePanel();
        });

        document.addEventListener('click', (e) => {
            if (!panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                closePanel();
            }
        });

        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const value = input.value.trim();
            if (value) {
                if (addKeywords(value)) {
                    input.value = '';
                    processAllContent();
                } else {
                    alert('请输入有效的屏蔽词（或该词已存在）');
                }
            }
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addBtn.click();
        });

        // 列表按钮代理点击事件（修改、删除、保存、取消）
        list.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index, 10);
            if (isNaN(index)) return;

            const listItem = e.target.closest('.kb-list-item');

            if (e.target.classList.contains('kb-edit-btn')) {
                e.stopPropagation();
                showEditMode(listItem, index);
            } else if (e.target.classList.contains('kb-save-btn')) {
                e.stopPropagation();
                const editInput = listItem.querySelector('.kb-edit-input');
                if (editInput) {
                    updateKeyword(index, editInput.value);
                }
            } else if (e.target.classList.contains('kb-delete-btn')) {
                e.stopPropagation();
                showDeleteConfirm(listItem, index);
            } else if (e.target.classList.contains('kb-confirm-delete')) {
                e.stopPropagation();
                removeKeyword(index);
            } else if (e.target.classList.contains('kb-confirm-cancel')) {
                e.stopPropagation();
                restoreNormalView(listItem, index);
            }
        });

        // 修改模式下支持 Enter 键回车保存
        list.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('kb-edit-input')) {
                const listItem = e.target.closest('.kb-list-item');
                const saveBtn = listItem ? listItem.querySelector('.kb-save-btn') : null;
                if (saveBtn) saveBtn.click();
            }
        });

        disableSiteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const site = getCurrentSite();
            const names = { zhihu:'知乎', xiaohongshu:'小红书', bilibili:'B站', weibo:'微博' };
            const name = names[site] || '当前网站';
            if (isCurrentSiteDisabled()) {
                if (confirm(`确定重新启用${name}屏蔽吗？`)) {
                    enableCurrentSite();
                    alert(`已重新启用，刷新页面生效。`);
                    closePanel();
                }
            } else {
                if (confirm(`确定停止在${name}的屏蔽吗？`)) {
                    disableCurrentSite();
                    alert(`已停止，刷新页面生效。`);
                    closePanel();
                }
            }
        });
    }

    function processContentElement(element, config) {
        if (!element || element.dataset.kbProcessed) return;

        const site = getCurrentSite();
        if (site === 'bilibili') {
            if (element.classList.contains('bili-video-card') &&
                element.classList.contains('is-rcmd') &&
                !element.classList.contains('enable-no-interest')) {
                const container = element.closest('.feed-card') || element.closest('.bili-feed-card');
                if (container) container.remove(); else element.remove();
                return;
            }
        }

        const titleElements = element.querySelectorAll(config.titleSelector);
        let title = '';
        if (titleElements.length > 0) {
            titleElements.forEach(el => { title += el.textContent.trim() + ' '; });
        } else {
            title = element.textContent.trim();
        }
        if (!title.trim()) return;

        const isMatched = BLOCK_KEYWORDS.some(k => {
            if (!k) return false;
            if (title.includes(k)) return true;

            if (cachedDeepSplit && k.length >= 2) {
                for (let i = 0; i < k.length - 1; i++) {
                    const sub2 = k.substring(i, i + 2);
                    if (title.includes(sub2)) return true;
                }
            }
            return false;
        });

        if (isMatched) {
            let containerRemoved = false;
            if (site === 'zhihu') {
                const card = element.closest('.Card.TopstoryItem.TopstoryItem-isRecommend');
                if (card) { card.remove(); containerRemoved = true; }
            } else if (site === 'bilibili') {
                const feed = element.closest('.feed-card') || element.closest('.bili-feed-card');
                if (feed) { feed.remove(); containerRemoved = true; }
            } else if (site === 'xiaohongshu') {
                const note = element.closest('.note-item');
                if (note) { note.remove(); containerRemoved = true; }
            }
            if (!containerRemoved) {
                element.style.display = 'none';
            }
            console.log(`${config.logPrefix}: ${title.substring(0, 30)}...`);
        } else {
            element.dataset.kbProcessed = 'true';
        }
    }

    function processAllContent() {
        BLOCK_KEYWORDS = loadKeywords();
        const site = getCurrentSite();
        const config = siteConfigs[site];
        if (!config) return;
        document.querySelectorAll(config.containerSelector).forEach(el => processContentElement(el, config));
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    const debouncedProcessAllContent = debounce(processAllContent, 300);

    function initManagementUI() {
        createManagementUI();
        renderKeywordList();
        initUIEvents();
    }

    function init() {
        if (isCurrentSiteDisabled()) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initManagementUI);
            } else {
                initManagementUI();
            }
            return;
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                processAllContent();
                initManagementUI();
            });
        } else {
            processAllContent();
            initManagementUI();
        }
        window.addEventListener('load', processAllContent);

        const observer = new MutationObserver(mutations => {
            const site = getCurrentSite();
            const config = siteConfigs[site];
            if (!config) return;

            let shouldProcess = false;
            for (let i = 0; i < mutations.length; i++) {
                const mutation = mutations[i];
                for (let j = 0; j < mutation.addedNodes.length; j++) {
                    const node = mutation.addedNodes[j];
                    if (node.nodeType === 1) {
                        if (node.matches && node.matches(config.containerSelector)) {
                            processContentElement(node, config);
                        } else if (node.querySelectorAll) {
                            const elements = node.querySelectorAll(config.containerSelector);
                            if (elements.length > 0) {
                                shouldProcess = true;
                                elements.forEach(el => processContentElement(el, config));
                            }
                        }
                    }
                }
            }
            if (shouldProcess) debouncedProcessAllContent();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(debouncedProcessAllContent, 800);
        }, { passive: true });

        setInterval(processAllContent, 5000);
        console.log(`四平台跨域同步屏蔽器已启动: ${getCurrentSite()}`);
    }

    init();
})();
