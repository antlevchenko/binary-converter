'use strict';

export { translations, checkLanguage, getTranslation, translatePage, translatePlaceholders };

let translations = {
    ru: {
        conversionBtn: "Конвертировать",

        inputs: {
            direct: {
                input: "Введите текст...",
                output: "Результат в двоичном коде"
            },
            reverse: {
                input: "Введите двоичный код...",
                output: "Текстовый результат"
            }
        },

        info: {
            whatIs: {
                title: "Что такое бинарный код?",
                description: "Бинарный (или двоичный) код — это способ представления информации с помощью двух символов: 0 и 1. Именно в таком виде компьютеры хранят и обрабатывают данные, поскольку электронные устройства легко различают два состояния, например наличие или отсутствие электрического сигнала. Любой текст, изображение, звук или программа в конечном итоге могут быть преобразованы в последовательность нулей и единиц, что делает двоичный код основой работы современной цифровой техники."
            },

            howToWrite: {
                title: "Как составляется бинарный код?",
                description: "Каждому символу, числу или другому элементу информации присваивается уникальная последовательность нулей и единиц в соответствии со специальной таблицей кодировки. Например, в кодировке ASCII букве «A» соответствует двоичная последовательность 01000001. Благодаря единым правилам кодирования компьютеры могут корректно сохранять, передавать и восстанавливать данные."
            },

            aboutTheSite: {
                title: "О сайте",
                description: "Binary Converter - это простой и удобный инструмент для преобразования текста в двоичный код и обратно. Сервис помогает разобраться в том, что такое двоичный код и как он работает, а также может использоваться в целях обучения, работы и экспериментов с бинарным кодом."
            } 
        }
    },

    en: {
        conversionBtn: "Convert",

        inputs: {
            direct: {
                input: "Enter text...",
                output: "Result in binary code"
            },
            reverse: {
                input: "Enter binary code...",
                output: "Text result"
            }
        },

        info: {
            whatIs: {
                title: "What is binary code?",
                description: "Binary code is a way of representing information using two symbols: 0 and 1. This is how computers store and process data, as electronic devices easily distinguish between two states, such as the presence or absence of an electrical signal. Any text, image, sound, or program can ultimately be converted into a sequence of 0s and 1s, making binary code the foundation of modern digital technology."
            },

            howToWrite: {
                title: "How is binary code composed?",
                description: "Each symbol, number, or other element of information is assigned a unique sequence of zeros and ones according to a special encoding table. For example, in ASCII, the letter «A» corresponds to the binary sequence 01000001. By following these uniform encoding rules, computers can correctly store, transmit, and restore data."
            },

            aboutTheSite: {
                title: "About the site",
                description: "Binary Converter is a simple and convenient tool for converting text to binary code and vice versa. This service helps you understand binary code and how it works, and can also be used for learning, working with, and experimenting with binary code."
            } 
        }
    }

}

function checkLanguage(event, enBtnEl, ruBtnEl, currentLanguage) {
    if (event.target === enBtnEl) {
        currentLanguage = 'en';
        enBtnEl.classList.add('border-2');
        ruBtnEl.classList.remove('border-2');
    } else if (event.target === ruBtnEl) {
        currentLanguage = 'ru';
        ruBtnEl.classList.add('border-2');
        enBtnEl.classList.remove('border-2');
    }

    return currentLanguage;
}

function getTranslation(obj, path) {
    return path
        .split('.')
        .reduce((acc, key) => acc[key], obj);
}

function translatePage(translatableElements, currentLanguage) {
    translatableElements.forEach(element => {
        const key = element.dataset.i18n

        element.textContent = getTranslation(
            translations[currentLanguage],
            key
        );
    });
}

function translatePlaceholders(currentLanguage, beforeBinaryContainer, textareaTextEl, textareaBinaryEl) {
    if (!beforeBinaryContainer) {
        textareaTextEl.placeholder = translations[currentLanguage].inputs.direct.input;

        textareaBinaryEl.placeholder = translations[currentLanguage].inputs.direct.output;
    } else {
        textareaBinaryEl.placeholder = translations[currentLanguage].inputs.reverse.input;

        textareaTextEl.placeholder = translations[currentLanguage].inputs.reverse.output;
    }
}