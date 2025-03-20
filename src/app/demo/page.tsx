import type { Metadata } from "next"
import { QuranReader } from "@/components/quran-reader"

export const metadata: Metadata = {
  title: "Demo App - Al-Quran API",
  description: "Interactive demo application showcasing the Al-Quran API capabilities",
}

export default function DemoPage() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Quran Reader Demo</h1>
          <p className="text-muted-foreground">An interactive demo application powered by the Al-Quran API</p>
        </div>

        <QuranReader baseUrl="https://alquran-api.pages.dev" />
      </div>
    </div>
  )
}

