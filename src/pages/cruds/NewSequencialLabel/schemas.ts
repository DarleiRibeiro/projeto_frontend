import { z } from "zod"

export const labelFormSchema = z.object({
    sequencial: z.string(),
    caixa: z.object({
        name: z.string().nonempty('Campo Obrigatório')
    }),
})