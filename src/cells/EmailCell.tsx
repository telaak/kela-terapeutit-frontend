import { TherapistWithTherapies } from "@/prisma";
import { MRT_Row } from "material-react-table";

/**
 * Simpel cell for email "mailto:" link
 * @param param0
 * @returns
 */

export function EmailCell({ row }: { row: MRT_Row<TherapistWithTherapies> }) {
  return (
    <>
      <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
    </>
  );
}
