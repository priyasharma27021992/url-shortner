'use client';

import StyledTableCell from '@/src/components/Table/StyledTableCell';
import StyledTableRow from '@/src/components/Table/StyledTableRow';
import defaultDarkTheme from '@/src/components/ThemeRegistry/theme';
import { copyToClipboard } from '@/src/lib/utils';
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
import { useEffect, useState } from 'react';
import Loading from '../loading';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [addingUrl, setAddingUrl] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  function addUrl(e: any) {
    setAddingUrl(true);
    e.preventDefault();

    const formData = {
      url: e.target.url.value,
    };

    fetch('/api/urls', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        const error = res.status !== 200;
        setAddingUrl(false);
        res
          .json()
          .then((data) => {
            if (error && data.details) {
              setAddUrlInputError(data.details.toString());
              return;
            }
            if (error) {
              setAddUrlInputError('Some error occured!');
              return;
            }
            setAddUrlInputError('');
            const url = data as Url;
            if (skip !== 0) {
              setSkip(0);
            } else {
              urlList.splice(1, 0, url);
              setUrlList(urlList);
            }
            setIsModalOpen(false);
            setTotalUrlCount(totalUrlCount + 1);
          })
          .catch((e) => {
            console.log('Some error occurred while adding URL');
          });
      })
      .catch((e) => {
        debugger;
        setAddingUrl(false);
        setAddUrlInputError('Some error occured');
      });
  }

  function deleteUrl(id: string, index: number) {
    setDeletingUrl(index);
    fetch('/api/urls', {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: {
        'Content-Type': 'applications/json',
      },
    })
      .then((res) => {
        setDeletingUrl(-1);
        if (res.status === 200) {
          urlList.splice(index, 1);
          setUrlList(urlList);

          //   if the urllist is empty, then we have to go to the previous page if allowed
          if (urlList.length === 0) {
            const newPage = Math.max(0, currentPage - 1);
            setCurrentPage(newPage);
            setSkip(newPage * take);
          }
          setTotalUrlCount(totalUrlCount - 1);
          return;
        }
        res
          .json()
          .then((data) => {
            if (data && data.details) {
              console.log('error', data.details.toString());
            }
          })
          .catch((e) => {
            console.log('error');
          });
      })
      .catch((e) => {
        setDeletingUrl(-1);
      });
  }

  const onUrlClick = (text: string) => {
    copyToClipboard(text);
  };

  useEffect(() => {
    if (status === 'loading' || status === 'unauthenticated') {
      return;
    }
    setLoading(true);
    fetch(`/api/urls?skip=${skip}&take=${take}`)
      .then((res) => res.json())
      .then((data: { data: IPaginatedUrls }) => {
        setUrlList(data?.data?.results);
        setTotalUrlCount(data?.data?.totalCount);
        setLoading(false);
      });
  }, [status, skip]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    <div>Unauthenticated</div>;
  }

  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <p>Total Urls: </p>
          <Button variant="contained" onClick={handleOpen}>
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
                  error={addUrlInputError !== '' ? true : false}
                  InputLabelProps={{ style: { color: 'black' } }}
                />
              </div>
              <div className="mx-auto flex w-4/12 items-center justify-center">
                <Button variant="contained" type="submit" fullWidth>
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
