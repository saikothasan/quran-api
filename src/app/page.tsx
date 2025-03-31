import Link from "next/link"
import type { Metadata } from "next"
import {
  Book,
  Code,
  Database,
  Download,
  FileJson,
  Globe,
  Heart,
  MessageCircle,
  Search,
  Server,
  Shield,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ApiTester } from "@/components/api-tester"
import { LanguageShowcase } from "@/components/language-showcase"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Al-Quran API - Multilingual Quran API with Translations & Search",
  description:
    "Access the Holy Quran through our comprehensive RESTful API with translations in Arabic, English, Bengali, Urdu and more. Perfect for Islamic apps, websites, and research tools.",
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/20 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              Version 1.0 Released
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-500 dark:from-emerald-500 dark:to-emerald-300">
                Al-Quran API
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A comprehensive RESTful API providing access to the Holy Quran with translations in multiple languages
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="#try-api">
                  <Zap className="mr-2 h-4 w-4" />
                  Try the API
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-emerald-200 dark:border-emerald-800">
                <Link href="/documentation">
                  <Book className="mr-2 h-4 w-4" />
                  Documentation
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-emerald-200 dark:border-emerald-800">
                <Link href="https://github.com/saikothasan/quran-api" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-8 md:py-12 bg-white dark:bg-background border-y border-emerald-100 dark:border-emerald-900/20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">114</p>
              <p className="text-sm text-muted-foreground">Surahs Available</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">12+</p>
              <p className="text-sm text-muted-foreground">Languages Supported</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">6,236</p>
              <p className="text-sm text-muted-foreground">Verses Indexed</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">100%</p>
              <p className="text-sm text-muted-foreground">Free & Open Source</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful API Features</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the comprehensive features designed to make Quranic content accessible for developers
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="flex flex-col items-center text-center border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Globe className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="mt-4">Multilingual Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Access the Quran in multiple languages including Arabic, English, Bengali, Urdu, Spanish, French, and
                  more.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                  12+ Languages
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Server className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="mt-4">RESTful Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Simple and intuitive RESTful API with comprehensive documentation, examples, and consistent response
                  formats.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                  JSON Responses
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Search className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="mt-4">Advanced Search</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Powerful search functionality to find specific verses, words, or phrases across the entire Quran in
                  any supported language.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                  Full-Text Search
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Zap className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="mt-4">Edge Runtime</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Deployed on Vercel's Edge Runtime for lightning-fast response times and global availability with
                  minimal latency.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                  High Performance
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="mt-4">No Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Open access for all users without API keys or authentication requirements. Just make requests and get
                  responses.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                  Public Access
                </Badge>
              </CardFooter>
            </Card>
            <Card className="flex flex-col items-center text-center border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <FileJson className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="mt-4">Structured Data</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Well-organized JSON data structure with consistent formatting, making it easy to parse and integrate
                  into your applications.
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Badge variant="outline" className="border-emerald-200 dark:border-emerald-800">
                  Developer Friendly
                </Badge>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Language Showcase */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              Languages
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Available Languages</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The API supports multiple languages to make the Quran accessible to everyone around the world
            </p>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <LanguageShowcase />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple Integration</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Integrate the Al-Quran API into your applications in just a few simple steps
            </p>
          </div>

          <div className="mx-auto max-w-5xl py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Make API Request</h3>
                <p className="text-muted-foreground">
                  Send a simple HTTP request to our API endpoints using your preferred programming language.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Receive JSON Response</h3>
                <p className="text-muted-foreground">
                  Get structured JSON data containing the requested Quranic content in your chosen language.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Integrate & Display</h3>
                <p className="text-muted-foreground">
                  Parse the JSON data and integrate it into your application's UI for a seamless user experience.
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold mb-4">Example API Request</h3>
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-md overflow-x-auto text-sm">
                <code>
                  {`// JavaScript Example
fetch('https://alquran-api.pages.dev/api/quran/surah/1?lang=en')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Process and display the Quran data
  })
  .catch(error => console.error('Error:', error));`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Tester Section */}
      <section
        id="try-api"
        className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-background border-y border-emerald-100 dark:border-emerald-900/20"
      >
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              Interactive
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Try the API</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Test the Quran API endpoints with different parameters and languages directly in your browser
            </p>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <ApiTester baseUrl="https://alquran-api.pages.dev" />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              Applications
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Use Cases</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how developers are using the Al-Quran API in various applications
            </p>
          </div>

          <div className="mx-auto max-w-5xl py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-2">
                  <Book className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Quran Reading Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create mobile and web applications that allow users to read the Quran in their preferred language,
                  with features like bookmarks, search, and audio recitation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-2">
                  <Database className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Research Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Build academic and research tools for scholars studying the Quran, enabling cross-referencing,
                  linguistic analysis, and comparative studies across translations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-2">
                  <MessageCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Educational Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Develop interactive learning platforms that teach Quranic studies, Arabic language, and Islamic
                  education with verse-by-verse explanations and translations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-2">
                  <Heart className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Community Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create websites and services for mosques, Islamic centers, and community organizations that need to
                  display Quranic content in multiple languages.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 rounded-full">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Developer Feedback</h2>
            <p className="max-w-[85%] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what developers are saying about the Al-Quran API
            </p>
          </div>

          <div className="mx-auto max-w-5xl py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">A</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Ahmed K.</h3>
                    <p className="text-sm text-muted-foreground">Mobile App Developer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The Al-Quran API has been instrumental in developing our multilingual Quran app. The structured data
                  and comprehensive language support saved us months of development time."
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">S</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Sarah M.</h3>
                    <p className="text-sm text-muted-foreground">Web Developer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I integrated the API into our educational platform, and the response has been fantastic. The search
                  functionality is particularly impressive, allowing our users to find specific verses quickly."
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">R</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Rahul J.</h3>
                    <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The performance of this API is outstanding. The Edge Runtime ensures fast response times globally,
                  which is crucial for our user base spread across different countries."
                </p>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 dark:border-emerald-900/20 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-4">
                    <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">F</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Fatima Z.</h3>
                    <p className="text-sm text-muted-foreground">Research Scholar</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "As a researcher, having access to this API has been invaluable. The consistent data structure across
                  different languages makes comparative analysis much more efficient."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-700 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Badge className="px-3 py-1 text-sm bg-white text-emerald-700 rounded-full">Get Started Today</Badge>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-emerald-100 md:text-xl">
                Explore our documentation to learn how to integrate the Al-Quran API into your applications and join our
                community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
                <Link href="/documentation">
                  <Book className="mr-2 h-4 w-4" />
                  View Documentation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-emerald-600">
                <Link href="/demo">
                  <Code className="mr-2 h-4 w-4" />
                  Try Demo App
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-[#0088cc] text-white border-[#0088cc] hover:bg-[#0088cc]/90 hover:text-white"
              >
                <Link href="https://t.me/drkingbd" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join our Telegram
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

