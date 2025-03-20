import { NextResponse } from "next/server"
import { getAvailableLanguages, getFallbackLanguage, getQuranFilePath, readJsonFile } from "@/lib/quran-utils"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let lang = searchParams.get("lang") || "en"

    // Get fallback language if requested one is not available
    lang = getFallbackLanguage(lang)

    // Get the file path
    const filePath = getQuranFilePath(lang)

    // Read the file
    const quranData = readJsonFile(filePath)

    if (!quranData) {
      return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
    }

    // Return only the basic information about each surah (without verses)
    const surahList = quranData.map((surah: any) => ({
      id: surah.id,
      name: surah.name,
      transliteration: surah.transliteration,
      translation: surah.translation,
      type: surah.type,
      total_verses: surah.total_verses,
    }))

    // Get available languages
    const languages = getAvailableLanguages()

    return NextResponse.json({
      language: lang,
      available_languages: languages,
      surahs: surahList,
    })
  } catch (error) {
    console.error("Error reading Quran data:", error)
    return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
  }
}

