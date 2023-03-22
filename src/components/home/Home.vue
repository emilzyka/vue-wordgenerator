<script setup>
import { ref } from 'vue';
import { store } from '../store';

/*
FULL = abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789
uppercase = ABCDEFGHIJKLMNOPQRSTUVWXYZ
symbolsRestrictive = !@#$%^&*()
symbolsFull = !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
numbers = 0123456789
*/

const userMessage = ref('Type to change message');
const message = ref(userMessage);

const reverse = () => {
    message.value = message.value.split('').reverse().join('');
};

const getRandomChar = () => {
    var chars = store.randomizerString;
    return chars.charAt(Math.floor(Math.random() * chars.length));
};

const removeFirst = () => {
    if (message.value.length > 0) message.value = message.value.substring(1, message.value.length);
};

const toUpper = () => {
    if (message.value === message.value.toUpperCase()) {
        message.value = message.value.toLowerCase();
    } else {
        message.value = message.value.toUpperCase();
    }
};

const randomString = (length) => {
    var chars = store.randomizerString;
    let res = '';
    for (let index = 0; index < length; index++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    message.value = res;
};
</script>

<template>
    <div class="flex items-center justify-center mt-16">
        <div class="flex flex-row gap-8">
            <button class="append-btn btn-primary" @click="removeFirst">-</button>
            <h1 class="text-4xl text-text">{{ message }}</h1>
            <button class="append-btn btn-primary" @click="() => (message += getRandomChar())">+</button>
        </div>
    </div>
    <div class="flex justify-center mt-8">
        <button class="btn-primary w-1/4" @click="randomString(store.size)">Random Word</button>
    </div>
    <div class="flex justify-center items-center mt-6">
        <div class="grid w-1/4 grid-cols-2 gap-6">
            <button class="btn-primary" @click="reverse">Reverse text</button>
            <button class="btn-primary" @click="toUpper">To Upper</button>
            <button class="btn-primary" @click="toUpper">To Upper</button>
            <button class="btn-primary" @click="toUpper">To Upper</button>
            <button class="btn-primary" @click="toUpper">To Upper</button>
            <button class="btn-primary" @click="toUpper">To Upper</button>
        </div>
    </div>
</template>
