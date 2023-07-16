import {useState} from 'react';
import {DataTable} from 'primereact/datatable'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import productService from "@/util/tipopacote.json";
import {Input} from '@/components/Input.tsx'
import {Errors} from "@/components/Errors.tsx";

const TypeProductSchema = z.object({
    idtipopacote: z.number().nullable(),
    descricao: z.string().nonempty('Descrição não informada!'),

})
type TypeProductInputs = z.infer<typeof TypeProductSchema>
type ProductProps = z.infer<typeof TypeProductSchema>

export function TypeProduct() {
    const defaultValues = {
        descricao: '',
        idtipopacote: null,

    }

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: {errors}
    } = useForm<TypeProductInputs>({resolver: zodResolver(TypeProductSchema), defaultValues})


    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setdeleteProductDialog] = useState(false);
    const [products, setProducts] = useState<ProductProps[]>(productService)
    const [product, setProduct] = useState<ProductProps>()

    function handleCreateOrEditTypeProduct(data: TypeProductInputs) {

        try {
            if (data.idtipopacote) {
                console.log('editar', data)
            } else {
                console.log('criar', data)
            }

            reset()

            setProductDialog(false);
        } catch (error) {
            console.error(error)
        }
    }

    const openNew = () => {

        setProductDialog(true);
    }

    function hideDialog() {
        reset()
        setProductDialog(false);
        setdeleteProductDialog(false)
    }

    function editProduct(rowData: TypeProductInputs) {

        setValue('descricao', rowData.descricao)
        setValue('idtipopacote', rowData.idtipopacote)
        setProductDialog(true);
    }

    function deleteProduct(idsubtipoproduto: number) {
        try {
            console.log(idsubtipoproduto)
            setdeleteProductDialog(false)
        } catch (error) {
            console.error(error);

        }
    }

    function confirmDeleteTypeProduct(data: TypeProductInputs) {
        setProduct(data)
        setdeleteProductDialog(true)
    }

    function deleteProductDialogFooter() {
        return (
            <>
                <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDialog}/>
                <Button label="Yes" icon="pi pi-check" className="p-button-text"
                        onClick={() => deleteProduct(product?.idtipopacote as number)}/>
            </>
        )
    }

    const actionBodyTemplate = (rowData: TypeProductInputs) => {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" rounded
                        onClick={() => editProduct(rowData)}/>
                <Button icon="pi pi-trash " className="p-button-rounded p-button-warning "
                        onClick={() => confirmDeleteTypeProduct(rowData)}/>
            </>
        );
    }

    return (
        <div className='datatable-crud mx-8 mt-5'>
            <div className='cars'>
                <div className=' flex align-items-center justify-content-end mb-2'>
                    <Button icon="pi pi-plus" label="New" className='mr-2' onClick={openNew}/>
                </div>
                <DataTable value={products}>
                    <Column field="idtipopacote" header="Código"></Column>
                    <Column field="descricao" header="Descrição"></Column>
                    <Column body={actionBodyTemplate} exportable={true} className='flex flex-row justify-content-end'
                            header='Actions'></Column>
                </DataTable>
            </div>
            <Dialog
                visible={productDialog}
                header="Novo Tipo Produto"
                modal
                className="absolute"
                style={{width: '450px', top: '10rem'}}
                onHide={hideDialog}
            >
                <form onSubmit={handleSubmit(handleCreateOrEditTypeProduct)}>
                    <div className='field mt-5'>
                        <label>Descrição</label>
                        <Input type='text'   {...register('descricao')} />
                        {errors.descricao && <Errors message={errors.descricao.message}/>}
                    </div>
                    <div className='flex flex-row gap-2 justify-content-end mt-4'>
                        <Button label="Yes" icon="pi pi-check" className="p-button-text" type='submit'/>
                        <Button label="No" icon="pi pi-times" className="p-button-text" type='reset'
                                onClick={hideDialog}/>
                    </div>
                </form>
            </Dialog>
            <Dialog visible={deleteProductDialog} style={{width: '450px'}} header="Confirm"
                    footer={deleteProductDialogFooter} modal onHide={hideDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{fontSize: '2rem'}}/>
                    {product && <span>Deseja excluir <b>{product.descricao}</b>?</span>}
                </div>
            </Dialog>
        </div>
    )
}
