import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ReportSchema from "@/Validation/ReportValidate";
import { Link } from "@inertiajs/react";

export default function CreateReport({auth}){
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(ReportSchema),
        defaultValues: {
            nama: '',
            email: '',
            nomorHp: '',
            nomorIdentitas: '',
            tempatLahir: '',
            alamat: '',
            judulLaporan: '',
            deskripsiLaporan: '',
            buktiLaporan: undefined,
        },
    });

    function onSubmit(values) {
        startTransition(async () => {
            const formData = new FormData();
            Object.keys(values).forEach(key => {
                if (key === 'tanggalLahir' && values[key]) {
                    formData.append(key, values[key].toISOString());
                } else if (key === 'buktiLaporan' && values[key]) {
                    formData.append(key, values[key]);
                } else if (values[key]) {
                    formData.append(key, values[key]);
                }
            });
            
        });
    }

    return(
        <AuthenticatedLayout 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
        <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Formulir Pengaduan</CardTitle>
          <CardDescription>Sampaikan keluhan, masukan, dan pengaduan Anda melalui formulir di bawah ini.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomorHp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor HP</FormLabel>
                      <FormControl>
                        <Input placeholder="081234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipeIdentitas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe Identitas</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tipe identitas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="KTP">KTP</SelectItem>
                          <SelectItem value="SIM">SIM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nomorIdentitas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Identitas</FormLabel>
                      <FormControl>
                        <Input placeholder="3201234567890001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tempatLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir</FormLabel>
                      <FormControl>
                        <Input placeholder="Jakarta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggalLahir"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Jl. Merdeka No. 10, Jakarta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="judulLaporan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul Laporan</FormLabel>
                      <FormControl>
                        <Input placeholder="Jalan Rusak di Depan Rumah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deskripsiLaporan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi Laporan</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tuliskan detail laporan Anda di sini..." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                    control={form.control}
                    name="buktiLaporan"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                         <FormItem>
                            <FormLabel>Bukti Laporan</FormLabel>
                            <FormControl>
                                <Input 
                                    {...fieldProps} 
                                    type="file" 
                                    onChange={(event) => {
                                        onChange(event.target.files && event.target.files[0]);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem> 
                    )}
                />
              </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button 
                    type="button" 
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600 text-white"
                    asChild
                >
                    <Link href="/dashboard/reports">Batal</Link>
                </Button>

                <Button 
                    type="submit" 
                    disabled={isPending} 
                    className="bg-green-500 hover:bg-green-600 text-white"
                >
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Buat Laporan
                </Button>
            </div>

            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthenticatedLayout>
    )
}