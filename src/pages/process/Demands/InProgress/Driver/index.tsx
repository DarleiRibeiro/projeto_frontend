import React, {useState} from "react";
import {InProgressTableEntregar} from "@pages/process/Demands/InProgress/Driver/TableEntregar";
import {InProgressDriverModal} from "@pages/process/Demands/InProgress/Driver/Modal";
import {TabPanel, TabView} from "primereact/tabview";
import {InProgressTableColetar} from "@pages/process/Demands/InProgress/Driver/TableColetar";

export function InProgressDriver() {

    const [visible, setVisible] = useState<boolean>(false);
    const [situacaoA, setSituacaoA] = useState()
    const [situacaoB, setSituacaoB] = useState()
    const [activeIndex, setActiveIndex] = useState(0);

    // @ts-ignore
    const mudarStatus = (a, b) => {
        setSituacaoA(a)
        setSituacaoB(b)
        setTimeout(() => {
            setVisible(true)
        }, 250)
    }
    const onConfirme = () => {
        setVisible(false)
        //todo fazer chamada para api rota de update,
        //todo criar arquivo de integração com updtate
        //todo colocar feedback toast com ok de salvamento.
    }

    return (
        <div className="p-5 flex flex-column align-items-center">
            <h1 className="text-4xl text-blue-600 mt-0">
                Solicitações de coleta
            </h1>

            <TabView className="w-full flex flex-column px-8" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header="Entrega">
                    <div className="w-full flex flex-column">
                        <div className="flex mt-2 relative">
                            <InProgressTableEntregar mudarStatus={mudarStatus} />
                        </div>
                    </div>
                    <InProgressDriverModal
                        onConfirme={onConfirme}
                        situacaoA={situacaoA}
                        situacaoB={situacaoB}
                        visible={visible}
                        onClose={() => setVisible(false)
                        }>
                    </InProgressDriverModal>
                </TabPanel>
                <TabPanel header="Coletar">
                    <div className="w-full flex flex-column">
                        <div className="flex mt-2 relative">
                            <InProgressTableColetar mudarStatus={mudarStatus} />
                        </div>
                    </div>
                    <InProgressDriverModal
                        onConfirme={onConfirme}
                        situacaoA={situacaoA}
                        situacaoB={situacaoB}
                        visible={visible}
                        onClose={() => setVisible(false)
                        }>
                    </InProgressDriverModal>
                </TabPanel>
            </TabView>
        </div>
    )
}
