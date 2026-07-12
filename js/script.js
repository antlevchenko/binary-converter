'use strict';

import { checkLanguage, translatePage, translatePlaceholders } from "./language.js";
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

const errorMessage = document.querySelector('[data-js-error-msg]');

let isReverseMode = false;

let currentLanguage = localStorage.getItem('language') || 'ru';

let binaryRegex = /^[01\s]+$/;

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
    isReverseMode,
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
    if (textareaTextEl.value === '') return;

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

    if (binaryCode === '') return;

    if (!binaryRegex.test(textareaBinaryEl.value)) return;

    const byteStrings = binaryCode.trim().split(/\s+/);
    const bytes = byteStrings.map(b => parseInt(b, 2));

    const decoder = new TextDecoder();
    const text = decoder.decode(new Uint8Array(bytes));

    textareaTextEl.value = text;
}

function textareaReverse() {
    if (isReverseMode) {
        containerBinaryEl.before(containerTextEl);

        textareaTextEl.value = '';
        textareaBinaryEl.value = '';

        errorMessage.classList.add('hidden');
    } else {
        containerBinaryEl.after(containerTextEl);

        textareaTextEl.value = '';
        textareaBinaryEl.value = '';

    }

    isReverseMode = !isReverseMode;

    translatePlaceholders(
        currentLanguage, 
        isReverseMode, 
        textareaTextEl, 
        textareaBinaryEl
    )
}

function textareaValidate() {
    if (isReverseMode) {
        const binaryValue = textareaBinaryEl.value.trim();

        if (binaryValue === '') {
            errorMessage.classList.add('hidden');
            textareaBinaryEl.classList.remove('focus:border-red-600', 'border-red-500');

            return;
        } 

        if (!binaryRegex.test(textareaBinaryEl.value)) {
            errorMessage.classList.remove('hidden');
            textareaBinaryEl.classList.add(
                'border-red-500', 
                'focus:outline-none', 
                'focus:border-red-600', 
                'transition-colors',
            );
        } else {
            errorMessage.classList.add('hidden');
            textareaBinaryEl.classList.remove('focus:border-red-600', 'border-red-500');
            textareaBinaryEl.classList.add(
                'focus:outline-none',
                'focus:border-[#FF8C00]',
                'transition-colors'
            );
        }
    } else {
        errorMessage.classList.add('hidden');
        textareaBinaryEl.classList.remove('focus:border-red-600', 'border-red-500');
        textareaBinaryEl.classList.add(
            'focus:outline-none',
            'focus:border-[#FF8C00]',
            'transition-colors'
        );
    }
}


function textareaConverse() {
    if (!isReverseMode) {
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
        isReverseMode, 
        textareaTextEl, 
        textareaBinaryEl
    );

    localStorage.setItem('language', currentLanguage);
}

textareaValidate();
reverseBtnEl.addEventListener('click', () => {
    textareaReverse(), textareaValidate();
});
conversionBtnEl.addEventListener('click', () => {
    textareaConverse(), textareaValidate();
});
themeButtonEl.addEventListener('click', () => {
    toggleDarkMode(body);
});
ruBtnEl.addEventListener('click', (event) => {
    changeLanguage(event);
});
enBtnEl.addEventListener('click', (event) => {
    changeLanguage(event);
});