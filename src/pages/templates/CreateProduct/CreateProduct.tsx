
import './CreateProduct.css'

import { AutoComplete } from "primereact/autocomplete";
import { useState } from "react";
import products from "./produto.json"

export default function CreateProduct() {

    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);

    // @ts-ignore
    const search = (event) => {
        // @ts-ignore

        if (event.query.length > 3) {
            const filtred = products.produtos.filter(prod => prod.descricao.toLocaleLowerCase().includes(event.query.toLocaleLowerCase()));

            // @ts-ignore
            setItems(filtred);
        }
    }

    return (
        <div className="w-screen">
            <div className="w-full">
                <AutoComplete 
                field="descricao" 
                value={value} 
                suggestions={items} 
                completeMethod={search}
                 onChange={(e) => setValue(e.value)} />
            </div>

            <div className="grid gap-2 gap-row-1">
                <div className="col-2  config w-10rem h-1">2</div>
                <div className="col-6  config">6</div>
                <div className="col-4  config">4</div>
            </div>
        </div>
    )
}
