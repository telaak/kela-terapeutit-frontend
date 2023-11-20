import { Terapeutti, Therapy } from "@/types";
import { List, ListItem, ListItemText } from "@mui/material";
import { MRT_Row } from "material-react-table";

export function TherapiesCell({ row }: { row: MRT_Row<Terapeutti> }) {
  return (
    <List dense>
      {row.original.therapies.map((therapy: Therapy) => {
        return (
          <>
            <ListItem disableGutters disablePadding>
              <ListItemText primary={therapy.muoto} />
            </ListItem>
            {therapy.lajit.map((laji) => {
              return (
                <ListItem key={laji}>
                  <ListItemText primary={laji} />
                </ListItem>
              );
            })}
          </>
        );
      })}
    </List>
  );
}
