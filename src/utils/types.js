/**
 * Define os valores numéricos para uma célula vazia e uma célula preenchida.
 * Em JavaScript, usamos um objeto simples em vez de uma enum.
 */
export const TileValues = {
    EMPTY: 0,
    TILE: 1,
};

/**
 * Define os nomes das categorias como constantes de string.
 * Isso ajuda a evitar erros de digitação ao referenciar categorias em outras partes do código.
 */
export const CategoryValues = {
    FLOOR: "floor",
    WALL: "wall",
    DOOR_WINDOW: "doorwindow",
    FURNITURE: "furniture",
    ELECTRONICS: "electronics",
    UTENSILS: "utensils",
    GOALS: "goals",
    PLAYER: "persons",
};