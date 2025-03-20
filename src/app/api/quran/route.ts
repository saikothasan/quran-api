import { NextResponse } from "next/server"
import { getAvailableLanguages, getFallbackLanguage, getQuranFileName, fetchJsonFile } from "@/lib/quran-utils"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    let lang = searchParams.get("lang") || "en"
    const baseUrl = new URL(request.url).origin

    // Get fallback language if requested one is not available
    lang = await getFallbackLanguage(lang, baseUrl)

    // Get the file name
    const fileName = getQuranFileName(lang)

    // Fetch the file
    const quranData = await fetchJsonFile(fileName, baseUrl)

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
    const languages = await getAvailableLanguages(baseUrl)

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

