<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            ['name' => 'Infrastruktur', 'slug' => 'infrastruktur'],
            ['name' => 'Lingkungan', 'slug' => 'lingkungan'],
            ['name' => 'Layanan Publik', 'slug' => 'layanan-publik'],
            ['name' => 'Keamanan', 'slug' => 'keamanan'],
            ['name' => 'Kesehatan', 'slug' => 'kesehatan'],
            ['name' => 'Lain-lain', 'slug' => 'lain-lain'],
        ];

        foreach ($data as $item) {
            Category::updateOrCreate(
                ['slug' => $item['slug']],
                ['name' => $item['name']]
            );
        }
    }
}
