import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from '@inertiajs/react';
import { Badge } from "@/components/ui/badge";

const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
        case 'selesai ditangani':
            return "bg-green-500 hover:bg-green-600 text-white"; 
        case 'proses administratif':
        case 'proses penanganan':
            return "bg-yellow-500 hover:bg-yellow-600 text-white"; 
        case 'laporan ditolak':
            return "bg-red-500 hover:bg-red-600 text-white"; 
        case 'pending':
        default:
            return "bg-slate-500 hover:bg-slate-600 text-white"; 
    }
};

export default function ListReport({ reports }) {
    return (
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="mx-auto px-4 max-w-7xl">
                
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Daftar Aspirasi Masyarakat
                        </h1>
                        <p className="text-slate-500 mt-1">
                            Kelola dan pantau aspirasi yang masuk dari masyarakat.
                        </p>
                    </div>
                </div>

                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow>
                                    <TableHead className="min-w-[120px]">ID</TableHead>
                                    <TableHead className="min-w-[200px]">Judul Laporan</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Pelapor</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reports.data && reports.data.length > 0 ? (
                                    reports.data.map((report) => (
                                        <TableRow key={report.ticket_id} className="hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="font-medium text-slate-900">
                                                #{report.ticket_id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {report.title}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {report.category.name}
                                            </TableCell>
                                            <TableCell>{report.reporter.name}</TableCell>
                                            <TableCell className="text-slate-500">
                                                {new Date(report.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`${getStatusColor(report.status)} border-0`}>
                                                    {report.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-64 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <FileText className="w-10 h-10 mb-2 opacity-20" />
                                                <p>Belum ada laporan yang masuk.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <div className="mt-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {reports.links.map((link, index) => {
                            const label = link.label
                                .replace('&laquo; Previous', 'Sebelumnya')
                                .replace('Next &raquo;', 'Selanjutnya');

                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    preserveScroll
                                    className={`
                                        flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors
                                        ${link.active 
                                            ? 'bg-slate-900 text-white' 
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}
                                        ${!link.url && 'opacity-50 pointer-events-none cursor-not-allowed'}
                                    `}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: label }} />
                                </Link>
                            );
                        })}
                    </div>
                    
                    <div className="text-center mt-4 text-xs text-slate-400">
                        Menampilkan {reports.from || 0} sampai {reports.to || 0} dari {reports.total} data
                    </div>
                </div>

            </div>
        </div>
    );
}