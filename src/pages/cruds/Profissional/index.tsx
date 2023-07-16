import {useEffect, useState} from "react";
import {Input} from "@/components/Input.tsx";
import {Errors} from "@/components/Errors.tsx";
import {Button} from 'primereact/button';
import {RadioButton} from "primereact/radiobutton";
import {Dropdown} from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import {zodResolver} from '@hookform/resolvers/zod'
import {userFormSchema, UserFormAddType} from "./schemas";
import {Controller, useForm} from 'react-hook-form'
import occupations from '../../../util/occupation.json'
import Perfil from '../../../util/perfil.json'
import './style.css'
import {styleBtn1} from "@/util/styles";
import {useAuth} from "@/provider/Auth";
import {UserProfissionalAPI} from "@/infra/integrations/usuario.ts";

export function CreateProfissional() {
  const [perfil] = useState(Perfil);

  const {
    control, register, handleSubmit, reset, formState: {errors}
  } = useForm<UserFormAddType>({resolver: zodResolver(userFormSchema)})

  const {user} = useAuth();

  function handleUser(data: UserFormAddType) {
    try {

      UserProfissionalAPI.save(user, data).then(r=> {
        console.log(r)
        //Todo fazer cadastreo de profissional apontar pra api de fatp
        reset()
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-screen flex pt-4 justify-content-center">
      <div className="h-30rem w-full flex">
        <div className="w-full h-full flex flex-column border-round">
          <h1 className='m-0 p-0 mb-4 text-blue-600 text-4xl'>Cadastro</h1>
          <form
            className='w-full px-8 py-3 flex flex-column gap-5'
            onSubmit={handleSubmit(handleUser)}>
            <div className="flex gap-5 justify-content-between">
              <div className="flex flex-column gap-4 w-full">
                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="CPF"
                    {...register('cpf')} />
                  {errors.cpf && <Errors message={errors.cpf.message}/>}
                </div>

                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="Nome"
                    {...register('name')} />
                  {errors.name && <Errors message={errors.name.message}/>}
                </div>

                <div className="text-left -mt-2">
                  <label
                    htmlFor=""
                    className="text-gray-500 text-xs">Dt. Nascimento</label>
                  <Input
                    type="date"
                    placeholder=""
                    {...register('dtNasc')} />
                  {errors.dtNasc && <Errors message={errors.dtNasc.message}/>}

                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Telefone"
                    {...register('telefone')} />
                </div>

                <div className="flex gap-5 p-2 border-1 border-round border-gray-400">
                  <Controller
                    name="sexo"
                    control={control}
                    render={({field}) => (<>
                      <h3 className="m-0 mr-3 text-gray-800">Sexo:</h3>
                      <div className="flex align-items-center">
                        <RadioButton
                          inputId="sexoM"
                          {...field}
                          inputRef={field.ref}
                          value="Masculino"
                          checked={field.value === 'Masculino'}/>
                        <label
                          htmlFor="sexoM"
                          className="ml-1 mr-6 text-gray-800">
                          Masculino
                        </label>

                        <RadioButton
                          inputId="sexoF"
                          {...field}
                          inputRef={field.ref}
                          value="Feminino"
                          checked={field.value === 'Feminino'}/>
                        <label
                          htmlFor="sexoF"
                          className="ml-1 text-gray-800">
                          Feminino
                        </label>
                      </div>
                    </>)}
                  />
                  {errors.sexo && <Errors message={errors.sexo.message}/>}
                </div>

              </div>
              <div className="flex flex-column gap-4 w-full">
                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="Matrícula"
                    {...register('registration')} />
                </div>

                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="Coren"
                    {...register('coren')} />
                  {errors.coren && <Errors message={errors.coren.message}/>}
                </div>

                <div className="text-left -mt-4">
                  <label htmlFor="" className="text-gray-500 text-xs">Profissão</label>
                  <Controller
                    control={control}
                    name='idprofissao'
                    render={({field}) => {
                      return (<Dropdown
                        className='w-full text-left h-dropdown'
                        placeholder='Profissão'
                        id={field.name}
                        options={occupations}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        optionLabel="descricao"
                        optionValue="idprofissao"
                      />)
                    }}
                  />
                  {errors.idprofissao && <Errors message={errors.idprofissao.message}/>}
                </div>

                <div className="flex gap-5 p-2 border-1 border-gray-400 border-round">
                  <Controller
                    name="rt"
                    control={control}
                    render={({field}) => (<>
                      <h3 className="m-0 mr-3 text-gray-800">RT:</h3>
                      <div className="flex align-items-center">
                        <RadioButton
                          inputId="rtsim"
                          {...field}
                          inputRef={field.ref}
                          value="Sim"
                          checked={field.value === 'Sim'}/>
                        <label
                          htmlFor="rtsim"
                          className="ml-1 mr-6 text-gray-800">
                          Sim
                        </label>

                        <RadioButton
                          inputId="rtnao"
                          {...field}
                          inputRef={field.ref}
                          value="Nao" checked={field.value === 'Nao'}/>
                        <label htmlFor="rtnao" className="ml-1 text-gray-800">
                          Não
                        </label>
                      </div>
                    </>)}
                  />
                  {errors.rt && <Errors message={errors.rt.message}/>}
                </div>
              </div>
              <div className="flex flex-column gap-4 w-full">
                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="Email"
                    {...register('email')} />
                  {errors.email && <Errors message={errors.email.message}/>}

                </div>

                <div className="text-left">
                  <Input type="text" placeholder="Usuário" {...register('username')} />
                  {errors.username && <Errors message={errors.username.message}/>}
                </div>

                <div className="text-left mt-3">
                  <Input type="password" placeholder="Senha" {...register('password')} />
                  {errors.password && <Errors message={errors.password.message}/>}
                </div>
                <div className="text-left">
                  <Input type="password" placeholder="Confirme a senha" {...register('passwordConfirm')} />
                  {errors.passwordConfirm && <Errors message={errors.passwordConfirm.message}/>}
                </div>


                <div className="text-left -mt-4">
                  <label htmlFor="" className="text-gray-500 text-xs">Perfil</label>
                  <Controller
                    name="perfil"
                    control={control}
                    render={({ field }) =>
                      <MultiSelect
                        id={field.name}
                        name="perfil"
                        value={field.value}
                        options={perfil}
                        onChange={(e: MultiSelectChangeEvent) => field.onChange(e.value)}
                        optionLabel="name"
                        placeholder="Selecione o Perfil"
                        className="w-full h-dropdown"
                      />
                    }
                  />
                </div>
              </div>

            </div>

            <Button
              label="Cadastrar"
              className={styleBtn1}
              type='submit'
              onClick={()=> {
                handleSubmit(handleUser)
              }}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
