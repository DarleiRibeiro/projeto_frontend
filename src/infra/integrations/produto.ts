import RemoteAccessClient from "../api/axios-s-managed";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface Result {
    idproduto: number,
    descricao: string,
    dtcadastro: string,
    embalagem: string,
    status: string,
    idsubtipoproduto: number,
    idtipopacote: number
}

export interface ProductResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: Result[];
}

export const ProductAPI = {
    getOptions: async (user: LoginResponse): Promise<ProductResponse> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const { data } = await api({
                url: "cliente",
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
                            "idproduto": 1,
                            "descricao": "prodtuo x",
                            "dtcadastro": "2023-06-15T11:34:26.272000-03:00",
                            "embalagem": "embalagem",
                            "status": "ATIVO",
                            "idsubtipoproduto": 1,
                            "idtipopacote": 1
                          },
                        {
                            "idproduto": 2,
                            "descricao": "prodtuo z",
                            "dtcadastro": "2023-06-15T11:34:26.272000-03:00",
                            "embalagem": "embalagem",
                            "status": "ATIVO",
                            "idsubtipoproduto": 1,
                            "idtipopacote": 1
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
