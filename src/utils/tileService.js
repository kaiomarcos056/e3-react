// --- Variáveis Globais (Cache de Dados) ---
// Estas variáveis guardam os dados depois de processados para que não precisemos
// de ler e processar o ficheiro tiles.json toda vez que precisarmos da informação.

// Guarda um dicionário com todas as propriedades de tiles, agrupadas pela sua categoria.
let PROPS_BY_CATEGORY = {};
// Guarda uma lista única com TODAS as propriedades de tiles, sem separação.
let ALL_PROPS = [];


/**
 * Função auxiliar que converte uma string de tamanho simples (ex: "2x1")
 * para um array de números (ex: [2, 1]).
 * @param {string} size A string de tamanho.
 * @returns {Array<number>} Um array com [largura, altura].
 */
function parseSizeStr(size) {
    // Divide a string no "x" para separar largura e altura.
    const parts = size.split('x');
    // Converte as partes para números e retorna-as. O '10' indica base decimal.
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
}

/**
 * Processa a string de "tamanho" do JSON, que pode ter um formato complexo.
 * Ex: "2x1" ou "2x1 (2x2)".
 * @param {string} data A string de tamanho vinda do JSON.
 * @returns {object} Um objeto contendo o tamanho principal (sourceSize) e o tamanho da âncora (anchorSize), se existir.
 */
function parseSize(data) {
    // Remove espaços em branco extras no início e no fim.
    data = data.trim();
    // Se a string não incluir um parêntese, ela só tem o tamanho principal.
    if (!data.includes("(")) {
        return { sourceSize: parseSizeStr(data), anchorSize: null };
    } 
    // Se incluir, ela tem o tamanho principal E o tamanho da âncora.
    else {
        // Divide a string no espaço para separar as duas partes. Ex: "2x1" e "(2x2)".
        const parts = data.split(" ");
        const sourceSizeStr = parts[0];
        // Pega a segunda parte e remove os parênteses.
        const anchorSizeStr = parts[1].replace("(", "").replace(")", "");
        // Converte ambas as strings de tamanho para números usando a nossa outra função auxiliar.
        return {
            sourceSize: parseSizeStr(sourceSizeStr),
            anchorSize: parseSizeStr(anchorSizeStr)
        };
    }
}

/**
 * Esta é uma "Generator Function". Ela processa a string de "codigo" do JSON.
 * Essa string pode conter múltiplas variações de um objeto, separadas por "|".
 * Ex: "0.3 (0.2)|1.2 (1.3)" representa duas variações de Cama de Solteiro.
 * Em vez de retornar um array, ela usa 'yield' para "entregar" um objeto de cada vez.
 * @param {string} codesList A string completa de códigos, ex: "0.0 (1.0)|0.2 (0.1)".
 * @returns {Generator<object>} Um "gerador" que produz um objeto com o código principal e os códigos âncora para cada variação.
 */
function* parseCodes(codesList) {
    // Itera sobre cada variação, separando pela barra vertical "|".
    for (const codes of codesList.split('|')) {
        // Se a variação inclui um parêntese, ela tem códigos âncora.
        if (codes.includes("(")) {
            // Separa o código principal dos códigos âncora.
            const parts = codes.split(" ");
            const sourceCode = parts[0];
            // Remove os parênteses e divide os códigos âncora pela vírgula.
            const anchorCodes = parts[1].replace("(", "").replace(")", "").split(",");
            // "Entrega" (yield) o resultado desta variação.
            yield { sourceCode, anchorCodes };
        } 
        // Se não tem parêntese, é uma variação simples, sem âncoras.
        else {
            // "Entrega" (yield) o resultado com uma lista de âncoras vazia.
            yield { sourceCode: codes, anchorCodes: [] };
        }
    }
}

/**
 * Orquestra o processamento dos dados brutos do JSON.
 * Ela pega a lista de objetos do JSON e a transforma numa lista limpa e bem estruturada de 'Prop'.
 * @param {Array<object>} rawProps A lista de objetos diretamente do ficheiro JSON.
 * @returns {Array<object>} Um array de objetos 'Prop' totalmente processados.
 */
function processRawProps(rawProps) {
    // Array para guardar os resultados finais.
    const props = [];
    // Itera sobre cada item (propriedade de tile) do JSON.
    for (const prop of rawProps) {
        // Extrai as informações de cada campo.
        const name = prop["nome"];
        const category = prop["camada"].toLowerCase(); // Converte para minúsculas.
        // Usa as nossas funções auxiliares para processar as strings complexas de tamanho e código.
        const { sourceSize, anchorSize } = parseSize(prop["tamanho"]);

        // Como 'parseCodes' é um gerador, usamos 'for...of' para iterar sobre cada variação que ele "entrega".
        for (const { sourceCode, anchorCodes } of parseCodes(prop["codigo"])) {
            // Para cada variação, cria um novo objeto 'Prop' com os dados limpos e o adiciona à nossa lista final.
            props.push({
                name,
                category,
                code: sourceCode,
                size: sourceSize,
                anchor_codes: anchorCodes,
                anchor_size: anchorSize,
            });
        }
    }
    // Retorna a lista completa e processada.
    return props;
}

/**
 * Função principal e pública deste módulo. Ela é chamada uma vez quando a aplicação inicia.
 * Ela carrega, processa e armazena em cache os dados do 'tiles.json'.
 */
export async function initializeTileData() {
    console.log('S')
    // Otimização: se os dados já foram carregados (o array não está vazio), não faz nada.
    if (ALL_PROPS.length > 0) return;

    // Usa um bloco try...catch para lidar com possíveis erros de rede ou de parsing.
    try {
        // Faz uma requisição de rede para buscar o ficheiro 'tiles.json' da pasta /public.
        const response = await fetch('/tiles.json');
        // Converte a resposta de texto para um objeto JSON.
        const jsonData = await response.json();
        
        // Pega o array de dados de dentro do JSON.
        const rawProps = jsonData["data"];

        // Chama a nossa função principal de processamento para transformar os dados brutos.
        ALL_PROPS = processRawProps(rawProps);
        
        // Itera sobre a lista de propriedades já processadas para criar o nosso dicionário agrupado.
        for (const prop of ALL_PROPS) {
            // Se ainda não temos uma entrada para esta categoria (ex: "furniture"), nós a criamos.
            if (!PROPS_BY_CATEGORY[prop.category]) {
                PROPS_BY_CATEGORY[prop.category] = [];
            }
            // Adiciona a propriedade atual à lista da sua categoria correspondente.
            PROPS_BY_CATEGORY[prop.category].push(prop);
        }
        // Log para confirmar que tudo correu bem.
        console.log("Dados dos tiles inicializados com sucesso!");
    } 
    catch (error) {
        // Se qualquer passo dentro do 'try' falhar, este bloco é executado.
        console.error("Falha ao carregar ou processar tiles.json:", error);
        // Lança um novo erro para que a aplicação possa saber que a inicialização falhou.
        throw new Error("Não foi possível carregar a definição de tiles. Verifique se 'tiles.json' está na pasta /public.");
    }
}

// Função "getter" exportada para que outros ficheiros possam aceder aos dados processados e agrupados por categoria.
// Isso evita que outros ficheiros modifiquem diretamente a nossa variável de cache.
export const getPropsByCategory = () => PROPS_BY_CATEGORY;

// Exporta uma constante para o ID de tile vazio, para ser usada de forma consistente em toda a aplicação.
export const VOID_ID = "-1";
