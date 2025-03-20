import { NextResponse } from "next/server"
import { getFallbackLanguage, getQuranFileName, fetchJsonFile } from "@/lib/quran-utils"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    let lang = searchParams.get("lang") || "en"
    const baseUrl = new URL(request.url).origin

    // Get fallback language if requested one is not available
    lang = await getFallbackLanguage(lang, baseUrl)

    if (!query || query.trim().length < 3) {
      return NextResponse.json({ error: "Search query must be at least 3 characters long" }, { status: 400 })
    }

    // Get the file name
    const fileName = getQuranFileName(lang)

    // Fetch the file
    const quranData = await fetchJsonFile(fileName, baseUrl)

    if (!quranData) {
      return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
    }

    const searchResults = []

    // Search through all surahs and verses
    for (const surah of quranData) {
      let matchingVerses = []

      // Handle different file formats
      if (lang === "ar") {
        // Arabic file only has text
        matchingVerses = surah.verses.filter((verse: any) => verse.text.includes(query))
      } else if (lang === "transliteration") {
        // Transliteration file has transliteration field
        matchingVerses = surah.verses.filter(
          (verse: any) =>
            (verse.transliteration && verse.transliteration.toLowerCase().includes(query.toLowerCase())) ||
            verse.text.includes(query),
        )
      } else {
        // Translation files have translation field
        matchingVerses = surah.verses.filter(
          (verse: any) =>
            (verse.translation && verse.translation.toLowerCase().includes(query.toLowerCase())) ||
            verse.text.includes(query),
        )
      }

      if (matchingVerses.length > 0) {
        searchResults.push({
          surah: {
            id: surah.id,
            name: surah.name,
            transliteration: surah.transliteration,
            translation: surah.translation,
          },
          verses: matchingVerses,
        })
      }
    }

    return NextResponse.json({
      language: lang,
      query,
      results: searchResults,
      total: searchResults.reduce((acc: number, curr: any) => acc + curr.verses.length, 0),
    })
  } catch (error) {
    console.error("Error searching Quran data:", error)
    return NextResponse.json({ error: "Failed to search Quran data" }, { status: 500 })
  }
}

