import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {Link} from "@inertiajs/react";
import ListUsers from "@/Components/ListUsers";

export default function Index({auth, users}){
       return (
         <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard - User</h2>}
        >
            <Head title="Dashboard - User" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline">List Pengguna</h1>
                    <p className="text-muted-foreground">List data pengguna yang terdaftar.</p>
                </div>
                <Button className="mb-5" asChild>
                    <Link href="/users/create">Buat User</Link>
                </Button>
                <div className="grid gap-4 md:grid-">
                     
                   <ListUsers  users={users}/> 
                </div>
            </div>
        </AuthenticatedLayout>
       )
}