import { createQuery, createMutation } from "@tanstack/svelte-query";
import type { PlayerType } from "./types";
import { delay } from "./utils";
import axios from "axios";
import { env } from "../config";

export function queryLeaderBoard() {
    const fecth = async () => {
        await delay(1000)
        const res = await axios.get<PlayerType[]>(`${env.BACK_END_URL}/game`);
        return res.data
    };
    const query = createQuery({
        queryKey: ['leaderboard'],
        queryFn: () => fecth(),
    });
    return { ...query }
}
export function mutatePlayer() {
    return createMutation({
        mutationFn: async (data: { player: string, score: number, avatar: string, id: string }) => {
            console.log(data);

            return await axios.post(`${env.BACK_END_URL}/game`, {
                ...data
            })
        }
    })
}