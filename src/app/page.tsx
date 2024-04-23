'use client';

import { ArrowForward } from '@mui/icons-material';
import { Button } from '@mui/material';

const Home = () => {
  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col gap-5 text-center">
        <p className="text-primary-gradient text-6xl font-semibold">
          Short Url
        </p>
        <p className="text-lg font-bold uppercase">Generate Tiny Urls</p>
        <Button
          variant="contained"
          size="medium"
          className="!mt-3"
          endIcon={<ArrowForward />}
          href="/dashboard"
        >
          Dive in
        </Button>
      </div>
    </main>
  );
};

export default Home;
