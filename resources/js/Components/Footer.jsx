import { Megaphone } from 'lucide-react';

export default function Footer() {
  return (
     <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <div className="bg-primary p-2 rounded-lg">
              <Megaphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-headline font-bold text-primary">Aspirasi</h1>
          </div>
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Aspirasi. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
