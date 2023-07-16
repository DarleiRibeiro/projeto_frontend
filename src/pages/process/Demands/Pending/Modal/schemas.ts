import { z } from "zod";

export const pendingFormSchema = z.object({
    retorno: z.boolean().default(true),
    solicitacao_esterilizacao: z.string(),
    motorista: z.number(),
    veiculo: z.number()
})

export type PendingFormType = z.infer<typeof pendingFormSchema>
