import type { Metadata } from "next"
import DocumentationPageClient from "./DocumentationPageClient"

export const metadata: Metadata = {
  title: "Documentation - Al-Quran API",
  description: "Comprehensive documentation for the Al-Quran API with examples and usage guidelines",
}

export default function DocumentationPage() {
  return <DocumentationPageClient />
}

