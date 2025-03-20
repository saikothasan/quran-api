import { NextResponse } from "next/server"
import { getAvailableLanguages } from "@/lib/quran-utils"

export async function GET() {
  try {
    const languages = getAvailableLanguages()

    return NextResponse.json({
      languages,
    })
  } catch (error) {
    console.error("Error getting languages:", error)
    return NextResponse.json({ error: "Failed to get available languages" }, { status: 500 })
  }
}

