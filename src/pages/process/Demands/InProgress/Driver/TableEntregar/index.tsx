import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useEffect, useState} from "react";
import {Solicitacoes, SterilizationAPI} from "@/infra/integrations/sterilization-requets.ts";
import moment from "moment";
import {Button} from "primereact/button";
import {useAuth} from "@/provider/Auth";

const headerStyle = {
    backgroundColor: '#204887',
    color: '#fff'
}

// @ts-ignore
export function InProgressTableEntregar({ mudarStatus }) {
    const [
        solicitacoes,
        setSolicitacoes
    ] = useState<Solicitacoes[]>()

    const {user} = useAuth();

    useEffect(() => {
        let mounted = true;
        (() => {
            if(user) {
                SterilizationAPI.list(user).then((data) => {
                    if (mounted) { // @ts-ignore
                        setSolicitacoes(data.data)
                    }
                }).catch(e => {
                    if (mounted) setSolicitacoes(e.data)
                })
            }

        })()
        return () => {
            mounted = false
        }
    }, [user])

    const dataFormatedTemplate = (solicitacao: Solicitacoes) => {
        if (solicitacao.created_at) {
            const {created_at} = solicitacao
            const dataFormated = moment(created_at)
                .format('MM/DD/YYYY - HH:mm')
            return (
                <div className="flex flex-column">
                    {dataFormated}
                </div>
            );
        } else {
            return (
                <div className="flex flex-column">
                    --/--/----
                </div>
            );
        }

    };

    const caixasQuantidadeTemplate = (solicitacao: Solicitacoes) => {
        if (solicitacao.caixas?.length) {
            return <div>{solicitacao.caixas.length}</div>
        } else return <div>{0}</div>
    }

    const StatusColetaTemplate = (solicitacao: Solicitacoes) => {
        switch (solicitacao.situacao) {
            case 'Aguardando Coleta':
                return (
                    <Button
                        label="Receber"
                        type="submit"
                        icon="pi pi-send"
                        onClick={() => mudarStatus('Aguardando Coleta', 'Em Transporte')}
                        style={{ background: 'green' }}
                        autoFocus />
                );
            case 'Em Transporte':
                return (
                    <Button
                        onClick={() => mudarStatus('Em Transporte', 'Entregue')}
                        label="Entregar"
                        type="submit"
                        icon="pi pi-check-square"
                        style={{ background: 'green' }}
                        autoFocus />
                )
            default:
                return (
                    <Button
                        label="Error na notificacao de status"
                        type="submit"
                        disabled
                        icon="pi pi-send"
                        autoFocus />
                )
        }
    }


    return (

        <DataTable
            value={solicitacoes}
            className="w-full"
            rowHover
            selectionMode="radiobutton"
            dataKey="id"
        >
            <Column
                headerStyle={headerStyle}
                field="id"
                header="#"
            />
            <Column
                headerStyle={headerStyle}
                field="created_at"
                header="Data de Criação"
                body={dataFormatedTemplate}
            />
            <Column
                headerStyle={headerStyle}
                field="caixas"
                header="Quantidade de Caixas"
                body={caixasQuantidadeTemplate}
            />
            <Column
                headerStyle={headerStyle}
                field="situacao"
                header="Status"
            />
            <Column
                headerStyle={headerStyle}
                header="Mudar de coleta"
                body={StatusColetaTemplate}
            />
        </DataTable>
    )
}
