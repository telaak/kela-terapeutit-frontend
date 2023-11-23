import { Terapeutti } from "@/types";
import dayjs from "dayjs";
import { MRT_Row } from "material-react-table";

export function LastActiveCell({ row }: { row: MRT_Row<Terapeutti> }) {
  const dateString = row.original.lastActive;
  return dateString ? <>{dayjs(dateString).format("DD.MM.YY")}</> : <></>;
}
