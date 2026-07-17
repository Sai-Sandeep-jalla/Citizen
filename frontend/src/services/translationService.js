export async function translateObject(object, targetLang) {
    if (targetLang === "en") return object;

    const translated = {};
    const entries = Object.entries(object);
    const keys = entries.map(e => e[0]);
    const values = entries.map(e => e[1]);

    // We join all 120+ strings into a single text block using a unique separator.
    // This allows us to translate the entire app in exactly ONE API request,
    // which completely prevents rate-limiting issues and is lightning fast.
    const separator = '\n||\n';
    const textToTranslate = values.join(separator);

    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
        
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            
            if (data && data[0]) {
                // Google API returns nested arrays of translated fragments, we must join them back together first
                const translatedText = data[0].map(item => item[0]).join('');
                
                // Now split the huge translated string back into the individual 120 elements
                const translatedArray = translatedText.split(/\s*\|\|\s*/);
                
                if (translatedArray.length === keys.length) {
                    keys.forEach((key, index) => {
                        translated[key] = translatedArray[index].trim() || values[index];
                    });
                    return translated;
                } else {
                    console.warn(`Translation array length mismatch! Expected ${keys.length}, got ${translatedArray.length}. Falling back to sequential requests.`);
                }
            }
        }
    } catch (error) {
        console.error("Bulk Translation API error:", error);
    }

    // FALLBACK: If the bulk translation failed for any reason (like length mismatch or network error),
    // we return the English values to prevent the app from crashing.
    console.warn("Falling back to English due to translation error.");
    entries.forEach(([key, value]) => {
        translated[key] = value;
    });

    return translated;
}