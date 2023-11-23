import {
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_TableContainer,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_TablePagination,
} from "material-react-table";
import Head from "next/head";
import { useMemo } from "react";
import { MRT_Localization_FI } from "@/fi-i18";
import { getTherapists } from "@/functions/api";
import { Terapeutti } from "@/types";
import { getUniqueOrientationsAndLocations } from "@/functions/helperFunctions";
import { TherapiesCell } from "@/cells/TherapiesCell";
import { LastActiveCell } from "@/cells/LastActiveCell";
import { IsActiveCell } from "@/cells/IsActiveCell";
import { CopyEmailsButton } from "@/components/CopyEmailsButton";
import { SendEmailsButton } from "@/components/SendEmailsButton";
import { AppBar, Box, Paper, Stack, Toolbar } from "@mui/material";
import { EmailCell } from "@/cells/EmailCell";
import { PhoneNumbersCell } from "@/cells/PhoneNumbersCell";
import {
  LocationsAccessorFn,
  TherapiesAccessorFn,
} from "@/functions/accesorFunctions";

export async function getStaticProps() {
  const therapists = await getTherapists();

  return {
    props: {
      therapists,
    },
  };
}

export default function Table({ therapists }: { therapists: Terapeutti[] }) {
  const [orientations, locations, names] = useMemo(() => {
    return getUniqueOrientationsAndLocations(therapists);
  }, [therapists]);

  const columns = useMemo<MRT_ColumnDef<Terapeutti>[]>(
    () => [
      {
        accessorKey: "name",
        size: 120,
        header: "Nimi",
        filterVariant: "autocomplete",
        filterSelectOptions: names,
        filterFn: "contains",
        enableColumnFilterModes: false,
      },
      {
        id: "orientations",
        accessorFn: (row) => row.orientations.join(", "),
        header: "Suuntaus",
        size: 150,
        filterVariant: "autocomplete",
        filterSelectOptions: orientations,
        filterFn: "contains",
        enableColumnFilterModes: false,
      },
      {
        id: "locations",
        accessorFn: (row) => LocationsAccessorFn(row),
        header: "Paikkakunnat",
        size: 150,
        filterVariant: "autocomplete",
        filterSelectOptions: locations,
        filterFn: "contains",
        enableColumnFilterModes: false,
      },
      {
        id: "therapies",
        accessorFn: (row) => TherapiesAccessorFn(row),
        Cell: ({ row }) => <TherapiesCell row={row} />,
        header: "Terapiamuodot",
        size: 200,
        filterVariant: "autocomplete",
        filterSelectOptions: [
          "Aikuisten yksilöterapia",
          "Aikuisten ryhmäterapia",
          "Aikuisten perheterapia",
          "Aikuisten paripsykoterapia",
          "Nuorten yksilöterapia",
          "Nuorten ryhmäterapia",
          "Nuorten perheterapia",
          "Nuorten paripsykoterapia",
        ],
        filterFn: "contains",
        enableColumnFilterModes: false,
      },
      {
        id: "email",
        accessorFn: (row) => (row.email ? true : false),
        Cell: ({ row }) => <EmailCell row={row} />,
        header: "Email",
        size: 120,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
        enableSorting: false,
        muiTableBodyCellProps: {
          sx: {
            wordBreak: "break-all",
          },
        },
      },
      {
        id: "homepage",
        accessorFn: (row) => (row.homepage ? true : false),
        Cell: ({ row }) => {
          return <>{row.original.homepage}</>;
        },
        header: "Kotisivu",
        size: 30,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
      },
      {
        id: "phoneNumbers",
        accessorFn: (row) => (row.phoneNumbers.length ? true : false),
        Cell: ({ row }) => <PhoneNumbersCell row={row} />,
        header: "Puh.",
        enableSorting: false,
        size: 120,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "isActive",
        size: 50,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
        header: "Akt.",
        Cell: ({ row }) => <IsActiveCell row={row} />,
      },
      {
        accessorKey: "lastActive",
        size: 30,
        header: "Viimeksi nähty",
        Cell: ({ row }) => <LastActiveCell row={row} />,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    enableRowSelection: true,
    localization: MRT_Localization_FI,
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(224, 224, 224, 1)",
      },
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      pagination: {
        pageSize: 50,
        pageIndex: 0,
      },
      columnVisibility: {
        therapies: true,
        lastActive: false,
        homepage: false,
        isActive: true,
        locations: true,
      },
    },
    muiTableContainerProps: {
      className: "table-container",
    },
  });

  return (
    <>
      <Head>
        <title>KELA Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Stack>
        <AppBar color="primary" position="fixed">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction={"row"} spacing={1}>
              <Paper>
                <CopyEmailsButton table={table} />
              </Paper>
              <Paper>
                <SendEmailsButton table={table} />
              </Paper>
            </Stack>
            <Paper>
              <MRT_GlobalFilterTextField table={table} />
            </Paper>
            <Paper>
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MRT_ToggleFiltersButton table={table} />
                <MRT_ShowHideColumnsButton table={table} />
                <MRT_ToggleDensePaddingButton table={table} />
              </Box>
            </Paper>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <MRT_TablePagination table={table} />
      </Stack>
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </>
  );
}
