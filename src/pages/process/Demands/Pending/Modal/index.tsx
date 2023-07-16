/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Button} from "primereact/button";
import {useEffect, useMemo, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {ResultVehicle, VehicleAPI} from "@/infra/integrations/vehicles.ts";
import {DriverAPI, ResultDriver} from "@/infra/integrations/driver.ts";
import { InputText } from "primereact/inputtext";
import { PendingAPI } from "@/infra/integrations/pending.ts";
import {useAuth} from "@/provider/Auth";
import {pendingFormSchema, PendingFormType} from "@pages/process/Demands/Pending/Modal/schemas.ts";
import { Toast } from "primereact/toast";

// @ts-ignore
export function PendingModal({visible, onClose, selectedSE}) {
    const [optionsVehicles, setOptionsVehicles] = useState<ResultVehicle[]>()
    const [optionsDrivers, setOptionsDrivers] = useState<ResultDriver[]>()

    const toast = useRef<Toast>(null);
    const showToast = () => {
        toast.current?.show({ severity: 'success', summary: 'Sucesso!', detail: 'Transporte iniciado' });
    };

    const {user} = useAuth();

    useEffect(() => {
        let mounted = true;
        (() => {
            if(user){
                DriverAPI.getOptions(user).then((data) => {
                    setOptionsDrivers(data)
                }).catch(e => {
                    setOptionsDrivers(e.data)
                })

                VehicleAPI.getOptions(user).then((data) => {
                    if (mounted) setOptionsVehicles(data)
                }).catch(e => {
                    setOptionsVehicles(e.data)
                })
            }

        })()
        return () => {
            mounted = false
        }
    }, [user])

    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<PendingFormType>({resolver: zodResolver(pendingFormSchema)})

    const handlePending = (data: PendingFormType) => {
        PendingAPI.save(user, data).then(() => {
            reset()
            showToast()
            onClose()
        }).catch(error => {
            console.log(error)
        })
        reset()
        onClose()
    }

    const headerMemo  = useMemo(()=> {
        return `SE: ${selectedSE?.seId} Info da SE selecionada: Contém ${selectedSE?.qtdCaixas}, solicitada ${selectedSE?.solicitada}`
    }, [selectedSE?.qtdCaixas, selectedSE?.solicitada, selectedSE?.seId] )

    return (
        <>
            <Toast ref={toast} /> 
            <Dialog
                header={headerMemo}
                visible={visible}
                style={{width: '50vw'}}
                onHide={() => onClose()}
            >
                <form onSubmit={handleSubmit(handlePending)}>
                    <div className="flex gap-3 mt-4">
                        <Controller
                                control={control}
                                name='motorista'
                                render={({field}) => {
                                    return (
                                        <span className="p-float-label w-full">
                                            <Dropdown
                                                className='w-full'
                                                id={field.name}
                                                options={optionsDrivers}
                                                optionLabel="nome"
                                                optionValue="idprofissional"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.value)}

                                            />
                                            <label htmlFor="">
                                                Motoristas
                                            </label>
                                        </span>
                                    )
                                }}
                            />

                        <Controller
                            control={control}
                            name='veiculo'
                            render={({field}) => {
                                return (
                                    <span className="p-float-label w-full">
                                            <Dropdown
                                                className='w-full'
                                                id={field.name}
                                                options={optionsVehicles}
                                                optionLabel="placa"
                                                optionValue="idveiculo"
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.value)}
                                            />
                                            <label htmlFor="">
                                                Veículos
                                            </label>
                                        </span>
                                )
                            }}
                        />
                        {useMemo(()=> {
                            return <InputText hidden { ...register('solicitacao_esterilizacao') } value={selectedSE?.seId} />
                        }, [selectedSE?.seId]
                        )}
                    </div>
                    <div className="mt-6 w-full flex gap-3 justify-content-end">
                        <Button
                            label="Cancelar"
                            icon="pi pi-times"
                            onClick={() => onClose()}
                            className="p-button-text text-white"
                        />
                        <Button
                            label="Iniciar Transporte"
                            type="submit"
                            icon="pi pi-check"
                            autoFocus
                        />
                    </div>
                </form>
            </Dialog>
        </>
    )
}
