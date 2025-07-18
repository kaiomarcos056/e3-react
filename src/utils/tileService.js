
let PROPS_BY_CATEGORY = {};

let ALL_PROPS = [];

function parseSizeStr(size) {
    const parts = size.split('x');
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
}

function parseSize(data) {
    data = data.trim();
    if (!data.includes("(")) {
        return { sourceSize: parseSizeStr(data), anchorSize: null };
    } 
    else {
        const parts = data.split(" ");
        const sourceSizeStr = parts[0];

        const anchorSizeStr = parts[1].replace("(", "").replace(")", "");

        return {
            sourceSize: parseSizeStr(sourceSizeStr),
            anchorSize: parseSizeStr(anchorSizeStr)
        };
    }
}

function* parseCodes(codesList) {
    
    for (const codes of codesList.split('|')) {
       
        if (codes.includes("(")) {
           
            const parts = codes.split(" ");
            const sourceCode = parts[0];
         
            const anchorCodes = parts[1].replace("(", "").replace(")", "").split(",");
          
            yield { sourceCode, anchorCodes };
        } 
       
        else {
           
            yield { sourceCode: codes, anchorCodes: [] };
        }
    }
}

function processRawProps(rawProps) {
  
    const props = [];
    
    for (const prop of rawProps) {
       
        const name = prop["nome"];
        const category = prop["camada"].toLowerCase();
        
        const { sourceSize, anchorSize } = parseSize(prop["tamanho"]);

        for (const { sourceCode, anchorCodes } of parseCodes(prop["codigo"])) {
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

    return props;
}

export async function initializeTileData() {
    if (ALL_PROPS.length > 0) return;

    try {
       
        const response = await fetch('/tiles.json');
      
        const jsonData = await response.json();
        
        const rawProps = jsonData["data"];

        ALL_PROPS = processRawProps(rawProps);
        
        for (const prop of ALL_PROPS) {
            if (!PROPS_BY_CATEGORY[prop.category]) {
                PROPS_BY_CATEGORY[prop.category] = [];
            }
            PROPS_BY_CATEGORY[prop.category].push(prop);
        }
    } 
    catch (error) {
        throw new Error("Não foi possível carregar a definição de tiles. Verifique se 'tiles.json' está na pasta /public.");
    }
}

export const getPropsByCategory = () => PROPS_BY_CATEGORY;

export const VOID_ID = "-1";
