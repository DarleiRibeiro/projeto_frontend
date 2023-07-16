import {LabelFormType} from "@pages/cruds/NewLabel/schemas.ts";
import RemoteAccessClient from "../api/axios-s-managed.ts";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface LabelResponse {
    seladora: [string]
    autoclave: [string]
    tipoImpressoraEtiqueta: [string]
    integrador: [string]
    termoDesinfectora: [string]
}

export const LabelAPI = {
    getOptions: async (user: LoginResponse): Promise<LabelResponse> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "rotasEtiquetas",
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
    save: async (user: LoginResponse, body: LabelFormType) => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "etiquetas",
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
