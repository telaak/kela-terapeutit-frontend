import { Terapeutti } from "@/types";
import { MRT_Row } from "material-react-table";

export function EmailCell({ row }: { row: MRT_Row<Terapeutti> }) {
  return (
    <>
      <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
    </>
  );
}
