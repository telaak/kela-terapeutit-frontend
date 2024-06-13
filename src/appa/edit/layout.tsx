import { AppBar, Stack, Toolbar, Typography } from "@mui/material";

export const metadata = {
  title: "Terapeuttihaku",
};

import "./global.css";
import LogoutButton from "./logoutButton";
import { getTherapist } from "./getTherapist";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const therapist = await getTherapist();

  return (
    <html lang="en">
      <body>
        <Stack
          sx={{
            height: "100dvh",
          }}
        >
          <AppBar color="primary">
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
                spacing={1}
              >
                <Typography variant="h4">
                  {therapist ? therapist.name : "Terapeuttihaku"}
                </Typography>
                {therapist && <LogoutButton />}
              </Stack>
            </Toolbar>
          </AppBar>
          <Toolbar />
          {children}
        </Stack>
      </body>
    </html>
  );
}
