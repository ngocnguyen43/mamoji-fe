import { writable } from 'svelte/store';

type InformationInitialState = {
    name: string,
    avatar: string,
    difficult: number,
    score: number,
}
const informationInitiaState: InformationInitialState = {
    name: "",
    avatar: "",
    difficult: 0,
    score: 0
}
export const information = writable<InformationInitialState>(structuredClone(informationInitiaState));
export const resetInformation = () => {
    information.set(structuredClone(informationInitiaState))
}
