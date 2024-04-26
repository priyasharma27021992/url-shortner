import { CircularProgress, CircularProgressProps } from '@mui/material';

const Loader = (props: CircularProgressProps) => (
  <div className="flex h-full w-full flex-1 items-center justify-center">
    <CircularProgress {...props} />
  </div>
);

export default Loader;
