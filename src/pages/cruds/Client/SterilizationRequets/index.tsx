import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";
import SterizationComponent from "./ModalCreate";
import {flexScreenCenterColumn, titleFlexCss} from "@/util/styles";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {
    Solicitacoes,
    SolicitacoesListResponse,
    SterilizationAPI
} from "@/infra/integrations/sterilization-requets.ts";
import moment from "moment/moment";
import {useAuth} from "@/provider/Auth";


export default function SterizationRequest() {
    const [
        openDialog,
        setOpenDialog
    ] = useState<boolean>();
    const [
        solicitacoes,
        setSolicitacoes
    ] = useState<Solicitacoes[]>()

    const {user} = useAuth();

    useEffect(() => {
        let mounted = true;
        (() => {
            if(user){
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

    const updateList = () => {
        SterilizationAPI.list(user).then((data: SolicitacoesListResponse) => {
            // @ts-ignore
            setSolicitacoes(data.data)
        }).catch(e => {
            setSolicitacoes(e.data)
        })
    }


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

    //todo colocar os campos em tela,
    //todo colocar um modal expand com os detalhes da msg.

    return (
        <div
            className={flexScreenCenterColumn}>
            <h1 className={titleFlexCss}>
                Solicitações
            </h1>
            <Button
                onClick={() => setOpenDialog(true)}
                className="botao-solicitacao"
                label="Nova Solicitação"
            />
            <DataTable
                value={solicitacoes}
                className="w-full"
                scrollable
                scrollHeight="300px"
                style={{minWidth: '100px'}}
            >
                <Column
                    field="id"
                    header="#"
                />
                <Column
                    field="created_at"
                    header="Data de Criação"
                    body={dataFormatedTemplate}
                />
                <Column
                    field="situacao"
                    header="Status"
                />
                <Column
                    field="caixas"
                    header="Quantidade de Caixas"
                    body={caixasQuantidadeTemplate}
                />
            </DataTable>
            <SterizationComponent
                openDialog={openDialog}
                closeDialog={() => {
                    setOpenDialog(false)
                    updateList();
                }}
            />
        </div>
    );
}
