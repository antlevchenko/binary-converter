'use strict';

import { translations, checkLanguage, getTranslation, translatePage, translatePlaceholders } from "./language.js";
import { toggleDarkMode } from "./theme.js";

const body = document.body;
const themeButtonEl = document.querySelector('[data-js-theme-btn]');

const translatableElements = document.querySelectorAll('[data-i18n]');
const language = document.querySelectorAll('[data-js-language]');
const ruBtnEl = document.querySelector('[data-js-ru-language]');
const enBtnEl = document.querySelector('[data-js-en-language]');

const containerTextEl = document.querySelector('[data-js-container-text]');
const containerBinaryEl = document.querySelector('[data-js-container-binary]');

const textareaTextEl = document.querySelector('[data-js-textarea-text]');
const textareaBinaryEl = document.querySelector('[data-js-textarea-binary]');

const reverseBtnEl = document.querySelector('[data-js-reverse-btn]');
const conversionBtnEl = document.querySelector('[data-js-conversion-btn]');

let beforeBinaryContainer = false;

let currentLanguage = localStorage.getItem('language') || 'ru';

if (currentLanguage === 'en') {
    enBtnEl.classList.add('border-2');
    ruBtnEl.classList.remove('border-2');
} else {
    ruBtnEl.classList.add('border-2');
    enBtnEl.classList.remove('border-2');
}

translatePage(
    translatableElements,
    currentLanguage
);

translatePlaceholders(
    currentLanguage,
    beforeBinaryContainer,
    textareaTextEl,
    textareaBinaryEl
);

body.classList.remove('dark');

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
} else {
    body.classList.remove('dark');
}

function toBinaryCode() {
    const text = textareaTextEl.value;

    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);

    const binaryCode = Array.from(bytes)
        .map(byte => byte.toString(2).padStart(8, '0'))
        .join(' ');

    textareaBinaryEl.value = binaryCode;
}

function fromBinaryCode() {
    const binaryCode = textareaBinaryEl.value.trim();

    const byteStrings = binaryCode.trim().split(/\s+/);
    const bytes = byteStrings.map(b => parseInt(b, 2));

    const decoder = new TextDecoder();
    const text = decoder.decode(new Uint8Array(bytes));

    textareaTextEl.value = text;
}

function textareaReverse() {
    if (beforeBinaryContainer) {
        containerBinaryEl.before(containerTextEl);
    } else {
        containerBinaryEl.after(containerTextEl);
    }

    beforeBinaryContainer = !beforeBinaryContainer;

    translatePlaceholders(
        currentLanguage, 
        beforeBinaryContainer, 
        textareaTextEl, 
        textareaBinaryEl
    )
}

function textareaConverse() {
    if (!beforeBinaryContainer) {
        toBinaryCode();
    } else {
        fromBinaryCode();
    }
}

function changeLanguage(event) {
    currentLanguage = checkLanguage(
        event,
        enBtnEl,
        ruBtnEl,
        currentLanguage
    );

    translatePage(
        translatableElements, 
        currentLanguage,
    );

    translatePlaceholders(
        currentLanguage, 
        beforeBinaryContainer, 
        textareaTextEl, 
        textareaBinaryEl
    );

    localStorage.setItem('language', currentLanguage);
}

reverseBtnEl.addEventListener('click', textareaReverse);
conversionBtnEl.addEventListener('click', textareaConverse);
themeButtonEl.addEventListener('click', () => {
    toggleDarkMode(body);
});
ruBtnEl.addEventListener('click', (event) => {
    changeLanguage(event);
});
enBtnEl.addEventListener('click', (event) => {
    changeLanguage(event);
});