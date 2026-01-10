import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react'; 
import { AlertCircleIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import InputError from "@/Components/InputError"; 
import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert";

export default function CreateReport({ auth, categories }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone_number: auth.user.phone_number || '',
        identity_type: '',
        identity_number: '',
        pob: '', 
        dob: '', 
        address: '',
        title: '',
        description: '',
        category_id: '',
        evidence: null,
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route('dashboard.reports.store'), {
            forceFormData: true, 
            onSuccess: () => reset(),
        });
    }

    return (
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
                    {errors.error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircleIcon className="h-4 w-4" />
                            <AlertTitle>Gagal Menyimpan</AlertTitle>
                            <AlertDescription>
                                {errors.error}
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={onSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input 
                                    id="name"
                                    placeholder="John Doe"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone_number">Nomor HP</Label>
                                <Input 
                                    id="phone_number"
                                    placeholder="081234567890"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="space-y-2">
                                <Label>Tipe Identitas</Label>
                                <Select 
                                    onValueChange={(val) => setData('identity_type', val)}
                                    defaultValue={data.identity_type}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih tipe identitas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="KTP">KTP</SelectItem>
                                        <SelectItem value="SIM">SIM</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.identity_type} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="identity_number">Nomor Identitas</Label>
                                <Input 
                                    id="identity_number"
                                    placeholder="3201xxxxxxxx"
                                    value={data.identity_number}
                                    onChange={(e) => setData('identity_number', e.target.value)}
                                />
                                <InputError message={errors.identity_number} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pob">Tempat Lahir</Label>
                                <Input 
                                    id="pob"
                                    placeholder="Jakarta"
                                    value={data.pob}
                                    onChange={(e) => setData('pob', e.target.value)}
                                />
                                <InputError message={errors.pob} />
                            </div>

                            <div className="space-y-2 flex flex-col">
                                <Label>Tanggal Lahir</Label>
                               <Input 
                                    id="dob"
                                    type="date" // Menggunakan native picker browser
                                    value={data.dob}
                                    max={new Date().toISOString().split("T")[0]} // Tidak boleh pilih masa depan
                                    onChange={(e) => setData('dob', e.target.value)}
                                />
                                <InputError message={errors.dob} />
                            </div>

                            {/* Alamat */}
                            <div className="space-y-2">
                                <Label htmlFor="address">Alamat</Label>
                                <Textarea 
                                    id="address"
                                    placeholder="Jl. Merdeka No. 10..." 
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Judul Laporan</Label>
                                <Input 
                                    id="title"
                                    placeholder="Jalan Rusak..." 
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label>Kategori Laporan</Label>
                                <Select 
                                    onValueChange={(val) => setData('category_id', val)}
                                    defaultValue={String(data.category_id)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                   
                                    <SelectContent>
                                        {categories && categories.map((category) => (
                                            <SelectItem key={category.id} value={String(category.id)}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.identity_type} />
                            </div>
                        </div>

                       

                        <div className="space-y-6">
                            {/* Deskripsi */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi Laporan</Label>
                                <Textarea 
                                    id="description"
                                    placeholder="Detail laporan..." 
                                    rows={5}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>
                            
                            {/* Bukti Laporan */}
                            <div className="space-y-2">
                                <Label htmlFor="evidence">Bukti Laporan</Label>
                                <Input 
                                    id="evidence"
                                    type="file" 
                                    onChange={(e) => setData('evidence', e.target.files[0])}
                                />
                                <InputError message={errors.evidence} />
                            </div>
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
                                disabled={processing} 
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Buat Laporan
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}