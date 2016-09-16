// ==UserScript==
// @name         WhatsAppEmojify
// @namespace    https://github.com/vaibhav-y/WhatsAppText2Emoji/
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version      0.3.4
// @description  Simple script that converts text smileys to emojis
// @author       Vaibhav Yenamandra
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

// SO Reference: http://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser

'use strict()';

// More to come :)
var emoji_map = {
    ':)'  : "😊",
    ":')" : "😁",
    ';)'  : "😉",
    ':D'  : "😃",
    'XD'  : "😆",
    ':P'  : "😛",
    ';P'  : "😜",
    'XP'  : "😝",
    'B)'  : "😎",
    ':('  : "😞",
    ":'(" : "☹",
    ":O"  : "😮",
    "-_-" : "😑",
    ">_<" : "😣",
    "X_X" : "😲",
    ":S"  : "😨",
    ";_;" : "😭",
    "T_T" : "😭",
    "^_^;": "😅",
    "-_-;": "😓"
};

var smileys = Object.keys(emoji_map);

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
function text_emoji_main(jNode) {
    jNode.on("keyup", function() {
        for(var s_idx in smileys) {
            s = smileys[s_idx];
            if(jNode.text().indexOf(s) >= 0) {
                jNode.text(jNode.text().replace(s, emoji_map[s]) + " ");
                placeCaretAtEnd(jNode.get(0));
            }
        }
    });
}

waitForKeyElements("#main > footer > div.block-compose > div.input-container > div > div.input", text_emoji_main);
