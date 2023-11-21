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

function TherapyBadge({ lajit, label }: { lajit: string[]; label: string }) {
  return (
    <Badge>
      <Tooltip placement="top" title="Yksilöterapia">
        <Badge
          badgeContent={
            lajit.find((laji) => laji === "yksilöterapia") && <PersonIcon />
          }
        />
      </Tooltip>
      <Tooltip title="Pariterapia">
        <Badge
          badgeContent={
            lajit.find((laji) => laji === "paripsykoterapia") && (
              <Diversity1Icon />
            )
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
      </Tooltip>

      <Chip icon={<></>} variant="outlined" label={label} />
      <Tooltip placement="top" title="Ryhmäterapia">
        <Badge
          badgeContent={
            lajit.find((laji) => laji === "ryhmäterapia") && <GroupsIcon />
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
            lajit.find((laji) => laji === "perheterapia") && (
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
  );
}

function ArtTherapyBadge({
  nuortenKuvataide,
  aikuistenKuvataide,
}: {
  nuortenKuvataide: Therapy | undefined;
  aikuistenKuvataide: Therapy | undefined;
}) {
  return (
    <Badge>
      <Tooltip placement="top" title="Aikuisten yksilöterapia">
        <Badge
          badgeContent={
            aikuistenKuvataide?.lajit.find(
              (laji) => laji === "yksilöterapia"
            ) && <PersonIcon />
          }
        />
      </Tooltip>
      <Tooltip placement="bottom" title="Nuorten yksilöterapia">
        <Badge
          badgeContent={
            nuortenKuvataide?.lajit.find(
              (laji) => laji === "yksilöterapia"
            ) && <PersonIcon />
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
      </Tooltip>
      <Chip label="Taide" variant="outlined" />
      <Tooltip placement="top" title="Aikuisten ryhmäterapia">
        <Badge
          badgeContent={
            aikuistenKuvataide?.lajit.find(
              (laji) => laji === "ryhmäterapia"
            ) && <GroupsIcon />
          }
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        />
      </Tooltip>
      <Tooltip placement="bottom" title="Nuorten ryhmäterapia">
        <Badge
          badgeContent={
            nuortenKuvataide?.lajit.find((laji) => laji === "ryhmäterapia") && (
              <GroupsIcon />
            )
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        />
      </Tooltip>
    </Badge>
  );
}

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
