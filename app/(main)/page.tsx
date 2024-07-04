import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function Page() {
  return (
    <Container className="grid grid-cols-4 gap-8">
      <div className="flex flex-col gap-8">
        <Navbar />
      </div>
      <div className="flex flex-col gap-8 col-span-2">
        <Card>Профиль</Card>
      </div>
      <div className="flex flex-col gap-8">
        <Card>12</Card>
      </div>
    </Container>
  );
}
