import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import MaterialReactTable, {
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
  id: number;
  name: string;
  locations: Location[];
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

export default function Table({ therapists }: { therapists: Terapeutti[] }) {
  const columns = useMemo<MRT_ColumnDef<Terapeutti>[]>(
    () => [
      {
        accessorKey: "name",
        size: 30,
        header: "Nimi",
      },
      {
        id: "orientations",
        accessorFn: (row) => row.orientations.join(", "),
        header: "Suuntaus",
        size: 30,
      },
      {
        id: "locations",
        accessorFn: (row) => row.locations.join(", "),
        header: "Paikat",
        size: 30,
      },
      {
        id: "email",
        accessorFn: (row) => (row.email ? row.email : ""),
        header: "Spost",
        size: 30,
      },
      {
        id: "homepage",
        accessorFn: (row) => (row.homepage ? row.homepage : ""),
        header: "Kotisivu",
        size: 30,
      },
      {
        id: "phoneNumbers",
        accessorFn: (row) => row.phoneNumbers.join(", "),
        header: "Puh.",
        size: 30,
      },
      {
        accessorKey: "isActive",
        size: 30,
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

  return (
    <>
      <Head>
        <title>KELA Terapeuttihakemisto</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MaterialReactTable
        muiTableContainerProps={{ className: "table-container" }}
        muiSearchTextFieldProps={{
          sx: {
            width: "10em",
          },
        }}
        columns={columns}
        data={therapists}
        enableRowSelection
        enableGrouping
        enableColumnFilterModes
        enableStickyHeader
        positionToolbarAlertBanner="none"
        enablePagination={true}
        enableBottomToolbar={true}
        enableFullScreenToggle={false}
        localization={MRT_Localization_FI}
        initialState={{
          showGlobalFilter: true,
          showColumnFilters: true,
          columnVisibility: {
            therapies: false,
            lastActive: false,
            homepage: false,
          },
          pagination: {
            pageIndex: 0,
            pageSize: 50,
          },
        }}
        renderTopToolbarCustomActions={({ table }) => {
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
        }}
      />
    </>
  );
}
