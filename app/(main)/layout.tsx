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
      <Container className="flex items-start gap-4 mb-8">
        <div className="flex flex-col gap-8">
          <Navbar />
        </div>
        {children}
      </Container>
    </>
  );
}
