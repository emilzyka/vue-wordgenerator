<script setup>
import Home from './components/home/Home.vue';
import Header from './components/Header.vue';
import ThemeToggler from './components/ThemeToggler.vue';
import Settings from './components/home/Settings.vue';
</script>

<template>
    <Header />
    <ThemeToggler />
    <Settings />
    <Home msg="Vite + Vue" />
</template>

<style scoped></style>
