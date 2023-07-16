import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { DriverFormSchemaType, driverFormSchema } from "./schemas"
import { Button } from "primereact/button"
import { Input } from "@/components/Input.tsx"
import { Errors } from "@/components/Errors.tsx"
import { RadioButton } from "primereact/radiobutton"
import { DriverAPI } from "@/infra/integrations/driver.ts"
import { useRef, useState } from "react"
import { Toast } from 'primereact/toast';
import {useAuth} from "@/provider/Auth";

export function NewDriver() {
  const [password, setPassword] = useState<string | number | undefined>()
  const [confirmPassword, setConfirmPassword] = useState<string | number | undefined>()

  const toast = useRef<Toast>(null);
  const showError = () => {
    toast.current?.show({ severity: 'error', summary: 'Senha Incorreta!', detail: 'O campo "Confirme a senha" deve estar igual ao campo "Senha"' });
  };
  const show = () => {
    toast.current?.show({ severity: 'success', summary: 'Sucesso!', detail: 'Motorista cadastrado com sucesso' });
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {errors}
  } = useForm<DriverFormSchemaType>({resolver: zodResolver(driverFormSchema)})

  const {user} = useAuth();

  function handleDriver(data: DriverFormSchemaType) {
    if (password !== confirmPassword) {
      return showError()
    }
    try {
      DriverAPI.save(user, data).then(() => {
        show()
        reset()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="flex flex-column align-items-center">
        <Toast ref={toast} />
          <h1 className="text-4xl mb-6 text-blue-600">Cadastro de Motoristas</h1>
          <form className="w-full px-8" onSubmit={handleSubmit(handleDriver)}>
            <div className="flex gap-5 justify-content-between">
              <div className="flex flex-column gap-4 w-full">
                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="CPF"
                    {...register('cpf')}
                  />
                  {errors.cpf && <Errors message={errors.cpf.message}/>}
                </div>

                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="Nome"
                    {...register('nome')}
                  />
                  {errors.nome && <Errors message={errors.nome.message}/>}
                </div>

                <div className="text-left -mt-2">
                  <label
                    htmlFor=""
                    className="text-gray-500 text-xs">Dt. Nascimento</label>
                  <Input
                    type="date"
                    placeholder=""
                    {...register('dtnascimento')} />
                  {errors.dtnascimento && <Errors message={errors.dtnascimento.message}/>}

                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Telefone"
                    {...register('contato')} />
                </div>

              </div>
              <div className="flex flex-column gap-4 w-full">
                <div className="text-left">
                  <Input
                    type="text"
                    placeholder="Matrícula"
                    {...register('matricula')} />
                </div>

                <div className="mt-3 flex gap-5 p-2 border-1 border-round border-gray-400">
                  <Controller
                    name="sexo"
                    control={control}
                    render={({field}) => (
                      <>
                        <h3 className="m-0 mr-3 text-gray-800">Sexo:</h3>
                        <div className="flex align-items-center">
                          <RadioButton
                            inputId="sexoM"
                            {...field}
                            inputRef={field.ref}
                            value="M"
                            checked={field.value === 'M'}/>
                          <label
                            htmlFor="sexoM"
                            className="ml-1 mr-6 text-gray-800">
                            Masculino
                          </label>

                          <RadioButton
                            inputId="sexoF"
                            {...field}
                            inputRef={field.ref}
                            value="F"
                            checked={field.value === 'F'}/>
                          <label
                            htmlFor="sexoF"
                            className="ml-1 text-gray-800">
                            Feminino
                          </label>
                        </div>
                      </>
                    )}
                  />
                  {errors.sexo && <Errors message={errors.sexo.message}/>}
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
                  <Input type="text" placeholder="Usuário" {...register('apelidousu')} />
                  {errors.apelidousu && <Errors message={errors.apelidousu.message}/>}
                </div>

                <div className="text-left mt-3">
                  <Input
                    type="password"
                    placeholder="Senha"
                    {...register('senhausu')}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.senhausu && <Errors message={errors.senhausu.message}/>}
                </div>
                <div className="text-left">
                  <Input
                    type="password"
                    placeholder="Confirme a senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

              </div>

            </div>

            <Button
              label="Cadastrar"
              className='w-2 mt-5'
              type='submit'
            />
          </form>
      </div>
  )
}
