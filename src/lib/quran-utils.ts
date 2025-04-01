export interface Language {
  code: string
  name: string
  nativeName: string
  direction: "ltr" | "rtl"
}

export interface AudioRecitation {
  reciter: string
  url: string
  originalUrl: string
  type?: "complete_surah" | "single_verse"
}

export interface AudioData {
  [key: string]: AudioRecitation
}

export interface Verse {
  id: number
  text: string
  translation?: string
  transliteration?: string
  audio?: AudioData
}

export interface Surah {
  id: number
  name: string
  transliteration: string
  translation: string
  type: string
  total_verses: number
  verses: Verse[]
  audio?: AudioData
}

export const LANGUAGE_MAP: Record<string, Language> = {
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
  bn: { code: "bn", name: "Bengali", nativeName: "বাংলা", direction: "ltr" },
  en: { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  es: { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  fr: { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  id: { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", direction: "ltr" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский", direction: "ltr" },
  sv: { code: "sv", name: "Swedish", nativeName: "Svenska", direction: "ltr" },
  tr: { code: "tr", name: "Turkish", nativeName: "Türkçe", direction: "ltr" },
  ur: { code: "ur", name: "Urdu", nativeName: "اردو", direction: "rtl" },
  zh: { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr" },
  transliteration: {
    code: "transliteration",
    name: "Transliteration",
    nativeName: "Transliteration",
    direction: "ltr",
  },
}

// Cache for storing fetched JSON data
const dataCache = new Map<string, any>()

// Fetch JSON file from public directory
export async function fetchJsonFile(fileName: string, baseUrl?: string): Promise<any> {
  try {
    // Use cache if available
    if (dataCache.has(fileName)) {
      return dataCache.get(fileName)
    }

    // Determine the base URL
    const url = baseUrl ? `${baseUrl}/${fileName}` : `/${fileName}`

    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${fileName}: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // Cache the data
    dataCache.set(fileName, data)

    return data
  } catch (error) {
    console.error(`Error fetching JSON file: ${fileName}`, error)
    return null
  }
}

// Get the appropriate file name for a language
export function getQuranFileName(lang: string): string {
  return lang === "transliteration" ? "quran_transliteration.json" : lang === "ar" ? "quran.json" : `quran_${lang}.json`
}

// Check if a language is supported by trying to fetch its file
export async function isLanguageSupported(lang: string, baseUrl?: string): Promise<boolean> {
  const fileName = getQuranFileName(lang)
  const data = await fetchJsonFile(fileName, baseUrl)
  return data !== null
}

// Get a fallback language if the requested one is not available
export async function getFallbackLanguage(requestedLang: string, baseUrl?: string): Promise<string> {
  if (await isLanguageSupported(requestedLang, baseUrl)) {
    return requestedLang
  }

  // Try English first
  if (await isLanguageSupported("en", baseUrl)) {
    return "en"
  }

  // Try Arabic next
  if (await isLanguageSupported("ar", baseUrl)) {
    return "ar"
  }

  // Try Bengali next (since this is a Bangla Quran API)
  if (await isLanguageSupported("bn", baseUrl)) {
    return "bn"
  }

  // Last resort fallback
  return "en"
}

// Get available languages by checking which files exist
export async function getAvailableLanguages(baseUrl?: string): Promise<Language[]> {
  try {
    const languages: Language[] = []
    const languageCodes = Object.keys(LANGUAGE_MAP)

    // Check each language
    for (const code of languageCodes) {
      if (await isLanguageSupported(code, baseUrl)) {
        languages.push(LANGUAGE_MAP[code])
      }
    }

    // If no languages found, return English as fallback
    if (languages.length === 0) {
      return [LANGUAGE_MAP.en]
    }

    return languages
  } catch (error) {
    console.error("Error getting available languages:", error)
    return [LANGUAGE_MAP.en] // Return English as fallback
  }
}

export function getLanguageDirection(langCode: string): "ltr" | "rtl" {
  return LANGUAGE_MAP[langCode]?.direction || "ltr"
}

// Get audio URL for a specific verse
export function getVerseAudioUrl(surahId: number, verseId: number, reciterId = "1"): string {
  const reciters = {
    "1": {
      name: "Mishary Rashid Al-Afasy",
      baseUrl: "https://everyayah.com/data/Alafasy_128kbps/",
    },
    "2": {
      name: "Abu Bakr Al-Shatri",
      baseUrl: "https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/",
    },
    "3": {
      name: "Nasser Al-Qatami",
      baseUrl: "https://everyayah.com/data/Nasser_Alqatami_128kbps/",
    },
    "4": {
      name: "Yasser Al-Dosari",
      baseUrl: "https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/",
    },
  }

  const reciter = reciters[reciterId as keyof typeof reciters] || reciters["1"]
  const formattedSurahId = surahId.toString().padStart(3, "0")
  const formattedVerseId = verseId.toString().padStart(3, "0")

  return `${reciter.baseUrl}${formattedSurahId}${formattedVerseId}.mp3`
}

