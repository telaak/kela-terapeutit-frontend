"use client";
import {
  Stack,
  Paper,
  Container,
  TextField,
  Button,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type Inputs = {
  email: string;
};

export default function LoginForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
