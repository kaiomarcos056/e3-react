import { useEffect, useState, useMemo } from 'react';

export function useSpriteSheetMap(spritesMap) {
    const [images, setImages] = useState([]);

    useEffect(() => {
          const todosOsPaths = spritesMap.flatMap(category =>
            category.sprites.flatMap(sprite => {

            const paths = [sprite.path];
            
            if (sprite.rotations) {
                paths.push(...Object.values(sprite.rotations).map(rot => rot.path));
            }

            return paths;
            })
        );
        const paths = [...new Set(todosOsPaths)];

        const loadImages = async () => {
            const loaded = await Promise.all(
                paths.map((path) => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = path;
                        img.onload = () => resolve({ path, image: img });
                        img.onerror = () => resolve({ path, image: null });
                    });
                })
            );

            setImages(loaded);
        };

        loadImages();
    }, [spritesMap]);

    const spriteSheetMap = useMemo(() => {
        const map = {};
        images.forEach(({ path, image }) => {
            if (image) {
                map[path] = image;
            }
        });
        return map;
    }, [images]);

    return spriteSheetMap;
}