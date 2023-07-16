import { useState } from "react";

import { Input } from "@/components/Input.tsx";
import { Errors } from "@/components/Errors.tsx";

import { Button } from 'primereact/button';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";

import * as Z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { userFormSchema } from "./schemas";

import { Controller, useForm } from 'react-hook-form'

import Occupation from "../../../util/occupation.json"
import Perfil from "../../../util/perfil.json"

type UserFormInputs = Z.infer<typeof userFormSchema>

export function UserRegister() {
  const [perfil] = useState(Perfil);
  const [occupation] = useState(Occupation)

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<UserFormInputs>({ resolver: zodResolver(userFormSchema) })

  function handleUser(data: UserFormInputs) {
    try {
      console.log(data)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex pt-4 justify-content-center">
        <div className="h-30rem w-full flex">

          <div className="w-full h-full flex flex-column border-round">
            <h1 className='m-0 p-0 mb-2 text-blue-600'>Cadastro</h1>

            <form className='w-full px-8 py-3 flex flex-column gap-5' onSubmit={handleSubmit(handleUser)}>
                <div className="flex gap-5 justify-content-between">
                    <div className="flex flex-column gap-4 w-full">
                      <div className="text-left">
                        <Input type="text" placeholder="CPF" {...register('cpf')} />
                        {errors.cpf && <Errors message={errors.cpf.message}/>}
                      </div>

                      <div className="flex gap-5 py-3">
                          <Controller
                            name="rt"
                            control={control}
                            render={({ field }) => (
                                <>
                                  <h3 className="m-0 mr-3">RT:</h3>
                                  <div className="flex align-items-center">
                                      <RadioButton inputId="rtsim" {...field} inputRef={field.ref} value="Sim" checked={field.value === 'Sim'} />
                                      <label htmlFor="rtsim" className="ml-1 mr-6">
                                          Sim
                                      </label>

                                      <RadioButton inputId="rtnao" {...field} inputRef={field.ref} value="Nao" checked={field.value === 'Nao'} />
                                      <label htmlFor="rtnao" className="ml-1">
                                          Não
                                      </label>
                                  </div>
                                </>
                            )}
                          />
                          {errors.rt && <Errors message={errors.rt.message}/>}
                      </div>

                      <div className="text-left">
                        <Input type="text" placeholder="Nome" {...register('name')} />
                        {errors.name && <Errors message={errors.name.message}/>}
                      </div>

                      <div className="text-left">
                        <Input type="text" placeholder="Matrícula" {...register('registration')} />
                      </div>

                      <div className="text-left">
                        <Input type="text" placeholder="Coren" {...register('coren')} />
                        {errors.coren && <Errors message={errors.coren.message}/>}
                      </div>

                    </div>
                    <div className="flex flex-column gap-4 w-full">
                      <div className="text-left -mt-4">
                        <label htmlFor="" className="text-gray-500 text-xs">Dt. Nascimento</label>
                        <Input type="date" placeholder="" {...register('dtNasc')} />
                        {errors.dtNasc && <Errors message={errors.dtNasc.message}/>}

                      </div>
                      <div className="text-left -mt-3">
                        <label htmlFor="" className="text-gray-500 text-xs">Dt. Admissão</label>
                        <Input type="date" placeholder="" {...register('dtAdm')} />
                        {errors.dtAdm && <Errors message={errors.dtAdm.message}/>}

                      </div>
                      <div className="text-left -mt-3">
                        <label htmlFor="" className="text-gray-500 text-xs">Dt. Desligamento</label>
                        <Input type="date" placeholder="" {...register('dtDesl')} />
                      </div>

                        <div className="text-left">
                          <Input type="text" placeholder="Email" {...register('email')} />
                          {errors.email && <Errors message={errors.email.message}/>}

                        </div>

                        <div>
                          <Input type="text" placeholder="Telefone" {...register('telefone')} />
                        </div>

                    </div>

                    <div className="flex flex-column gap-4 w-full">
                        <div className="flex gap-5 py-3">
                          <Controller
                            name="sexo"
                            control={control}
                            render={({ field }) => (
                                <>
                                  <h3 className="m-0 mr-3">Sexo:</h3>
                                  <div className="flex align-items-center">
                                      <RadioButton inputId="sexoM" {...field} inputRef={field.ref} value="Masculino" checked={field.value === 'Masculino'} />
                                      <label htmlFor="sexoM" className="ml-1 mr-6">
                                          Masculino
                                      </label>

                                      <RadioButton inputId="sexoF" {...field} inputRef={field.ref} value="Feminino" checked={field.value === 'Feminino'} />
                                      <label htmlFor="sexoF" className="ml-1">
                                          Feminino
                                      </label>
                                  </div>
                                </>
                            )}
                          />
                          {errors.sexo && <Errors message={errors.sexo.message}/>}
                        </div>
                        <div className="text-left">
                          <Controller
                            control={control}
                            name='occupation'
                            render={({field}) => {
                                return (
                                  <Dropdown
                                      className='w-full text-left'
                                      placeholder='Profissão'
                                      id={field.name}
                                      options={occupation}
                                      value={field.value}
                                      onChange={(e) => field.onChange(e.value)}
                                      optionLabel="name"
                                  />
                                )
                            }}
                          />
                          {errors.occupation && <Errors message={errors.occupation.message}/>}
                        </div>

                        <div className="text-left">
                          <Input type="text" placeholder="Usuário" {...register('username')} />
                          {errors.username && <Errors message={errors.username.message}/>}
                        </div>

                        <div className="text-left">
                          <Input type="password" placeholder="Senha" {...register('password')} />
                          {errors.password && <Errors message={errors.password.message}/>}
                        </div>
                        <div className="text-left">
                          <Input type="password" placeholder="Confirme a senha" {...register('passwordConfirm')} />
                          {errors.passwordConfirm && <Errors message={errors.passwordConfirm.message}/>}
                        </div>
                    </div>

                </div>

            <Controller
              name="perfil"
              control={control}
              render={({ field }) => <MultiSelect
                id={field.name}
                name="perfil"
                value={field.value}
                options={perfil}
                onChange={(e: MultiSelectChangeEvent) => field.onChange(e.value)}
                optionLabel="name"
                placeholder="Selecione o Perfil"
                className="w-full"
              />}
            />

              <Button label="Cadastrar" className='w-full mt-2 text-white hover:bg-blue-500'
                style={{ backgroundColor: 'var(--blue-color)' }} type='submit'
              />
            </form>
          </div>
        </div >
      </div >
    </>
  )
}
