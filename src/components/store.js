import { reactive } from 'vue';

export const store = reactive({
    // By default words will only randomize to lower letter aplhabetical chars
    randomizerString: 'abcdefghijklmnopqrstuvwxyz',
    size: 12,
});
