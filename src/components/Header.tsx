import { useSession } from "next-auth/react";

const Header = () => {
  const { status, data: session } = useSession();

  const isAuthenticated = status === "authenticated" && session?.user;

  return (
    <header className="sticky top-0 z-50 flex w-full flex-row items-center gap-4 bg-slate-900 py-2"></header>
  );
};
