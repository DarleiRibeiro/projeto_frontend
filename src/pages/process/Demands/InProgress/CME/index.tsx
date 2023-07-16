import {  DataTableUnselectEvent } from "primereact/datatable";
import React, {useState} from "react";
import { AndamentoModal } from "./Modal";

import {InProgressTable} from "@pages/process/Demands/InProgress/CME/Table";

type SEsType = {
    id: string,
}

export function InProgressCME() {
    const [visible, setVisible] = useState(false);
    const [selectedSE, setSelectedSE] = useState<SEsType | null>();

    const onSelectRow = (e: DataTableUnselectEvent) => {
        setVisible(true)
        setSelectedSE(e.data)
    }

    return (
        <div className="p-5 flex flex-column align-items-center">
            <h1 className="text-4xl text-blue-600 mt-0">
                Solicitações em andamento
            </h1>
            <div className="w-full flex flex-column px-8">
                <h3 className="text-left mt-3 mb-0 text-700">
                    ADVENTISTA - HAM
                </h3>
                <div className="flex mt-2 relative">
                    <InProgressTable
                        onSelectRow={onSelectRow}
                    ></InProgressTable>

                </div>
            </div>
            <AndamentoModal
                visible={visible}
                onClose={()=> setVisible(false) }
                selectedSE={selectedSE}
            />
        </div>
    )
}
