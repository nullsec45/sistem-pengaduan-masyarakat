import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError'; // Komponen bawaan Breeze untuk error
import { Head, Link, useForm } from '@inertiajs/react';

// Pastikan import ini sesuai dengan lokasi komponen UI Anda (misal: Shadcn UI)
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Login({ status, canResetPassword }) {
    // 1. Setup State & Form Helper dari Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    // 2. Handle 
    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Menampilkan status flash message jika ada (misal: "Password berhasil direset") */}
            {status && (
                <div className="mb-4 font-medium text-sm text-green-600 text-center">
                    {status}
                </div>
            )}

            <div className="flex items-center justify-center py-12">
                <Card className="mx-auto max-w-sm w-full">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Login</CardTitle>
                        <CardDescription>
                            Masukkan email Anda di bawah ini untuk login ke akun Anda
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid gap-4">
                                
                                {/* Input Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="m@example.com"
                                        value={data.email}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    {/* Menampilkan Error Email */}
                                    <InputError message={errors.email} className="mt-0" />
                                </div>

                                {/* Input Password */}
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                        
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="ml-auto inline-block text-sm underline"
                                            >
                                                Lupa password?
                                            </Link>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    {/* Menampilkan Error Password */}
                                    <InputError message={errors.password} className="mt-0" />
                                </div>

                                {/* Tombol Login */}
                                <Button type="submit" className="w-full" disabled={processing}>
                                    {processing ? 'Logging in...' : 'Login'}
                                </Button>
                            </div>

                            {/* Link Register */}
                            <div className="mt-4 text-center text-sm">
                                Belum punya akun?{' '}
                                <Link href={route('register')} className="underline">
                                    Register
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}