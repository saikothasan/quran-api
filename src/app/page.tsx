import Link from "next/link"
import type { Metadata } from "next"
import { Book, Code, Globe, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ApiTester } from "@/components/api-tester"
import { LanguageShowcase } from "@/components/language-showcase"

export const metadata: Metadata = {
  title: "Al-Quran API - Multilingual Quran API with Translations",
  description:
    "A comprehensive RESTful API for accessing the Holy Quran with translations in multiple languages including Arabic, English, Bengali, and more.",
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">Al-Quran API</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A multilingual API to access the Holy Quran with translations in multiple languages
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="#try-api">
                  <Book className="mr-2 h-4 w-4" />
                  Try the API
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link href="/documentation">
                  <Code className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the powerful features of our Quran API
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Multilingual</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access the Quran in multiple languages including Arabic, English, Bengali, and more.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Server className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">RESTful API</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simple and intuitive RESTful API with comprehensive documentation and examples.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Developer Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Easy to integrate with your applications with clear JSON responses and error handling.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Language Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Available Languages</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The API supports multiple languages to make the Quran accessible to everyone
            </p>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <LanguageShowcase />
          </div>
        </div>
      </section>

      {/* API Tester Section */}
      <section id="try-api" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Try the API</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Test the Quran API endpoints with different parameters and languages
            </p>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <ApiTester baseUrl="https://alquran-api.pages.dev" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                Explore our documentation to learn how to integrate the Al-Quran API into your applications.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/documentation">
                  <Code className="mr-2 h-4 w-4" />
                  View Documentation
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <Link href="/demo">
                  <Book className="mr-2 h-4 w-4" />
                  Try Demo App
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

