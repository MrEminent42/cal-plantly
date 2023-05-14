import { atom } from "jotai";
import { User } from "firebase/auth";

export enum AuthState {
    LOADING = "LOADING",
    LOGGED_OUT = "LOGGED_OUT",
}

export const currentUserAtom = atom<User | AuthState>(AuthState.LOADING);
