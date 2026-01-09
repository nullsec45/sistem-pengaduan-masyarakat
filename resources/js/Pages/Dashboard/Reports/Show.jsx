import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ListReport from "@/Components/ListReports";
import { Button } from "@/components/ui/button";
import {Link} from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusTracker from "@/Components/StatusTracker";


export default function Show({auth, report}){

    console.log(report);
        const getStatusVariant = (status) => {
            switch (status) {
            case 'Selesai Ditangani':
                return 'default';
            case 'Laporan Ditolak':
                return 'destructive';
            case 'Proses Penanganan':
            case 'Proses Administratif':
                return 'secondary';
            case 'Pending':
            default:
                return 'outline';
            }
        };

       return (
         <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report Details</h2>}
        >
            <Head title={`Report Detail - ${report.id}`} />    

            {/* <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline">Report Details</h1>
                    <p className="text-muted-foreground">Halaman detail laporan dan tracker laporan.</p>
                </div>
             
            </div> */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                        <CardTitle className="font-headline text-xl">{report.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">ID: {report.ticket_id} • Tanggal: {new Date(report.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                        <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
                    </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">{report.description}</p>
                        <StatusTracker currentStatus={report.status} />
                        {report.tracker.note && (
                            <div className="mt-4 border-t pt-4">
                                <h4 className="font-semibold text-sm">Catatan dari Operator:</h4>
                                <p className="text-sm text-muted-foreground italic mt-1">"{report.tracker.note}"</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
       )
}