import {Route, Routes} from "react-router-dom";

import {Layout} from "../components/Layout";

import {LoginV2} from "@pages/general/LoginV2";
import React from "react";
import {Catalogo} from "@pages/general/Catalogo";
import {Reservas} from "@pages/general/Reservas";

export function Router() {
    return (
        <Routes>
            <Route
                path="/login"
                element={<LoginV2/>}
            />
            <Route
                path="/"
                element={
                    <Layout/>
                }
            >

                <Route
                    path="/catalogo"
                    element={<Catalogo/>}
                />
                <Route
                    path="/reservas"
                    element={<Reservas/>}
                />


            </Route>
        </Routes>
    )
}
