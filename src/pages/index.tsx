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
import { useEffect, useMemo, useState } from "react";
import { MRT_Localization_FI } from "@/fi-i18";
import { getTherapists } from "@/functions/api";
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
import { HomePageLink } from "@/components/HomePageLink";
import { Therapist } from "@prisma/client";
import { TherapistWithTherapies } from "@/prisma";

/**
 * Static building for the main table
 * Fetches {@link getTherapists} all therapists {@link Terapeutti} from the API
 * @returns therapists array inside the props object
 */

export async function getStaticProps() {
  const therapists = await getTherapists();

  return {
    props: {
      therapists,
    },
  };
}

/**
 * Main table
 * @param therapists destructured therapists {@link Terapeutti} array
 * @returns
 */

export default function Table({ therapists }: { therapists: TherapistWithTherapies[] }) {
  /**
   * Memoized unique orientations, locations and names for autocomplete
   * Faceted values includes too many duplicates
   */
  const [orientations, locations, names] = useMemo(() => {
    return getUniqueOrientationsAndLocations(therapists);
  }, [therapists]);

  /**
   * Columns for the table
   * Most columns have the filter pre-set and changing it disabled
   */

  const columns = useMemo<MRT_ColumnDef<TherapistWithTherapies>[]>(
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
        // Array values joined
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
        // Changes locations from all caps to capitalized first letter only
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
        // Maps the therapy types for searchability
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
        // True/false to allow for easy filtering with a checkbox
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
            border: "1px solid rgba(210, 210, 210, 1)",
          },
        },
      },
      {
        // Currently hidden
        id: "homepage",
        // True/false to allow for easy filtering with a checkbox
        accessorFn: (row) => (row.homepage ? true : false),
        Cell: ({ row }) => {
          return <HomePageLink url={row.original.homepage} />;
        },
        header: "Kotisivu",
        size: 30,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
      },
      {
        id: "phoneNumbers",
        // True/false to allow for easy filtering with a checkbox
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
      // Currently hidden
      {
        accessorKey: "lastActive",
        size: 30,
        header: "Viimeksi nähty",
        Cell: ({ row }) => <LastActiveCell row={row} />,
      },
    ],
    []
  );

  /**
   * Manual pagination to leverage the state for useEffect hook
   */

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  /**
   * On changing the page index, scroll to the top
   */

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [pagination.pageIndex]);

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    enableRowSelection: true,
    localization: MRT_Localization_FI,
    // Borders for cell for improved readability
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(210, 210, 210, 1)",
      },
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
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
    state: { pagination },
    onPaginationChange: setPagination,
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
        {/* Second empty Toolbar to offset fixed placement */}
        <Toolbar />
        <MRT_TablePagination table={table} />
      </Stack>
      <MRT_TableContainer table={table} />
      <MRT_TablePagination table={table} />
    </>
  );
}
