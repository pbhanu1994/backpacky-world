import { useTheme } from "@mui/material/styles";
import { TableRow, TableCell, Skeleton } from "@mui/material";

export default function HotelsBookingsTableRowSkeleton() {
  const theme = useTheme();

  return (
    <TableRow hover sx={{ cursor: "pointer" }}>
      <TableCell align="left">
        <Skeleton variant="text" width={200} />
      </TableCell>

      <TableCell align="left">
        <Skeleton variant="text" width={100} />
      </TableCell>

      <TableCell align="left">
        <Skeleton variant="text" width={100} />
      </TableCell>

      <TableCell align="left">
        <Skeleton variant="text" width={80} />
      </TableCell>

      <TableCell align="left">
        <Skeleton variant="text" width={80} />
      </TableCell>

      <TableCell align="left">
        <Skeleton variant="rectangular" width={100} height={theme.spacing(3)} />
      </TableCell>

      <TableCell align="right">
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
    </TableRow>
  );
}
