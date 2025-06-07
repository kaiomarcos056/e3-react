// PISOS
// PAREDES
// PORTAS E JANELAS
// MÓVEIS
// ELETRODOMÉSTICOS
// UTENSÍLIOS
// ELEMENTOS INTERATIVOS
// PERSONAGEM

export const spritesMap = [
    { 
        id: 1, 
        name: 'Pisos',
        category: 'floor', 
        sprites: [
            { name: 'Água', path: '/sprites/floor/agua.png', soundPath: '/water-walk.mp3'},
            { name: 'Areia', path: '/sprites/floor/areia.png'},
            { name: 'Carpete', path: '/sprites/floor/carpete.png'},
            { name: 'Cascalho', path: '/sprites/floor/cascalho.png'},
            { name: 'Cerâmica', path: '/sprites/floor/ceramica.png'},
            { name: 'Cimento Queimado', path: '/sprites/floor/cimento-queimado.png'},
            { name: 'Folha Seca', path: '/sprites/floor/folhas-secas.png'},
            { name: 'Grama', path: '/sprites/floor/grama.png'},
            { name: 'Madeira', path: '/sprites/floor/madeira.png'},
            { name: 'Metal', path: '/sprites/floor/metalico.png'},
            { name: 'Neve', path: '/sprites/floor/neve.png'},
            { name: 'Paralelepípedo', path: '/sprites/floor/paralelepipedo.png'},
            { name: 'Piso Tátil de Atenção', path: '/sprites/floor/piso-tatil-de-atencao.png'},
            { name: 'Piso Tátil de Direção', path: '/sprites/floor/piso-tatil-de-direcao.png'},
            { name: 'Vidro', path: '/sprites/floor/vidro.png'},
        ]
    },
    { 
        id: 2, 
        name: 'Paredes',
        category: 'walls', 
        sprites: [
            { name: 'Azulejo', path: '/sprites/walls/azulejo.png', },
            { name: 'Guarda Corpo', path: '/sprites/walls/guarda-corpo.png'},
            { name: 'Gesso', path: '/sprites/walls/gesso.png'},
            { name: 'Madeira', path: '/sprites/walls/madeira.png'},
            { name: 'Plástico', path: '/sprites/walls/plastico.png'},
            { name: 'Tijolo', path: '/sprites/walls/tijolo.png'},
            { name: 'Vidro', path: '/sprites/walls/vidro.png'},
            { 
                name: 'Escada', 
                path: '/sprites/walls/escada.png',
                size: { 
                        cols: 1, 
                        rows: 2 
                    }
            },
        ]
    },
    { 
        id: 3, 
        name: 'Portas e Janelas',
        category: 'door', 
        sprites: [
            { name: 'Porta Trancada', path: '/sprites/door/porta-cadeado-direita.png'},
            { name: 'Porta Trancada', path: '/sprites/door/porta-cadeado-esquerda.png'},
        ]
    },
    { 
        id: 4, 
        name: 'Móveis',
        category: 'furniture', 
        sprites: [
            { 
                name: 'Cama', 
                path: '/sprites/furniture/cama.png',
                size: { 
                        cols: 2, 
                        rows: 2 
                    }
            }
        ]
    },
    { 
        id: 5, 
        name: 'Eletrodomésticos',
        category: 'Eletrodomésticos', 
        sprites: []
    },
    { 
        id: 6, 
        name: 'Utensílios',
        category: 'utensils', 
        sprites: [
            { name: 'Cone', path: '/sprites/utensils/cone.png'},
            { name: 'Abajur', path: '/sprites/utensils/abajur.png'},
            { name: 'Flor', path: '/sprites/utensils/flor.png'},
        ]
    }
];