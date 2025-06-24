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
            { name:'Água', path:'/sprites/floor/agua.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, soundPath: '/water-walk.mp3', translate: 'water' },
            { name:'Areia', path:'/sprites/floor/areia.png', size:{ cols:1, rows:1}, rotation: 0, visible: true, translate: 'sand' },
            { name:'Carpete', path:'/sprites/floor/carpete.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'carpet' },
            { name:'Cascalho', path:'/sprites/floor/cascalho.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'gravel' },
            { name:'Cerâmica', path:'/sprites/floor/ceramica.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'ceramic' },
            { name:'Cimento Queimado', path:'/sprites/floor/cimento-queimado.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'burnished_concrete' },
            { name:'Folha Seca', path:'/sprites/floor/folhas-secas.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'dry_leaf'},
            { name:'Grama', path:'/sprites/floor/grama.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'grass' },
            { name:'Madeira', path:'/sprites/floor/madeira.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'wood' },
            { name:'Metal', path:'/sprites/floor/metalico.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'metal' },
            { name:'Neve', path:'/sprites/floor/neve.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'snow' },
            { name:'Paralelepípedo', path:'/sprites/floor/paralelepipedo.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'cobblestone'},
            { name:'Pedra', path:'/sprites/floor/pedra.png', size:{ cols:1, rows:1}, rotation: 0, visible: true, translate: 'cobblestone'},
            { name:'Piso Tátil de Atenção', path:'/sprites/floor/piso-tatil-de-atencao.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'tactile_attention_surface' },
            { name:'Piso Tátil de Direção', path:'/sprites/floor/piso-tatil-de-direcao.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'tactile_direction_surface' },
            { name:'Vidro', path:'/sprites/floor/vidro.png', size:{ cols:1, rows:1 }, rotation: 0, visible: true, translate: 'glass' },
        ]
    },
    { 
        id: 2, 
        name: 'Paredes',
        category: 'wall', 
        sprites: [
            { name: 'Azulejo', path: '/sprites/walls/azulejo.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'tile' },
            { name: 'Guarda Corpo', path: '/sprites/walls/guarda-corpo.png', size:{ cols: 1, rotation: 0, rows: 1 }, rotation: 0, visible: true, translate: 'guard_rail' },
            { name: 'Gesso', path: '/sprites/walls/gesso.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'plaster' },
            { name: 'Madeira', path: '/sprites/walls/madeira.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'wall_wood' },
            { name: 'Plástico', path: '/sprites/walls/plastico.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'plastic'},
            { name: 'Tijolo', path: '/sprites/walls/tijolo.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'brick' },
            { name: 'Vidro', path: '/sprites/walls/vidro.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'wall_glass' },
            { name: 'Escada', path: '/sprites/walls/escada.png', size: {cols: 1, rows: 2}, rotation: 0, visible: true, translate: 'stair' },
        ]
    },
    { 
        id: 3, 
        name: 'Portas e Janelas',
        category: 'door', 
        sprites: [
            { name: 'Porta Com Cadeado Esquerda', path: '/sprites/door/porta-esquerda-cadeado.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'locked_door_left'},
            { name: 'Porta Com Cadeado Direita', path: '/sprites/door/porta-direita-cadeado.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'locked_door_right'},
            { name: 'Porta Trancada Esquerda', path: '/sprites/door/porta-trancada-esquerda.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'closed_door_left'},
            { name: 'Porta Trancada Direita', path: '/sprites/door/porta-trancada-direita.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'closed_door_right'},
            { name: 'Porta Aberta Esquerda', path: '/sprites/door/porta-esquerda-aberta.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'open_door_left'},
            { name: 'Porta Aberta Direita', path: '/sprites/door/porta-direita-aberta.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'open_door_right'},
            { name: 'Janela de Madeira', path: '/sprites/door/janela-madeira.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'wooden_window'},
            { name: 'Janela de Aço', path: '/sprites/door/janela-aco.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'steel_window'},
        ]
    },
    { 
        id: 4, 
        name: 'Móveis',
        category: 'furniture', 
        sprites: [
            { name: 'Cama de Casal', path: '/sprites/furniture/cama-casal-01.png', size: {cols: 2,rows: 2}, rotation: 0, visible: true, translate: 'double_bed' },
            { name: 'Armário', path: '/sprites/furniture/armario-01.png', size: {cols: 2,rows: 2}, rotation: 0, visible: true, translate: 'cabinet' },
            { name: 'Guarda Roupa', path: '/sprites/furniture/guarda-roupa-01.png', size: {cols: 2,rows: 2}, rotation: 0, visible: true, translate: 'wardrobe' },
            { name: 'Mesa de Jantar', path: '/sprites/furniture/mesa-jantar-01.png', size: {cols: 2,rows: 2}, rotation: 0, visible: true, translate: 'dining_table' },
            { name: 'Poltrona', path: '/sprites/furniture/poltrona-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'armchair' },
            { name: 'Cadeira', path: '/sprites/furniture/cadeira-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'chair' },
            { name: 'Criado Mudo', path: '/sprites/furniture/criado-mudo-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'nightstand' },
            { name: 'Cômoda', path: '/sprites/furniture/comoda-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'dresser' },
            { name: 'Cama de Solteiro', path: '/sprites/furniture/cama-solteiro-01.png', size: {cols: 1,rows: 2}, rotation: 0, visible: true, translate: 'single_bed' },
            { name: 'Estante', path: '/sprites/furniture/estante-01.png', size: {cols: 1,rows: 2}, rotation: 0, visible: true, translate: 'shelf' },
            { name: 'Mesa', path: '/sprites/furniture/mesa-01.png', size: {cols: 2,rows: 1}, rotation: 0, visible: true, translate: 'table' },
            { name: 'Sofá', path: '/sprites/furniture/sofa-01.png', size: {cols: 2,rows: 1}, rotation: 0, visible: true, translate: 'sofa' },
        ]
    },
    { 
        id: 5, 
        name: 'Eletrodomésticos',
        category: 'appliances', 
        sprites: [
            { name: 'Computador', path: '/sprites/eletronics/computador-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'computer' },
            { name: 'Copiadora', path: '/sprites/eletronics/copiadora.png', size: {cols: 1,rows: 2}, rotation: 0, visible: true, translate: 'copier' },
            { name: 'Fogão', path: '/sprites/eletronics/fogao-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'stove' },
            { name: 'Geladeira', path: '/sprites/eletronics/geladeira-01.png', size: {cols: 1,rows: 2}, rotation: 0, visible: true, translate: 'refrigerator' },
            { name: 'Máquina de Lavar', path: '/sprites/eletronics/maquina-de-lavar-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'washing_machine' },
            { name: 'Microondas', path: '/sprites/eletronics/microondas-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'microwave' },
            { name: 'Televisão', path: '/sprites/eletronics/tv-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'television' },
        ]
    },
    { 
        id: 6, 
        name: 'Utensílios',
        category: 'utensils', 
        sprites: [
            { name: 'Cone', path: '/sprites/utensils/cone.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'cone' },
            { name: 'Abajur', path: '/sprites/utensils/abajur.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'lamp' },
            { name: 'Flor', path: '/sprites/utensils/flor.png', size: {cols: 1,rows: 2}, rotation: 0, visible: true, translate: 'flower' },
            { name: 'Lixeira', path: '/sprites/utensils/lixeira.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'trash' },
            { name: 'Pia', path: '/sprites/utensils/pia-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'sink' },
            { name: 'Piano', path: '/sprites/utensils/piano.png', size: {cols: 2,rows: 2}, rotation: 0, visible: true, translate: 'piano' },
            { name: 'Privada', path: '/sprites/utensils/privada-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'toilet' },
            { name: 'Quadro', path: '/sprites/utensils/quadro.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'frame' },
            { name: 'Violão', path: '/sprites/utensils/violao.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'guitar' },
        ]
    },
    { 
        id: 7, 
        name: 'Elementos Interativos',
        category: 'interactive', 
        sprites: [
            { name: 'Batedeira', path: '/sprites/interactive/batedeira.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'mixer' },
            { name: 'Bebê', path: '/sprites/interactive/bebe.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'baby' },
            { name: 'Cachorro', path: '/sprites/interactive/cachorro-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'dog' },
            { name: 'Celular', path: '/sprites/interactive/celular.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'phone' },
            { name: 'Chaleira', path: '/sprites/interactive/chaleira.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'kettle' },
            { name: 'Despertador', path: '/sprites/interactive/despertador.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'alarm' },
            { name: 'Gato', path: '/sprites/interactive/gato-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'cat' },
            { name: 'Impressora', path: '/sprites/interactive/impressora.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'printer' },
            { name: 'Inseto', path: '/sprites/interactive/inseto-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'bug' },
            { name: 'Liquidificador', path: '/sprites/interactive/liquidificador.png', size:{ cols: 1, rows: 1 }, visible: true, rotation: 0, translate: 'blender' },
            { name: 'Passaro', path: '/sprites/interactive/pombo-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'bird' },
            { name: 'Radio', path: '/sprites/interactive/radio.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'radio' },
            { name: 'Sapo', path: '/sprites/interactive/sapo-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'frog' },
            { name: 'Secador', path: '/sprites/interactive/secador.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'dryer' },
            { name: 'Ventilador', path: '/sprites/interactive/ventilador.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'fan' },
        ]
    },
    { 
        id: 8, 
        name: 'Pessoa',
        category: 'person', 
        sprites: [
            { name: 'Pessoa', path: '/sprites/person/person-01.png', size:{ cols: 1, rows: 1 }, rotation: 0, visible: true, translate: 'character' }
        ]
    }
];