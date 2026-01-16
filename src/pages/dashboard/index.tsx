import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { 
    Menu,
    User,
    Package,
    Home,
} from 'lucide-react'

import { SideMenuComponent } from './components/SideMenuComponent';
import { getProductCategories } from '../../services/products';

import styles from "./styles.module.css";
import { useAuthStore } from '../../states/auth';



const menuItems = [
    { 
        path: '/dashboard/',
        label: 'Dashboard',
        icon: Home,
        ariaLabel: 'Ir para Dashboard'
    },
    { 
        path: '/categories/',
        label: 'Categorias',
        icon: Home,
        ariaLabel: 'Ir para Categorias'
    },
    { 
        path: '/dashboard/users', 
        label: 'Usuarios', 
        icon: User, 
        ariaLabel: 'Ir para Pagina de Usuarios' 
    },
    { 
        path: '/dashboard/products', 
        label: 'Produtos', 
        icon: Package, 
        ariaLabel: 'Ir para Pagina de Usuarios'
    },
];



export const DashboardPage = () => {
    const [isShowMenu, setIsShowMenu] = useState(false);

    const isAdminUser = useAuthStore((state) => state.isAdminUser());

    console.log('isAdminUser', isAdminUser);

    const handlerShowMenu = useCallback(() => {
        setIsShowMenu(() => true);
    }, []);

    const handlerHiddenMenu = useCallback(() => {
        setIsShowMenu(() => false);
    }, []);

    useEffect(() => {
        getProductCategories();
    }, [])

    return (
        <div className={styles.dashboardContainer}>

            <header className={styles.header}>
                <button className={styles.menuButton} aria-label='Menu button' onClick={handlerShowMenu}>
                    <Menu />
                </button>

                <h2 className={styles.companyName}>
                    Mercadinho do Edinho
                </h2>

                <div></div>
            </header>

            <main className={styles.main}>
                <div className={`${ styles.menuContainer } ${ !isShowMenu ? styles.hiddenMenu : '' }`}>
                    <SideMenuComponent 
                        menuItems={menuItems}
                        onCloseMenu={handlerHiddenMenu} />
                </div>

                <div className={styles.mainContent}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}