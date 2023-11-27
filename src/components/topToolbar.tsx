import { MRT_TableInstance } from "material-react-table";
import { Terapeutti } from "../types";
import { Box } from "@mui/material";
import { SendEmailsButton } from "./SendEmailsButton";
import { CopyEmailsButton } from "./CopyEmailsButton";

/**
 * Unused
 * @param param0 
 * @returns 
 */

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
