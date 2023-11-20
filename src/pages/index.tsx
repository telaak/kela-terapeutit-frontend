import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
} from "material-react-table";
import Head from "next/head";
import { useMemo } from "react";
import EmailIcon from "@mui/icons-material/Email";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { MRT_Localization_FI } from "@/fi-i18";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import dayjs from "dayjs";

type Therapy = {
  muoto: string;
  lajit: string[];
};

type Terapeutti = {
  name: string;
  locations: string[];
  phoneNumbers: string[];
  email: string | null;
  homepage: string | null;
  languages: string[];
  orientations: string[];
  therapies: Therapy[];
  lastActive: Date;
  isActive: boolean;
};

export const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}`;

export const getTherapists = async (): Promise<any[]> => {
  const res = await axios.get(`${apiUrl}/therapist`);
  return res.data;
};

export async function getStaticProps() {
  const therapists = await getTherapists();

  return {
    props: {
      therapists,
    },
  };
}

const isSelected = (table: MRT_TableInstance<Terapeutti>) => {
  if (table.getIsAllRowsSelected()) {
    return true;
  } else if (table.getIsSomeRowsSelected()) {
    return true;
  }
  return false;
};

function getUniqueOrientationsAndLocations(therapists: Terapeutti[]) {
  const orientationSet: Set<string> = new Set();
  const locationSet: Set<string> = new Set();
  const nameSet: Set<string> = new Set();
  therapists.forEach((therapist) => {
    nameSet.add(therapist.name);
    therapist.orientations.forEach((orientation) =>
      orientationSet.add(orientation)
    );
    therapist.locations.forEach((location) => locationSet.add(location));
  });
  return [
    Array.from(orientationSet).sort(),
    Array.from(locationSet).sort(),
    Array.from(nameSet),
  ];
}

export default function Table({ therapists }: { therapists: Terapeutti[] }) {
  const [orientations, locations, names] = useMemo(() => {
    return getUniqueOrientationsAndLocations(therapists);
  }, [therapists]);

  const columns = useMemo<MRT_ColumnDef<Terapeutti>[]>(
    () => [
      {
        accessorKey: "name",
        size: 30,
        header: "Nimi",
        filterVariant: "autocomplete",
        filterSelectOptions: names,
        filterFn: "contains",
      },
      {
        id: "orientations",
        accessorFn: (row) => row.orientations.join(", "),
        header: "Suuntaus",
        size: 30,
        filterVariant: "autocomplete",
        filterSelectOptions: orientations,
        filterFn: "contains",
      },
      {
        id: "locations",
        accessorFn: (row) => row.locations.join(", "),
        header: "Paikat",
        size: 30,
        filterVariant: "autocomplete",
        filterSelectOptions: locations,
        filterFn: "contains",
      },
      {
        id: "email",
        accessorFn: (row) => (row.email ? true : false),
        Cell: ({ row }) => {
          return <>{row.original.email}</>;
        },
        header: "Email",
        size: 30,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
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
        size: 30,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
      },
      {
        accessorKey: "isActive",
        size: 30,
        filterVariant: "checkbox",
        enableColumnFilterModes: false,
        header: "Akt.",
        Cell: ({ row }) => {
          const isActive = row.original.isActive;
          return isActive ? (
            <Tooltip title={dayjs(row.original.lastActive).format("DD.MM.YY")}>
              <CheckCircleIcon color="primary" />
            </Tooltip>
          ) : (
            <CancelIcon color="warning" />
          );
        },
      },
      {
        id: "therapies",
        accessorFn: (row) => JSON.stringify(row.therapies),
        Cell: ({ row }) => (
          <List dense>
            {row.original.therapies.map((therapy: Therapy) => {
              return (
                <>
                  <ListItem disableGutters disablePadding>
                    <ListItemText primary={therapy.muoto} />
                  </ListItem>
                  {therapy.lajit.map((laji) => {
                    return (
                      <ListItem key={laji}>
                        <ListItemText primary={laji} />
                      </ListItem>
                    );
                  })}
                </>
              );
            })}
          </List>
        ),
        header: "Muodot",
        size: 120,
      },
      {
        accessorKey: "lastActive",
        size: 30,
        header: "Viimeksi nähty",
        Cell: ({ cell }) => {
          const dateString = cell.getValue();
          return dateString ? (
            <>{dayjs(cell.getValue() as string).format("DD.MM.YY")}</>
          ) : (
            <></>
          );
        },
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
    enablePagination: true,
    enableBottomToolbar: true,
    enableColumnDragging: false,
    enableFullScreenToggle: false,
    localization: MRT_Localization_FI,
    muiTableBodyCellProps: {
      sx: {
        wordBreak: "break-word",
      },
    },
    muiTableContainerProps: {
      className: "table-container",
    },
    initialState: {
      showGlobalFilter: true,
      showColumnFilters: true,
      isFullScreen: true,
      columnVisibility: {
        therapies: false,
        lastActive: false,
        homepage: false,
        isActive: false,
      },
      pagination: {
        pageIndex: 0,
        pageSize: 50,
      },
    },
    renderTopToolbarCustomActions: ({ table }) => {
      const sendEmail = () => {
        const emails = table
          .getSelectedRowModel()
          .flatRows.map((row) => row.original.email);
        let mail = document.createElement("a");
        mail.href = `mailto:?bcc=${emails.join(",")}`;
        mail.target = "_blank";
        mail.click();
      };
      const copyEmails = () => {
        const emails = table
          .getSelectedRowModel()
          .flatRows.map((row) => row.original.email);
        navigator.clipboard.writeText(emails.join(","));
      };
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Tooltip title={"Lähetä sähköposti"}>
            <span
              style={{
                marginRight: "0.5em",
              }}
            >
              <Button
                disabled={!isSelected(table)}
                color="primary"
                onClick={sendEmail}
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  width: "80px",
                }}
              >
                ({table.getSelectedRowModel().flatRows.length})
              </Button>
            </span>
          </Tooltip>
          <Tooltip title={"Kopioi osoitteet"}>
            <span>
              <Button
                disabled={!isSelected(table)}
                color="primary"
                onClick={copyEmails}
                variant="contained"
                startIcon={<ContentCopyIcon />}
                sx={{
                  width: "80px",
                }}
              >
                ({table.getSelectedRowModel().flatRows.length})
              </Button>
            </span>
          </Tooltip>
        </Box>
      );
    },
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
