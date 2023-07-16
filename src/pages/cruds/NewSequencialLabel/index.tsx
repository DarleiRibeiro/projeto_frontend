import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/Input.tsx";
import { z } from "zod";
import { labelFormSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutoComplete, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import boxes from "@/util/boxes.json"
import { useState } from "react";
import { Button } from "primereact/button";

type LabelFormInputs = z.infer<typeof labelFormSchema>

interface SequencialLabels {
    name: string
}

export function NewSequencialLabel() {
    const [boxName, setBoxName] = useState<SequencialLabels[]>([]);
    const [items, setItems] = useState('')

    const filteredCaixaAbreviada = boxes.filter(box => box.caixaAbreviada.includes(items))

    const {
        control, register, handleSubmit, reset, formState: {errors}
    } = useForm<LabelFormInputs>({resolver: zodResolver(labelFormSchema)})

    function handleLabel(data: LabelFormInputs) {
        try {
            console.log(data)
            reset()
        } catch (error) {
            console.log(error)
        }
    }

    const search = (event: AutoCompleteCompleteEvent) => {
        if (event.query.length > 3) {
          const filtred: SequencialLabels[] = boxes.filter(box => box.name.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
          setBoxName(filtred);
        }
    }
    return (
        <div className="p-5 flex flex-column align-items-center">
            <h1 className="text-4xl text-blue-600 mb-5">Novo Sequencial de Etiqueta</h1>
            <form onSubmit={handleSubmit(handleLabel)} className="flex align-items-center gap-3 justify-content-center mb-5">
                <Input placeholder="Sequencial" { ...register('sequencial') } />
                <Controller
                    name="caixa"
                    control={control}
                    render={({ field }) => (
                        <span className="p-float-label">
                            <AutoComplete
                                field="name"
                                suggestions={boxName}
                                completeMethod={search}
                                onChange={field.onChange}
                                value={field.value}
                            />
                            <label htmlFor={field.name}>Caixa</label>
                        </span>
                    )}
                />
                <Button
                    label="Cadastrar"
                    type='submit'
                />
            </form>

            <h3 className="text-2xl text-blue-600 my-5">Pesquisa de Sequencial de Etiquetas</h3>
            <div className="flex align-items-center gap-3 justify-content-center">
                <Input placeholder="Caixa Abreviada" />
                <Input placeholder="Sequencial" />
            </div>

        </div>
    )
}
