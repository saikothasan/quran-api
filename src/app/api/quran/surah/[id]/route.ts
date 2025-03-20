import { NextResponse } from "next/server"
import { getFallbackLanguage, getQuranFilePath, readJsonFile } from "@/lib/quran-utils"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    let lang = searchParams.get("lang") || "en"

    // Get fallback language if requested one is not available
    lang = getFallbackLanguage(lang)

    const surahId = Number.parseInt(params.id)

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.json({ error: "Invalid surah ID. Must be between 1 and 114." }, { status: 400 })
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

    return NextResponse.json({
      language: lang,
      ...surah,
    })
  } catch (error) {
    console.error("Error reading Quran data:", error)
    return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
  }
}

