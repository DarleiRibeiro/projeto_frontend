import { DriverFormSchemaType } from "@pages/cruds/NewDriver/schemas.ts";
import RemoteAccessClient from "../api/axios-s-managed";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface ResultDriver {
    cpf: string
    nome: string
    matricula: string
    dtNasc: string
    email: string
    contato: string
    sexo: string
    idprofissao: string
    username: string
    password: string
    passwordConfirm: string
}

export interface DriverResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: ResultDriver[];
}

export const DriverAPI = {
    getOptions: async (user: LoginResponse): Promise<ResultDriver[]> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const { data } = await api({
                url: `motoristas/`,
                method: "GET"
            })
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status,
                 statusText: 'Erro ao buscar dados de Motorista.',
                 data:  [
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
    },
    save: async (user: LoginResponse, body: DriverFormSchemaType)=> {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "motoristas/",
                method: "POST",
                data: body
            })
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status,
                statusText: 'Erro ao salvar motorista.',
                data: undefined
            }
        }
    },
    listarDemandas: async (user: LoginResponse, id: number): Promise<ResultDriver[]> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const { data } = await api({
                url: `motoristas/demandas/${id}/`,
                method: "GET"
            })
            return data.results
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status,
                statusText: 'Erro ao buscar dados de Motorista.',
                data:  [
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
    },

}
