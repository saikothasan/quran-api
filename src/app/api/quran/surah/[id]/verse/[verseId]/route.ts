import { NextResponse } from "next/server"
import { getFallbackLanguage, getQuranFileName, fetchJsonFile } from "@/lib/quran-utils"

export const runtime = "edge"

export async function GET(request: Request, { params }: { params: { id: string; verseId: string } }) {
  try {
    const { searchParams } = new URL(request.url)
    let lang = searchParams.get("lang") || "en"
    const baseUrl = new URL(request.url).origin

    // Get fallback language if requested one is not available
    lang = await getFallbackLanguage(lang, baseUrl)

    const surahId = Number.parseInt(params.id)
    const verseId = Number.parseInt(params.verseId)

    if (isNaN(surahId) || surahId < 1 || surahId > 114) {
      return NextResponse.json({ error: "Invalid surah ID. Must be between 1 and 114." }, { status: 400 })
    }

    if (isNaN(verseId) || verseId < 1) {
      return NextResponse.json({ error: "Invalid verse ID. Must be a positive number." }, { status: 400 })
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

    // Find the requested verse
    const verse = surah.verses.find((v: any) => v.id === verseId)

    if (!verse) {
      return NextResponse.json({ error: "Verse not found" }, { status: 404 })
    }

    // Add audio data for the specific verse
    const audioData = {
      "1": {
        reciter: "Mishary Rashid Al-Afasy",
        url: `https://everyayah.com/data/Alafasy_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://everyayah.com/data/Alafasy_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        type: "single_verse",
      },
      "2": {
        reciter: "Abu Bakr Al-Shatri",
        url: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://everyayah.com/data/Abu_Bakr_Ash-Shaatree_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        type: "single_verse",
      },
      "3": {
        reciter: "Nasser Al-Qatami",
        url: `https://everyayah.com/data/Nasser_Alqatami_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://everyayah.com/data/Nasser_Alqatami_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        type: "single_verse",
      },
      "4": {
        reciter: "Yasser Al-Dosari",
        url: `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        originalUrl: `https://everyayah.com/data/Yasser_Ad-Dussary_128kbps/${surahId.toString().padStart(3, "0")}${verseId.toString().padStart(3, "0")}.mp3`,
        type: "single_verse",
      },
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
      audio: audioData,
    })
  } catch (error) {
    console.error("Error reading Quran data:", error)
    return NextResponse.json({ error: "Failed to load Quran data" }, { status: 500 })
  }
}

