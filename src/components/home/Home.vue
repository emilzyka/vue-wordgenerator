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
    <div>
        <button class="btn-primary" @click="randomString(store.size)">Random Word</button>
    </div>
    <div class="word-container">
        <button class="append-btn btn-primary" @click="removeFirst">-</button>
        <h1 class="text-3xl">{{ message }}</h1>
        <button class="append-btn btn-primary" @click="() => (message += getRandomChar())">+</button>
    </div>
    <div class="btn-container">
        <input class="input-field" type="text" v-model="userMessage" :placeholder="[message]" />
        <button class="btn-primary" @click="reverse">Reverse text</button>
        <button class="btn-primary" @click="toUpper">To Upper</button>
    </div>
</template>

<style scoped>
.append-btn {
    margin-top: 15px;
}

.word-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 30px;
}

.input-field {
    padding: 10px;
}

.input-number {
    width: 50px;
    margin-left: 10px;
    border-radius: 5px;
}

.btn-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 5px;
}
</style>
