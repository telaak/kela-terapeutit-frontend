import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
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
import { TopToolbar } from "@/topToolbar";

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
        filterVariant: "autocomplete",
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
          return <>{row.original.email}</>;
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
          return <>{row.original.phoneNumbers.join(" ")}</>;
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

  const table = useMaterialReactTable({
    columns,
    data: therapists,
    enableRowSelection: true,
    enableGrouping: true,
    enableColumnFilterModes: true,
    positionToolbarAlertBanner: "none",
    enablePagination: false,
    enableBottomToolbar: false,
    enableColumnDragging: false,
    enableFullScreenToggle: false,
    layoutMode: "grid-no-grow",
    localization: MRT_Localization_FI,
    paginationDisplayMode: "pages",
    muiTableBodyCellProps: {
      sx: {
        whiteSpace: "normal",
      },
    },
    muiTableContainerProps: {
      className: "table-container",
    },
    enableRowVirtualization: true,
    rowVirtualizerOptions: { overscan: 5 },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      isFullScreen: false,
      columnVisibility: {
        therapies: true,
        lastActive: false,
        homepage: false,
        isActive: true,
        locations: true,
      },
    },
    renderTopToolbarCustomActions: ({ table }) => <TopToolbar table={table} />,
  });

  return (
    <>
      <Head>
        <title>KELA Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MaterialReactTable table={table} />
    </>
  );
}
