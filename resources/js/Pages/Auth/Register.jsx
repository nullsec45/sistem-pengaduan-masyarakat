import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

// Import komponen UI (Pastikan path sesuai struktur project Anda)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
    // 1. Setup State Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        // Jika Anda perlu username & phone_number sesuai schema sebelumnya, tambahkan disini:
        // username: '',
        // phone_number: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    // 2. Handle Submit
    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Register</CardTitle>
                        <CardDescription>
                            Buat akun baru untuk mulai melaporkan aspirasi Anda.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                
                                {/* Nama Lengkap */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input 
                                        id="name" 
                                        placeholder="John Doe" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required 
                                        autoFocus
                                        autoComplete="name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoComplete="username"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        type="password" 
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        required 
                                        autoComplete="new-password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Konfirmasi Password (Wajib untuk Laravel Default) */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                    <Input 
                                        id="password_confirmation" 
                                        type="password" 
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required 
                                        autoComplete="new-password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Tombol Submit */}
                                <Button type="submit" className="w-full" disabled={processing}>
                                    {processing ? 'Memproses...' : 'Buat Akun'}
                                </Button>
                            </div>

                            <div className="mt-4 text-center text-sm">
                                Sudah punya akun?{' '}
                                <Link href={route('login')} className="underline">
                                    Login
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}