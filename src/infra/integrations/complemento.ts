import RemoteAccessClient from "../api/axios-s-managed";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface Result {
    idcomplemento: number;
    descricao: string;
    status: string;
}

export interface ComplementoResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: Result[];
}

export const ComplementoAPI = {
    getOptions: async (user: LoginResponse): Promise<ComplementoResponse> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const { data } = await api({
                url: "complemento",
                method: "GET"
            })
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status, statusText: 'Erro ao buscar dados de etiqueta.', data: {
                    "count": 2,
                    "next": null,
                    "previous": null,
                    "results": [
                      {
                        "idcomplemento": 1,
                        "descricao": "Complemento teste",
                        "status": "ATIVO"
                      }
                    ]
                  }
            }
        }
    },
    // save: async (body: LabelFormType)=> {
    //     try {
    //         const api = RemoteAccessClient.getInstance();
    //         const {data} = await api({
    //             url: "etiquetas",
    //             method: "POST",
    //             data: body
    //         })
    //         return data
    //     } catch (e) {
    //         throw {
    //             // @ts-ignore
    //             status: e.response.status,
    //             statusText: 'Erro ao salvar etiqueta.',
    //             data: undefined
    //         }
    //     }
    // }
}
