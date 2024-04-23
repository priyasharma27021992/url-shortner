'use client';

import StyledTableCell from '@/src/components/Table/StyledTableCell';
import StyledTableRow from '@/src/components/Table/StyledTableRow';
import defaultDarkTheme from '@/src/components/ThemeRegistry/theme';
import { Close, ContentCopy, Delete } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
  Box,
  TextField,
} from '@mui/material';
import { Url } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const modalContentStyle = {
  maxWidth: {
    sm: 500,
  },
  margin: '1.75rem auto',
  background: defaultDarkTheme.palette.grey[200],
  position: 'relative',
  display: 'flex',
  WebkitBoxOrient: 'vertical',
  WebkitBoxDirection: 'normal',
  msFlexDirection: 'column',
  flexDirection: 'column',
  width: '100%',
  backgroundClip: 'padding-box',
  border: '1px solid rgba(0,0,0,.2)',
  borderRadius: '0.3rem',
  outline: 0,
  gap: '8px',
  padding: '8px',
};

const take = 10;

const Dashboard = () => {
  const { status, data: session } = useSession();
  const [urlList, setUrlList] = useState([] as Url[]);
  const [isLoading, setLoading] = useState(false);
  const [totalUrlCount, setTotalUrlCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [deletingUrl, setDeletingUrl] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addUrlInputError, setAddUrlInputError] = useState('');
  //   const [curre]

  function addUrl() {}

  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <p>Total Urls: </p>
          <Button variant="contained" onClick={() => {}}>
            Add Url
          </Button>
        </div>
        <TableContainer className="relative rounded-md">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Original URL</StyledTableCell>
                <StyledTableCell>Short URL</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody className={isLoading ? 'opacity-30' : ''}>
              {urlList?.length > 0 &&
                urlList
                  .slice(0, Math.min(take, urlList.length))
                  .map((obj, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <div className="flex w-full items-center gap-2">
                          <IconButton
                            size="small"
                            color="secondary"
                            title="Copy to Clipboard"
                            onClick={() => onUrlClick(obj?.originalUrl)}
                          >
                            <ContentCopy></ContentCopy>
                          </IconButton>
                          <p>{obj?.originalUrl}</p>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <div className="flex w-full items-center gap-2">
                          <IconButton
                            size="small"
                            color="secondary"
                            title="Copy to Clipboard"
                            onClick={() => onUrlClick(obj?.shortUrl)}
                          ></IconButton>
                          <p>{obj?.shortUrl}</p>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell>
                        <p>
                          {new Date(obj?.createdAt?.toString()).toDateString()}
                        </p>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          variant="contained"
                          size="small"
                          title="Delete URL"
                          color="error"
                          onClick={() => deleteUrl(obj?.id, index)}
                        >
                          {deletingUrl === index ? (
                            <CircularProgress
                              size={28}
                              thickness={6}
                              sx={{ color: 'white' }}
                            ></CircularProgress>
                          ) : (
                            <Delete sx={{ fontSize: 28 }} />
                          )}
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ThemeProvider theme={defaultDarkTheme}>
        <Modal
          open={isModalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalContentStyle}>
            <div className="flex flex-row items-center justify-end border-b-2 border-b-gray-300">
              <IconButton onClick={handleClose} color="default">
                <Close sx={{ color: 'black' }} />
              </IconButton>
            </div>
            <form className="flex flex-col gap-4" onSubmit={addUrl}>
              <div className="w-100 mt-4 flex items-center justify-center">
                <TextField
                  required
                  autoFocus
                  label="Url"
                  name="url"
                  type="url"
                  placeholder="Url"
                  inputProps={{ style: { color: 'black' } }}
                  error={addUrlInputError ?? null}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>
              <div className="mx-auto flex w-4/12 items-center justify-center">
                <Button>
                  {addingUrl ? (
                    <CircularProgress size={30}></CircularProgress>
                  ) : (
                    'Add'
                  )}
                </Button>
              </div>
            </form>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
