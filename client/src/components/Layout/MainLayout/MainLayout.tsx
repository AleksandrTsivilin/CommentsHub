import { Outlet } from "react-router-dom"
import { Container } from "../../Container"
import { Header } from "../../Header"


export const MainLayout = () => {
    return (      
        <>          
            <Header />
            <main>
                <Container>
                    <Outlet />
                </Container>                
            </main>
        </>       
    )
}