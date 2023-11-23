import { Therapy } from "@/types";
import {
  Badge,
  Chip, Tooltip
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

export function ArtTherapyBadge({
  nuortenKuvataide, aikuistenKuvataide,
}: {
  nuortenKuvataide: Therapy | undefined;
  aikuistenKuvataide: Therapy | undefined;
}) {
  return (
    <Badge>
      <Tooltip placement="top" title="Aikuisten yksilöterapia">
        <Badge
          badgeContent={aikuistenKuvataide?.lajit.find(
            (laji) => laji === "yksilöterapia"
          ) && <PersonIcon />} />
      </Tooltip>
      <Tooltip placement="bottom" title="Nuorten yksilöterapia">
        <Badge
          badgeContent={nuortenKuvataide?.lajit.find(
            (laji) => laji === "yksilöterapia"
          ) && <PersonIcon />}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }} />
      </Tooltip>
      <Chip label="Taide" variant="outlined" />
      <Tooltip placement="top" title="Aikuisten ryhmäterapia">
        <Badge
          badgeContent={aikuistenKuvataide?.lajit.find(
            (laji) => laji === "ryhmäterapia"
          ) && <GroupsIcon />}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }} />
      </Tooltip>
      <Tooltip placement="bottom" title="Nuorten ryhmäterapia">
        <Badge
          badgeContent={nuortenKuvataide?.lajit.find((laji) => laji === "ryhmäterapia") && (
            <GroupsIcon />
          )}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }} />
      </Tooltip>
    </Badge>
  );
}
