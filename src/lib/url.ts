import { prisma } from './prisma';

export const getUrlById = async (id: string) => {
  const url = await prisma.url.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
  return url;
};

// export const
