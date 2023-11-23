import { MRT_TableInstance } from "material-react-table";
import { Terapeutti } from "./types";

export const isSelected = (table: MRT_TableInstance<Terapeutti>) => {
  if (table.getIsAllRowsSelected()) {
    return true;
  } else if (table.getIsSomeRowsSelected()) {
    return true;
  }
  return false;
};

export function getUniqueOrientationsAndLocations(therapists: Terapeutti[]) {
  const orientationSet: Set<string> = new Set();
  const locationSet: Set<string> = new Set();
  const nameSet: Set<string> = new Set();
  therapists.forEach((therapist) => {
    nameSet.add(therapist.name);
    therapist.orientations.forEach((orientation) =>
      orientationSet.add(orientation)
    );
    therapist.locations.forEach((location) =>
      locationSet.add(location.charAt(0) + location.slice(1).toLowerCase())
    );
  });
  return [
    Array.from(orientationSet).sort(),
    Array.from(locationSet).sort(),
    Array.from(nameSet),
  ];
}

export const sendEmails = (table: MRT_TableInstance<Terapeutti>) => {
  const emails = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.email);
  let mail = document.createElement("a");
  mail.href = `mailto:?bcc=${emails.join(",")}`;
  mail.target = "_blank";
  mail.click();
};
export const copyEmails = (table: MRT_TableInstance<Terapeutti>) => {
  const emails = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.email);
  navigator.clipboard.writeText(emails.join(","));
};
