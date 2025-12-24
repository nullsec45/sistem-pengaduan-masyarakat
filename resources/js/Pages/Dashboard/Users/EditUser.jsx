import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Link } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/Components/InputError';
import { useEffect } from "react";

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone_number: user?.phone_number || '',
        username: user?.username || '',
        role: user?.role || '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
            return () => {
                reset('password', 'password_confirmation');
            };
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        
        put(route('dashboard.users.update', user.id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Ubah Pengguna</CardTitle>
                    <CardDescription>Ubah Data Pengguna</CardDescription>
                </CardHeader>
                <CardContent>
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
                                <Label htmlFor="phone_number">Nomor Telephone</Label>
                                <Input 
                                    id="phone_number"
                                    placeholder="081234567890"
                                    value={data.phone_number}
                                    onChange={(e) => setData('phone_number', e.target.value)}
                                />
                                <InputError message={errors.phone_number} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input 
                                    id="username"
                                    placeholder="nullsec45"
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                                <InputError message={errors.username} />
                            </div>

                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select 
                                    onValueChange={(value) => setData('role', value)} 
                                    defaultValue={data.role}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                        <SelectItem value="USER">User</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                <Input 
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 text-white"
                                asChild
                            >
                                <Link href="/dashboard/users">Batal</Link>
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing} // Gunakan processing dari Inertia
                                className="bg-green-500 hover:bg-green-600 text-white"
                            >
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Ubah Data Pengguna
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    )
}