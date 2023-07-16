import RemoteAccessClient from "../api/axios-s-managed";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface Box {
    id: string
}

export interface Caixa {
    id: string | number
    solicitacao_esterilizacao: string | number
    caixa: string
}

export interface Solicitacoes {
    id: string | number
    created_at: string
    updated_at: string
    observacao: string | null
    situacao: string
    cliente: string | number
    caixas: Caixa[]
}

export interface SterilizationBody {
    observacao: string
    cliente: string
    caixas: Box[]
}

export interface ClientResponse {
    data: Box[]
}

export interface SolicitacoesListResponse {
    data: Solicitacoes[];
}

export const SterilizationAPI = {
    getBoxFromClient: async (user: LoginResponse, id: string): Promise<ClientResponse> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: `caixas-cliente/${id}/`,
                method: "GET"
            })
            // @ts-ignore
            return data.map((box) => ({id: box.idsequenciaetiqueta}))
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status, statusText: 'Erro ao buscar dados de etiqueta.',
                data: [
                    {id: "BJDISS-HGP001"},
                    {id: "BJDISS-HGP002"},
                    {id: "BJPCIR-HGP001"},
                    {id: "BJPCIR-HGP002"},
                    {id: "BJPCIR-HGP006"},
                    {id: "BJPCIR-HGP004"},
                    {id: "BJPCIR-HGP005",},
                    {id: "BJPCIR-HGP003",},
                    {id: "BJPCIR-HGP007",},
                    {id: "BJPCIR-HGP008",},
                    {id: "BJPCIR-HGP009",},
                    {id: "BJPCIR-HGP010",},
                    {id: "BJPCIR-HGP011",},
                    {id: "BJPCIR-HGP012",},
                    {id: "BJPCIR-HGP",},
                    {id: "BJPCIR-HGP013",},
                    {id: "BJPCIR-HGP014",},
                    {id: "BJPCIR-HGP015",},
                ]
            }
        }
    },
    save: async (user: LoginResponse, payload: any) => {
        try {
            const body: SterilizationBody = {
                cliente: "4",
                caixas: payload.boxes,
                observacao: payload.note
            }
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "solicitacao/",
                method: "POST",
                data: body
            })
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status,
                statusText: 'Erro ao salvar etiqueta.',
                data: undefined
            }
        }
    },
    list: async (user: LoginResponse): Promise<SolicitacoesListResponse> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: `solicitacao/`,
                method: "GET"
            })

            return {
                // @ts-ignore
                data: data.map((box) => ({ id: box.idsequenciaetiqueta }))
            }
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response?.status,
                statusText: 'Erro ao buscar dados de etiqueta.',
                data: [

                        {
                            "id": 1,
                            "created_at": "2023-06-28T14:09:14.231575-03:00",
                            "updated_at": "2023-06-28T14:09:14.231575-03:00",
                            "observacao": null,
                            "situacao": "Em Transporte",
                            "created_by": null,
                            "updated_by": null,
                            "cliente": 4,
                            "caixas": [
                                {
                                    "id": 1,
                                    "solicitacao_esterilizacao": 1,
                                    "caixa": "BJPCIR-HGP014"
                                },
                                {
                                    "id": 2,
                                    "solicitacao_esterilizacao": 1,
                                    "caixa": "BJPCIR-HGP015"
                                }
                            ]
                        },
                    {
                        "id": 2,
                        "created_at": "2023-06-28T14:09:14.231575-03:00",
                        "updated_at": "2023-06-28T14:09:14.231575-03:00",
                        "observacao": null,
                        "situacao": "Aguardando Coleta",
                        "created_by": null,
                        "updated_by": null,
                        "cliente": 4,
                        "caixas": [
                            {
                                "id": 1,
                                "solicitacao_esterilizacao": 1,
                                "caixa": "BJPCIR-HGP014"
                            },
                        ]
                    },
                    {
                        "id": 3,
                        "created_at": "2023-06-28T14:09:14.231575-03:00",
                        "updated_at": "2023-06-28T14:09:14.231575-03:00",
                        "observacao": null,
                        "situacao": "Em Transporte",
                        "created_by": null,
                        "updated_by": null,
                        "cliente": 4,
                        "caixas": [
                            {
                                "id": 1,
                                "solicitacao_esterilizacao": 1,
                                "caixa": "BJPCIR-HGP014"
                            },
                        ]
                    },
                    {
                        "id": 4,
                        "created_at": "2023-06-28T14:09:14.231575-03:00",
                        "updated_at": "2023-06-28T14:09:14.231575-03:00",
                        "observacao": null,
                        "situacao": "Entregue",
                        "created_by": null,
                        "updated_by": null,
                        "cliente": 4,
                        "caixas": [
                            {
                                "id": 1,
                                "solicitacao_esterilizacao": 1,
                                "caixa": "BJPCIR-HGP014"
                            },
                        ]
                    },
                    {
                        "id": 5,
                        "created_at": "2023-06-28T14:09:14.231575-03:00",
                        "updated_at": "2023-06-28T14:09:14.231575-03:00",
                        "observacao": null,
                        "situacao": "Em Transporte",
                        "created_by": null,
                        "updated_by": null,
                        "cliente": 4,
                        "caixas": [
                            {
                                "id": 1,
                                "solicitacao_esterilizacao": 1,
                                "caixa": "BJPCIR-HGP014"
                            },
                        ]
                    },
                    {
                        "id": 6,
                        "created_at": "2023-06-28T14:09:14.231575-03:00",
                        "updated_at": "2023-06-28T14:09:14.231575-03:00",
                        "observacao": null,
                        "situacao": "'Aguardando Coleta'",
                        "created_by": null,
                        "updated_by": null,
                        "cliente": 4,
                        "caixas": [
                            {
                                "id": 1,
                                "solicitacao_esterilizacao": 1,
                                "caixa": "BJPCIR-HGP014"
                            },
                        ]
                    }

                ]
            }
        }
    },

}
