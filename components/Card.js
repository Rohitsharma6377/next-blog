import { FocusCards } from "@/components/ui/FocusCards";

export function Card() {
  const cards = [
    {
      title: "Forest Adventure",
      src: "/images/static/landscape.jpg",

    },
    {
      title: "Valley of life",
      src: "/images/static/volcano.jpg",

    },
    {
      title: "Sala behta hi jayega",
      src: "/images/static/forest.jpg",
    },
    {
      title: "Camping is for pros",
      src: "/images/static/lake2.jpg",

    },
    {
      title: "The road not taken",
      src: "/images/static/mountain.jpg",

    },
    {
      title: "The First Rule",     
      src: "/images/static/lake.jpg",

    },
  ];

  return <FocusCards cards={cards} />;
}
