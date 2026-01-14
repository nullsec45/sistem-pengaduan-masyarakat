import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard({ auth, usersCount, reportsCount, monthlyReports, categoryReports }) {
    // Process data for charts
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    const categories = [...new Set(monthlyReports.map(r => r.category.name))];

    // Get all months from min to max year
    const years = [...new Set(monthlyReports.map(r => r.year))].sort();
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const allMonths = [];
    for (let year = minYear; year <= maxYear; year++) {
        for (let month = 1; month <= 12; month++) {
            allMonths.push({ year, month, monthName: months[month - 1] + ' ' + year });
        }
    }

    const monthlyData = {};
    allMonths.forEach(({ monthName }) => {
        monthlyData[monthName] = { month: monthName };
        categories.forEach(cat => {
            monthlyData[monthName][cat] = 0;
        });
    });

    monthlyReports.forEach(r => {
        const monthName = months[r.month - 1] + ' ' + r.year;
        monthlyData[monthName][r.category.name] = r.count;
    });

    const chartData = allMonths.map(({ monthName }) => monthlyData[monthName]);

    const pieData = categoryReports.map(r => ({
        name: r.category.name,
        value: r.count
    }));

    return (
         <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mb-8">
                    <h1 className="text-4xl font-bold font-headline">Dasbor</h1>
                    <p className="text-muted-foreground">Selamat datang di dasbor AspirasiKu.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Total Pengguna</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-2xl font-bold">{usersCount}</div>
                            <p className="text-xs text-muted-foreground">+10.2% dari bulan lalu</p>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Total Aduan</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="h-4 w-4 text-muted-foreground">
                                <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10"></path>
                                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                <path d="M10 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                                <path d="M12 19.5V22"></path>
                                <path d="M5 12.5V10"></path>
                            </svg>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-2xl font-bold">{reportsCount}</div>
                            <p className="text-xs text-muted-foreground">+5.1% dari bulan lalu</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Laporan per Bulan berdasarkan Kategori</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <Tooltip />
                                <Legend/>
                                {categories.map((cat, index) => (
                                    <Bar key={cat} dataKey={cat} fill={`hsl(${index * 60}, 70%, 50%)`} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                        <h3 className="text-lg font-semibold mb-4">Distribusi Laporan berdasarkan Kategori</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
