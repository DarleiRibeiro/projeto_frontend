/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Button} from "primereact/button";
import {useEffect, useMemo, useRef, useState} from "react";
import {Dialog} from "primereact/dialog";
import {Dropdown} from "primereact/dropdown";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {andamentoFormSchema, AndamentoFormType} from "./schemas.ts";
import {VehicleAPI, ResultVehicle} from "@/infra/integrations/vehicles.ts";
import {DriverAPI, ResultDriver} from "@/infra/integrations/driver.ts";
import { InputText } from "primereact/inputtext";
import {useAuth} from "@/provider/Auth";
import { Toast } from "primereact/toast";

// @ts-ignore
export function AndamentoModal({visible, onClose, selectedSE}) {
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
            if(user) {
                DriverAPI.getOptions(user).then((data) => {
                    if (mounted) setOptionsDrivers(data)
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
    } = useForm<AndamentoFormType>({resolver: zodResolver(andamentoFormSchema)})

    const handleAndamento = (data: AndamentoFormType) => {
        showToast()
        console.log(data)
        reset()
        onClose()
    }

    const headerMemo  = useMemo(()=> {
        return `SE: ${selectedSE?.id} Info da SE selecionada: Contém ${selectedSE?.qtdCaixas}, solicitada ${selectedSE?.solicitada}`
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
                <form onSubmit={handleSubmit(handleAndamento)}>
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
                                                // options={optionsDrivers}
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
                            return <InputText hidden { ...register('solicitacaoesterilizacao') } value={selectedSE?.seId} />
                        }, [selectedSE?.seId]
                        )}
                    </div>
                    <div className="mt-6 w-full flex gap-3 justify-content-end">
                        <Button label="Cancelar" icon="pi pi-times" onClick={() => onClose()}
                                className="p-button-text text-white"/>
                        <Button label="Iniciar Transporte" type="submit"
                                icon="pi pi-check" autoFocus/>
                    </div>
                </form>
            </Dialog>
        </>
    )
}
