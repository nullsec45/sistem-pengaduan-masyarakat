import { Card, CardContent,CardHeader } from "@/components/ui/card";
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
import { useState, useTransition } from "react";
import VerificationValidate from "@/Validation/VerificationValidate";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Trash, FileText } from "lucide-react";


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

const statuses = [
    { value: "Pending", label: "Pending" },
    { value: "Proses Administratif", label: "Proses Administratif" },
    { value: "Proses Penanganan", label: "Proses Penanganan" },
    { value: "Selesai Ditangani", label: "Selesai Ditangani" },
    { value: "Laporan Ditolak", label: "Laporan Ditolak" },
];

export default function ListReport({ reports, action, user }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [selectedReport, setSelectedReport] = useState(null);
    const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

      const form = useForm({
        resolver: zodResolver(VerificationValidate),
        defaultValues: {
            status: '',
            operatorNotes: '',
        },
    });
    
    const handleVerifyClick = (report) => {
        setSelectedReport(report);
        form.reset({
            status: report.status || '',
            operatorNotes: report.catatan || '',
        });
        setIsSheetOpen(true);
    };

     const verificationSide = (values) => {
        startTransition(async () => {
            const result = await updateComplaintStatus({
                complaintId: selectedComplaint.id,
                ...values,
            });

            if (result.success) {
                toast({
                    title: 'Status Laporan Diperbarui',
                    description: `Status untuk laporan ${selectedComplaint.id} telah diubah.`,
                });
                // Optimistically update UI
                setComplaints(complaints.map(c => c.id === selectedComplaint.id ? {...c, status: values.status, kategori: values.category, catatan: values.operatorNotes} : c));
                setIsSheetOpen(false);
                setAiSummary(result.summary);
                setIsSummaryDialogOpen(true);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Gagal Memperbarui',
                    description: result.message || 'Terjadi kesalahan.',
                });
            }
        });
    }

    return (
        <>
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
                                {action && (
                                    <TableHead>Action</TableHead>
                                )}
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
                                            <Link 
                                                href={`/report-tracker/${report.id}`} 
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                {report.title}
                                            </Link>
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
                                        {action && user.role == 'ADMIN' && (
                                            <TableCell className="text-left">
                                                <Button variant="outline" size="sm" onClick={() => handleVerifyClick(report)}>
                                                Verifikasi
                                                </Button>
                                            </TableCell>
                                        )}

                                        {action && user.role == 'USER' && (
                                            <TableCell>
                                                  <div className="flex items-center gap-2">
                                                    <Button variant="outline" size="sm" asChild className="h-8">
                                                            <Link href={`/reports/${report.id}/edit`}>
                                                                <Pencil className="w-3.5 h-3.5 mr-2" />
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <Button variant="destructive" size="sm" asChild className="h-8">
                                                            <Link 
                                                                href={`/reports/${report.id}`} 
                                                                method="delete" 
                                                                as="button"
                                                                preserveScroll
                                                                onBefore={() => confirm('Apakah Anda yakin ingin menghapus aduan anda?')}
                                                            >
                                                                <Trash className="w-3.5 h-3.5 mr-2" />
                                                                Delete
                                                            </Link>
                                                        </Button>
                                                  </div>
                                            </TableCell>
                                        )}
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

            {selectedReport && (
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="sm:max-w-lg">
                    <SheetHeader>
                    <SheetTitle className="font-headline">Verifikasi Laporan: {selectedReport.id}</SheetTitle>
                    <SheetDescription>
                        Perbarui status, kategori, dan tambahkan catatan untuk laporan ini.
                    </SheetDescription>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                        <Card className="bg-muted/50">
                            <CardHeader>
                                <h3 className="font-semibold">Detail Laporan</h3>
                            </CardHeader>
                            <CardContent className="text-sm space-y-2">
                                <p><strong>Pelapor:</strong> {selectedReport.name}</p>
                                <p><strong>Judul:</strong> {selectedReport.title}</p>
                                <p><strong>Deskripsi:</strong> {selectedReport.description}</p>
                            </CardContent>
                        </Card>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(verificationSide)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih status" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statuses.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="operatorNotes"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Catatan Operator</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tambahkan catatan..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={isPending} className="w-full">
                                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Simpan Perubahan
                                </Button>
                            </form>
                        </Form>
                    </div>
                </SheetContent>
                </Sheet>
            )}
        </>

    );
}