import { NextResponse } from "next/server"
import { getAvailableLanguages } from "@/lib/quran-utils"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const baseUrl = new URL(request.url).origin
    const languages = await getAvailableLanguages(baseUrl)

    return NextResponse.json({
      languages,
    })
  } catch (error) {
    console.error("Error getting languages:", error)
    return NextResponse.json({ error: "Failed to get available languages" }, { status: 500 })
  }
}

