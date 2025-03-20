"use client"

import Link from "next/link"
import { Book } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiEndpoints } from "@/components/api-endpoints"

export default function DocumentationPageClient() {
  return (
    <div className="container py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">API Documentation</h1>
          <p className="text-muted-foreground">Comprehensive guide to using the Al-Quran API</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <div className="sticky top-[65px] z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-2">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="endpoints" id="endpoints">
                Endpoints
              </TabsTrigger>
              <TabsTrigger value="languages" id="languages">
                Languages
              </TabsTrigger>
              <TabsTrigger value="usage" id="usage">
                Usage
              </TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Al-Quran API Overview</CardTitle>
                <CardDescription>A comprehensive RESTful API for accessing the Holy Quran</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Al-Quran API provides a simple and intuitive way to access the Holy Quran with translations in
                  multiple languages. It offers various endpoints to retrieve surahs, verses, and search functionality.
                </p>

                <h3 className="text-lg font-medium mt-6">Base URL</h3>
                <div className="bg-muted p-3 rounded-md font-mono text-sm">https://alquran-api.pages.dev/api/quran</div>

                <h3 className="text-lg font-medium mt-6">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access to all 114 surahs of the Quran</li>
                  <li>Multiple language support including Arabic, English, Bengali, and more</li>
                  <li>Search functionality to find specific verses or words</li>
                  <li>Simple and consistent JSON response format</li>
                  <li>No authentication required</li>
                  <li>CORS enabled for cross-origin requests</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="endpoints" className="space-y-6">
            <ApiEndpoints baseUrl="https://alquran-api.pages.dev" />
          </TabsContent>

          <TabsContent value="languages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supported Languages</CardTitle>
                <CardDescription>
                  The API supports multiple languages to make the Quran accessible to everyone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  All endpoints accept a <code className="bg-muted px-1 py-0.5 rounded">lang</code> query parameter to
                  specify the language. If not specified, English (
                  <code className="bg-muted px-1 py-0.5 rounded">en</code>) is used as the default language.
                </p>

                <h3 className="text-lg font-medium mt-6">Language Codes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Arabic</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Code: <code>ar</code>
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">Native Name: العربية</p>
                    <p className="text-sm text-muted-foreground">Direction: RTL</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Bengali</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Code: <code>bn</code>
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">Native Name: বাংলা</p>
                    <p className="text-sm text-muted-foreground">Direction: LTR</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">English</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Code: <code>en</code>
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">Native Name: English</p>
                    <p className="text-sm text-muted-foreground">Direction: LTR</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Urdu</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      Code: <code>ur</code>
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">Native Name: اردو</p>
                    <p className="text-sm text-muted-foreground">Direction: RTL</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Getting Available Languages</h3>
                  <p className="mb-2">You can get a list of all available languages using the following endpoint:</p>
                  <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    GET https://alquran-api.pages.dev/api/quran/languages
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    This will return a JSON object with an array of available languages and their details.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Guidelines</CardTitle>
                <CardDescription>How to effectively use the Al-Quran API in your applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-medium">Rate Limiting</h3>
                <p className="mb-4">
                  The API currently does not enforce strict rate limits, but we ask that you be considerate with your
                  usage. If you're building a high-traffic application, consider implementing caching on your end to
                  reduce the number of requests.
                </p>

                <h3 className="text-lg font-medium mt-6">Error Handling</h3>
                <p className="mb-4">
                  The API returns standard HTTP status codes to indicate success or failure of requests:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>200 OK</strong> - The request was successful
                  </li>
                  <li>
                    <strong>400 Bad Request</strong> - The request was invalid or cannot be served
                  </li>
                  <li>
                    <strong>404 Not Found</strong> - The requested resource does not exist
                  </li>
                  <li>
                    <strong>500 Internal Server Error</strong> - Something went wrong on the server
                  </li>
                </ul>
                <p className="mt-4">
                  Error responses include a JSON object with an{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">error</code> field that provides more details about the
                  error.
                </p>

                <h3 className="text-lg font-medium mt-6">CORS</h3>
                <p>
                  The API supports Cross-Origin Resource Sharing (CORS), allowing you to make requests from any origin.
                </p>

                <h3 className="text-lg font-medium mt-6">Caching</h3>
                <p>
                  To improve performance, we recommend implementing caching in your application. The Quran data doesn't
                  change, so you can safely cache responses for extended periods.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>
                  Examples of how to use the Al-Quran API in different programming languages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">JavaScript (Fetch API)</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    {`// Get all surahs in English
fetch('https://alquran-api.pages.dev/api/quran?lang=en')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Get a specific surah
fetch('https://alquran-api.pages.dev/api/quran/surah/1?lang=en')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Search the Quran
fetch('https://alquran-api.pages.dev/api/quran/search?q=mercy&lang=en')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Python (Requests)</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    {`import requests

# Get all surahs in Arabic
response = requests.get('https://alquran-api.pages.dev/api/quran?lang=ar')
data = response.json()
print(data)

# Get a specific verse
response = requests.get('https://alquran-api.pages.dev/api/quran/surah/1/verse/1?lang=en')
data = response.json()
print(data)

# Get available languages
response = requests.get('https://alquran-api.pages.dev/api/quran/languages')
data = response.json()
print(data)`}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">React Example</h3>
                  <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
                    {`import { useState, useEffect } from 'react';

function QuranViewer() {
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSurah() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://alquran-api.pages.dev/api/quran/surah/1?lang=en'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        
        const data = await response.json();
        setSurah(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSurah();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!surah) return <div>No data found</div>;

  return (
    <div>
      <h1>{surah.transliteration} ({surah.translation})</h1>
      <div>
        {surah.verses.map(verse => (
          <div key={verse.id}>
            <p>{verse.text}</p>
            <p>{verse.translation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-8">
              <Button asChild size="lg">
                <Link href="/demo">
                  <Book className="mr-2 h-4 w-4" />
                  Try the Demo App
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

