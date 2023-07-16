import {useMemo, useState} from "react";

import {Input} from "@/components/Input.tsx";

import {Errors} from "@/components/Errors.tsx";

import {Button} from 'primereact/button';
import {RadioButton} from "primereact/radiobutton";
import {Dropdown} from "primereact/dropdown";

import * as Z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

import {newBoxFormSchema} from "./schemas";

import {Controller, useForm} from 'react-hook-form'

import Occupation from "@/util/occupation.json"

import {styleBtn1} from "@/util/styles";
import {ProductsType} from "../../templates/NewBox";
import {AutoComplete, AutoCompleteCompleteEvent} from "primereact/autocomplete";
import products from "../../templates/CreateProduct/produto.json"


type NewBoxFormInputs = Z.infer<typeof newBoxFormSchema>

const styleBoxContainer = "w-screen h-auto flex flex-column pt-4 align-items-center"
const styleH1 = "m-0 p-0 mb-4 text-blue-600 text-4xl"
const styleForm = "w-full px-8 py-3 flex flex-column gap-5"
const styleDivRadioGroup = "flex gap-5 mb-2 p-2 border-1 border-round border-gray-400"
const styleSpan = "-mt-5 -ml-2 p-0 text-xs text-gray-600 absolute"
const styleTable = "bg-blue-700 border-round p-3 text-white"

export function NewBox() {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<ProductsType[]>([]);
    const [occupation] = useState(Occupation)

    const search = (event: AutoCompleteCompleteEvent) => {
        if (event.query.length > 3) {
            const filtred: ProductsType[] = products.produtos.filter(prod => prod.descricao.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
            setItems(filtred);
        }
    }

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<NewBoxFormInputs>({resolver: zodResolver(newBoxFormSchema)})

    const handleBox = (data: NewBoxFormInputs) => {
        try {
            console.log(data)
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    const showErrorCaixa = useMemo(() => {
        return errors.caixa && <Errors message={errors.caixa.message}/>
    }, [errors.caixa])

    const showErrorCaixaAbreviado = useMemo(() => {
        return errors.caixaAbreviado && <Errors message={errors.caixaAbreviado.message}/>
    }, [errors.caixaAbreviado])

    const showErrorValidade = useMemo(() => {
        return errors.validade && <Errors message={errors.validade.message}/>
    }, [errors.validade])

    const showErrorCriticidade = useMemo(() => {
        return errors.criticidade && <Errors message={errors.criticidade.message}/>
    }, [errors.criticidade])

    return (
        <div className={styleBoxContainer}>
            <h1 className={styleH1}>
                Nova Caixa
            </h1>

            <form
                className={styleForm}
                onSubmit={handleSubmit(handleBox)}
            >
                <div className="flex gap-5 justify-content-between">
                    <div className="flex flex-column gap-4 w-full">
                        <div className="text-left">
                            <Input
                                type="text"
                                placeholder="Caixa"
                                {...register('caixa')}
                            />
                            {showErrorCaixa}
                        </div>

                        <div className="text-left">
                            <Input
                                type="text"
                                placeholder="Caixa Abreviado"
                                {...register('caixaAbreviado')}
                            />
                            {showErrorCaixaAbreviado}
                        </div>

                        <div className="text-left -mt-4">
                            <label
                                htmlFor=""
                                className="text-gray-500 text-xs">
                                Cliente
                            </label>
                            <Controller
                                control={control}
                                name='cliente'
                                render={({field}) => {
                                    return (<Dropdown
                                        className='w-full text-left h-dropdown'
                                        placeholder='Cliente'
                                        id={field.name}
                                        options={occupation}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        optionLabel="name"
                                    />)
                                }}
                            />
                            {errors.cliente && <Errors message={errors.cliente.message}/>}
                        </div>
                        <div className="text-left -mt-4">
                            <label htmlFor="" className="text-gray-500 text-xs">Embalagem</label>
                            <Controller
                                control={control}
                                name='embalagem'
                                render={({field}) => {
                                    return (<Dropdown
                                        className='w-full text-left h-dropdown'
                                        placeholder='Embalagem'
                                        id={field.name}
                                        options={occupation}
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        optionLabel="name"
                                    />)
                                }}
                            />
                            {errors.embalagem && <Errors message={errors.embalagem.message}/>}
                        </div>

                    </div>
                    <div className="flex flex-column gap-4 w-full">
                        <span className={styleSpan}>Temperatura:</span>
                        <div className={styleDivRadioGroup}>
                            <Controller
                                name="temperatura"
                                control={control}
                                render={({field}) => (<>
                                    <div className="flex align-items-center">
                                        <RadioButton
                                            inputId="121"
                                            {...field}
                                            inputRef={field.ref}
                                            value="121"
                                            checked={field.value === '121'}/>
                                        <label
                                            htmlFor="121"
                                            className="ml-1 mr-6 text-gray-800">
                                            121
                                        </label>

                                        <RadioButton
                                            inputId="134"
                                            {...field}
                                            inputRef={field.ref}
                                            value="134"
                                            checked={field.value === '134'}/>
                                        <label
                                            htmlFor="134"
                                            className="ml-1 text-gray-800">
                                            134
                                        </label>
                                    </div>
                                </>)}
                            />
                            {errors.temperatura && <Errors message={errors.temperatura.message}/>}
                        </div>

                        <div className={styleDivRadioGroup}>
              <span className={styleSpan}>
                Tipo:
              </span>
                            <Controller
                                name="tipo"
                                control={control}
                                render={({field}) => (<>
                                    <div className="flex align-items-center">
                                        <RadioButton
                                            inputId="cubaRim"
                                            {...field}
                                            inputRef={field.ref}
                                            value="Cuba Rim"
                                            checked={field.value === 'Cuba Rim'}/>
                                        <label
                                            htmlFor="cubaRim"
                                            className="ml-1 mr-6 text-gray-800">
                                            Cuba Rim
                                        </label>

                                        <RadioButton
                                            inputId="bandeja"
                                            {...field}
                                            inputRef={field.ref}
                                            value="Bandeja"
                                            checked={field.value === 'Bandeja'}/>
                                        <label
                                            htmlFor="bandeja"
                                            className="ml-1 mr-6 text-gray-800">
                                            Bandeja
                                        </label>

                                        <RadioButton
                                            inputId="caixa"
                                            {...field}
                                            inputRef={field.ref}
                                            value="Caixa"
                                            checked={field.value === 'Caixa'}/>
                                        <label
                                            htmlFor="caixa"
                                            className="ml-1 text-gray-800">
                                            Caixa
                                        </label>
                                    </div>
                                </>)}
                            />
                            {errors.tipo && <Errors message={errors.tipo.message}/>}
                        </div>

                        <div className={styleDivRadioGroup}>
              <span className={styleSpan}>
                Validade:
              </span>
                            <Controller
                                name="validade"
                                control={control}
                                render={({field}) => (<>

                                    <div className="flex align-items-center">
                                        <RadioButton
                                            inputId="validity1"
                                            {...field}
                                            inputRef={field.ref}
                                            value="1"
                                            checked={field.value === '1'}/>
                                        <label
                                            htmlFor="validity1"
                                            className="ml-1 mr-6 text-gray-800">
                                            1
                                        </label>

                                        <RadioButton
                                            inputId="validity2"
                                            {...field}
                                            inputRef={field.ref}
                                            value="2"
                                            checked={field.value === '2'}/>
                                        <label
                                            htmlFor="validity2"
                                            className="ml-1 mr-6 text-gray-800">
                                            2
                                        </label>

                                        <RadioButton
                                            inputId="validity3"
                                            {...field}
                                            inputRef={field.ref}
                                            value="3"
                                            checked={field.value === '3'}/>
                                        <label
                                            htmlFor="validity3"
                                            className="ml-1 text-gray-800">
                                            3
                                        </label>
                                    </div>
                                </>)}
                            />
                            {showErrorValidade}
                        </div>

                        <div className={styleDivRadioGroup}>
              <span
                  className={styleSpan}>
                Criticidade de Marcação:
              </span>
                            <Controller
                                name="criticidade"
                                control={control}
                                render={({field}) => (<>

                                    <div className="flex align-items-center">
                                        <RadioButton
                                            inputId="criticidade1"
                                            {...field}
                                            inputRef={field.ref}
                                            value="1"
                                            checked={field.value === '1'}/>
                                        <label
                                            htmlFor="criticidade1"
                                            className="ml-1 mr-6 text-gray-800">
                                            1
                                        </label>

                                        <RadioButton
                                            inputId="criticidade2"
                                            {...field}
                                            inputRef={field.ref}
                                            value="2"
                                            checked={field.value === '2'}/>
                                        <label
                                            htmlFor="criticidade2"
                                            className="ml-1 mr-6 text-gray-800">
                                            2
                                        </label>

                                        <RadioButton
                                            inputId="criticidade3"
                                            {...field}
                                            inputRef={field.ref}
                                            value="3"
                                            checked={field.value === '3'}/>
                                        <label
                                            htmlFor="criticidade3"
                                            className="ml-1 text-gray-800">
                                            3
                                        </label>
                                    </div>
                                </>)}
                            />
                            {showErrorCriticidade}
                        </div>

                    </div>


                </div>

                <table className={styleTable}>
                    <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Criticidade</th>
                        <th>Valor</th>
                        <th>Remover</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <AutoComplete
                                field="descricao"
                                className="w-full mt-3"
                                inputClassName="w-full"
                                value={value}
                                suggestions={items}
                                completeMethod={search}
                                onChange={(e) => setValue(e.value)}
                            />
                        </td>
                        <td>
                            <Input
                                type="number"
                                {...register('caixa')}
                                inputClassName="mt-3"
                            />
                        </td>
                        <td>
                            <Input
                                type="number"
                                {...register('caixa')}
                                inputClassName="mt-3"
                            />
                        </td>
                        <td>
                            <Input
                                type="number"
                                {...register('caixa')}
                                inputClassName="mt-3"
                            />
                        </td>
                        <td>
                            <Button className="mt-3" icon='pi pi-trash'/>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <Button
                    label="Cadastrar"
                    className={styleBtn1}
                    type='submit'
                />
            </form>

        </div>
    )
}
