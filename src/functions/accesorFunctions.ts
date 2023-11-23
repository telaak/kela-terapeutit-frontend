import { Terapeutti } from "@/types";

export function LocationsAccessorFn(row: Terapeutti) {
  return row.locations
    .map((location) => location.charAt(0) + location.slice(1).toLowerCase())
    .join(", ");
}

export function TherapiesAccessorFn(row: Terapeutti) {
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
