import type { FuseIndex } from "@/pages/fuse.json";
import { atom } from "nanostores";

export const fuseIndexList = atom<FuseIndex[]>([]);
export const showSearch = atom<boolean>(false);
