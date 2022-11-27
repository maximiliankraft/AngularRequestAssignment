import { HumanName } from "./HumanName";

// todo implement all your server-side properties of patient

export interface Patient {
  id: string;
  text?: string;
  name: HumanName[];
}
