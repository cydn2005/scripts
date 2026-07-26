/* global api */
class builtin_encn_Collins {
    constructor(options) {
        this.options = options;
        this.maxexample = 2; 
        this.word = '';
    }

    async displayName() {
        let locale = await api.locale();
        // 我改了这个名字，方便你确认代码是否生效
        if (locale.indexOf('CN') != -1) return '柯林斯 (定制分离版)';
        if (locale.indexOf('TW') != -1) return '柯林斯 (定制分离版)';
        return 'Collins (Separated Def/Ex)';
    }

    setOptions(options) {
        this.options = options;
        this.maxexample = options.maxexample;
    }

    async findTerm(word) {
        this.word = word;
        let results = await Promise.all([this.findCollins(word)]);
        return [].concat(...results).filter(x => x);
    }

    async findCollins(word) {
        if (!word) return [];

        let base = 'https://dict.youdao.com/w/';
        let url = base + encodeURIComponent(word);
        let doc = '';
        try {
            let data = await api.fetch(url);
            let parser = new DOMParser();
            doc = parser.parseFromString(data, 'text/html');
            let collins = getCollins(doc);
            let youdao = collins.length ? [] : getYoudao(doc); 
            let ydtrans = collins.length || youdao.length ? [] : getYDTrans(doc); 
            return [].concat(collins, youdao, ydtrans);
        } catch (err) {
            return [];
        }

        function getCollins(doc) {
            let notes = [];
            let defNodes = doc.querySelectorAll('#collinsResult .ol li');
            if (!defNodes || !defNodes.length) return notes;

            // 1. 获取单词和音标
            let expression = T(doc.querySelector('#collinsResult h4 .title'));
            let reading = T(doc.querySelector('#collinsResult h4 .phonetic'));

            // 2. 获取星级和证书 (Extrainfo 的基础部分)
            let extra_cet = '';
            let cets = T(doc.querySelector('#collinsResult h4 .rank'));
            if (cets) {
                for (const cet of cets.split(' ')) {
                    extra_cet += `<span class="cet">${cet}</span>`;
                }
            }
            let extra_star = '';
            let starNode = doc.querySelector('#collinsResult h4 .star');
            let star = starNode ? starNode.className.split(' ')[1].substring(4, 5) : '';
            extra_star = star ? `<span class="star">${'\u2605'.repeat(Number(star))}</span>` : '';

            let extrainfo_base = extra_star + extra_cet; 

            let audios = [];
            audios[0] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(expression)}&type=1`;
            audios[1] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(expression)}&type=2`;

            // 3. 分离释义和例句
            let definitions = [];
            let collected_examples = []; 

            for (const defNode of defNodes) {
                // --- 提取中文释义 ---
                let definition = '';
                let tranNode = defNode.querySelector('.collinsMajorTrans p');
                if (!tranNode) continue;
                
                let posNodes = tranNode.querySelectorAll('.additional');
                let pos = '';
                if (posNodes && posNodes.length) {
                    pos = `<span class='pos'>${T(posNodes[0])}</span>`;
                    for (const posNode of posNodes) posNode.remove();
                }
                
                let tran = tranNode.innerHTML.trim();
                // 正则提取纯中文
                let chn_tran = tran.match(/( ?\((?:([\u4e00-\u9fa5]|，|…|、)+)\) ?|[\u4e00-\u9fa5]||;|…|，|、|\]|\[)+/gi);
                if (chn_tran) {
                    chn_tran = chn_tran.join(' ').trim();
                    chn_tran = `<span class="chn_tran">${chn_tran}</span>`;
                } else {
                    chn_tran = '';
                }

                // 只有词性和中文
                definition += `${pos}<span class="tran">${chn_tran}</span>`;
                definitions.push(definition);

                // --- 提取例句 ---
                let exampleNodes = defNode.querySelectorAll('.exampleLists');
                if (exampleNodes && exampleNodes.length > 0) {
                    for (const example of exampleNodes) {
                        let chn_sent = T(example.querySelector('p+p'));
                        let eng_sent = T(example.querySelector('p'));
                        if (eng_sent) {
                            eng_sent = eng_sent.replace(RegExp(expression, 'gi'), '<b>$&</b>');
                            collected_examples.push(`<li class='sent'><span class='eng_sent'>${eng_sent}</span><span class='chn_sent'>${chn_sent}</span></li>`);
                        }
                    }
                }
            }

            // 4. 组装 Extrainfo (星级 + 2个例句)
            let example_html = '';
            if (collected_examples.length > 0) {
                example_html = '<br><ul class="sents">';
                example_html += collected_examples.slice(0, 2).join(''); // 强制取前2个
                example_html += '</ul>';
            }
            let extrainfo = extrainfo_base + example_html;

            // 5. 样式
            let css = `
                <style>
                    span.star {color: #FFBB00;}
                    span.cet  {margin: 0 3px;padding: 0 3px;font-weight: normal;font-size: 0.8em;color: white;background-color: #5cb85c;border-radius: 3px;}
                    span.pos  {text-transform:lowercase; font-size:0.9em; margin-right:5px; padding:2px 4px; color:white; background-color:#0d47a1; border-radius:3px;}
                    span.tran {margin:0; padding:0;}
                    span.chn_tran {color:#0d47a1; font-weight: bold;} 
                    ul.sents {font-size:0.9em; list-style:square inside; margin:5px 0; padding:5px; background:rgba(0,0,0,0.05); border-radius:5px; text-align: left;}
                    li.sent  {margin-bottom: 5px; padding:0;}
                    span.eng_sent {display: block; color: #333;}
                    span.chn_sent {display: block; color: #666; font-size: 0.9em;}
                </style>`;

            notes.push({
                css,
                expression,
                reading,
                extrainfo, // 包含例句
                definitions, // 只有中文
                audios
            });

            return notes;
        }

        function getYoudao(doc) {
            // ... 有道降级处理，保持默认 ...
            let notes = [];
            let defNodes = doc.querySelectorAll('#phrsListTab .trans-container ul li');
            if (!defNodes || !defNodes.length) return notes;
            let expression = T(doc.querySelector('#phrsListTab .wordbook-js .keyword'));
            let reading = '';
            let readings = doc.querySelectorAll('#phrsListTab .wordbook-js .pronounce');
            if (readings) {
                let reading_uk = T(readings[0]);
                let reading_us = T(readings[1]);
                reading = (reading_uk || reading_us) ? `${reading_uk} ${reading_us}` : '';
            }
            let audios = [];
            audios[0] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(expression)}&type=1`;
            audios[1] = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(expression)}&type=2`;
            let definition = '<ul class="ec">';
            for (const defNode of defNodes) {
                let pos = '';
                let def = T(defNode);
                let match = /(^.+?\.)\s/gi.exec(def);
                if (match && match.length > 1) {
                    pos = match[1];
                    def = def.replace(pos, '');
                }
                pos = pos ? `<span class="pos simple">${pos}</span>` : '';
                definition += `<li class="ec">${pos}<span class="ec_chn">${def}</span></li>`;
            }
            definition += '</ul>';
            let css = `<style>span.pos{text-transform:lowercase;font-size:0.9em;margin-right:5px;padding:2px 4px;color:white;background-color:#0d47a1;border-radius:3px;}span.simple{background-color:#999!important}ul.ec,li.ec{margin:0;padding:0;}</style>`;
            notes.push({css, expression, reading, definitions: [definition], audios});
            return notes;
        }

        function getYDTrans(doc) {
            let notes = [];
            let transNode = doc.querySelectorAll('#ydTrans .trans-container p')[1];
            if (!transNode) return notes;
            let definition = `${T(transNode)}`;
            let css = `<style>.odh-expression {font-size: 1em!important;font-weight: normal!important;}</style>`;
            notes.push({css, definitions: [definition]});
            return notes;
        }

        function T(node) { return node ? node.innerText.trim() : ''; }
    }
}