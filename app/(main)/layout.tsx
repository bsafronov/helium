import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";
import { Container } from "@/components/ui/container";

type Props = {
  children?: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Container className="grid grid-cols-4 gap-8">
        <div className="flex flex-col gap-8">
          <Navbar />
        </div>
        {children}
      </Container>
    </>
  );
}
