import { NextResponse } from "next/server"
import { getFallbackLanguage, getQuranFileName, fetchJsonFile } from "@/lib/quran-utils"

export const runtime = "edge"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    let lang = searchParams.get("lang") || "en"
    const baseUrl = new URL(request.url).origin

    // Get fallback language if requested one is not available
    lang = await getFallbackLanguage(lang, baseUrl)

    const surahId = Number.parseInt(params.id)

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.json({ error: "Invalid surah ID. Must be between 1 and 114." }, { status: 400 })
    }

    // Get the file name
    const fileName = getQuranFileName(lang)

    // Fetch the file
    const quranData = await fetchJsonFile(fileName, baseUrl)

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

