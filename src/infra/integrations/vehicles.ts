
import RemoteAccessClient from "../api/axios-s-managed";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface ResultVehicle {
    idveiculo: number,
    descricao: string,
    placa: string
    marca: string
    modelo: string
    foto: string
}

export interface VehicleResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: ResultVehicle[];
}

export const VehicleAPI = {
    getOptions: async (user: LoginResponse): Promise<ResultVehicle[]> => {
        try {
            const api = RemoteAccessClient.getInstance(user);
            const { data } = await api({
                url: "veiculos/",
                method: "GET"
            })
            return data.results
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response.status, statusText: 'Erro ao buscar dados de veículo.', data: {
                    "count": 2,
                    "next": null,
                    "previous": null,
                    "results": [
                        {
                            "idveiculo": 3,
                            "descricao": "string",
                            "placa": "string",
                            "marca": "string",
                            "modelo": "string",
                            "foto": "string"
                        },
                        {
                            "idveiculo": 4,
                            "descricao": "string",
                            "placa": "string",
                            "marca": "string",
                            "modelo": "string",
                            "foto": "string"
                        }
                    ]
                }
            }
        }
    },
    save: async (user: LoginResponse, body: any)=> {
        try {
            const bodyFormData = new FormData();
            bodyFormData.append('descricao', body.descricao);
            bodyFormData.append('placa', body.placa);
            bodyFormData.append('marca', body.marca);
            bodyFormData.append('modelo', body.modelo);
            bodyFormData.append('foto', body.foto[0]);

            const api = RemoteAccessClient.getInstance(user);
            const {data} = await api({
                url: "veiculos/",
                headers: {
                    "Content-Type": 'multipart/form-data'
                },
                method: "POST",
                data: bodyFormData
            })
            console.log(data);
            return data
        } catch (e) {
            throw {
                // @ts-ignore
                status: e.response?.status,
                statusText: 'Erro ao salvar veículo.',
                data: undefined
            }
        }
    }
}
