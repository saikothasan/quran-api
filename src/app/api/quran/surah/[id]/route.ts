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

    // Add audio data for the complete surah
    const audioData = {
      "1": {
        reciter: "Mishary Rashid Al-Afasy",
        url: `https://server8.mp3quran.net/afs/${surahId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://server8.mp3quran.net/afs/${surahId.toString().padStart(3, "0")}.mp3`,
        type: "complete_surah",
      },
      "2": {
        reciter: "Abu Bakr Al-Shatri",
        url: `https://server11.mp3quran.net/shatri/${surahId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://server11.mp3quran.net/shatri/${surahId.toString().padStart(3, "0")}.mp3`,
        type: "complete_surah",
      },
      "3": {
        reciter: "Nasser Al-Qatami",
        url: `https://server6.mp3quran.net/qtm/${surahId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://server6.mp3quran.net/qtm/${surahId.toString().padStart(3, "0")}.mp3`,
        type: "complete_surah",
      },
      "4": {
        reciter: "Yasser Al-Dosari",
        url: `https://server11.mp3quran.net/yasser/${surahId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://server11.mp3quran.net/yasser/${surahId.toString().padStart(3, "0")}.mp3`,
        type: "complete_surah",
      },
    }

    return NextResponse.json({
      language: lang,
      audio: audioData,
      ...surah,
    })
  } catch (error) {
    console.error("Error reading Quran data:", error)
    return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
  }
}

