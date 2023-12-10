import { MRT_TableInstance } from "material-react-table";
import { Tooltip, Button } from "@mui/material";
import { copyEmails, isSelected } from "../functions/helperFunctions";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Therapist } from "@prisma/client";
import { TherapistWithTherapies } from "@/prisma";

/**
 * Copy emails button
 * Checks whether any rows are selected to enable/disable the button
 * See {@link copyEmails} and {@link isSelected}
 * @param param0 the table instance from props
 */

export function CopyEmailsButton({
  table,
}: {
  table: MRT_TableInstance<TherapistWithTherapies>;
}) {
  return (
    <Tooltip title={"Kopioi osoitteet"}>
      <span>
        <Button
          disabled={!isSelected(table)}
          color="warning"
          onClick={() => copyEmails(table)}
          variant="contained"
          startIcon={<ContentCopyIcon />}
          sx={{
            width: "80px",
          }}
        >
          ({table.getSelectedRowModel().flatRows.length})
        </Button>
      </span>
    </Tooltip>
  );
}
