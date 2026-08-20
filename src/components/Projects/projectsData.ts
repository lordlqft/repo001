import vhsImage from "../../assets/images/vhs.jpg";
import semaforoImage from "../../assets/images/semaforo.png";
import pooImage from "../../assets/images/code.png";

export interface ProjectEntry {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  url: string;
  featured?: boolean;
  image?: string;
  palette: { from: string; to: string };
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: "vhs",
    index: "01",
    title: "VHS",
    category: "Jogo · Horror multiplayer · Roblox",
    year: "2026",
    description:
      "Jogo de terror multiplayer desenvolvido no Roblox, com matchmaking, servidores reservados, sistemas de câmera, cutscenes e mecânicas multiplayer.",
    url: "https://www.roblox.com/games/123977615900747/V-H-S",
    featured: true,
    image: vhsImage,
    palette: { from: "#241019", to: "#050505" },
  },
  {
    id: "semaforo",
    index: "02",
    title: "Semáforo Inteligente",
    category: "IoT · Arduino · Sistemas",
    year: "2026",
    description:
      "Projeto acadêmico de um sistema de semáforo inteligente, desenvolvido para trabalhar lógica de controle, sensores e integração entre componentes.",
    url: "https://github.com/lordlqft/semaforo-inteligentee",
    image: semaforoImage,
    palette: { from: "#18201c", to: "#050505" },
  },
  {
    id: "poo",
    index: "03",
    title: "POO 01",
    category: "C# · Programação orientada a objetos",
    year: "2026",
    description:
      "Coleção de exercícios práticos em C# para estudar programação orientada a objetos, com diferentes classes, atributos, métodos e conceitos fundamentais.",
    url: "https://github.com/lordlqft/POO_01",
    image: pooImage,
    palette: { from: "#171c24", to: "#050505" },
  },
];
