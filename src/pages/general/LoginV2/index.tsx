import {InputText} from 'primereact/inputtext';
import {Card} from 'primereact/card';
import {useMemo, useState} from "react";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import './login.css'

const StyleCard = "" +
    "card-container " +
    "blue-container " +
    "flex " +
    "align-items-center " +
    "justify-content-center" +
    ""

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const save = (username, password)=>{
    console.log(username, password)
}

export function LoginV2() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [username, SetUsername] = useState<string>()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [password, SetPassword] = useState<string>()

    const logar = useMemo(()=> {
       return () => {
           save(username, password)
       }
    }, [username, password]);

    return (
        <div className="
            w-screen
            h-screen
            flex
            align-items-center
            justify-items-center
            justify-content-center
            ">
            <div className={StyleCard}>
                <Card role="region" className="w-20rem">
                    <span className="p-float-label  mb-5">
                        <InputText
                            className="w-18rem"
                            id="username"
                            onChange={(e) => SetUsername(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label mb-5">
                        <Password
                            toggleMask
                            id="password"
                            feedback={false}
                            onChange={(e) => SetPassword(e.target.value)} />
                        <label htmlFor="password">Senha:</label>
                    </span>
                    <Button
                        onClick={logar}
                        label="Logar"
                        type="submit"
                        icon="pi pi-check"
                        className="w-18rem"/>
                </Card>
            </div>
        </div>
    )
}
