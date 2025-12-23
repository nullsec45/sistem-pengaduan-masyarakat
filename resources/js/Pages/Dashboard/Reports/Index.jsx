import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ListReport from "@/Components/ListReports";
import { Button } from "@/components/ui/button";
import {Link} from "@inertiajs/react";

export default function Index({auth, reports}){
       return (
         <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline">Daftar Aspirasi Masyarakat</h1>
                    <p className="text-muted-foreground">Selamat datang di dasbor AspirasiKu.</p>
                </div>
                {auth.user.role == 'USER' && (
                    <Button className="mb-5" asChild>
                        <Link href="/dashboard/reports/create">Buat Laporan</Link>
                    </Button>
                )}
                
                <div className="grid gap-4 md:grid-">
                     
                   <ListReport  reports={reports} action={true} user={auth.user}/> 
                </div>
            </div>
        </AuthenticatedLayout>
       )
}