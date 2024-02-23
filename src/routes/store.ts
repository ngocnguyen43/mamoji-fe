import { writable } from 'svelte/store';

type InitialState = {
    name: string,
    avatar: string
}
const initiaState: InitialState = {
    name: "",
    avatar: ""
}
export const information = writable<InitialState>(structuredClone(initiaState));
export const reset = () => {
    information.set(structuredClone(initiaState))
} 