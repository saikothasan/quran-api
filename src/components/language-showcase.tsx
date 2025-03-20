"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { Language } from "@/lib/quran-utils"

interface ApiResponse {
  languages?: Language[]
  error?: string
}

function LanguageShowcaseInner() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("https://alquran-api.pages.dev/api/quran/languages")

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.status} ${response.statusText}`)
        }

        const data = (await response.json()) as ApiResponse

        if (data.error) {
          throw new Error(data.error)
        }

        setLanguages(data.languages || [])
      } catch (error) {
        console.error("Failed to fetch languages:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch languages")
        // Set default languages as fallback
        setLanguages([
          { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
          { code: "bn", name: "Bengali", nativeName: "বাংলা", direction: "ltr" },
          { code: "en", name: "English", nativeName: "English", direction: "ltr" },
          { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
          { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", direction: "ltr" },
          { code: "ur", name: "Urdu", nativeName: "اردو", direction: "rtl" },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {languages.map((language, index) => (
        <motion.div
          key={language.code}
          className="flex flex-col items-center justify-center p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-lg font-medium mb-1">{language.name}</h3>
          <p className={`text-xl mb-2 ${language.direction === "rtl" ? "font-arabic" : ""}`}>{language.nativeName}</p>
          <Badge variant={language.direction === "rtl" ? "secondary" : "outline"}>
            {language.direction === "rtl" ? "RTL" : "LTR"}
          </Badge>
        </motion.div>
      ))}
    </div>
  )
}

export function LanguageShowcase() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      }
    >
      <LanguageShowcaseInner />
    </Suspense>
  )
}

