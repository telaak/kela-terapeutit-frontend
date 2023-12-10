import axios from "axios";
import { Terapeutti } from "../types";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.BACKEND_URL}`,
});

/**
 * Gets all therapists {@link Terapeutti} from provided URL
 * @returns
 */

export async function getTherapists(): Promise<any[]> {
  const res = await axiosInstance.get(`/therapist`);
  return res.data;
}
