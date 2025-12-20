import {z} from "zod";


const VerificationValidate = z.object({
    status: z.string().min(1, 'Status wajib dipilih'),
    category: z.string().min(1, 'Kategori wajib dipilih'),
    operatorNotes: z.string().optional(),
});

export default VerificationValidate;