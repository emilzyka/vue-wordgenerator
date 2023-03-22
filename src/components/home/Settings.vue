<script setup>
import { store } from '../store';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const wordSize = ref(store.size);

const handleMutation = (str) => {
    if (!store.randomizerString.includes(str)) {
        store.randomizerString += str;
    } else {
        store.randomizerString = store.randomizerString
            .split('')
            .reduce((acc, char) => {
                const remove = str;
                if (!remove.includes(char)) {
                    acc.push(char);
                }
                return acc;
            }, [])
            .toString()
            .replaceAll(',', '');
    }
};

const handleSize = (str) => {
    switch (str) {
        case 'increment':
            if (store.size < 100) store.size = store.size + 1;
            break;
        case 'decrement':
            if (store.size > 0) store.size = store.size - 1;
            break;
        case 'reset':
            store.size = 12;
            break;
    }
};

const events = [
    {
        id: 0,
        name: 'symbols',
        string: '!@#$%^&*()',
    },
    {
        id: 1,
        name: 'numbers',
        string: '0123456789',
    },
    {
        id: 2,
        name: 'uppercase',
        string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
];
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="grid grid-cols-9 bg-sub w-2/4 rounded-md p-1.5">
            <div class="col-span-4 flex items-center justify-start ml-5 gap-4">
                <div class="flex items-center gap-1" v-for="event in events" :key="event.id">
                    <Icon v-if="store.randomizerString.includes(event.string)" icon="material-symbols:remove" class="text-text w-4 h-4" />
                    <Icon v-else icon="material-symbols:add" class="text-text w-4 h-4" />
                    <button @click="handleMutation(event.string)" class="text-text text-md hover:text-main">{{ event.name }}</button>
                </div>
                <div class="bg-main h-6 w-1 rounded-full"></div>
            </div>
            <div class="col-span-2 justify-start flex items-center gap-5">
                <button
                    class="text-text text-lg hover:text-main"
                    @click="
                        handleSize('reset');
                        wordSize = 12;
                    ">
                    reset
                </button>
                <Icon
                    @click="
                        wordSize--;
                        handleSize('decrement');
                    "
                    icon="material-symbols:arrow-downward"
                    class="text-text w-4 h-4 hover:text-main hover:cursor-pointer" />
                <h1 type="number" class="text-text text-md">{{ wordSize }}</h1>
                <Icon
                    @click="
                        wordSize++;
                        handleSize('increment');
                    "
                    icon="mdi:arrow-up"
                    class="text-text w-4 h-4 hover:text-main hover:cursor-pointer" />
            </div>
        </div>
    </div>
</template>
