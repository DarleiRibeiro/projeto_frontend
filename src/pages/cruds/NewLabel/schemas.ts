import { z } from "zod";

export const labelFormSchema = z.object({
    validademes: z.object({
        amount: z.string()
    }),
    cliente: z.object({
        amount: z.string()
    }),
    produto: z.object({
        amount: z.string()
    }),
    complemento: z.object({
        amount: z.string()
    }),
    seladoratipo: z.string(),
    autoclave: z.string(),
    tipoImpressoraEtiqueta: z.string(),
    integrador: z.string(),
    peso: z.string(),
    cautela: z.string(),
    temperatura: z.string(),
    biologico: z.string(),
    ciclo: z.string(),
    termodesinfectadora: z.string(),
    qtditenspacote: z.object({
        amount: z.string()
    }),
    qtdimpressao: z.object({
        amount: z.string()
    }),
})

export type LabelFormType = z.infer<typeof labelFormSchema>
