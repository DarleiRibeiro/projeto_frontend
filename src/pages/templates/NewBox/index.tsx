import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import products from "../CreateProduct/produto.json"
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';

export type ProductsType = {
  idproduto: number
  descricao: string
  dtcadastro: string
  embalagem: string
  status: string,
  idsubtipoproduto: number,
  idtipopacote: number
}

const productstest = [
  {
    "idproduto": 3999,
    "descricao": "GAZES PARA CURATIVO PLASTICA",
    "dtcadastro": "2021-10-06T14:58:49.992Z",
    "embalagem": "GRAU",
    "status": "1",
    "idsubtipoproduto": 1,
    "idtipopacote": 2
  },
  {
    "idproduto": 1,
    "descricao": "CUBA RIM",
    "dtcadastro": "2022-01-24T14:23:14.913Z",
    "embalagem": "SMS",
    "status": "1",
    "idsubtipoproduto": 1,
    "idtipopacote": 1
  },
]


export function NewBoxTemplate() {
  const [selectedClient, setSelectedClient] = useState(null);
  const clients = [
    { name: 'Fernando' },
    { name: 'Jhonatan' },
    { name: 'Erivelton' },
  ];

  const [value, setValue] = useState('');
  const [items, setItems] = useState<ProductsType[]>([]);

  const [typeBox, setTypeBox] = useState<number>();
  const [validityBox, setValidityBox] = useState<number>();
  const [criticalityBox, setCriticalityBox] = useState();
  const [productsBox] = useState(productstest);
  const [ingredient, setIngredient] = useState<string>("");
  const [ingredientP, setIngredientP] = useState<string>("");


  const search = (event: AutoCompleteCompleteEvent) => {


    if (event.query.length > 3) {
      const filtred: ProductsType[] = products.produtos.filter(prod => prod.descricao.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));
      setItems(filtred);
    }
  }
  return (
    <div className='mx-8'>
      <h1>Nova Caixa</h1>
      <div>
        <form className='mb-5'>
          <div className='flex gap-5 border-bottom-1 border-600 justify-content-between'>
            <div className='w-22rem'>

              {/* <Input inputId='box-name' labelHtmlFor='box-name' labelName='Nome da Caixa*' /> */}

              <div className='flex align-items-center gap-2 mb-2'>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione um Cliente*" className="w-full" />
              </div>

              <div className='flex align-items-center gap-2 mb-2'>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione a Caixa*" className="w-full" />
              </div>

              <div className='flex align-items-center gap-2 mb-2'>
                <Dropdown value={selectedClient} onChange={(e) => setSelectedClient(e.value)} options={clients} optionLabel="name"
                  placeholder="Selecione uma Temperatura*" className="w-full" />
              </div>

            </div>

            <div className='w-22rem'>

              {/* <Input inputId='abrev-box' labelHtmlFor='abrev-box' labelName='Caixa Abreviado*' /> */}
{/* 
              <h3 className='m-1 text-base'>Selecione um tipo</h3>
              <div className="flex flex-wrap gap-3 mb-5 justify-content-between">
                <div className="flex align-items-center">
                  <RadioButton inputId="typeBox1" name="tipo" value="1" onChange={(e: RadioButtonChangeEvent) => setTypeBox(e.value)} checked={typeBox === 1} />
                  <label htmlFor="typeBox1" className="ml-2">Cuba Rim</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="typeBox2" name="tipo" value="2" onChange={(e: RadioButtonChangeEvent) => setTypeBox(e.value)} checked={typeBox === 2} />
                  <label htmlFor="typeBox2" className="ml-2">Bandeja</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="typeBox3" name="tipo" value="3" onChange={(e: RadioButtonChangeEvent) => setTypeBox(e.value)} checked={typeBox === 3} />
                  <label htmlFor="typeBox3" className="ml-2">Caixa</label>
                </div>
              </div> */}

              {/* <h3 className='m-1 text-base'>Selecione uma Validade</h3>
              <div className="flex flex-wrap gap-3 mb-5 justify-content-between">
                <div className="flex align-items-center">
                  <RadioButton inputId="validityBox1" name="validade" value="1" onChange={(e: RadioButtonChangeEvent) => setValidityBox(e.value)} checked={validityBox === 1} />
                  <label htmlFor="validityBox1" className="ml-2">1</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="validityBox2" name="validade" value="2" onChange={(e: RadioButtonChangeEvent) => setValidityBox(e.value)} checked={validityBox === 2} />
                  <label htmlFor="validityBox2" className="ml-2">2</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="validityBox3" name="validade" value="3" onChange={(e: RadioButtonChangeEvent) => setValidityBox(e.value)} checked={validityBox === 3} />
                  <label htmlFor="validityBox3" className="ml-2">3</label>
                </div>
              </div>

              <h3 className='m-1 text-base'>Selecione a Criticidade</h3>
              <div className="flex flex-wrap gap-3 mb-5 justify-content-between">
                <div className="flex align-items-center">
                  <RadioButton inputId="criticalityBox1" name="validade" value="4" onChange={(e: RadioButtonChangeEvent) => setCriticalityBox(e.value)} checked={criticalityBox === 4} />
                  <label htmlFor="criticalityBox1" className="ml-2">1</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="criticalityBox2" name="validade" value="5" onChange={(e: RadioButtonChangeEvent) => setCriticalityBox(e.value)} checked={criticalityBox === 5} />
                  <label htmlFor="criticalityBox2" className="ml-2">2</label>
                </div>
                <div className="flex align-items-center">
                  <RadioButton inputId="criticalityBox3" name="validade" value="6" onChange={(e: RadioButtonChangeEvent) => setCriticalityBox(e.value)} checked={criticalityBox === 6} />
                  <label htmlFor="criticalityBox3" className="ml-2">3</label>
                </div>
              </div> */}
              <div className="flex gap-3">
        <div className="flex align-items-center">
          <RadioButton
            inputId="criticalityBox1"
            name="criticidade"
            value="1"
            onChange={(e: RadioButtonChangeEvent) => setCriticalityBox(e.value)}
            checked={criticalityBox === '1'}
          />
          <label htmlFor="criticalityBox2" className="ml-2">
            1
          </label>
        </div>
        <div className="flex align-items-center">
        <RadioButton
            inputId="criticalityBox2"
            name="criticidade"
            value="2"
            onChange={(e: RadioButtonChangeEvent) => setCriticalityBox(e.value)}
            checked={criticalityBox === '2'}
          />
          <label htmlFor="criticalityBox2" className="ml-2">
            2
          </label>
        </div>
        <div className="flex align-items-center">
        <RadioButton
            inputId="criticalityBox3"
            name="criticidade"
            value="3"
            onChange={(e: RadioButtonChangeEvent) => setCriticalityBox(e.value)}
            checked={criticalityBox === '3'}
          />
          <label htmlFor="criticalityBox3" className="ml-2">
            3
          </label>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex align-items-center">
          <RadioButton
            inputId="ingredient5"
            name="pizza"
            value="1"
            onChange={(e: RadioButtonChangeEvent) => setIngredientP(e.value)}
            checked={ingredientP === "1"}
          />
          <label htmlFor="ingredient5" className="ml-2">
            Queijo
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="ingredient2"
            name="pizza"
            value="Mushroom"
            onChange={(e: RadioButtonChangeEvent) => setIngredientP(e.value)}
            checked={ingredientP === "Mushroom"}
          />
          <label htmlFor="ingredient2" className="ml-2">
            Mushroom
          </label>
        </div>
        <div className="flex align-items-center">
          <RadioButton
            inputId="ingredient3"
            name="pizza"
            value="Pepper"
            onChange={(e: RadioButtonChangeEvent) => setIngredientP(e.value)}
            checked={ingredientP === "Pepper"}
          />
          <label htmlFor="ingredient3" className="ml-2">
            Pepper
          </label>
        </div>
      </div>
            </div>

          </div>
        </form>

        <div className="flex justify-content-center mb-4">
          <AutoComplete field="descricao" value={value} suggestions={items} completeMethod={search} onChange={(e) => setValue(e.value)} />
        </div>
        <DataTable value={productsBox} tableStyle={{ minWidth: '50rem' }}>
          <Column field="descricao" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>

      </div>
    </div>
  )
}
