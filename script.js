'use strict';

const containerTextEl = document.querySelector('[data-js-container-text]');
const containerBinaryEl = document.querySelector('[data-js-container-binary]');

const textareaTextEl = document.querySelector('[data-js-textarea-text]');
const textareaBinaryEl = document.querySelector('[data-js-textarea-binary]');

const reverseBtnEl = document.querySelector('[data-js-reverse-btn]');
const conversionBtnEl = document.querySelector('[data-js-conversion-btn]');

let beforeBinaryContainer = false;

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

        textareaBinaryEl.placeholder = "Результат в двоичном коде";
        textareaTextEl.placeholder = "Введите текст...";
    } else {
        containerBinaryEl.after(containerTextEl);

        textareaBinaryEl.placeholder = "Введите двоичный код...";
        textareaTextEl.placeholder = "Текстовый результат";
    }

    beforeBinaryContainer = !beforeBinaryContainer;
}

function textareaConverse() {
    if (!beforeBinaryContainer) {
        toBinaryCode();
    } else {
        fromBinaryCode();
    }
}

reverseBtnEl.addEventListener('click', textareaReverse);
conversionBtnEl.addEventListener('click', textareaConverse);