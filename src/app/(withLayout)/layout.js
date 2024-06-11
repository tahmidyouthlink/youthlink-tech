import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
    title: "YouthLink Tech.",
    description:
        "At YouthLink, we are the architects of digital transformation, providing a suite of services that encompass internet solutions, software development, and digital marketing.",
};

export default function RootLayout({ children }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>

    );
}