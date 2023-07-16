import { Input } from "@/components/Input.tsx";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export function SearchLabel() {
    const filtered: any = []
    return (
        <div className="px-8 flex flex-column align-items-center">
            <h1 className="text-4xl text-blue-600 mb-6">Pesquisa de Etiqueta</h1>
            <div className="flex gap-5">
                <div className="relative">
                    <span className="absolute left-0 -mt-3 ml-2 text-xs z-1 text-gray-600">Dt Início</span>
                    <Input type="date" inputClassName="mt-1" />
                </div>
                <div className="relative">
                    <span className="absolute left-0 -mt-3 ml-2 text-xs z-1 text-gray-600">Dt Fim</span>
                    <Input type="date" inputClassName="mt-1" />
                </div>
                <Input placeholder="Código" inputClassName="mt-1" />
            </div>

            <DataTable value={filtered} className="w-6 mt-5">
                <Column field="sequencial" header="Sequencial"></Column>
                <Column field="name" header="Name"></Column>
            </DataTable>
        </div>
    )
}
