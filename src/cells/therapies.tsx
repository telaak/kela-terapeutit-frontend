import { Terapeutti, Therapy } from "@/types";
import {
  Avatar,
  Badge,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
} from "@mui/material";
import { MRT_Row } from "material-react-table";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PaletteIcon from "@mui/icons-material/Palette";
import BrushIcon from "@mui/icons-material/Brush";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export function TherapiesCell({ row }: { row: MRT_Row<Terapeutti> }) {
  const nuorten = row.original.therapies.find(
    (therapy) => therapy.muoto === "Nuorten psykoterapia"
  );
  const aikuisten = row.original.therapies.find(
    (therapy) => therapy.muoto === "Aikuisten psykoterapia"
  );

  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{
        marginLeft: "0.5em",
        marginRight: "0.5em"
      }}
    >
      {aikuisten && (
        <Badge>
          <Tooltip placement="top" title="Yksilöterapia">
            <Badge
              badgeContent={
                aikuisten.lajit.find((laji) => laji === "yksilöterapia") && (
                  <PersonIcon />
                )
              }
            />
          </Tooltip>
          <Tooltip title="Pariterapia">
            <Badge
              badgeContent={
                aikuisten.lajit.find((laji) => laji === "paripsykoterapia") && (
                  <Diversity1Icon />
                )
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            />
          </Tooltip>

          <Chip variant="outlined" label="Aikuisten" />
          <Tooltip placement="top" title="Ryhmäterapia">
            <Badge
              badgeContent={
                aikuisten.lajit.find((laji) => laji === "ryhmäterapia") && (
                  <GroupsIcon />
                )
              }
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            ></Badge>
          </Tooltip>
          <Tooltip title="Perheterapia">
            <Badge
              badgeContent={
                aikuisten.lajit.find((laji) => laji === "perheterapia") && (
                  <FamilyRestroomIcon />
                )
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            />
          </Tooltip>
        </Badge>
      )}
      {nuorten && (
        <Badge>
          <Tooltip placement="top" title="Yksilöterapia">
            <Badge
              badgeContent={
                nuorten.lajit.find((laji) => laji === "yksilöterapia") && (
                  <PersonIcon />
                )
              }
            />
          </Tooltip>
          <Tooltip title="Pariterapia">
            <Badge
              badgeContent={
                nuorten.lajit.find((laji) => laji === "paripsykoterapia") && (
                  <Diversity1Icon />
                )
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            />
          </Tooltip>

          <Chip variant="outlined" label="Nuorten" />
          <Tooltip placement="top" title="Ryhmäterapia">
            <Badge
              badgeContent={
                nuorten.lajit.find((laji) => laji === "ryhmäterapia") && (
                  <GroupsIcon />
                )
              }
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            ></Badge>
          </Tooltip>
          <Tooltip title="Perheterapia">
            <Badge
              badgeContent={
                nuorten.lajit.find((laji) => laji === "perheterapia") && (
                  <FamilyRestroomIcon />
                )
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            />
          </Tooltip>
        </Badge>
      )}
    </Stack>
  );

  //   return (
  //     <List dense>
  //       {row.original.therapies.map((therapy: Therapy) => {
  //         return (
  //           <>
  //             <ListItem disableGutters disablePadding>
  //               <ListItemText primary={therapy.muoto} />
  //             </ListItem>
  //             {therapy.lajit.map((laji) => {
  //               return (
  //                 <ListItem key={laji}>
  //                   <ListItemText primary={laji} />
  //                 </ListItem>
  //               );
  //             })}
  //           </>
  //         );
  //       })}
  //     </List>
  //   );
}
