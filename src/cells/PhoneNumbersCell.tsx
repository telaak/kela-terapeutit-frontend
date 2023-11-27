import { Terapeutti } from "@/types";
import { Stack } from "@mui/material";
import { MRT_Row } from "material-react-table";

/**
 * Cell of all the therapist's phone numbers for the table
 * Maps the array into a stack of phone numbers with a "tel:" link
 * @param param0
 * @returns
 */

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
