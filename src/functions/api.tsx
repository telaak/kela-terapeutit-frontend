import axios from "axios";
import { Terapeutti } from "../types";


export const apiUrl = `${process.env.BACKEND_URL}`;

/**
 * Gets all therapists {@link Terapeutti} from provided URL
 * @returns 
 */

export async function getTherapists(): Promise<any[]> {
  const res = await axios.get(`${apiUrl}/therapist`);
  return res.data;
}
