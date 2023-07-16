import {Button} from "primereact/button";
import "./modal-create.css";
import React, {Fragment, useEffect, useMemo, useState} from "react";
import {Dialog} from "primereact/dialog";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {InputTextarea} from "primereact/inputtextarea";
import {SterilizationAPI} from "@/infra/integrations/sterilization-requets.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {SterilizationRequestsSchema, SterilizationRequestsType} from "./schemas.ts";
import {Input} from "@/components/Input.tsx";
import {useAuth} from "@/provider/Auth";

interface tableData {
    id?: string;
}
interface Feedbacks {
    description?: string;
}

const maxBoxView = 5;

const findExistents = (item: string | undefined, arrayExistent: tableData[]): boolean => {
    return !!arrayExistent.find(box => box.id === item)
}

// @ts-ignore
export default function SterizationComponent({openDialog, closeDialog }) {

    const [boxsSelected, setBoxSelected] = useState<tableData[]>([]);
    const [ feedbacks, setFeedback] = useState<Feedbacks[]>([]);
    const [boxsRegistred, setBoxsRegistred] = useState<tableData[]>([])
    const [note, setNote] = useState<string>();

    const handleAddBox = (sequencial: SterilizationRequestsType) => {

        if (findExistents(sequencial.sequencial, boxsRegistred)) {
            if (findExistents(sequencial.sequencial, boxsSelected)) {
                const prevBox = [...feedbacks]
                prevBox.splice(0, 0, {description: `${sequencial.sequencial} já adicionada`})
                setFeedback(prevBox)
            } else {
                const prevBox = [...boxsSelected]
                prevBox.splice(0, 0, {id: sequencial.sequencial})
                setBoxSelected(prevBox)
                reset()
            }
        } else {
            const prevBox = [...feedbacks]
            prevBox.splice(0, 0, {description: `${sequencial.sequencial} não registrada, por favor realize o registro`})
            setFeedback(prevBox)
            // add no log que caixa não existe associado ao cliente.
        }
    }

    const handleRemoveBox = (e: any, rowData: tableData) => {
        const prevBox = [...boxsSelected]
        prevBox.splice(prevBox.findIndex(box => box.id === rowData.id), 1)
        setBoxSelected(prevBox)
        e.preventDefault()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const actionBodyTemplate = (rowData) => {
        return (
            <Fragment>
                <Button
                    icon="pi pi-trash"
                    rounded
                    outlined
                    severity="danger"
                    onClick={(e) => handleRemoveBox(e, rowData)}
                />
            </Fragment>
        );
    };

    const {
        register,
        handleSubmit,
        reset
    } = useForm<SterilizationRequestsType>({resolver: zodResolver(SterilizationRequestsSchema)})

    const boxsLengthMemo = useMemo(() => {
        return `${boxsSelected?.length ? boxsSelected?.length : 0} caixas selecionadas`
    }, [boxsSelected])

    const {user} = useAuth();

    useEffect(() => {
        let mounted = true;
        (() => {
            if(user){
                SterilizationAPI.getBoxFromClient(user, "4").then((data) => {
                    console.log(data)
                    if (mounted) { // @ts-ignore
                        setBoxsRegistred(data)
                    }
                })
                    .catch(e => {
                        if (mounted) setBoxsRegistred(e.data)
                    })
            }


        })()

        return () => {
            mounted = false
        }

    }, [user])

    const handleSubmitRequest = ()=> {
        SterilizationAPI.save(user,{
            note: note,
            boxes: boxsSelected
        }).then((res)=>{
            console.log(res)
        }).catch((err)=> {
            console.log(err)
        })
    }


    return (

            <Dialog
                className="w-10"
                header="Solicitação de Esterilização"
                visible={openDialog}
                onHide={() => closeDialog()}
            >
                <div className="container-geral">
                    <div className="geral-informacao">

                    <span className="w-50 flex gap-8">
                        <form onSubmit={handleSubmit(handleAddBox)}>
                           <Input
                               type="text"
                               placeholder="Sequencial da caixa"
                               {...register('sequencial')}/>
                        </form>

                        <Button
                          onClick={handleSubmit(handleAddBox)}
                          icon="pi pi-plus">
                        </Button>
                    </span>

                    <div className="container-table">
                        <DataTable
                            value={boxsSelected}
                            showGridlines
                            paginator
                            rows={maxBoxView}
                            className="w-6"
                        >
                            <Column
                                field="id"
                                header="Sequencial">
                            </Column>
                            <Column
                                body={actionBodyTemplate}
                                exportable={false}></Column>
                        </DataTable>
                        <div className="labelSelected">
                            {boxsLengthMemo}
                        </div>
                    </div>
                        <span className="p-float-label-mt-2">
                          <InputTextarea
                              id="observacoes"
                              placeholder="Observações"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                              className="text-area"
                              autoResize={true}
                          />
                        </span>
                    </div>
                    <div className="icone-content">
                        <Button
                            rounded
                            icon="pi pi-check"
                            size="large"
                            onClick={handleSubmitRequest}
                        />
                        <DataTable
                            value={feedbacks}
                            className="w-full"
                            rows={maxBoxView}
                            scrollable
                            scrollHeight="300px"
                            style={{ minWidth: '100px' }}
                        >
                            <Column field="description">
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </Dialog>
    );
}
