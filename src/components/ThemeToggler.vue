<script setup>
import Popup from './theme/Popup.vue';
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

const searchTheme = ref('');
const popupTrigger = ref({
    buttonTrigger: false,
});
const selectedTheme = ref('');

const togglePopup = (trigger) => {
    selectedTheme.value = document.querySelector('html').className;
    popupTrigger.value[trigger] = !popupTrigger.value[trigger];
    if (!popupTrigger.value.buttonTrigger) {
        document.querySelector('html').className = selectedTheme.value;
        searchTheme.value = '';
    }
};

const handleTheme = (theme) => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').className = `theme-${theme}`;

    // reset state
    popupTrigger.value.buttonTrigger = false;
    searchTheme.value = '';
};

const handlePreviewOnEnter = (theme) => {
    // This operation triggers on over mouseenter we could optimize by adding throttling
    setTimeout(() => {
        document.querySelector('html').className = `theme-${theme}`;
    }, 350);
};

const handlePreviewOnLeave = () => {
    console.log(selectedTheme.value);
    document.querySelector('html').className = selectedTheme.value;
};

//Array with all themes can be put in other file if it grows to large.
const themes = [
    {
        id: 0,
        name: 'forest',
        palette: {
            main: 'p-1 rounded-full bg-[#66ac92]',
            sub: 'p-1 rounded-full bg-[#015c53]',
            text: 'p-1 rounded-full bg-[#dceae5]',
            bg: 'p-1 rounded-full bg-[#0b1e1a]',
        },
    },
    {
        id: 1,
        name: 'sea',
        palette: {
            main: 'p-1 rounded-full bg-[#4a6fb5]',
            sub: 'p-1 rounded-full bg-[#50688c]',
            text: 'p-1 rounded-full bg-[#9393a7]',
            bg: 'p-1 rounded-full bg-[#191826]',
        },
    },
    {
        id: 2,
        name: 'stealth',
        palette: {
            main: 'p-1 rounded-full bg-[#eee]',
            sub: 'p-1 rounded-full bg-[#444]',
            text: 'p-1 rounded-full bg-[#d8d8d8]',
            bg: 'p-1 rounded-full bg-[#000]',
        },
    },
    {
        id: 3,
        name: 'light',
        palette: {
            main: 'p-1 rounded-full bg-[#40d672]',
            sub: 'p-1 rounded-full bg-[#d5d5d5]',
            text: 'p-1 rounded-full bg-[#1d221f]',
            bg: 'p-1 rounded-full bg-[#fff]',
        },
    },
];

// a computed ref
const filteredThemes = computed(() => {
    return themes.filter((theme) => theme.name.includes(searchTheme.value.trim().toLowerCase()));
});
</script>

<template>
    <button @click="() => togglePopup('buttonTrigger')" class="btn-primary">Open</button>
    <div>
        <Popup v-if="popupTrigger.buttonTrigger" :togglePopup="() => togglePopup('buttonTrigger')">
            <ul class="flex flex-col w-72 gap-5 m-2">
                <div class="flex flex-row items-center justify-start">
                    <Icon icon="material-symbols:search" color="grey" />
                    <input
                        class="p-2 text-lg bg-bg focus:outline-none focus:border-b-4 focus:rounded-sm focus:border-solid focus:border-sub text-text"
                        type="text"
                        v-model="searchTheme"
                        placeholder="Type to search..." />
                </div>
                <li
                    class="grid grid-cols-2 rounded-md p-1 hover:bg-main hover:cursor-pointer"
                    v-for="theme in filteredThemes"
                    :key="theme.id"
                    @mouseenter="handlePreviewOnEnter(`${theme.name}`)"
                    @click="handleTheme(`${theme.name}`)">
                    <button class="justify-self-start text-text text-xl">
                        {{ theme.name }}
                    </button>
                    <div class="bg-gray-500 flex items-center gap-1 p-2 rounded-2xl justify-self-end">
                        <button :class="theme.palette.bg"></button>
                        <button :class="theme.palette.main"></button>
                        <button :class="theme.palette.sub"></button>
                        <button :class="theme.palette.text"></button>
                    </div>
                </li>
            </ul>
        </Popup>
    </div>
</template>
