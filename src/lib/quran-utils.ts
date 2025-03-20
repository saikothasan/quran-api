import fs from "fs"
import path from "path"

export interface Language {
  code: string
  name: string
  nativeName: string
  direction: "ltr" | "rtl"
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

// Safe file existence check that doesn't throw errors
export function fileExists(filePath: string): boolean {
  try {
    return fs.existsSync(filePath)
  } catch (error) {
    console.error(`Error checking if file exists: ${filePath}`, error)
    return false
  }
}

// Safe file reading that doesn't throw errors
export function readJsonFile(filePath: string): any {
  try {
    if (!fileExists(filePath)) {
      return null
    }
    const fileContents = fs.readFileSync(filePath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error(`Error reading JSON file: ${filePath}`, error)
    return null
  }
}

export function getAvailableLanguages(): Language[] {
  try {
    const publicDir = path.join(process.cwd(), "public")

    // Check if directory exists
    if (!fileExists(publicDir)) {
      console.error(`Public directory not found: ${publicDir}`)
      return [LANGUAGE_MAP.en] // Return English as fallback
    }

    const files = fs.readdirSync(publicDir)

    const languages: Language[] = []

    // Add Arabic (base file)
    if (files.includes("quran.json")) {
      languages.push(LANGUAGE_MAP.ar)
    }

    // Add other languages
    for (const file of files) {
      if (file.startsWith("quran_") && file.endsWith(".json")) {
        const langCode = file.replace("quran_", "").replace(".json", "")

        if (LANGUAGE_MAP[langCode]) {
          languages.push(LANGUAGE_MAP[langCode])
        }
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

// Get the appropriate file path for a language
export function getQuranFilePath(lang: string): string {
  const fileName =
    lang === "transliteration" ? "quran_transliteration.json" : lang === "ar" ? "quran.json" : `quran_${lang}.json`

  return path.join(process.cwd(), "public", fileName)
}

// Check if a language is supported
export function isLanguageSupported(lang: string): boolean {
  const filePath = getQuranFilePath(lang)
  return fileExists(filePath)
}

// Get a fallback language if the requested one is not available
export function getFallbackLanguage(requestedLang: string): string {
  if (isLanguageSupported(requestedLang)) {
    return requestedLang
  }

  // Try English first
  if (isLanguageSupported("en")) {
    return "en"
  }

  // Try Arabic next
  if (isLanguageSupported("ar")) {
    return "ar"
  }

  // Get the first available language
  const languages = getAvailableLanguages()
  if (languages.length > 0) {
    return languages[0].code
  }

  // Last resort fallback
  return "en"
}

