import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_TableContainer,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFiltersButton,
  MRT_TablePagination,
} from "material-react-table";
import Head from "next/head";
import { useMemo } from "react";
import { MRT_Localization_FI } from "@/fi-i18";
import { getTherapists } from "@/api";
import { Terapeutti } from "@/types";
import { getUniqueOrientationsAndLocations } from "@/helperFunctions";
import { TherapiesCell } from "@/cells/therapies";
import { LastActiveCell } from "@/cells/lastActive";
import { IsActiveCell } from "@/cells/isActive";
import { CopyEmailsButton, SendEmailsButton, TopToolbar } from "@/topToolbar";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  Tooltip,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

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
        accessorFn: (row) =>
          row.locations
            .map(
              (location) => location.charAt(0) + location.slice(1).toLowerCase()
            )
            .join(", "),
        header: "Paikat",
        size: 150,
        filterVariant: "select",
        filterSelectOptions: locations,
        filterFn: "contains",
        enableColumnFilterModes: false,
      },
      {
        id: "therapies",
        accessorFn: (row) => {
          const therapies = row.therapies;
          const aikuisten = row.therapies.find(
            (therapy) => therapy.muoto === "Aikuisten psykoterapia"
          );
          const nuorten = row.therapies.find(
            (therapy) => therapy.muoto === "Nuorten psykoterapia"
          );
          const stringArray: string[] = [];
          aikuisten?.lajit.forEach((laji) =>
            stringArray.push(`Aikuisten ${laji}`)
          );
          nuorten?.lajit.forEach((laji) => stringArray.push(`Nuorten ${laji}`));
          return stringArray.join(" ");
        },
        Cell: ({ row }) => <TherapiesCell row={row} />,
        header: "Muodot",
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
        Cell: ({ row }) => {
          return (
            <>
              <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
            </>
          );
        },
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
        Cell: ({ row }) => {
          return (
            <>
              {row.original.phoneNumbers.map((phoneNumber) => {
                return (
                  <a key={phoneNumber} href={`tel:${phoneNumber}`}>
                    {phoneNumber}
                  </a>
                );
              })}
            </>
          );
        },
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

  // const table = useMaterialReactTable({
  //   columns,
  //   data: therapists,
  //   enableRowSelection: true,
  //   enableGrouping: true,
  //   enableColumnFilterModes: true,
  //   enableStickyFooter: false,
  //   positionToolbarAlertBanner: "none",
  //   enablePagination: true,
  //   enableBottomToolbar: false,
  //   enableColumnDragging: false,
  //   enableFullScreenToggle: false,
  //   layoutMode: "grid-no-grow",
  //   localization: MRT_Localization_FI,
  //   paginationDisplayMode: "pages",
  //   positionPagination: "top",
  //   muiPaginationProps: {
  //     color: "primary",
  //     shape: "rounded",
  //     showRowsPerPage: false,
  //     variant: "outlined",
  //     showFirstButton: false,
  //     showLastButton: false,
  //   },
  //   muiTableBodyCellProps: {
  //     sx: {
  //       whiteSpace: "normal",
  //     },
  //   },
  //   muiTableContainerProps: {
  //     className: "table-container",
  //   },
  //   enableRowVirtualization: false,
  //   rowVirtualizerOptions: { overscan: 5 },
  //   positionGlobalFilter: "left",
  //   initialState: {
  //     pagination: { pageIndex: 0, pageSize: 50 },
  //     showGlobalFilter: true,
  //     showColumnFilters: true,
  //     isFullScreen: false,
  //     columnVisibility: {
  //       therapies: true,
  //       lastActive: false,
  //       homepage: false,
  //       isActive: true,
  //       locations: true,
  //     },
  //   },
  //   renderTopToolbarCustomActions: ({ table }) => <TopToolbar table={table} />,
  // });

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    enableRowSelection: true,
    // enableStickyHeader: true,
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
      {/* <MaterialReactTable table={table} /> */}
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
