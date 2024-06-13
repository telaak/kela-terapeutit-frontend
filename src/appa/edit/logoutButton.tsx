"use client";
import { Box, Button, Fab, IconButton, Paper, Tooltip } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <Tooltip title="Kirjaudu ulos">
      <Fab size="medium" color="inherit" onClick={() => signOut()}>
        <PowerSettingsNewIcon sx={{ color: "black" }} />
      </Fab>
    </Tooltip>
  );
}
