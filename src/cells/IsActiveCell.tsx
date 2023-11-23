import { Terapeutti } from "@/types";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { MRT_Row } from "material-react-table";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export function IsActiveCell({ row }: { row: MRT_Row<Terapeutti> }) {
  const isActive = row.original.isActive;
  return isActive ? (
    <Tooltip title={dayjs(row.original.lastActive).format("DD.MM.YY")}>
      <CheckCircleIcon color="primary" />
    </Tooltip>
  ) : (
    <CancelIcon color="warning" />
  );
}
