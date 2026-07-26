/* global api */
class encn_Collins {
    constructor(options) {
        this.options = options;
        this.maxexample = 2;
        this.word = '';
    }

    async displayName() {
        let locale = await api.locale();
        if (locale.indexOf('CN') != -1) return '柯林斯英汉双解';
        if (locale.indexOf('TW') != -1) return '柯林斯英漢雙解';
        return 'Collins EN->CN Dictionary';
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
        const maxexample = this.maxexample;
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

        function T(node) {
            if (!node)
                return '';
            else
                return node.innerText.trim();
        }

        function getCollins(doc) {
            let notes = [];

            let defNodes = doc.querySelectorAll('#collinsResult .ol li');
            if (!defNodes || !defNodes.length) return notes;

            let expression = T(doc.querySelector('#collinsResult h4 .title'));
            let reading = T(doc.querySelector('#collinsResult h4 .phonetic'));

            let extra_cet = '';
            let cets = T(doc.querySelector('#collinsResult h4 .rank'));
            if (cets) {
                for (const cet of cets.split(' ')) {
                    extra_cet += '<span class="cet">' + cet + '</span>';
                }
            }

            let extra_star = '';
            let starNode = doc.querySelector('#collinsResult h4 .star');
            let star = starNode ? starNode.className.split(' ')[1].substring(4, 5) : '';
            extra_star = star ? '<span class="star">' + '★'.repeat(Number(star)) + '</span>' : '';

            let extrainfo = extra_star + extra_cet;

            let audios = [];
            audios[0] = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(expression) + '&type=1';
            audios[1] = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(expression) + '&type=2';

            let definitions = [];
            for (const defNode of defNodes) {
                let definition = '';
                let tranNode = defNode.querySelector('.collinsMajorTrans p');
                if (!tranNode) continue;
                let posNodes = tranNode.querySelectorAll('.additional');
                let pos = '';
                if (posNodes && posNodes.length) {
                    pos = '<span class=\'pos\'>' + T(posNodes[0]) + '</span>';
                    for (const posNode of posNodes)
                        posNode.remove();
                }
                let tran = tranNode.innerHTML.trim();

                // Extract Chinese and English parts from mixed translation
                let chnParts = [];
                let engParts = [];
                // Remove parenthesized Chinese annotations first
                let cleaned = tran.replace(/（[^）]*）/g, '').replace(/\([^)]*\)/g, '');
                // Split by Chinese chars to separate
                let segs = cleaned.split(/([一-龥，。；！？、…：""''（）【】《》／　-〿]+)/g);
                for (let s of segs) {
                    if (/[一-龥　-〿]/.test(s)) {
                        chnParts.push(s);
                    } else {
                        engParts.push(s);
                    }
                }
                let chn_tran = chnParts.join(' ').trim();
                let eng_tran = engParts.join(' ').trim();
                chn_tran = chn_tran ? '<span class="chn_tran">' + chn_tran + '</span>' : '';
                eng_tran = eng_tran ? '<span class="eng_tran">' + eng_tran + '</span>' : '';
                definition += '' + pos + '<span class="tran">' + eng_tran + chn_tran + '</span>';

                let exampleNodes = defNode.querySelectorAll('.exampleLists');
                if (exampleNodes && exampleNodes.length > 0 && maxexample > 0) {
                    definition += '<ul class="sents">';
                    for (const [index, example] of exampleNodes.entries()) {
                        if (index > maxexample - 1) break;
                        let chn_sent = T(example.querySelector('p+p'));
                        let engEl = example.querySelector('p');
                        let eng_sent = engEl ? T(engEl).replace(new RegExp(expression, 'gi'), '<b>$&</b>') : '';
                        definition += '<li class=\'sent\'><span class=\'eng_sent\'>' + eng_sent + '</span><span class=\'chn_sent\'>' + chn_sent + '</span></li>';
                    }
                    definition += '</ul>';
                }
                definitions.push(definition);
            }

            let css = '\
                <style>\
                    span.star {color: #FFBB00;}\
                    span.cet  {margin: 0 3px;padding: 0 3px;font-weight: normal;font-size: 0.8em;color: white;background-color: #5cb85c;border-radius: 3px;}\
                    span.pos  {text-transform:lowercase; font-size:0.9em; margin-right:5px; padding:2px 4px; color:white; background-color:#0d47a1; border-radius:3px;}\
                    span.tran {margin:0; padding:0;}\
                    span.eng_tran {margin-right:3px; padding:0;}\
                    span.chn_tran {color:#0d47a1;}\
                    ul.sents {font-size:0.8em; list-style:square inside; margin:3px 0;padding:5px;background:rgba(13,71,161,0.1); border-radius:5px;}\
                    li.sent  {margin:0; padding:0;}\
                    span.eng_sent {margin-right:5px;}\
                    span.chn_sent {color:#0d47a1;}\
                </style>';

            notes.push({
                css: css,
                expression: expression,
                reading: reading,
                extrainfo: extrainfo,
                definitions: definitions,
                audios: audios
            });

            return notes;
        }

        function getYoudao(doc) {
            let notes = [];

            let defNodes = doc.querySelectorAll('#phrsListTab .trans-container ul li');
            if (!defNodes || !defNodes.length) return notes;

            let expression = T(doc.querySelector('#phrsListTab .wordbook-js .keyword'));
            let reading = '';
            let readings = doc.querySelectorAll('#phrsListTab .wordbook-js .pronounce');
            if (readings) {
                let reading_uk = T(readings[0]);
                let reading_us = T(readings[1]);
                reading = (reading_uk || reading_us) ? '' + reading_uk + ' ' + reading_us : '';
            }

            let audios = [];
            audios[0] = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(expression) + '&type=1';
            audios[1] = 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(expression) + '&type=2';

            let definition = '<ul class="ec">';
            for (const defNode of defNodes) {
                let pos = '';
                let def = T(defNode);
                let match = /(^.+?\.)\s/gi.exec(def);
                if (match && match.length > 1) {
                    pos = match[1];
                    def = def.replace(pos, '');
                }
                pos = pos ? '<span class="pos simple">' + pos + '</span>' : '';
                definition += '<li class="ec">' + pos + '<span class="ec_chn">' + def + '</span></li>';
            }
            definition += '</ul>';
            let css = '\
                <style>\
                    span.pos  {text-transform:lowercase; font-size:0.9em; margin-right:5px; padding:2px 4px; color:white; background-color:#0d47a1; border-radius:3px;}\
                    span.simple {background-color: #999!important}\
                    ul.ec, li.ec {margin:0; padding:0;}\
                </style>';
            notes.push({
                css: css,
                expression: expression,
                reading: reading,
                definitions: [definition],
                audios: audios
            });
            return notes;
        }

        function getYDTrans(doc) {
            let notes = [];

            let transNode = doc.querySelectorAll('#ydTrans .trans-container p')[1];
            if (!transNode) return notes;

            let definition = '' + T(transNode) + '';
            let css = '\
                <style>\
                    .odh-expression {\
                        font-size: 1em!important;\
                        font-weight: normal!important;\
                    }\
                </style>';
            notes.push({
                css: css,
                definitions: [definition],
            });
            return notes;
        }
    }
}
