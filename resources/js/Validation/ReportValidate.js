import {z} from "zod";


const ReportSchema = z.object({
  nama: z.string().min(1, 'Nama lengkap wajib diisi'),
  email: z.string().email('Format email tidak valid'),
  nomorHp: z.string().min(10, 'Nomor HP tidak valid'),
  tipeIdentitas: z.enum(['KTP', 'SIM'], { required_error: 'Tipe identitas wajib dipilih' }),
  nomorIdentitas: z.string().min(1, 'Nomor identitas wajib diisi'),
  tempatLahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  tanggalLahir: z.date({ required_error: 'Tanggal lahir wajib diisi' }),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  judulLaporan: z.string().min(1, 'Judul laporan wajib diisi'),
  deskripsiLaporan: z.string().min(1, 'Deskripsi laporan wajib diisi'),
});

export default ReportSchema;