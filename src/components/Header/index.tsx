import {MdSupervisorAccount} from 'react-icons/md'
import {ImExit} from 'react-icons/im'
import {MenuItem} from 'primereact/menuitem';
import {useRef} from 'react';
import {Link} from "react-router-dom";
import {Menu} from "primereact/menu";
import {Button} from "primereact/button";
import {Avatar} from 'primereact/avatar';
import {useAuth} from "../../provider/Auth";

export const HeaderClass = "h-4rem bg-blue-800 flex flex-1 gap-4 justify-content-end align-items-center px-5"
const styleClass = 'text-white p-3 transition-colors transition-duration-400 hover:text-gray-400'

export function Header() {

    const auth = useAuth();


    const itemsUser: MenuItem[] = [
        {
            label: 'Trocar senha',
            icon: <MdSupervisorAccount size={20} className='mr-2'/>,
            command() {

            },
        },
        {
            label: 'Logout',
            icon: <ImExit size={20} className='mr-2'/>,
            command() {
                //setPerfil(this.label)
                //setIcon(this.icon)
                auth.signout()
            },
        },
    ];
    const menuUser = useRef(null);
    const itemsMenuUser = [
        {
            label: `Bem-vindo`,
            items: itemsUser
        }
    ];

    return (
        <header className={HeaderClass}>
            {/*<Link*/}
            {/*    to='/home'*/}
            {/*    className={styleClass}>*/}
            {/*    Home*/}
            {/*</Link>*/}
            <Link
                to='/catalogo'
                className={styleClass}>
                Catálogo
            </Link>
            <Link
                to='/reservas'
                className={styleClass}>
                Minhas Reservas
            </Link>

            <Button
                icon={<Avatar icon="pi pi-user" size="normal" style={{backgroundColor: '#2196F3', color: '#ffffff'}}
                              shape="circle"/>}
                className='text-gray-100 hover:bg-blue-800'
                onClick={(event) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    menuUser?.current?.toggle(event)
                }}
                text
                aria-controls="popup_menu_left"
                aria-haspopup
            />
            <Menu
                model={itemsMenuUser}
                popup
                ref={menuUser}
                id="popup_menu_user"
            />
        </header>
    )
}
