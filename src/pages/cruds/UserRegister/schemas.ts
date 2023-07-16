import { z } from "zod"

export const userFormSchema = z.object({ 
    cpf: z.string()
      .nonempty('Campo Obrigatório')
      .min(11, 'CPF Inválido')
      .max(11, 'CPF Inválido'),
    rt: z.string(),
    name: z.string(),
    registration: z.string(),
    coren: z.string().nonempty('Campo Obrigatório'),
    dtNasc: z.string().nonempty('Campo Obrigatório'),
    dtAdm: z.string().nonempty('Campo Obrigatório'),
    dtDesl: z.string(),
    email: z.string().email('Formato de email inválido!'),
    telefone: z.string(),
    sexo: z.string(),
    occupation: z.object({
      name: z.string()
    }),
    username: z.string().nonempty('Campo Obrigatório'),
    password: z.string().nonempty('Campo Obrigatório'),
    passwordConfirm: z.string().nonempty('Campo Obrigatório'),
    perfil: z.array(z.object({
      name: z.string()
    }))
  })