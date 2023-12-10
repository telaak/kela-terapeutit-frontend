import { MRT_TableInstance } from "material-react-table";
import { Tooltip, Button } from "@mui/material";
import { isSelected, sendEmails } from "../functions/helperFunctions";
import EmailIcon from "@mui/icons-material/Email";
import { Therapist } from "@prisma/client";
import { TherapistWithTherapies } from "@/prisma";

/**
 * Send emails button
 * Checks whether any rows are selected to enable/disable the button
 * See {@link sendEmails} and {@link isSelected}
 * @param param0 the table instance from props
 * @returns
 */

export function SendEmailsButton({
  table,
}: {
  table: MRT_TableInstance<TherapistWithTherapies>;
}) {
  return (
    <Tooltip title={"Lähetä sähköposti"}>
      <span>
        <Button
          disabled={!isSelected(table)}
          color="warning"
          onClick={() => sendEmails(table)}
          variant="contained"
          startIcon={<EmailIcon />}
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
