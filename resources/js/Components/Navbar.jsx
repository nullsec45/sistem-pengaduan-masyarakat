// Ubah import ini
import { Link, usePage } from '@inertiajs/react'; 
import { Megaphone, LayoutDashboardIcon, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { auth } = usePage().props;

  return (
   <header className="bg-card border-b sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <Megaphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-headline font-bold text-primary group-hover:text-primary/90 transition-colors">Aspirasi</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
             <Button asChild>
              <Link href={auth.user ? "/dashboard" : "/login"}>
                {auth.user ? (
                  <>
                    <LayoutDashboardIcon className="mr-2" />
                    Masuk ke Dashboard
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2" />
                    Login
                  </>)}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">
                <UserPlus className="mr-2" />
                Register
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}