import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { SeedList } from "../components/seed/SeedList"
import { SeedForm } from "../components/seed/SeedForm"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<SeedList />} />
                <Route path="/seeds/new" element={<SeedForm />} />
            </Route>
        </Routes>
    </>
}
