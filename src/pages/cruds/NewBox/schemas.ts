import { z } from "zod"

export const newBoxFormSchema = z.object({ 
    caixa: z.string().nonempty('Campo Obrigatório'),
    caixaAbreviado: z.string().nonempty('Campo Obrigatório'),
    cliente: z.object({
      name: z.string().nonempty('Campo Obrigatório')
    }),
    embalagem: z.object({
      name: z.string().nonempty('Campo Obrigatório')
    }),
    temperatura: z.string(),
    tipo: z.string(),
    validade: z.string(),
    criticidade: z.string(),
})