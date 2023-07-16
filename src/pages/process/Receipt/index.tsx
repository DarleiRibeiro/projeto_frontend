import { Dropdown } from "primereact/dropdown";
import { Input } from "@/components/Input.tsx";
import { useState } from "react";

export function Receipt() {
  const [selectedOrigin, setSelectedOrigin] = useState(null);

    return (
        <div className="p-5 flex justify-content-center">
            <form className="p-4 border-round-md flex flex-column gap-3 w-6 bg-blue-800">
                <h1 className="mt-0 text-gray-50">Reebimento</h1>
                <Input name="user" placeholder="Usuário" type="text" />
                <div className='flex align-items-center gap-2 mb-2'>
                    <Dropdown
                        value={selectedOrigin}
                        onChange={(e) => setSelectedOrigin(e.value)}
                        // options={clients}
                        optionLabel="name"
                        placeholder="Selecione um Cliente*"
                        className="w-full"
                    />
              </div>
            </form>

        </div>
    )
}
