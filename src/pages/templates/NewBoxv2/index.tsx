import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import products from "../CreateProduct/produto.json"
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { ProductsType } from '../NewBox';

export default function NewBoxv2() {
  const [selectedClient, setSelectedClient] = useState(null);
  const clients = [
    { name: 'Fernando' },
    { name: 'Jhonatan' },
    { name: 'Erivelton' },
  ];

  const validite = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
  ]

  const [value, setValue] = useState('');
  const [items, setItems] = useState<ProductsType[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {

    if (event.query.length > 3) {
      const filtred: ProductsType[] = products.produtos.filter(prod => prod.descricao.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));

      setItems(filtred);
    }
  }
  return (
    <div>
      <h1>Nova Caixa</h1>
      <div>
        <form className='mb-5'>
          <div className='flex gap-5 border-bottom-1 border-600'>
            <div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Caixa*</label>
                <InputText placeholder="Nome da Caixa" />
              </div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Cliente*</label>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione um Cliente" className="w-full md:w-14rem" />
              </div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Embalagem*</label>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione a Caixa" className="w-full md:w-14rem" />
              </div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Temperatura*</label>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione um Cliente" className="w-full md:w-14rem" />
              </div>
            </div>

            <div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Caixa Abreviado*</label>
                <InputText placeholder="Abreviação da Caixa" />
              </div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Tipo*</label>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione o Tipo" className="w-full md:w-14rem" />
              </div>
              <div className='flex align-items-center gap-2 mb-2'>
                <label htmlFor="" className='w-12rem'>Validade*</label>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={validite} optionLabel="name"
                  placeholder="Selecione" className="w-full md:w-14rem" />
              </div>
              <div className='flex align-items-center gap-2 mb-5'>
                <label htmlFor="" className='w-12rem'>Criticidade de Marcação*</label>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione" className="w-full md:w-14rem" />
              </div>
            </div>

          </div>
        </form>

        <AutoComplete field="descricao" value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} />


        <DataTable tableStyle={{ minWidth: '50rem' }}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>

      </div>
    </div>
  )
}
