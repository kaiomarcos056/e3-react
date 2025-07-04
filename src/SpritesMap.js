export const spritesMap = [
    {
        id: 1,
        name: 'Pisos',
        category: 'floor',
        sprites: [
            {
                name:'Água',
                path:'/sprites/floor/agua.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/agua.wav',
                translate: 'water',
                anchor_code: '2.0',
                rotations: {
                    0: {
                        path: '/sprites/floor/agua.png',
                        anchor_code: '2.0',
                        layout: [
                            ['2.0'],
                        ],
                    },
                }
            },
            {
                name:'Areia',
                path:'/sprites/floor/areia.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/areia.wav',
                translate: 'sand',
                anchor_code: '4.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/areia.png',
                        anchor_code: '4.0',
                        layout: [
                            ['4.0'],
                        ],
                    },
                }
            },
            { 
                name:'Carpete',
                path:'/sprites/floor/carpete.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/carpete.wav',
                translate: 'carpet',
                anchor_code: '1.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/carpete.png',
                        anchor_code: '1.0',
                        layout: [
                            ['1.0'],
                        ],
                    },
                }
            },
            {
                name:'Cascalho',
                path:'/sprites/floor/cascalho.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/cascalho.wav',
                translate: 'gravel',
                anchor_code: '7.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/cascalho.png',
                        anchor_code: '7.0',
                        layout: [
                            ['7.0'],
                        ],
                    },
                }
            },
            {
                name:'Cerâmica',
                path:'/sprites/floor/ceramica.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/ceramica.wav',
                translate: 'ceramic',
                anchor_code: '3.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/ceramica.png',
                        anchor_code: '3.0',
                        layout: [
                            ['3.0'],
                        ],
                    },
                }
            },
            {
                name:'Cimento Queimado',
                path:'/sprites/floor/cimento-queimado.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/cimento.wav',
                translate: 'burnished_concrete',
                anchor_code: '0.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/cimento-queimado.png',
                        anchor_code: '0.0',
                        layout: [
                            ['0.0'],
                        ],
                    },
                }
            },
            {
                name:'Folha Seca',
                path:'/sprites/floor/folhas-secas.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/folha.wav',
                translate: 'dry_leaf',
                anchor_code: '2.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/folhas-secas.png',
                        anchor_code: '2.1',
                        layout: [
                            ['2.1'],
                        ],
                    },
                }
            },
            {
                name:'Grama',
                path:'/sprites/floor/grama.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/grama.wav',
                translate: 'grass',
                anchor_code: '3.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/grama.png',
                        anchor_code: '3.1',
                        layout: [
                            ['3.1'],
                        ],
                    },
                }
            },
            {
                name:'Madeira',
                path:'/sprites/floor/madeira.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/madeira.wav',
                translate: 'wood',
                anchor_code: '4.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/madeira.png',
                        anchor_code: '4.1',
                        layout: [
                            ['4.1'],
                        ],
                    },
                }
            },
            {
                name:'Metal',
                path:'/sprites/floor/metalico.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/metalico.wav',
                translate: 'metal',
                anchor_code: '1.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/metalico.png',
                        anchor_code: '1.1',
                        layout: [
                            ['1.1'],
                        ],
                    },
                }
            },
            {
                name:'Neve',
                path:'/sprites/floor/neve.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/neve.wav',
                translate: 'snow',
                anchor_code: '5.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/neve.png',
                        anchor_code: '5.1',
                        layout: [
                            ['5.1'],
                        ],
                    },
                }
            },
            {
                name:'Paralelepípedo', 
                path:'/sprites/floor/paralelepipedo.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/paralelepipedo.wav',
                translate: 'cobblestone',
                anchor_code: '0.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/paralelepipedo.png',
                        anchor_code: '0.1',
                        layout: [
                            ['0.1'],
                        ],
                    },
                }
            },
            {
                name:'Pedra',
                path:'/sprites/floor/pedra.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'cobblestone',
                anchor_code: '7.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/pedra.png',
                        anchor_code: '7.1',
                        layout: [
                            ['7.1'],
                        ],
                    },
                }
            },
            {
                name:'Piso Tátil de Atenção',
                path:'/sprites/floor/piso-tatil-de-atencao.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'tactile_attention_surface',
                anchor_code: '5.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/piso-tatil-de-atencao.png',
                        anchor_code: '5.0',
                        layout: [
                            ['5.0'],
                        ],
                    },
                }
            },
            {
                name:'Piso Tátil de Direção',
                path:'/sprites/floor/piso-tatil-de-direcao.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'tactile_direction_surface',
                anchor_code: '6.0',
                rotations: {
                    0: {
                        path:'/sprites/floor/piso-tatil-de-direcao.png',
                        anchor_code: '6.0',
                        layout: [
                            ['6.0'],
                        ],
                    },
                }
            },
            {
                name:'Vidro',
                path:'/sprites/floor/vidro.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                soundPath: '/audios/floor/vidro.wav',
                translate: 'glass',
                anchor_code: '6.1',
                rotations: {
                    0: {
                        path:'/sprites/floor/vidro.png',
                        anchor_code: '6.1',
                        layout: [
                            ['6.1'],
                        ],
                    },
                }
            },
        ]
    },
    {
        id: 2,
        name: 'Paredes',
        category: 'walls',
        sprites: [
            {
                name: 'Azulejo',
                path: '/sprites/walls/azulejo.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'tile',
                anchor_code: '1.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/azulejo.png',
                        anchor_code: '1.0',
                        layout: [
                            ['1.0'],
                        ],
                    },
                }
            },
            {
                name: 'Guarda Corpo',
                path: '/sprites/walls/guarda-corpo.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'guard_rail',
                anchor_code: '0.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/guarda-corpo.png',
                        anchor_code: '0.0',
                        layout: [
                            ['0.0'],
                        ],
                    },
                }
            },
            {
                name: 'Gesso',
                path: '/sprites/walls/gesso.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'plaster',
                anchor_code: '6.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/gesso.png',
                        anchor_code: '6.0',
                        layout: [
                            ['6.0'],
                        ],
                    },
                }
            },
            {
                name: 'Madeira',
                path: '/sprites/walls/madeira.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'wall_wood',
                anchor_code: '2.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/madeira.png',
                        anchor_code: '2.0',
                        layout: [
                            ['2.0'],
                        ],
                    },
                }
            },
            {
                name: 'Plástico',
                path: '/sprites/walls/plastico.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'plastic',
                anchor_code: '5.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/plastico.png',
                        anchor_code: '5.0',
                        layout: [
                            ['5.0'],
                        ],
                    },
                }
            },
            {
                name: 'Tijolo',
                path: '/sprites/walls/tijolo.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'brick',
                anchor_code: '3.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/tijolo.png',
                        anchor_code: '3.0',
                        layout: [
                            ['3.0'],
                        ],
                    },
                }
            },
            {
                name: 'Vidro',
                path: '/sprites/walls/vidro.png',
                size: [1, 1],
                rotation: 0,
                visible: true,
                translate: 'wall_glass',
                anchor_code: '4.0',
                rotations: {
                    0: {
                        path:'/sprites/walls/vidro.png',
                        anchor_code: '4.0',
                        layout: [
                            ['4.0'],
                        ],
                    },
                }
            },
            {
                name: 'Escada',
                path: '/sprites/walls/escada-01.png',
                size: [1, 2],
                rotation: 0,
                visible: true,
                translate: 'stair',
                anchor_code: '3.1',
                rotations: {
                    0: { 
                        path: '/sprites/walls/escada-01.png', 
                        anchor_code: '3.1',
                        layout: [
                            ['3.1'],
                            ['3.2']
                        ]
                    },
                    90: { 
                        path: '/sprites/walls/escada-02.png', 
                        anchor_code: '1.2',
                        layout: [
                            ['0.2', '1.2']
                        ]
                    },
                    180: { 
                        path: '/sprites/walls/escada-03.png', 
                        anchor_code: '2.2',
                        layout: [
                            ['2.1'],
                            ['2.2']
                        ]
                    },
                    270: { 
                        path: '/sprites/walls/escada-04.png', 
                        anchor_code: '0.1',
                        layout: [
                            ['0.1', '1.1']
                        ]
                    },
                }
            },
        ]
    },
    { 
        id: 3, 
        name: 'Portas e Janelas',
        category: 'door_and_windows', 
        sprites: [
            { 
                name: 'Porta Trancada', 
                path: '/sprites/door/porta-trancada-01.png', 
                size: [2, 1],  
                rotation: 0, 
                visible: true, 
                translate: 'locked_door',
                anchor_code: '3.1',
                rotations: {
                    0: { 
                        path: '/sprites/door/porta-trancada-01.png', 
                        anchor_code: '0.0',
                        layout: [
                            ['0.0', '1.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/door/porta-trancada-02.png', 
                        anchor_code: '0.2',
                        layout: [
                            ['0.1'],
                            ['0.2']
                        ]
                    }
                }
            },
            { 
                name: 'Porta Fechada', 
                path: '/sprites/door/porta-fechada-01.png', 
                size: [2 ,1],
                rotation: 0, 
                visible: true, 
                translate: 'closed_door',
                anchor_code: '2.0',
                rotations: {
                    0: { 
                        path: '/sprites/door/porta-fechada-01.png', 
                        anchor_code: '2.0',
                        layout: [
                            ['2.0', '3.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/door/porta-fechada-02.png', 
                        anchor_code: '2.2',
                        layout: [
                            ['2.1'],
                            ['2.2']
                        ]
                    }
                }
            },
            { 
                name: 'Porta Aberta', 
                path: '/sprites/door/porta-aberta-01.png', 
                size: [2 ,1],
                rotation: 0, 
                visible: true, 
                translate: 'open_door',
                anchor_code: '2.0',
                rotations: {
                    0: { 
                        path: '/sprites/door/porta-aberta-01.png', 
                        anchor_code: '4.0',
                        layout: [
                            ['4.0', '5.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/door/porta-aberta-02.png', 
                        anchor_code: '4.2',
                        layout: [
                            ['4.1'],
                            ['4.2']
                        ]
                    }
                }
            },
            { 
                name: 'Janela de Madeira', 
                path: '/sprites/door/janela-madeira-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'wooden_window',
                anchor_code: '7.0',
                rotations: {
                    0: {
                        path: '/sprites/door/janela-madeira-01.png',
                        anchor_code: '7.0',
                        layout: [
                            ['7.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/door/janela-madeira-02.png',
                        anchor_code: '7.1',
                        layout: [
                            ['7.1'],
                        ],
                    },
                }
            },
            { 
                name: 'Janela de Aço', 
                path: '/sprites/door/janela-aco-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'steel_window',
                anchor_code: '6.0',
                rotations: {
                    0: {
                        path: '/sprites/door/janela-aco-01.png',
                        anchor_code: '6.0',
                        layout: [
                            ['6.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/door/janela-aco-02.png',
                        anchor_code: '6.1',
                        layout: [
                            ['6.1'],
                        ],
                    },
                }
            },
        ]
    },
    { 
        id: 4, 
        name: 'Móveis',
        category: 'furniture', 
        sprites: [
            {
                name: 'Cama de Casal',
                path: '/sprites/furniture/cama-casal-01.png',
                size: [2, 2],
                rotation: 0,
                visible: true,
                translate: 'double_bed',
                anchor_code: '1.1',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/cama-casal-01.png', 
                        anchor_code: '1.1',
                        layout: [
                            ['0.0', '1.0'],
                            ['0.1', '1.1']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/cama-casal-02.png', 
                        anchor_code: '6.1',
                        layout: [
                            ['6.0', '7.0'],
                            ['6.1', '7.1']
                        ]
                    },
                    180: { 
                        path: '/sprites/furniture/cama-casal-03.png', 
                        anchor_code: '2.0',
                        layout: [
                            ['2.0', '3.0'],
                            ['2.1', '3.1']
                        ]
                    },
                    270: { 
                        path: '/sprites/furniture/cama-casal-04.png', 
                        anchor_code: '5.0',
                        layout: [
                            ['4.0', '5.0'],
                            ['4.1', '5.1']
                        ]
                    }
                }
            },
            { 
                name: 'Armário', 
                path: '/sprites/furniture/armario-01.png', 
                size: [2, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'cabinet',
                anchor_code: '0.7',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/armario-01.png', 
                        anchor_code: '0.7',
                        layout: [
                            ['0.6', '1.6'],
                            ['0.7', '1.7']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/armario-02.png', 
                        anchor_code: '3.6',
                        layout: [
                            ['2.6', '2.7'],
                            ['3.6', '3.7']
                        ]
                    },
                    180: { 
                        path: '/sprites/furniture/armario-03.png', 
                        anchor_code: '0.8',
                        layout: [
                            ['0.8', '1.8'],
                            ['0.9', '1.9']
                        ]
                    },
                    270: { 
                        path: '/sprites/furniture/armario-04.png', 
                        anchor_code: '3.9',
                        layout: [
                            ['2.8', '3.8'],
                            ['2.9', '3.9']
                        ]
                    }
                }
            },
            { 
                name: 'Guarda Roupa', 
                path: '/sprites/furniture/guarda-roupa-01.png', 
                size: [2, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'wardrobe',
                anchor_code: '4.5',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/guarda-roupa-01.png', 
                        anchor_code: '4.5',
                        layout: [
                            ['4.4', '5.4'],
                            ['4.5', '5.5']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/guarda-roupa-02.png', 
                        anchor_code: '6.4',
                        layout: [
                            ['6.4', '7.4'],
                            ['6.5', '7.5']
                        ]
                    },
                    180: { 
                        path: '/sprites/furniture/guarda-roupa-03.png', 
                        anchor_code: '5.6',
                        layout: [
                            ['4.6', '5.6'],
                            ['4.7', '5.7']
                        ]
                    },
                    270: { 
                        path: '/sprites/furniture/guarda-roupa-04.png', 
                        anchor_code: '3.9',
                        layout: [
                            ['6.6', '7.6'],
                            ['6.7', '7.7']
                        ]
                    }
                }
            },
            { 
                name: 'Mesa de Jantar', 
                path: '/sprites/furniture/mesa-jantar-01.png', 
                size: [2, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'dining_table',
                anchor_code: '3.5',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/mesa-jantar-01.png', 
                        anchor_code: '3.5',
                        layout: [
                            ['2.4', '3.4'],
                            ['2.5', '3.5']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/mesa-jantar-02.png', 
                        anchor_code: '0.4',
                        layout: [
                            ['0.4', '1.4'],
                            ['0.5', '1.5']
                        ]
                    },
                }
            },
            { 
                name: 'Poltrona', 
                path: '/sprites/furniture/poltrona-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'armchair',
                anchor_code: '4.2',
                rotations: {
                    0: {
                        path: '/sprites/furniture/poltrona-01.png', 
                        anchor_code: '4.2',
                        layout: [
                            ['4.2'],
                        ],
                    },
                    90: {
                        path: '/sprites/furniture/poltrona-02.png', 
                        anchor_code: '5.3',
                        layout: [
                            ['5.3'],
                        ],
                    },
                    180: {
                        path: '/sprites/furniture/poltrona-03.png', 
                        anchor_code: '4.3',
                        layout: [
                            ['4.3'],
                        ],
                    },
                    270: {
                        path: '/sprites/furniture/poltrona-04.png', 
                        anchor_code: '5.2',
                        layout: [
                            ['5.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Cadeira', 
                path: '/sprites/furniture/cadeira-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'chair',
                anchor_code: '6.2',
                rotations: {
                    0: {
                        path: '/sprites/furniture/cadeira-01.png', 
                        anchor_code: '6.2',
                        layout: [
                            ['6.2'],
                        ],
                    },
                    90: {
                        path: '/sprites/furniture/cadeira-02.png', 
                        anchor_code: '7.3',
                        layout: [
                            ['7.3'],
                        ],
                    },
                    180: {
                        path: '/sprites/furniture/cadeira-03.png', 
                        anchor_code: '7.2',
                        layout: [
                            ['7.2'],
                        ],
                    },
                    270: {
                        path: '/sprites/furniture/cadeira-04.png', 
                        anchor_code: '6.3',
                        layout: [
                            ['6.3'],
                        ],
                    },
                }
            },
            { 
                name: 'Criado Mudo', 
                path: '/sprites/furniture/criado-mudo-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'nightstand',
                anchor_code: '6.8',
                rotations: {
                    0: {
                        path: '/sprites/furniture/criado-mudo-01.png', 
                        anchor_code: '6.8',
                        layout: [
                            ['6.8'],
                        ],
                    },
                    90: {
                        path: '/sprites/furniture/criado-mudo-02.png', 
                        anchor_code: '7.8',
                        layout: [
                            ['7.8'],
                        ],
                    },
                    180: {
                        path: '/sprites/furniture/criado-mudo-03.png', 
                        anchor_code: '6.9',
                        layout: [
                            ['6.9'],
                        ],
                    },
                    270: {
                        path: '/sprites/furniture/criado-mudo-04.png', 
                        anchor_code: '7.9',
                        layout: [
                            ['7.9'],
                        ],
                    },
                }
            },
            { 
                name: 'Cômoda', 
                path: '/sprites/furniture/comoda-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'dresser',
                anchor_code: '0.10',
                rotations: {
                    0: {
                        path: '/sprites/furniture/comoda-01.png', 
                        anchor_code: '0.10',
                        layout: [
                            ['0.10'],
                        ],
                    },
                    90: {
                        path: '/sprites/furniture/comoda-02.png', 
                        anchor_code: '1.11',
                        layout: [
                            ['1.11'],
                        ],
                    },
                    180: {
                        path: '/sprites/furniture/comoda-03.png', 
                        anchor_code: '0.11',
                        layout: [
                            ['0.11'],
                        ],
                    },
                    270: {
                        path: '/sprites/furniture/comoda-04.png', 
                        anchor_code: '1.10',
                        layout: [
                            ['1.10'],
                        ],
                    },
                }
            },
            { 
                name: 'Cama de Solteiro', 
                path: '/sprites/furniture/cama-solteiro-01.png', 
                size: [1, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'single_bed',
                anchor_code: '0.3',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/cama-solteiro-01.png', 
                        anchor_code: '0.3',
                        layout: [
                            ['0.2'],
                            ['0.3']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/cama-solteiro-02.png', 
                        anchor_code: '2.3',
                        layout: [
                            ['2.3', '3.3']
                        ]
                    },
                    180: { 
                        path: '/sprites/furniture/cama-solteiro-03.png', 
                        anchor_code: '1.2',
                        layout: [
                            ['1.2'],
                            ['1.3']
                        ]
                    },
                    270: { 
                        path: '/sprites/furniture/cama-solteiro-04.png', 
                        anchor_code: '3.2',
                        layout: [
                            ['2.2', '3.2']
                        ]
                    }
                }
            },
            { 
                name: 'Estante', 
                path: '/sprites/furniture/estante-01.png', 
                size: [1, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'shelf',
                anchor_code: '6.11',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/estante-01.png', 
                        anchor_code: '6.11',
                        layout: [
                            ['6.10'],
                            ['6.11']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/estante-02.png', 
                        anchor_code: '6.13',
                        layout: [
                            ['6.13', '7.13']
                        ]
                    },
                    180: { 
                        path: '/sprites/furniture/estante-03.png', 
                        anchor_code: '7.10',
                        layout: [
                            ['7.10'],
                            ['7.11']
                        ]
                    },
                    270: { 
                        path: '/sprites/furniture/estante-04.png', 
                        anchor_code: '7.12',
                        layout: [
                            ['6.12', '7.12']
                        ]
                    }
                }
            },
            { 
                name: 'Mesa', 
                path: '/sprites/furniture/mesa-01.png', 
                size: [2, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'table',
                anchor_code: '1.12',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/mesa-01.png',
                        anchor_code: '1.12',
                        layout: [
                            ['1.12', '2.12']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/mesa-02.png',
                        anchor_code: '0.12',
                        layout: [
                            ['0.12'],
                            ['0.13']
                        ]
                    },
                }
            },
            { 
                name: 'Sofá', 
                path: '/sprites/furniture/sofa-01.png', 
                size: [2, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'sofa',
                anchor_code: '4.10',
                rotations: {
                    0: { 
                        path: '/sprites/furniture/sofa-01.png', 
                        anchor_code: '4.10',
                        layout: [
                            ['4.10', '5.10']
                        ]
                    },
                    90: { 
                        path: '/sprites/furniture/sofa-02.png', 
                        anchor_code: '5.8',
                        layout: [
                            ['5.8'],
                            ['5.9']
                        ]
                    },
                    180: { 
                        path: '/sprites/furniture/sofa-03.png', 
                        anchor_code: '5.11',
                        layout: [
                            ['4.11', '5.11']
                        ]
                    },
                    270: { 
                        path: '/sprites/furniture/sofa-04.png', 
                        anchor_code: '4.9',
                        layout: [
                            ['4.8'],
                            ['4.9']
                        ]
                    },
                }
            },
        ]
    },
    { 
        id: 5, 
        name: 'Eletrodomésticos',
        category: 'eletronics', 
        sprites: [
            { 
                name: 'Computador', 
                path: '/sprites/eletronics/computador-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'computer',
                anchor_code: '4.0',
                rotations: {
                    0: {
                        path: '/sprites/eletronics/computador-01.png', 
                        anchor_code: '4.0',
                        layout: [
                            ['4.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/eletronics/computador-02.png', 
                        anchor_code: '5.1',
                        layout: [
                            ['5.1'],
                        ],
                    },
                    180: {
                        path: '/sprites/eletronics/computador-03.png', 
                        anchor_code: '4.1',
                        layout: [
                            ['4.1'],
                        ],
                    },
                    270: {
                        path: '/sprites/eletronics/computador-04.png', 
                        anchor_code: '5.0',
                        layout: [
                            ['5.0'],
                        ],
                    },
                }
            },
            { 
                name: 'Copiadora', 
                path: '/sprites/eletronics/copiadora.png', 
                size: [1, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'copier',
                anchor_code: '6.3',
                rotations: {
                    0: { 
                        path: '/sprites/eletronics/copiadora.png', 
                        anchor_code: '6.3',
                        layout: [
                            ['6.2'],
                            ['6.3']
                        ]
                    },
                }
            },
            { 
                name: 'Fogão', 
                path: '/sprites/eletronics/fogao-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'stove',
                anchor_code: '2.0',
                rotations: {
                    0: { 
                        path: '/sprites/eletronics/fogao-01.png', 
                        anchor_code: '2.0',
                        layout: [
                            ['2.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/eletronics/fogao-02.png', 
                        anchor_code: '3.0',
                        layout: [
                            ['3.0']
                        ]
                    },
                    180: { 
                        path: '/sprites/eletronics/fogao-03.png', 
                        anchor_code: '2.1',
                        layout: [
                            ['2.1']
                        ]
                    },
                    270: { 
                        path: '/sprites/eletronics/fogao-04.png', 
                        anchor_code: '3.1',
                        layout: [
                            ['3.1']
                        ]
                    },
                }
            },
            { 
                name: 'Geladeira', 
                path: '/sprites/eletronics/geladeira-01.png', 
                size: [1, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'refrigerator',
                anchor_code: '0.0',
                rotations: {
                    0: { 
                        path: '/sprites/eletronics/geladeira-01.png', 
                        anchor_code: '0.0',
                        layout: [
                            ['0.0'],
                            ['0.1'],
                        ]
                    },
                    90: { 
                        path: '/sprites/eletronics/geladeira-02.png', 
                        anchor_code: '0.3',
                        layout: [
                            ['0.3', '1.3']
                        ]
                    },
                    180: { 
                        path: '/sprites/eletronics/geladeira-03.png', 
                        anchor_code: '1.1',
                        layout: [
                            ['1.0'],
                            ['1.1'],
                        ]
                    },
                    270: { 
                        path: '/sprites/eletronics/geladeira-04.png', 
                        anchor_code: '3.1',
                        layout: [
                            ['0.2', '1.2']
                        ]
                    },
                }
            },
            { 
                name: 'Máquina de Lavar', 
                path: '/sprites/eletronics/maquina-de-lavar-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'washing_machine',
                anchor_code: '6.0',
                rotations: {
                    0: { 
                        path: '/sprites/eletronics/maquina-de-lavar-01.png', 
                        anchor_code: '6.0',
                        layout: [
                            ['6.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/eletronics/maquina-de-lavar-02.png', 
                        anchor_code: '7.1',
                        layout: [
                            ['7.1']
                        ]
                    },
                    180: { 
                        path: '/sprites/eletronics/maquina-de-lavar-03.png', 
                        anchor_code: '6.1',
                        layout: [
                            ['6.1']
                        ]
                    },
                    270: { 
                        path: '/sprites/eletronics/maquina-de-lavar-04.png', 
                        anchor_code: '7.0',
                        layout: [
                            ['7.0']
                        ]
                    },
                }
            },
            { 
                name: 'Microondas', 
                path: '/sprites/eletronics/microondas-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'microwave',
                anchor_code: '4.2',
                rotations: {
                    0: { 
                        path: '/sprites/eletronics/microondas-01.png', 
                        anchor_code: '4.2',
                        layout: [
                            ['4.2']
                        ]
                    },
                    90: { 
                        path: '/sprites/eletronics/microondas-02.png', 
                        anchor_code: '5.3',
                        layout: [
                            ['5.3']
                        ]
                    },
                    180: { 
                        path: '/sprites/eletronics/microondas-03.png', 
                        anchor_code: '4.3',
                        layout: [
                            ['4.3']
                        ]
                    },
                    270: { 
                        path: '/sprites/eletronics/microondas-04.png', 
                        anchor_code: '5.2',
                        layout: [
                            ['5.2']
                        ]
                    },
                }
            },
            { 
                name: 'Televisão', 
                path: '/sprites/eletronics/tv-01.png', 
                size: [1, 1],
                rotation: 0, 
                visible: true, 
                translate: 'television',
                anchor_code: '2.2',
                rotations: {
                    0: { 
                        path: '/sprites/eletronics/tv-01.png', 
                        anchor_code: '2.2',
                        layout: [
                            ['2.2']
                        ]
                    },
                    90: { 
                        path: '/sprites/eletronics/tv-02.png', 
                        anchor_code: '3.3',
                        layout: [
                            ['3.3']
                        ]
                    },
                    180: { 
                        path: '/sprites/eletronics/tv-03.png', 
                        anchor_code: '3.2',
                        layout: [
                            ['3.2']
                        ]
                    },
                    270: { 
                        path: '/sprites/eletronics/tv-04.png', 
                        anchor_code: '2.3',
                        layout: [
                            ['2.3']
                        ]
                    },
                }
            },
        ]
    },
    { 
        id: 6, 
        name: 'Utensílios',
        category: 'utensils', 
        sprites: [
            { 
                name: 'Cone', 
                path: '/sprites/utensils/cone.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'cone',
                anchor_code: '2.0',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/cone.png',
                        anchor_code: '2.0',
                        layout: [
                            ['2.0']
                        ]
                    },
                }
            },
            { 
                name: 'Abajur', 
                path: '/sprites/utensils/abajur.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'lamp',
                anchor_code: '3.0',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/abajur.png', 
                        anchor_code: '3.0',
                        layout: [
                            ['3.0']
                        ]
                    },
                }
            },
            { 
                name: 'Flor', 
                path: '/sprites/utensils/flor.png', 
                size: [1, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'flower',
                anchor_code: '2.3',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/flor.png', 
                        anchor_code: '2.3',
                        layout: [
                            ['2.2'],
                            ['2.3']
                        ]
                    }
                }
            },
            { 
                name: 'Lixeira', 
                path: '/sprites/utensils/lixeira.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'trash',
                anchor_code: '3.1',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/lixeira.png', 
                        anchor_code: '3.1',
                        layout: [
                            ['3.1']
                        ]
                    }
                }
            },
            { 
                name: 'Pia', 
                path: '/sprites/utensils/pia-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'sink',
                anchor_code: '6.0',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/pia-01.png',
                        anchor_code: '6.0',
                        layout: [
                            ['6.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/utensils/pia-02.png', 
                        anchor_code: '7.1',
                        layout: [
                            ['7.1']
                        ]
                    },
                    180: { 
                        path: '/sprites/utensils/pia-03.png', 
                        anchor_code: '6.1',
                        layout: [
                            ['6.1']
                        ]
                    },
                    270: { 
                        path: '/sprites/utensils/pia-04.png', 
                        anchor_code: '7.0',
                        layout: [
                            ['7.0']
                        ]
                    },
                }
            },
            { 
                name: 'Piano', 
                path: '/sprites/utensils/piano-01.png', 
                size: [2, 2], 
                rotation: 0, 
                visible: true, 
                translate: 'piano',
                anchor_code: '1.1',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/piano-01.png',
                        anchor_code: '1.1',
                        layout: [
                            ['0.0', '1.0'],
                            ['0.1', '1.1'],
                        ]
                    },
                    90: { 
                        path: '/sprites/utensils/piano-02.png',
                        anchor_code: '1.2',
                        layout: [
                            ['0.2', '1.2'],
                            ['0.3', '1.3'],
                        ]
                    },
                }
            },
            { 
                name: 'Privada', 
                path: '/sprites/utensils/privada-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'toilet',
                anchor_code: '4.0',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/privada-01.png', 
                        anchor_code: '4.0',
                        layout: [
                            ['4.0']
                        ]
                    },
                    90: { 
                        path: '/sprites/utensils/privada-02.png', 
                        anchor_code: '5.1',
                        layout: [
                            ['5.1']
                        ]
                    },
                    180: { 
                        path: '/sprites/utensils/privada-03.png', 
                        anchor_code: '4.1',
                        layout: [
                            ['4.1']
                        ]
                    },
                    270: { 
                        path: '/sprites/utensils/privada-04.png', 
                        anchor_code: '5.0',
                        layout: [
                            ['5.0']
                        ]
                    },
                }
            },
            { 
                name: 'Quadro', 
                path: '/sprites/utensils/quadro-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'frame',
                anchor_code: '3.2',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/quadro-01.png', 
                        anchor_code: '3.2',
                        layout: [
                            ['3.2']
                        ]
                    },
                    90: { 
                        path: '/sprites/utensils/quadro-02.png', 
                        anchor_code: '4.3',
                        layout: [
                            ['4.3']
                        ]
                    },
                    180: { 
                        path: '/sprites/utensils/quadro-03.png', 
                        anchor_code: '3.3',
                        layout: [
                            ['3.3']
                        ]
                    },
                    270: { 
                        path: '/sprites/utensils/quadro-04.png',  
                        anchor_code: '4.2',
                        layout: [
                            ['4.2']
                        ]
                    },
                }
            },
            { 
                name: 'Violão', 
                path: '/sprites/utensils/violao.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'guitar',
                anchor_code: '2.1',
                rotations: {
                    0: { 
                        path: '/sprites/utensils/violao.png', 
                        anchor_code: '2.1',
                        layout: [
                            ['2.1']
                        ]
                    }
                }
            },
        ]
    },
    { 
        id: 7, 
        name: 'Elementos Interativos',
        category: 'interactive_elements', 
        sprites: [
            { 
                name: 'Batedeira', 
                path: '/sprites/interactive/batedeira.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'mixer',
                anchor_code: '4.3',
                rotations: {
                    0: {
                        path: '/sprites/interactive/batedeira.png', 
                        anchor_code: '4.3',
                        layout: [
                            ['4.3'],
                        ],
                    },
                }
            },
            { 
                name: 'Bebê', 
                path: '/sprites/interactive/bebe.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'baby',
                anchor_code: '7.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/bebe.png', 
                        anchor_code: '7.2',
                        layout: [
                            ['7.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Cachorro', 
                path: '/sprites/interactive/cachorro-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'dog',
                anchor_code: '0.0',
                rotations: {
                    0: {
                        path: '/sprites/interactive/cachorro-01.png', 
                        anchor_code: '0.0',
                        layout: [
                            ['0.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/interactive/cachorro-02.png', 
                        anchor_code: '1.0',
                        layout: [
                            ['1.0'],
                        ],
                    },
                    180: {
                        path: '/sprites/interactive/cachorro-03.png', 
                        anchor_code: '1.1',
                        layout: [
                            ['1.1'],
                        ],
                    },
                    270: {
                        path: '/sprites/interactive/cachorro-04.png', 
                        anchor_code: '0.1',
                        layout: [
                            ['0.1'],
                        ],
                    },
                }
            },
            { 
                name: 'Celular', 
                path: '/sprites/interactive/celular.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'phone',
                anchor_code: '6.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/celular.png',  
                        anchor_code: '6.2',
                        layout: [
                            ['6.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Chaleira', 
                path: '/sprites/interactive/chaleira.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'kettle',
                anchor_code: '4.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/chaleira.png', 
                        anchor_code: '4.2',
                        layout: [
                            ['4.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Despertador', 
                path: '/sprites/interactive/despertador.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'alarm',
                anchor_code: '3.3',
                rotations: {
                    0: {
                        path: '/sprites/interactive/despertador.png', 
                        anchor_code: '3.3',
                        layout: [
                            ['3.3'],
                        ],
                    },
                }
            },
            { 
                name: 'Gato', 
                path: '/sprites/interactive/gato-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'cat',
                anchor_code: '6.0',
                rotations: {
                    0: {
                        path: '/sprites/interactive/gato-01.png',
                        anchor_code: '6.0',
                        layout: [
                            ['6.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/interactive/gato-02.png',
                        anchor_code: '7.0',
                        layout: [
                            ['7.0'],
                        ],
                    },
                    180: {
                        path: '/sprites/interactive/gato-03.png',
                        anchor_code: '7.1',
                        layout: [
                            ['7.1'],
                        ],
                    },
                    270: {
                        path: '/sprites/interactive/gato-04.png',
                        anchor_code: '6.1',
                        layout: [
                            ['6.1'],
                        ],
                    },
                }
            },
            { 
                name: 'Impressora', 
                path: '/sprites/interactive/impressora.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'printer',
                anchor_code: '5.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/impressora.png', 
                        anchor_code: '5.2',
                        layout: [
                            ['5.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Inseto', 
                path: '/sprites/interactive/inseto-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, translate: 'bug',
                anchor_code: '2.0',
                rotations: {
                    0: {
                        path: '/sprites/interactive/inseto-01.png', 
                        anchor_code: '2.0',
                        layout: [
                            ['2.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/interactive/inseto-02.png', 
                        anchor_code: '3.0',
                        layout: [
                            ['3.0'],
                        ],
                    },
                    180: {
                        path: '/sprites/interactive/inseto-03.png', 
                        anchor_code: '3.1',
                        layout: [
                            ['3.1'],
                        ],
                    },
                    270: {
                        path: '/sprites/interactive/inseto-04.png', 
                        anchor_code: '2.1',
                        layout: [
                            ['2.1'],
                        ],
                    },
                }
            },
            { 
                name: 'Liquidificador', 
                path: '/sprites/interactive/liquidificador.png', 
                size: [1, 1],
                rotation: 0,
                visible: true, 
                translate: 'blender',
                anchor_code: '3.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/liquidificador.png', 
                        anchor_code: '3.2',
                        layout: [
                            ['3.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Passaro', 
                path: '/sprites/interactive/pombo-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'bird',
                anchor_code: '4.0',
                rotations: {
                    0: {
                        path: '/sprites/interactive/pombo-01.png', 
                        anchor_code: '4.0',
                        layout: [
                            ['4.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/interactive/pombo-02.png', 
                        anchor_code: '5.0',
                        layout: [
                            ['5.0'],
                        ],
                    },
                    180: {
                        path: '/sprites/interactive/pombo-03.png', 
                        anchor_code: '5.1',
                        layout: [
                            ['5.1'],
                        ],
                    },
                    270: {
                        path: '/sprites/interactive/pombo-04.png', 
                        anchor_code: '4.1',
                        layout: [
                            ['4.1'],
                        ],
                    },
                }
            },
            { 
                name: 'Radio', 
                path: '/sprites/interactive/radio.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'radio',
                anchor_code: '2.3',
                rotations: {
                    0: {
                        path: '/sprites/interactive/radio.png', 
                        anchor_code: '2.3',
                        layout: [
                            ['2.3'],
                        ],
                    },
                }
            },
            { 
                name: 'Sapo', 
                path: '/sprites/interactive/sapo-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'frog',
                anchor_code: '0.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/sapo-01.png', 
                        anchor_code: '0.2',
                        layout: [
                            ['0.2'],
                        ],
                    },
                    90: {
                        path: '/sprites/interactive/sapo-02.png', 
                        anchor_code: '1.2',
                        layout: [
                            ['1.2'],
                        ],
                    },
                    180: {
                        path: '/sprites/interactive/sapo-03.png', 
                        anchor_code: '1.3',
                        layout: [
                            ['1.3'],
                        ],
                    },
                    270: {
                        path: '/sprites/interactive/sapo-04.png', 
                        anchor_code: '0.3',
                        layout: [
                            ['0.3'],
                        ],
                    },
                }
            },
            { 
                name: 'Secador', 
                path: '/sprites/interactive/secador.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'dryer',
                anchor_code: '2.2',
                rotations: {
                    0: {
                        path: '/sprites/interactive/secador.png', 
                        anchor_code: '2.2',
                        layout: [
                            ['2.2'],
                        ],
                    },
                }
            },
            { 
                name: 'Ventilador', 
                path: '/sprites/interactive/ventilador.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'fan',
                anchor_code: '5.3',
                rotations: {
                    0: {
                        path: '/sprites/interactive/ventilador.png', 
                        anchor_code: '5.3',
                        layout: [
                            ['5.3'],
                        ],
                    },
                }
            },
        ]
    },
    { 
        id: 8, 
        name: 'Pessoa',
        category: 'persons', 
        sprites: [
            { 
                name: 'Pessoa', 
                path: '/sprites/person/person-01.png', 
                size: [1, 1], 
                rotation: 0, 
                visible: true, 
                translate: 'character',
                anchor_code: '2.0',
                rotations: {
                    0: {
                        path: '/sprites/person/person-01.png', 
                        anchor_code: '2.0',
                        layout: [
                            ['2.0'],
                        ],
                    },
                    90: {
                        path: '/sprites/person/person-02.png', 
                        anchor_code: '3.0',
                        layout: [
                            ['3.0'],
                        ],
                    },
                    180: {
                        path: '/sprites/person/person-03.png', 
                        anchor_code: '0.0',
                        layout: [
                            ['0.0'],
                        ],
                    },
                    270: {
                        path: '/sprites/person/person-04.png', 
                        anchor_code: '1.0',
                        layout: [
                            ['1.0'],
                        ],
                    },
                }
            }
        ]
    }
];