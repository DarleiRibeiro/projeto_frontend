import { InputText } from 'primereact/inputtext';
import { KeyFilterType } from 'primereact/keyfilter';
import { ChangeEventHandler, ForwardRefRenderFunction, forwardRef } from 'react';

type IProps = {
    name?: string;
    type?: string;
    placeholder?: string;
    inputClassName?: string
    disable?: boolean
    keyfilter?: KeyFilterType | undefined
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}
const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = ({
    name, type, placeholder, inputClassName, disable, keyfilter, onChange, ...rest
}, ref) => {
    return (
        <span className="p-float-label">
            <InputText
                className={`w-full ${inputClassName}`}
                name={name}
                type={type}
                onChange={onChange}
                ref={ref}
                {...rest}
                disabled={disable}
                keyfilter={keyfilter}
            />
            <label htmlFor="username">{placeholder}</label>
        </span>
    )
}
export const Input = forwardRef(InputBase)