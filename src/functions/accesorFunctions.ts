/**
 * Changes the all caps location texts to just capitalized first letter
 * Joins them together with commas for better readability
 * @param row
 * @returns
 */

import { TherapistWithTherapies } from "@/prisma";
import { Therapist } from "@prisma/client";
import { Prisma } from "@prisma/client";

export function LocationsAccessorFn(row: TherapistWithTherapies) {
  return row.locations
    .map((location) => location.charAt(0) + location.slice(1).toLowerCase())
    .join(", ");
}

/**
 * Maps the therapy types {@link Therapy} to an array of values
 * Currently only works for "Aikuisten" and "Nuorten"
 * TODO: add "kuvataide" and "musiikki"
 * @param row
 * @returns mapped string for column filtering purposes
 */

export function TherapiesAccessorFn(row: TherapistWithTherapies) {
  const aikuisten = row.therapies.find(
    (therapy) => therapy.muoto === "Aikuisten psykoterapia"
  );
  const nuorten = row.therapies.find(
    (therapy) => therapy.muoto === "Nuorten psykoterapia"
  );
  const stringArray: string[] = [];
  aikuisten?.lajit.forEach((laji) => stringArray.push(`Aikuisten ${laji}`));
  nuorten?.lajit.forEach((laji) => stringArray.push(`Nuorten ${laji}`));
  return stringArray.join(" ");
}
