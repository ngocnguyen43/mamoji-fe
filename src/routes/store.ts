import { writable } from 'svelte/store';
import { v4 } from 'uuid';

type InformationInitialState = {
    name: string,
    avatar: string,
    difficult: number,
    score: number,
    id: string
}
const informationInitiaState: InformationInitialState = {
    name: "",
    avatar: "",
    difficult: 0,
    score: 0,
    id: v4(),
}
export const information = writable<InformationInitialState>(structuredClone(informationInitiaState));
export const resetInformation = () => {
    information.set({ ...informationInitiaState, id: v4() })
}
