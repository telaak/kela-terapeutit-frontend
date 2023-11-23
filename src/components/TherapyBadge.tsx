import {
  Badge,
  Chip, Tooltip
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export function TherapyBadge({ lajit, label }: { lajit: string[]; label: string; }) {
  return (
    <Badge>
      <Tooltip placement="top" title="Yksilöterapia">
        <Badge
          badgeContent={lajit.find((laji) => laji === "yksilöterapia") && <PersonIcon />} />
      </Tooltip>
      <Tooltip title="Pariterapia">
        <Badge
          badgeContent={lajit.find((laji) => laji === "paripsykoterapia") && (
            <Diversity1Icon />
          )}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }} />
      </Tooltip>

      <Chip icon={<></>} variant="outlined" label={label} />
      <Tooltip placement="top" title="Ryhmäterapia">
        <Badge
          badgeContent={lajit.find((laji) => laji === "ryhmäterapia") && <GroupsIcon />}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        ></Badge>
      </Tooltip>
      <Tooltip title="Perheterapia">
        <Badge
          badgeContent={lajit.find((laji) => laji === "perheterapia") && (
            <FamilyRestroomIcon />
          )}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }} />
      </Tooltip>
    </Badge>
  );
}
