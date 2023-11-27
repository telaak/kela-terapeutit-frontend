import { Terapeutti } from "@/types";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { MRT_Row } from "material-react-table";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

/**
 * Simple cell that creates a check or cross icon if therapist is active
 * The circle icon also has a tooltip for the date the therapist was last active
 * @param param0 destructured row
 * @returns
 */

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
