import { z } from "zod"

export const newClientFormSchema = z.object({ 
  idcli: z.string().uuid().optional(),
  bairrocli: z.string(),
  cepcli: z.string(),
  cidadecli: z.string(),
  cnpjcli: z.string(),
  codigocli: z.string().optional(),
  contatocli: z.string(),
  datacadastrocli: z.date().refine((value) => {
    const currentDate = new Date();
    return value.getTime() <= currentDate.getTime();
  }, 'Data deve ser a atual').optional(),
  emailcli: z.string(),
  horacadastrocli: z.string().optional(),
  inscricaoestadualcli: z.string(),
  inscricaomunicipalcli: z.string(),
  nomeabreviado: z.string().nonempty('Campo Obrigatório'),
  nomecli: z.string().nonempty('Campo Obrigatório'),
  nomefantasiacli: z.string().optional(),
  numerocli: z.string(),
  ruacli: z.string(),
  telefonecli: z.string(),
  ufcli: z.object({
    uf: z.string()
  }),

})