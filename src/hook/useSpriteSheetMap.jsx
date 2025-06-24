import { useEffect, useState, useMemo } from 'react';

export function useSpriteSheetMap(spritesMap) {
    // Cria o estado 'images' que vai guardar a lista de imagens carregadas
    const [images, setImages] = useState([]);

    // useEffect executa quando o componente monta ou quando 'spritesMap' muda
    useEffect(() => {
        // Extrai todos os caminhos de imagem do spritesMap em um array simples
        const paths = spritesMap.flatMap(category =>
            category.sprites.map(sprite => sprite.path)
        );

        // Função assíncrona que carrega todas as imagens
        const loadImages = async () => {
            // Usa Promise.all para esperar o carregamento de todas as imagens
            const loaded = await Promise.all(
                // Mapeia cada caminho para uma Promise de carregamento de imagem
                paths.map((path) => {
                    return new Promise((resolve) => {
                        const img = new Image(); // Cria um novo objeto de imagem
                        img.src = path; // Define o caminho da imagem
                        img.onload = () => resolve({ path, image: img }); // Quando carregar com sucesso, resolve com imagem
                        img.onerror = () => resolve({ path, image: null }); // Se falhar, resolve com null como fallback
                    });
                })
            );

            // Atualiza o estado com todas as imagens carregadas
            setImages(loaded);
        };

        // Chama a função para carregar as imagens
        loadImages();
    }, [spritesMap]); // Dependência: roda sempre que spritesMap mudar

    // Memoiza o mapeamento path → image para evitar recomputação desnecessária
    const spriteSheetMap = useMemo(() => {
        const map = {}; // Objeto que irá conter o resultado final
        images.forEach(({ path, image }) => {
            if (image) { // Só adiciona imagens que foram carregadas com sucesso
                map[path] = image;
            }
        });
        return map; // Retorna o objeto final com todas as imagens mapeadas
    }, [images]); // Atualiza apenas quando 'images' muda

    // Retorna o mapa de sprites pronto para uso
    return spriteSheetMap;
}