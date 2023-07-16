import * as Z from 'zod'
import { Divider } from 'primereact/divider'
import { Button } from 'primereact/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/Input.tsx'

const ProductFormSchema = Z.object({
  subTipoProduto: Z.string(),

})
type ProdutoFormInputs = Z.infer<typeof ProductFormSchema>

export function Produto() {
  const defaultValues = { subTipoProduto: '' }

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<ProdutoFormInputs>({ resolver: zodResolver(ProductFormSchema), defaultValues })

  function handleCreateProduto(data: ProdutoFormInputs) {
    try {
      //console.log(data)
      reset()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="w-screen justify-content-between  mt-8 ">
        <form onSubmit={handleSubmit(handleCreateProduto)} className='w-8 m-auto'>
          <h1 className='m-0 text-3xl'>Sub Tipo de Produto </h1>
          <div className='flex flex-row gap-2 justify-content-end'>
            <Button label='Salvar' type='submit' className='text-white bg-blue-500' />
            <Button label='Cancelar' type='reset' className='text-white bg-red-500' />
          </div>
          <Divider />
          <div className="field mt-5">
            <Input type="text" placeholder='Novo Tipo' {...register('subTipoProduto')} />
          </div>
        </form>
      </div>
    </>
  )
}
