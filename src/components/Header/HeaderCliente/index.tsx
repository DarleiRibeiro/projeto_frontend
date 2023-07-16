import { useAuth } from "@/provider/Auth";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useRef } from "react";
import { ImExit } from "react-icons/im";
import { MdSupervisorAccount } from "react-icons/md";
import { Link } from "react-router-dom";
import { HeaderClass } from "..";

export function HeaderCliente() {
    const auth = useAuth();

    const itemsUser: MenuItem[] = [
        {
            label: 'Trocar senha',
            icon: <MdSupervisorAccount size={20} className='mr-2' />,
            command() {
                ''
            },
        },
        {
            label: 'Logout',
            icon: <ImExit size={20} className='mr-2' />,
            command() {
                auth.signout()
            },
        },
    ];

    const menuUser = useRef(null);
    const itemsMenuUser = [
        {
            label: `Bem-vindo Adventista`,
            items: itemsUser
        }
    ];

    return(
        <header className={HeaderClass}>
            <Link to='/home' className='text-white p-3 transition-colors transition-duration-400 hover:text-gray-400'>Home</Link>

            <Menu
                model={itemsMenuUser}
                popup
                ref={menuUser}
                id="popup_menu_user"
            />

            <Button
                icon={<Avatar icon="pi pi-user" size="normal" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} shape="circle" />}
                className='text-gray-100 hover:bg-blue-800'
                onClick={(event) => {
                    //@ts-ignore
                    menuUser?.current?.toggle(event)
                }}
                text
                aria-controls="popup_menu_left"
                aria-haspopup
            />


        </header>
    )
}