import {
  Stack,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Fab,
  Tooltip,
} from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signIn, signOut } from "next-auth/react";
import { TherapistWithTherapies, prisma } from "@/prisma";
import ky from "ky";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import LogoutIcon from "@mui/icons-material/Logout";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {
        therapist: null,
      },
    };
  }

  const therapist = await prisma.therapist.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      therapies: true,
    },
  });

  return {
    props: {
      therapist: JSON.parse(JSON.stringify(therapist)),
    },
  };
}

export function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    try {
      const signInRequest = await signIn("email", {
        email: data.email,
      });
      console.log(signInRequest);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Paper>
        <Stack
          spacing={1}
          sx={{
            width: "300px",
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                type="email"
                fullWidth={true}
                label="Sähköpostiosoite"
                variant="outlined"
                required
                {...field}
              />
            )}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Kirjaudu sisään
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export function EditForm({ therapist }: { therapist: TherapistWithTherapies }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      isActive: therapist.isActive,
    },
  });
  const onSubmit: SubmitHandler<{ isActive: boolean }> = async (data) => {
    try {
      const json = await ky
        .post(`${window.location.origin}/api/therapist/edit`, {
          json: { isActive: data.isActive },
        })
        .json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Paper>
        <Stack
          spacing={1}
          sx={{
            width: "300px",
          }}
        >
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                required
                control={
                  <Checkbox defaultChecked={therapist.isActive} {...field} />
                }
                label="Vastaanotan uusia potilaita"
              />
            )}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Päivitä
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default function EditPage({
  therapist,
}: {
  therapist: TherapistWithTherapies;
}) {
  return (
    <>
      <Head>
        <title>KELA Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
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
              {therapist && (
                <Tooltip title="Kirjaudu ulos">
                  <Fab size="small" color="inherit" onClick={() => signOut()}>
                    <LogoutIcon color="primary" />
                  </Fab>
                </Tooltip>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {therapist ? <EditForm therapist={therapist} /> : <LoginForm />}
      </Stack>
    </>
  );
}
