import RemoteAccessClient from "../api/axios-s-managed";
import {LoginResponse} from "@/infra/integrations/login.ts";

export interface Result {
    idcli: number,
    bairrocli: string,
    cepcli: string,
    cidadecli: string,
    cnpjcli: string,
    codigocli: string,
    contatocli: string,
    datacadastrocli: string,
    emailcli: string,
    horacadastrocli: string,
    inscricaoestadualcli: string,
    inscricaomunicipalcli: string,
    nomeabreviado: string,
    nomecli: string,
    nomefantasiacli: string,
    numerocli: string,
    ruacli: string,
    telefonecli: string,
    ufcli: string
}

export interface ClientResponse {
    count: number;
    next: null | string;
    previous: null | string;
    results: Result[];
}

export const ClientAPI = {
    getOptions: async (user: LoginResponse): Promise<ClientResponse> => {
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
                        "idcli": 1,
                        "bairrocli": "monte das oliveiras",
                        "cepcli": "69093119",
                        "cidadecli": "manaus",
                        "cnpjcli": "82112011000128",
                        "codigocli": "111",
                        "contatocli": "92991676767",
                        "datacadastrocli": "2023-06-15",
                        "emailcli": "cliente@hotmail.com",
                        "horacadastrocli": "00:00:00",
                        "inscricaoestadualcli": "82112011000",
                        "inscricaomunicipalcli": "8211201100",
                        "nomeabreviado": "cliente x",
                        "nomecli": "cliente",
                        "nomefantasiacli": "cliente fantasia",
                        "numerocli": "1",
                        "ruacli": "rua guarapu",
                        "telefonecli": "",
                        "ufcli": "AM"
                      },
                      {
                        "idcli": 1,
                        "bairrocli": "monte das oliveiras",
                        "cepcli": "69093119",
                        "cidadecli": "manaus",
                        "cnpjcli": "82112011000128",
                        "codigocli": "111",
                        "contatocli": "92991676767",
                        "datacadastrocli": "2023-06-15",
                        "emailcli": "cliente@hotmail.com",
                        "horacadastrocli": "00:00:00",
                        "inscricaoestadualcli": "82112011000",
                        "inscricaomunicipalcli": "8211201100",
                        "nomeabreviado": "cliente x",
                        "nomecli": "Fernando",
                        "nomefantasiacli": "cliente fantasia",
                        "numerocli": "1",
                        "ruacli": "rua guarapu",
                        "telefonecli": "",
                        "ufcli": "AM"
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
