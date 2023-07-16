import RemoteAccessClient from "../api/axios-s-managed.ts";
import {LoginResponse} from "@/infra/integrations/login.ts";


export interface SolicitarColetaPayload {
    solicitacao: string
    motorista: number
    veiculo: number
}

export interface SolicitarColetaBody {
    solicitacao_esterilizacao: string
    motorista: number
    veiculo: number
}

export const DemandsAPI = {
    solicitarColeta: async (user: LoginResponse, payload: SolicitarColetaPayload) => {
        try {
            const body: SolicitarColetaBody = {
                solicitacao_esterilizacao: payload.solicitacao,
                motorista: payload.motorista,
                veiculo: payload.veiculo
            }
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "coletas/",
                method: "POST",
                data: body
            })
            console.log('asd')
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response?.status,
                statusText: 'Erro ao salvar solicitação de coletas.',
                data: undefined
            }
        }
    },
}
