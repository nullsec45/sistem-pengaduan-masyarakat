import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import ListReport from "@/Components/ListReports";
import { Button } from "@/components/ui/button";
import {Link} from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StatusTracker from "@/Components/StatusTracker";


export default function Show({auth, report}){
  console.log(report.media);

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

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline">Detail Laporan</h1>
                    <p className="text-muted-foreground">{`Memantau perkembangan laporan dengan ID ${report.ticket_id}`}</p>
                </div>
             
            </div>
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                        <CardTitle className="font-headline text-xl">{report.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">ID: {report.ticket_id} • Tanggal: {new Date(report.created_at).toLocaleDateString('id-ID')}</p>
                        </div>
                        <Badge variant={getStatusVariant(report.tracker.status)}>{report.tracker.status}</Badge>
                    </div>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm">{report.description}</p>

                        {report.media && report.media.length > 0 && (
                  <div className="mb-8">
                    <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Bukti Lampiran:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {report.media.map((item, index) => (
                        <div key={index} className="relative aspect-video overflow-hidden rounded-md border bg-muted">
                          <img 
                            /* Sesuaikan 'item.url' dengan struktur data Anda (misal: item.path, atau item itu sendiri jika array string) */
                            src={item.original_url} 
                            alt={`Bukti ${index + 1}`} 
                            className="object-constaint w-full h-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                            /* Opsional: Tambahkan onClick untuk membuka modal/lightbox jika perlu */
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                    <h4 className="font-semibold text-sm mb-3 text-muted-foreground">Progress Laporan Pengaduan :</h4>

                        <StatusTracker currentStatus={report.tracker.status} />
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