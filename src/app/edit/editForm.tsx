"use client";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Paper,
  Stack,
} from "@mui/material";
import { Therapist } from "@prisma/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ky from "ky";

type Inputs = {
  isActive: boolean;
};

export default function EditForm({ therapist }: { therapist: Therapist }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      isActive: therapist.isActive,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const json = await ky
        .post("https://kela.laaksonen.cc/api/therapist/edit", {
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
