import { HumanName } from "./HumanName";

// todo implement all your server-side properties of patient

export type Gender = 'unknown' | 'male' | 'female' | 'other';

export interface Patient {
  id: string;
  text?: string;
  active?: boolean;
  gender?: Gender;
  name: HumanName[];
}
