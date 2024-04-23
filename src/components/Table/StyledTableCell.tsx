import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material';
import defaultDarkTheme from '../ThemeRegistry/theme';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[700],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    overflowWrap: 'break-word',
  },
  ':first-of-type': {
    maxWidth: '360px',
  },
  ':first-of-type p': {
    overflow: 'hidden',
    display: '--webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
  },
}));
export default StyledTableCell;
