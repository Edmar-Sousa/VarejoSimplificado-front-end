import { NavLink } from 'react-router-dom'

import {
    X,
    LogOut,
    type LucideIcon,
} from 'lucide-react'


import styles from './styles.module.css';

interface MenuItem {
    path: string;
    label: string;
    icon: LucideIcon;
    ariaLabel: string;
    isAdminOnly: boolean;
}

const MenuItemComponent = (props: MenuItem) => {

    const {
        path,
        label,
        icon: Icon,
        ariaLabel
    } = props;

    return (
        <li>
            <NavLink to={path} className={styles.menuLink} end>
                {({isActive}) => (
                    <button className={`${ styles.itemMenu } ${ isActive ? styles.active : '' }`} aria-label={ariaLabel}>
                        { Icon && <Icon /> }
                        <p>
                            { label }
                        </p>
                    </button>
                )}
            </NavLink>
        </li>
    );
}

interface SideMenuComponentProps {
    menuItems: Array<MenuItem>;
    isAdminUser: boolean;
    
    onCloseMenu: () => void,
    onExitMenu: () => void,
}


export const SideMenuComponent = (props: SideMenuComponentProps) => {

    const { 
        menuItems,
        isAdminUser,
        onCloseMenu,
        onExitMenu,
    } = props;


    return (
        <aside className={styles.sideMenu}>
            <ul className={styles.menu}>
                <li className={styles.closeMenu}>
                    <button 
                        className={styles.menuButton} 
                        aria-label='Botão para fechar menu'
                        onClick={onCloseMenu}>
                            <X />
                    </button>
                </li>

                { menuItems.map((item, index) => {
                    if (item.isAdminOnly && !isAdminUser)
                        return null;

                    return (
                        <MenuItemComponent 
                            key={index}
                            {...item}
                            ariaLabel={item.ariaLabel} />
                    );
                }) }
            </ul>

            <button className={styles.exitButton} onClick={onExitMenu}>
                <LogOut />
                <p>Sair</p>
            </button>
        </aside>
    );

}
