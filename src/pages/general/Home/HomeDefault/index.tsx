import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

export function HomeDeafult() {
    const navigation = useNavigate();
    const goRouter = (rota: string) => {
        navigation(rota)
    }
    return (
        <div className="card h-screen">
          <Card role="region">
            Acesso rápido:
            <Button
              label="Novo Produto"
              onClick={() => goRouter('/product')}
              className="mx-4"/>
            <Button
              label="Nova Caixa"
              className="mx-4"
              onClick={() => goRouter('/caixa')} />
            <Button
              label="Subtipo de Produto"
              className="mx-4"
              onClick={() => goRouter('/caixa')} />
            <Button
              label= "Tipo de Produto"
              onClick={() => goRouter('/subtypeproduct')} />
          </Card>

        </div>
    )
}
