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
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

export default function ListUsers({ users }) {
   
    return (
        <>
            <Card className="shadow-sm border-slate-200">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Nomor Telepon</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data && users.data.length > 0 ? (
                                users.data.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <TableCell className="font-medium text-slate-900">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <Link 
                                                href={`/user-tracker/${user.id}`} 
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                            >
                                                {user.email}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {user.username}
                                        </TableCell>
                                        <TableCell>{user.phone_number}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" asChild className="h-8">
                                                    <Link href={`/users/${user.id}/edit`}>
                                                        <Pencil className="w-3.5 h-3.5 mr-2" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button variant="destructive" size="sm" asChild className="h-8">
                                                    <Link 
                                                        href={`/users/${user.id}`} 
                                                        method="delete" 
                                                        as="button"
                                                        preserveScroll
                                                        onBefore={() => confirm('Apakah Anda yakin ingin menghapus user ini?')}
                                                    >
                                                        <Trash className="w-3.5 h-3.5 mr-2" />
                                                        Delete
                                                    </Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                            <FileText className="w-10 h-10 mb-2 opacity-20" />
                                            <p>Belum ada data user.</p>
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
                    {users.links.map((link, index) => {
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
                    Menampilkan {users.from || 0} sampai {users.to || 0} dari {users.total} data
                </div>
            </div>            
        </>

    );
}