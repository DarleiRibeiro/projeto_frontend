import { z } from "zod";

export const driverFormSchema = z.object({
    cpf: z.string()
        .nonempty('Campo Obrigatório'),
    nome: z.string(),
    matricula: z.string(),
    dtnascimento: z.string(),
    email: z.string()
        .email('Formato de email inválido!'),
    contato: z.string(),
    sexo: z.string(),
    apelidousu: z.string().nonempty('Campo Obrigatório'),
    senhausu: z.string().nonempty('Campo Obrigatório'),
})

export type DriverFormSchemaType = z.infer<typeof driverFormSchema>