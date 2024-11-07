import Container from "@/components/Container/Container";

const Layout = ({children}:{children: React.ReactNode}) => {
    return (
        <Container>
            {children}
        </Container>
    );
}

export default Layout;
