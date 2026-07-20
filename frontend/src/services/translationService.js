export async function translateObject(object, targetLang) {
    if (targetLang === "en") return object;

    const translated = {};
    const entries = Object.entries(object);
    const chunkSize = 30;
<<<<<<< HEAD
    const separator = '\n_XXX_\n';
    
    // Create an array of chunks
    const chunks = [];
    for (let i = 0; i < entries.length; i += chunkSize) {
        chunks.push(entries.slice(i, i + chunkSize));
    }

    // Process all chunks concurrently
    await Promise.all(chunks.map(async (chunk) => {
=======
    const separator = '\n###\n';

    for (let i = 0; i < entries.length; i += chunkSize) {
        const chunk = entries.slice(i, i + chunkSize);
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
        const keys = chunk.map(e => e[0]);
        const values = chunk.map(e => e[1]);
        
        const textToTranslate = values.join(separator);
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(textToTranslate)}`;
        
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                if (data && data[0]) {
                    const translatedText = data[0].map(item => item[0]).join('');
<<<<<<< HEAD
                    const translatedArray = translatedText.split(/\s*_XXX_\s*/);
=======
                    const translatedArray = translatedText.split(/\s*###\s*/);
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
                    
                    if (translatedArray.length >= keys.length) {
                        keys.forEach((key, index) => {
                            translated[key] = translatedArray[index] ? translatedArray[index].trim() : values[index];
                        });
<<<<<<< HEAD
                        return; // Success for this chunk
=======
                        continue;
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
                    } else {
                        console.warn(`Translation array length mismatch in chunk! Expected ${keys.length}, got ${translatedArray.length}.`);
                    }
                }
            }
        } catch (error) {
            console.error("Bulk Translation API error:", error);
        }

        // FALLBACK for chunk
        console.warn("Falling back to English for this chunk due to translation error.");
        chunk.forEach(([key, value]) => {
            translated[key] = value;
        });
<<<<<<< HEAD
    }));
=======
    }
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c

    return translated;
}