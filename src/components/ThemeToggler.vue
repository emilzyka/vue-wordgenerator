<script setup>
import Popup from './theme/Popup.vue';
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';

const searchTheme = ref('');
const popupTrigger = ref({
    buttonTrigger: false,
});
const selectedTheme = ref('');

//Currently only runs once, see setTimeout.
setTimeout(() => {
    if (popupTrigger.value.buttonTrigger) {
        popupTrigger.value.buttonTrigger = false;
    }
}, 300000);

const togglePopup = (trigger) => {
    popupTrigger.value[trigger] = !popupTrigger.value[trigger];
    if (!popupTrigger.value.buttonTrigger) {
        searchTheme.value = '';
    }
};

const handleTheme = (theme) => {
    switch (theme) {
        case 'forest':
            localStorage.setItem('theme', 'forest');
            document.querySelector('html').className = 'theme-forest';

            // reset state
            popupTrigger.value.buttonTrigger = false;
            searchTheme.value = '';
            break;
        case 'sea':
            localStorage.setItem('theme', 'sea');
            document.querySelector('html').className = 'theme-sea';

            // reset state
            popupTrigger.value.buttonTrigger = false;
            searchTheme.value = '';
            break;
        case 'dark':
            localStorage.setItem('theme', 'dark');
            document.querySelector('html').className = 'theme-dark';

            // reset state
            popupTrigger.value.buttonTrigger = false;
            searchTheme.value = '';
            break;
        case 'light':
            localStorage.setItem('theme', 'light');
            document.querySelector('html').className = 'theme-light';

            // reset state
            popupTrigger.value.buttonTrigger = false;
            searchTheme.value = '';
            break;
    }
};

const handlePreviewOnEnter = (theme) => {
    // This operation triggers on over mouseenter we could optimize by adding throttling
    selectedTheme.value = document.querySelector('html').className;
    switch (theme) {
        case 'forest':
            document.querySelector('html').className = 'theme-forest';
            break;
        case 'sea':
            document.querySelector('html').className = 'theme-sea';
            break;
        case 'dark':
            document.querySelector('html').className = 'theme-dark';
            break;
        case 'light':
            document.querySelector('html').className = 'theme-light';
            break;
    }
};

const handlePreviewOnLeave = () => {
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
        name: 'dark',
        palette: {
            main: 'p-1 rounded-full bg-[#23a9d5]',
            sub: 'p-1 rounded-full bg-[#4b5975]',
            text: 'p-1 rounded-full bg-[#ccccb5]',
            bg: 'p-1 rounded-full bg-[#1b2028]',
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
    <Popup
        v-if="popupTrigger.buttonTrigger"
        :togglePopup="() => togglePopup('buttonTrigger')"
        :handleTheme="() => handleTheme(selectedTheme)">
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
                @mouseleave="handlePreviewOnLeave()"
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
</template>
