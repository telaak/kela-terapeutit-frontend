import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";
import { MRT_Row } from "material-react-table";
import { TherapyBadge } from "../components/TherapyBadge";

/**
 * Therapy types cell for the table
 * Checks for corresponding types and creates a stack of {@link TherapyBadge}
 * TODO: "kuvataide" and "musiikki"
 * @param param0 destructured row instance from props
 * @returns
 */

export function TherapiesCell({ row }: { row: MRT_Row<Terapeutti> }) {
  const nuorten = row.original.therapies.find(
    (therapy) => therapy.muoto === "Nuorten psykoterapia"
  );
  const aikuisten = row.original.therapies.find(
    (therapy) => therapy.muoto === "Aikuisten psykoterapia"
  );
  const aikuistenKuvataide = row.original.therapies.find(
    (therapy) => therapy.muoto === "Aikuisten kuvataidepsykoterapia"
  );
  const nuortenKuvataide = row.original.therapies.find(
    (therapy) => therapy.muoto === "Nuorten kuvataidepsykoterapia"
  );
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        marginLeft: "0.5em",
        marginRight: "0.5em",
      }}
    >
      {aikuisten && <TherapyBadge label="Aikuisten" lajit={aikuisten.lajit} />}
      {nuorten && <TherapyBadge label="Nuorten" lajit={nuorten.lajit} />}
      {/* {(aikuistenKuvataide || nuortenKuvataide) && (
        <ArtTherapyBadge
          aikuistenKuvataide={aikuistenKuvataide}
          nuortenKuvataide={nuortenKuvataide}
        />
      )} */}
    </Stack>
  );
}
