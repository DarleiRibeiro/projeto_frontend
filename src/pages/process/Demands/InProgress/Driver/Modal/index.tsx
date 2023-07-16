import { useMemo } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

// @ts-ignore
export function InProgressDriverModal(props) {

    const {
        visible,
        onClose,
        onConfirme,
        situacaoB
    } = props;

    const headerMemo = useMemo(() => {
        return `Confirmar ${situacaoB}`
    }, [situacaoB])

    return (
        <Dialog
            header={headerMemo}
            visible={visible}
            style={{ width: '50vw' }}
            onHide={() => onClose()}
        >
            <div className="mt-6 w-full flex justify-content-end">
                <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    onClick={() => onClose()}
                    className="p-button-text" />
                <Button
                    label="Confirmar"
                    type="submit"
                    onClick={() => onConfirme()}
                    icon="pi pi-check"
                    autoFocus />
            </div>
        </Dialog>
    )
}
