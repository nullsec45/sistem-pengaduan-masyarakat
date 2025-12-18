import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';


export default function HomeLayout({ children, title, description }) {
    return (
     <>
        <Navbar />
        <div className="min-h-screen bg-slate-50/50 py-10">
            <div className="mx-auto px-4 max-w-7xl">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            {title}
                        </h1>
                        <p className="text-slate-500 mt-1">
                            {description}
                        </p>
                    </div>
                </div>
                {children}
            </div>
        </div>
        <Footer />
        
     </>
    );
}
