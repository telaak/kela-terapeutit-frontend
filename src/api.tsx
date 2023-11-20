import axios from "axios";

export const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export async function getTherapists(): Promise<any[]> {
  const res = await axios.get(`${apiUrl}/therapist`);
  return res.data;
}
