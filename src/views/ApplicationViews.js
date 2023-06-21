import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { SeedList } from "../components/seed/SeedList"
import { SeedForm } from "../components/seed/SeedForm"
import { UpdateSeedForm } from "../components/seed/UpdateSeedForm"
import { MainPage } from "../components/main/MainPage"
import { ProfilePage } from "../components/profile/ProfilePage"
import { PlantSeedForm } from "../components/seed/PlantSeedForm"
import { OutlineList } from "../components/outline/OutlineList"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />      
                <Route path="/seeds" element={<SeedList />} />
                <Route path="/outlines" element={<OutlineList />} />
                <Route path="/seeds/new" element={<SeedForm />} />
                <Route path="/seeds/update/:seedId" element={<UpdateSeedForm />} />
                <Route path="/seeds/plant/:seedId" element={<PlantSeedForm />} />
            </Route>
        </Routes>
    </>
}
