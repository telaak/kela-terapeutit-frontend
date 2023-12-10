import { TherapistWithTherapies } from "@/prisma";
import { Therapist } from "@prisma/client";
import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${process.env.BACKEND_URL}`,
});

/**
 * Gets all therapists {@link Terapeutti} from provided URL
 * @returns
 */

export async function getTherapists(): Promise<TherapistWithTherapies[]> {
  const res = await axiosInstance.get(`/therapist`);
  return res.data;
}
