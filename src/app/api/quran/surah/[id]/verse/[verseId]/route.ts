import { NextResponse } from "next/server"
import { getFallbackLanguage, getQuranFilePath, readJsonFile } from "@/lib/quran-utils"

export async function GET(request: Request, { params }: { params: { id: string; verseId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    let lang = searchParams.get("lang") || "en"

    // Get fallback language if requested one is not available
    lang = getFallbackLanguage(lang)

    const surahId = Number.parseInt(params.id)
    const verseId = Number.parseInt(params.verseId)

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.json({ error: "Invalid surah ID. Must be between 1 and 114." }, { status: 400 })
    }

    if (isNaN(verseId) || verseId < 1) {
      return NextResponse.json({ error: "Invalid verse ID. Must be a positive number." }, { status: 400 })
    }

    // Get the file path
    const filePath = getQuranFilePath(lang)

    // Read the file
    const quranData = readJsonFile(filePath)

    if (!quranData) {
      return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
    }

    // Find the requested surah
    const surah = quranData.find((s: any) => s.id === surahId)

    if (!surah) {
      return NextResponse.json({ error: "Surah not found" }, { status: 404 })
    }

    // Find the requested verse
    const verse = surah.verses.find((v: any) => v.id === verseId)

    if (!verse) {
      return NextResponse.json({ error: "Verse not found" }, { status: 404 })
    }

    return NextResponse.json({
      language: lang,
      surah: {
        id: surah.id,
        name: surah.name,
        transliteration: surah.transliteration,
        translation: surah.translation,
      },
      verse,
    })
  } catch (error) {
    console.error("Error reading Quran data:", error)
    return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
  }
}

