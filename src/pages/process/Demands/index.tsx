import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";
import {BsHospital} from 'react-icons/bs'
import { cardStyle, divContainer } from "./styles";

export function Demands() {
    //todo criar arquivo de integração prevendo a integração da rota desta página, colocar em retorno de erro mockado o array
    // de teste
    const clientes = [
        {
            nome: "Adventista",
            andamento: 4,
            pendentes: 6,
            concluido: 40
        },
        {
            nome: "28 de Agosto",
            andamento: 7,
            pendentes: 3,
            concluido: 70
        },
        {
            nome: "João Lúcio",
            andamento: 8,
            pendentes: 2,
            concluido: 80
        },
        {
            nome: "Delphina",
            andamento: 9,
            pendentes: 1,
            concluido: 90
        },
        {
            nome: "Hemoam",
            andamento: 3,
            pendentes: 7,
            concluido: 30
        },
    ]

    const headerCard = (nome: string) => (
        <div className="flex align-items-center justify-content-between p-4 py-3">
            <h2 className="m-0">{nome}</h2>
            <BsHospital className="text-4xl" />
        </div>
    )

    const footerCard = (pendentes: number, andamento: number, concluido: number) => (
        <div className="flex gap-5">
            <Tooltip
                target=".pendentes"
                mouseTrack
                mouseTrackLeft={20}
                content="Pendentes"
            />
            <span className="pendentes text-center py-2 w-5rem border-round bg-red-700 cursor-pointer">+{pendentes}</span>

            <Tooltip
                target=".andamento"
                mouseTrack
                mouseTrackLeft={20}
                content="Andamento"
            />
            <span className="andamento text-center py-2 w-5rem border-round bg-blue-400 cursor-pointer">+{andamento}</span>

            <Tooltip
                target=".concluido"
                mouseTrack
                mouseTrackLeft={20}
                content="Concluído"
            />
            <span className="concluido text-center py-2 w-5rem border-round bg-green-700 cursor-pointer">{concluido}%</span>
        </div>
    )
    return (
        <div className={divContainer}>
            <h1 className="text-4xl text-blue-600 mt-0 mb-6">Demandas</h1>
            <div className="grid gap-4 justify-content-center">
                {clientes.map((cliente) => (
                    <Card 
                        header={headerCard(cliente.nome)} 
                        footer={footerCard(cliente.pendentes, cliente.andamento, cliente.concluido)} 
                        className={cardStyle} 
                    />
                ))}
                
            </div>
        </div>
    )
}
