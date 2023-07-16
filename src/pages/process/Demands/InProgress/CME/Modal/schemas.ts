import { z } from "zod";

export const andamentoFormSchema = z.object({
    solicitacaoesterilizacao: z.string(),
    motorista: z.number(),
    veiculo: z.number(),
})

export type AndamentoFormType = z.infer<typeof andamentoFormSchema>
