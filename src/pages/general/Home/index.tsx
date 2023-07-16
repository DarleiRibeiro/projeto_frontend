import {HomeDeafult} from "./HomeDefault";
import {useAuth} from "@/provider/Auth";
import {useMemo} from "react";

export function Home() {
    const {user} = useAuth();
    const showHome = useMemo(() => {
        return <HomeDeafult/>
    }, [user])
    return (
        <>
            {showHome}
        </>
    )
}

