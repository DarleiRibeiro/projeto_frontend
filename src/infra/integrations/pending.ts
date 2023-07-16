import RemoteAccessClient from "../api/axios-s-managed.ts";

import {LoginResponse} from "@/infra/integrations/login.ts";
import {PendingFormType} from "@pages/process/Demands/Pending/Modal/schemas.ts";

export interface PendingResponse {
    motorista: number
    retorno: boolean
    solicitacao_esterilizacao: string
    veiculo: number
}

export const PendingAPI = {
    getOptions: async (user: LoginResponse): Promise<PendingResponse> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "coletas/",
                method: "GET"
            })
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response?.status, statusText: 'Erro ao buscar dados de etiqueta.', data: {
                    "seladora": ["SELADORA 01", "SELADORA 02", "SELADORA 03", "SELADORA 04", "SELADORA 05", "SELADORA 06", "SELADORA 07", "SELADORA 08", "SELADORA 09", "SELADORA 10", "SMS", "SELADORA DE PLASTICO", "CONTAINER"],
                    "autoclave": ["01", "02", "03", "04", "05", "06", "PEROXIDO"],
                    "tipoImpressoraEtiqueta": ["INSUMO", "ROUPARIA", "RESPIRATORIO", "INSTRUMENTAL AVULSO", "TERMODESINFECCAO", "CONTAIER"],
                    "integrador": ["SIM,01 QTD", "SIM,02 QTD", "SIM,03 QTD", "NAO"],
                    "termoDesinfectora": ["TERMO 01", "TERMO 02", "TERMO 03", "TERMO 04", "TERMO 05"]
                }
            }
        }
    },
    save: async (user: LoginResponse, body: PendingFormType) => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "coletas/",
                method: "POST",
                data: body
            })
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response?.status,
                statusText: 'Erro ao salvar etiqueta.',
                data: undefined
            }
        }
    }
}
