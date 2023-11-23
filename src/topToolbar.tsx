import { MRT_TableInstance } from "material-react-table";
import { Terapeutti } from "./types";
import { Box, Tooltip, Button } from "@mui/material";
import { copyEmails, isSelected, sendEmails } from "./helperFunctions";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { table } from "console";

export function CopyEmailsButton({
  table,
}: {
  table: MRT_TableInstance<Terapeutti>;
}) {
  return (
    <Tooltip title={"Kopioi osoitteet"}>
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
    </Tooltip>
  );
}

export function SendEmailsButton({
  table,
}: {
  table: MRT_TableInstance<Terapeutti>;
}) {
  return (
    <Tooltip title={"Lähetä sähköposti"}>
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
    </Tooltip>
  );
}

export function TopToolbar({
  table,
}: {
  table: MRT_TableInstance<Terapeutti>;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "flex-end",
      }}
    >
      <SendEmailsButton table={table} />
      <CopyEmailsButton table={table} />
    </Box>
  );
}
