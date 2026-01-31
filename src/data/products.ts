import type { Product, ProductFamily, SizeGuideData } from '@/types';

export const products: Product[] = [
  { id: 18, name: "MOTO V1 ROUGE", aura: "VROOM VROOM", specs: { taille: "Disponible en 12/16 pouces" }, price: 99, image: "./images/18.jpeg" },
  { id: 16, name: "MOTO V2 VERT", aura: "VROOM VROOM", specs: { taille: "Disponible en 12/16 pouces" }, price: 99, image: "./images/16.jpeg" },
  { id: 17, name: "MOTO V3 ROUGE", aura: "VROOM VROOM", specs: { taille: "Disponible en 12/16 pouces" }, price: 99, image: "./images/17.jpeg" },
  { id: 15, name: "MOTO V4 ROUGE", aura: "VROOM VROOM", specs: { taille: "Disponible en 16 pouces" }, price: 99, image: "./images/15.jpeg" },
  { id: 4, name: "JEXICA ROUGE", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/4.jpeg" },
  { id: 5, name: "JEXICA ORANGE", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/5.jpeg" },
  { id: 6, name: "JEXICA VERT", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/6.jpeg" },
  { id: 8, name: "JEXICA BLEU", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/8.jpeg" },
  { id: 7, name: "POWER BIKE ROSE", aura: "Puissante", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/7.jpeg" },
  { id: 9, name: "POWER BIKE ROUGE", aura: "Puissante", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/9.jpeg" },
  { id: 10, name: "POWER BIKE BLEU", aura: "Puissante", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/10.jpeg" },
  { id: 11, name: "POWER BIKE JAUNE", aura: "Puissante", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/11.jpeg" },
  { id: 12, name: "POWER BIKE ORANGE", aura: "Puissante", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/12.jpeg" },
  { id: 1, name: "TY BIKE ROUGE", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/1.jpeg" },
  { id: 2, name: "TY BIKE BLEU", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/2.jpeg" },
  { id: 3, name: "TY BIKE ROSE", aura: "Sportive", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/3.jpeg" },
  { id: 14, name: "FROZEN ROSE", aura: "Le rythme de l'aventure", specs: { taille: "Disponible en 12/16/20 pouces" }, price: 99, image: "./images/14.jpeg" },
  { id: 13, name: "Frozen V2 ROSE", aura: "Élégance féerique.", specs: { taille: "Disponible en 12/16 pouces" }, price: 99, image: "./images/13.jpeg" },
];

export const productFamilies: ProductFamily[] = [
  { id: "moto-bike", name: "MOTO BIKE", description: "Collection dynamique pour l'aventure.", defaultProductId: 18, productIds: [18, 16, 17, 15] },
  { id: "jexica", name: "JEXICA", description: "Vélos sportifs aux couleurs vives.", defaultProductId: 4, productIds: [4, 5, 6, 8] },
  { id: "power-bike", name: "POWER BIKE", description: "Style et performance réunis.", defaultProductId: 7, productIds: [7, 9, 10, 11, 12] },
  { id: "ty-bike", name: "TY BIKE", description: "Légers et maniables pour débuter.", defaultProductId: 1, productIds: [1, 2, 3] },
  { id: "frozen", name: "FROZEN", description: "L'univers enchanté pour les petits.", defaultProductId: 14, productIds: [14, 13] }
];

export const sizeGuideData: SizeGuideData[] = [
  { age: "2-4 ans", height: "85-100 cm", size: "12\"" },
  { age: "3-5 ans", height: "95-110 cm", size: "14\"" },
  { age: "4-6 ans", height: "105-120 cm", size: "16\"" },
  { age: "5-8 ans", height: "115-135 cm", size: "20\"" },
  { age: "7-10 ans", height: "130-150 cm", size: "24\"" },
  { age: "9+ ans", height: "145+ cm", size: "26\"" },
];

export const getProductById = (id: number): Product | undefined => 
  products.find(p => p.id === id);

export const getFamilyProducts = (familyId: string): Product[] => {
  const family = productFamilies.find(f => f.id === familyId);
  if (!family) return [];
  return family.productIds.map(id => getProductById(id)).filter((p): p is Product => p !== undefined);
};
