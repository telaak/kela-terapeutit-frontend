import { MRT_TableInstance } from "material-react-table";
import { Terapeutti } from "./types";
import { Box, Tooltip, Button } from "@mui/material";
import { isSelected } from "./helperFunctions";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export function TopToolbar(table: MRT_TableInstance<Terapeutti>) {
  const sendEmail = () => {
    const emails = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original.email);
    let mail = document.createElement("a");
    mail.href = `mailto:?bcc=${emails.join(",")}`;
    mail.target = "_blank";
    mail.click();
  };
  const copyEmails = () => {
    const emails = table
      .getSelectedRowModel()
      .flatRows.map((row) => row.original.email);
    navigator.clipboard.writeText(emails.join(","));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Tooltip title={"Lähetä sähköposti"}>
        <span
          style={{
            marginRight: "0.5em",
          }}
        >
          <Button
            disabled={!isSelected(table)}
            color="primary"
            onClick={sendEmail}
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
      <Tooltip title={"Kopioi osoitteet"}>
        <span>
          <Button
            disabled={!isSelected(table)}
            color="primary"
            onClick={copyEmails}
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
    </Box>
  );
}
