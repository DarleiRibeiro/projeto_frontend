import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import boxes from '../../../util/boxes.json'

export function SearchBox() {
    const [items, setItems] = useState('')

    const filtered = boxes.filter(box => box.name.includes(items) || box.sequencial.includes(items))

    return (
        <div className="p-5 flex flex-column align-items-center">
            <h1 className="text-4xl text-blue-600">Pesquisa de Caixas</h1>
            <div className="flex align-items-center gap-3 justify-content-center">
                Pesquise a caixa:
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText 
                        placeholder="Search" 
                        value={items} 
                        onChange={e => setItems(e.target.value)} 
                    />
                </span>
            </div>
            <DataTable value={filtered} className="w-6 mt-5">
                <Column field="sequencial" header="Sequencial"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>

        </div>
    )
}