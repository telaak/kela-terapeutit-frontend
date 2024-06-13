import { MRT_TableInstance } from "material-react-table";
import { Box } from "@mui/material";
import { SendEmailsButton } from "./SendEmailsButton";
import { CopyEmailsButton } from "./CopyEmailsButton";
import { Therapist } from "@prisma/client";
import { TherapistWithTherapies } from "@/prisma";

/**
 * Unused
 * @param param0 
 * @returns 
 */

export function TopToolbar({
  table,
}: {
  table: MRT_TableInstance<TherapistWithTherapies>;
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
