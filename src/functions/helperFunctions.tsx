import { MRT_TableInstance } from "material-react-table";
import { Terapeutti } from "../types";

/**
 * Checks whether at least one row is selected
 * Used to disable/enable the copy/send email(s) buttons
 * @param table
 * @returns
 */

export const isSelected = (table: MRT_TableInstance<Terapeutti>) => {
  if (table.getIsAllRowsSelected()) {
    return true;
  } else if (table.getIsSomeRowsSelected()) {
    return true;
  }
  return false;
};

/**
 * Forms arrays of unique values by leveraging sets
 * Orientations and locations have duplicates
 * Used for filtering through autocomplete columns
 * @param therapists
 * @returns
 */

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

/**
 * Maps all the selected rows and their corresponding emails
 * Creates a mailto link with all the emails joined and presses it
 * @param table
 */

export const sendEmails = (table: MRT_TableInstance<Terapeutti>) => {
  const emails = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.email);
  let mail = document.createElement("a");
  mail.href = `mailto:?bcc=${emails.join(",")}`;
  mail.target = "_blank";
  mail.click();
};

/**
 * Maps all the selected rows and their corresponding emails
 * Copies them all to the clipboard for easier use
 * Copying to the clipboard requires a secure context, HTTPS or localhost
 * @param table
 */

export const copyEmails = (table: MRT_TableInstance<Terapeutti>) => {
  const emails = table
    .getSelectedRowModel()
    .flatRows.map((row) => row.original.email);
  navigator.clipboard.writeText(emails.join(","));
};
