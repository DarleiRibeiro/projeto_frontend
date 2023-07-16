/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DataTable, DataTableUnselectEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import {PendingModal} from "./Modal";
import { useState } from "react";

type SEsType = {
    seId: number,
    solicitada: string,
    qtdCaixas: string
}

export function Pending() {
    const [visible, setVisible] = useState(false);
    const [selectedSE, setSelectedSE] = useState<SEsType | null>();

    const solicitacoes = [
        {
            seId: 1,
            solicitada: 'Há 4h',
            qtdCaixas: '10 caixas'
        },
        {
            seId: 2,
            solicitada: 'Há 2h',
            qtdCaixas: '3 caixas'
        },
        {
            seId: 3,
            solicitada: 'Há 30min',
            qtdCaixas: '2 caixas'
        },
    ]

    const onSelectRow = (e: DataTableUnselectEvent) => {
        setVisible(true)
        setSelectedSE(e.data)
    }


    return (
        <div className="p-5 flex flex-column align-items-center">
            <h1 className="text-4xl text-blue-600 mt-0">Solicitações Pendentes de Busca</h1>
            <PendingModal visible={visible} onClose={()=> setVisible(false)} selectedSE={selectedSE} />
            <div className="w-full flex flex-column px-8">
                <h3 className="text-left mt-3 mb-0 text-700">ADVENTISTA - HAM</h3>
                <div className="flex mt-2 relative">
                    <DataTable
                        value={solicitacoes}
                        className="w-full"
                        rowHover
                        selectionMode="radiobutton"
                        onRowSelect={onSelectRow}
                        dataKey="seId"
                    >
                        <Column
                            field='seId'
                            header='#'
                            headerStyle={{ backgroundColor: '#204887', color: '#fff' }}
                        />
                        <Column
                            field='solicitada'
                            header='Solicitada'
                            headerStyle={{ backgroundColor: '#204887', color: '#fff' }}
                        />
                        <Column
                            field='qtdCaixas'
                            header='Quantidade de Caixas'
                            headerStyle={{ backgroundColor: '#204887', color: '#fff' }}
                        />                       
                    </DataTable>

                </div>
            </div>
        </div>
    )
}
