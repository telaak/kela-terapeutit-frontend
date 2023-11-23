import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";
import { MRT_Row } from "material-react-table";

export function PhoneNumbersCell({ row }: { row: MRT_Row<Terapeutti> }) {
  return (
    <Stack>
      {row.original.phoneNumbers.map((phoneNumber) => {
        return (
          <a key={phoneNumber} href={`tel:${phoneNumber}`}>
            {phoneNumber}
          </a>
        );
      })}
    </Stack>
  );
}
