import {useState} from "react";
import {Input} from "@/components/Input.tsx";
import {Errors} from "@/components/Errors.tsx";
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import * as Z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {newClientFormSchema} from "./schemas";
import {Controller, useForm} from 'react-hook-form'
import UFs from "@/util/ufs.json"
import {styleBtn1} from "@/util/styles";
type NewClientFormInputs = Z.infer<typeof newClientFormSchema>

export function NewClient() {
    const [UF] = useState(UFs)

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<NewClientFormInputs>({resolver: zodResolver(newClientFormSchema)})

    function handleClient(data: NewClientFormInputs) {
        try {
            console.log(data)
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-column pt-4 align-items-center">
            <h1 className='m-0 p-0 mb-4 text-blue-600 text-4xl'>Novo Cliente</h1>

            <form
                className="w-full px-8 py-3 flex flex-column gap-5"
                onSubmit={handleSubmit(handleClient)}
            >
                <div className="flex gap-5 justify-content-between">
                    <div className="flex flex-column gap-4 w-full">
                        <div className="text-left">
                            <Input
                                type="text"
                                placeholder="Nome"
                                {...register('nomecli')}
                            />
                            {errors.nomecli && <Errors message={errors.nomecli.message}/>}
                        </div>

                        <div className="text-left">
                            <Input
                                type="text"
                                placeholder="Nome Abreviado"
                                {...register('nomeabreviado')}
                            />
                            {errors.nomeabreviado && <Errors message={errors.nomeabreviado.message}/>}
                        </div>

                        <Input
                            type="text"
                            placeholder="CNPJ"
                            {...register('cnpjcli')}
                        />
                        <Input
                            type="text"
                            placeholder="Inscrição Estadual"
                            {...register('inscricaoestadualcli')}
                        />
                        <Input
                            type="text"
                            placeholder="Inscrição Municipal"
                            {...register('inscricaomunicipalcli')}
                        />
                    </div>
                    <div className="flex flex-column gap-4 w-full">
                        <Input
                            type="text"
                            placeholder="Email"
                            {...register('emailcli')}
                        />
                        <Input
                            type="text"
                            placeholder="Telefone Fixo"
                            {...register('telefonecli')}
                        />
                        <Input
                            type="text"
                            placeholder="Telefone Celular"
                            {...register('contatocli')}
                        />
                    </div>
                    <div className="flex flex-column gap-4 w-full">
                        <Input
                            type="text"
                            placeholder="CEP"
                            {...register('cepcli')}
                        />
                        <Input
                            type="text"
                            placeholder="Número"
                            {...register('numerocli')}
                        />
                        <Input
                            type="text"
                            placeholder="Bairro"
                            {...register('bairrocli')}
                        />
                        <Input
                            type="text"
                            placeholder="Rua"
                            {...register('ruacli')}
                        />
                        <Input
                            type="text"
                            placeholder="Cidade"
                            {...register('cidadecli')}
                        />

                        <div className="text-left -mt-4">
                            <label htmlFor="" className="text-gray-500 text-xs">UF.:</label>
                            <Controller
                                control={control}
                                name='ufcli'
                                render={({field}) => {
                                    return (<Dropdown
                                        className='w-full text-left h-dropdown'
                                        placeholder='UF'
                                        id={field.name}
                                        options={UF}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        optionLabel="uf"
                                    />)
                                }}
                            />
                        </div>
                    </div>


                </div>

                <Button
                    label="Cadastrar"
                    className={styleBtn1}
                    type='submit'
                />
            </form>

        </div>
    )
}
