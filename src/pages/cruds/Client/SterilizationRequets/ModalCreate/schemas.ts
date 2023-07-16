import { z } from "zod"

export const SterilizationRequestsSchema = z.object({
  sequencial: z.string()
})


export type SterilizationRequestsType = z.infer<typeof SterilizationRequestsSchema>
