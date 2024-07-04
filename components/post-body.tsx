import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export const PostBody = () => {
  return (
    <div className="px-6 text-sm flex flex-col">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, quod
        deleniti ipsa aperiam aliquam nisi voluptatibus aspernatur beatae omnis
        odio qui ut neque dolorum autem modi sunt vero hic corporis.
      </p>
      <Carousel className="rounded-md overflow-hidden">
        <CarouselContent>
          <CarouselItem className="relative aspect-video">
            <Image
              alt={`Image`}
              src={`/car.jpg`}
              fill
              className="object-cover"
            />
          </CarouselItem>
          <CarouselItem className="relative aspect-video">
            <Image
              alt={`Image`}
              src={`/car.jpg`}
              fill
              className="object-cover"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
