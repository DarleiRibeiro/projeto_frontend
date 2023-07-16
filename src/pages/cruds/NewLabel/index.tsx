import {useEffect, useState} from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {labelFormSchema, LabelFormType} from "./schemas"
import {Controller, useForm} from "react-hook-form"
import {Dropdown} from "primereact/dropdown"
import {Button} from "primereact/button"
import {InputNumber} from 'primereact/inputnumber';
import {RadioButton} from "primereact/radiobutton"
import {Input} from "@/components/Input.tsx"

import {validityMonth} from "./helps.ts";
import {LabelAPI, LabelResponse} from "@/infra/integrations/label.ts";
import {ComplementoAPI, ComplementoResponse} from "@/infra/integrations/complemento.ts"
import {ClientAPI, ClientResponse} from "@/infra/integrations/client.ts"
import {ProductAPI, ProductResponse} from "@/infra/integrations/produto.ts"

import {styleDivRadioGroup, styleDropdown} from "@/util/styles"
import {useAuth} from "@/provider/Auth";

export function NewLabel() {
  const [optionsClient, setOptionsClient] = useState<ClientResponse>()
  const [optionsProduct, setOptionsProduct] = useState<ProductResponse>()
  const [optionsComplemento, setOptionsComplemento] = useState<ComplementoResponse>()
  const [optionsSelectEtiqueta, setOptionsSelectEtiqueta] = useState<LabelResponse>()

  const styleSpanRadios = '-mt-4 left-0 p-0 text-xs text-gray-600 absolute'
  const styleLabelRadio = 'ml-1 mr-6 text-gray-800'
  const styleDivInputs = 'w-full flex flex-column gap-5'

    const {user} = useAuth();

  useEffect(() => {
    let mounted = true;
    (() => {
        if(user) {
            ClientAPI
                .getOptions(user)
                .then((data) => {
                    if (mounted) setOptionsClient(data)
                })
                .catch(e => {
                    setOptionsClient(e.data)
                })
            ProductAPI
                .getOptions(user)
                .then((data) => {
                    if (mounted) setOptionsProduct(data)
                })
                .catch(e => {
                    setOptionsProduct(e.data)
                })
            ComplementoAPI
                .getOptions(user)
                .then((data) => {
                    if (mounted) setOptionsComplemento(data)
                })
                .catch(e => {
                    setOptionsComplemento(e.data)
                })
            LabelAPI
                .getOptions(user)
                .then((data) => {
                    if (mounted) setOptionsSelectEtiqueta(data)
                })
                .catch(e => {
                    setOptionsSelectEtiqueta(e.data)
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
  } = useForm<LabelFormType>({resolver: zodResolver(labelFormSchema)})

  const handleLabel = (data: LabelFormType) => {
    // console.log(data)
    LabelAPI.save(user, data).then(() => {
      // console.log('sucesso!')
      reset()
    }).catch(error => {
      console.log(error)
    })
  }
  if(!optionsSelectEtiqueta) {
    //TODO show skelecton
    return <div></div>
  }

  return (
    <div className="">
      <h1 className="text-4xl text-blue-600 mb-4">Nova Etiqueta</h1>
      <form onSubmit={handleSubmit(handleLabel)} className="px-8 py-3">
        <div className="flex justify-content-center gap-5">
          <div className={styleDivInputs}>
            <div className="text-left">
              <Controller
                control={control}
                name='validademes'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={validityMonth}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        optionLabel="dateFormat"
                      />
                      <label htmlFor="">
                        Validade Mês
                      </label>
                  </span>
                  )
                }}
              />
            </div>

            <div className="text-left">
              <Controller
                control={control}
                name='cliente'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={optionsClient?.results}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        optionLabel="nomecli"
                        filter
                      />
                      <label htmlFor="">
                        Cliente
                      </label>
                    </span>
                  )
                }}
              />
            </div>

            <div className="text-left">
              <Controller
                control={control}
                name='produto'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                        <Dropdown
                          className={styleDropdown}
                          id={field.name}
                          options={optionsProduct?.results}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                          optionLabel="descricao"
                        />
                        <label htmlFor="">
                          Produto
                        </label>
                    </span>
                  )
                }}
              />
            </div>

            <div className="text-left">
              <Controller
                control={control}
                name='complemento'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={optionsComplemento?.results}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        optionLabel="descricao"
                        filter
                        emptyFilterMessage={
                          <Button
                            label="Adicionar Complemento"
                          />
                        }
                      />
                      <label htmlFor="">
                        Complemento
                      </label>
                  </span>
                  )
                }}
              />
            </div>


            <div className="text-left">
              <Controller
                control={control}
                name='seladoratipo'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={optionsSelectEtiqueta.seladora}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor="">
                        Seladora / Tipo
                      </label>
                    </span>
                  )
                }}
              />
            </div>
          </div>

          <div className={styleDivInputs}>
            <div className="text-left">
              <Controller
                control={control}
                name='autoclave'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={optionsSelectEtiqueta.autoclave}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor="">
                        AutoClave
                      </label>
                  </span>
                  )
                }}
              />
            </div>

            <div className="text-left">
              <Controller
                control={control}
                name='tipoImpressoraEtiqueta'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={optionsSelectEtiqueta.tipoImpressoraEtiqueta}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor="">
                        Tipo de Impressao de Etiqueta
                      </label>
                  </span>
                  )
                }}
              />
            </div>

            <div className="text-left">
              <Controller
                control={control}
                name='integrador'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                        className={styleDropdown}
                        id={field.name}
                        options={optionsSelectEtiqueta.integrador}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor="">
                        Integrador
                      </label>
                  </span>
                  )
                }}
              />
            </div>

            <div className="text-left">
              <Input
                placeholder="Peso"
                keyfilter="int"
                {...register('peso')}
              />
            </div>

            <div className="text-left">
              <Input
                placeholder="Cautela"
                {...register('cautela')}
              />
            </div>
          </div>

          <div className="w-full flex flex-column gap-4">
            <div className="relative mb-1">
              <span className={styleSpanRadios}>
                Temperatura:
              </span>
              <div className={styleDivRadioGroup}>
                <Controller
                  name="temperatura"
                  control={control}
                  render={({field}) => (
                    <>
                      <div className="flex align-items-center">
                        <RadioButton
                          inputId="121"
                          {...field}
                          inputRef={field.ref}
                          value="121"
                          checked={field.value === '121'}
                        />
                        <label
                          htmlFor="121"
                          className={styleLabelRadio}>
                          121
                        </label>

                        <RadioButton
                          inputId="134"
                          {...field}
                          inputRef={field.ref}
                          value="134"
                          checked={field.value === '134'}
                        />
                        <label
                          htmlFor="134"
                          className="ml-1 text-gray-800">
                          134
                        </label>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="relative">
              <span className={styleSpanRadios}>
                Biologico:
              </span>
              <div className={styleDivRadioGroup}>
                <Controller
                  name="biologico"
                  control={control}
                  render={({field}) => (
                    <>
                      <div className="flex align-items-center">
                        <RadioButton
                          inputId="sim"
                          {...field}
                          inputRef={field.ref}
                          value="Sim"
                          checked={field.value === 'Sim'}
                        />
                        <label
                          htmlFor="sim"
                          className={styleLabelRadio}>
                          Sim
                        </label>

                        <RadioButton
                          inputId="nao"
                          {...field}
                          inputRef={field.ref}
                          value="Nao"
                          checked={field.value === 'Nao'}
                        />
                        <label
                          htmlFor="nao"
                          className="ml-1 text-gray-800">
                          Não
                        </label>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="text-left">
              <Input
                placeholder="Ciclo"
                {...register('ciclo')}
              />
            </div>

            <div className="text-left mt-2">
              <Controller
                control={control}
                name='termodesinfectadora'
                render={({field}) => {
                  return (
                    <span className="p-float-label">
                      <Dropdown
                          className={styleDropdown}
                          id={field.name}
                          options={optionsSelectEtiqueta.termoDesinfectora}
                          value={field.value}
                          onChange={(e) => field.onChange(e.value)}
                      />
                      <label htmlFor="">
                        Termodesinfectora
                      </label>
                    </span>
                  )
                }}
              />
            </div>

            <div className="flex w-auto gap-2 mt-2">
              <div className="text-left w-7">
                <span className="p-float-label">
                  <InputNumber
                    min={0}
                    max={1000}
                    className="w-full"
                  />
                  <label htmlFor="">
                    Qtd. Itens no Pacote (max = 1000)
                  </label>
                </span>
              </div>

              <div className="text-left w-6">
                <span className="p-float-label">
                  <InputNumber
                    min={0}
                    max={1000}
                    className="w-full"
                  />
                  <label htmlFor="">
                    Qtd. Impressão (max = 1000)
                  </label>
                </span>
              </div>

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
