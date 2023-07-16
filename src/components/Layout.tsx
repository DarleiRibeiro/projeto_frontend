import {Outlet} from "react-router-dom";
import {Header} from "./Header";
import {useMemo} from "react";

export function Layout() {

    const showHeader = useMemo(() => {
        return <Header/>
    }, [])
    return (
        <>
            {showHeader}
            <Outlet/>
        </>
    )
}
