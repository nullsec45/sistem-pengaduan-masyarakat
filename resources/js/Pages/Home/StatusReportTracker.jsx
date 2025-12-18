import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import HomeLayout from "@/Layouts/HomeLayout";
import StatusTracker from "@/Components/StatusTracker";

export default  function StatusReportTracker({ report }) {
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
   <HomeLayout title="Detail Status Laporan" description={`Memantau perkembangan laporan dengan ID ${report.ticket_id}`}>
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
   </HomeLayout>
  );
}
