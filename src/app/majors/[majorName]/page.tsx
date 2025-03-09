"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf } from "lucide-react"
import { fetchMajorDetails} from "@/src/lib/api"
import type { Class, Major } from "@/src/lib/types"
import { capitalizeWords } from "@/src/lib/utils"


export default function MajorClassesPage({ params }: { params: { majorName: string } }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [major, setMajor] = useState<Major>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   
  //makes sure parameter promises are fulfilled before fetching data and moving on
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const resolvedParams = await params;
        const majorData = await fetchMajorDetails(resolvedParams.majorName)
        setMajor(majorData.majorInfo)
        setClasses(majorData.classes)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Failed to load classes. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params]);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">RateMyClasses</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/majors" className="text-sm font-medium hover:underline underline-offset-4">
            Majors
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 py-6 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Link href="/majors" className="text-sm text-gray-500 hover:underline">
                  Majors
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm font-medium">{capitalizeWords(major?.majorName) || "Loading..."}</span>
              </div>
              <h1 className="text-3xl font-bold">{capitalizeWords(major?.majorName) || "Loading..."} Classes</h1>
              <p className="text-gray-500 dark:text-gray-400">View and rate classes in this major</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button
                  onClick={() => {
                    setLoading(true)
                    fetchMajorDetails(params.majorName)
                      .then((majorData) => {
                        setMajor(majorData)
                        setClasses(majorData.classes)
                      })
                      .catch((err) => setError(String(err)))
                      .finally(() => setLoading(false))
                  }}
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            ) : classes.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {classes.map((classItem) => (
                  <Card key={classItem.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>
                            {classItem.classCode.toUpperCase()}: {capitalizeWords(classItem.className)}
                          </CardTitle>
                        </div>
                        <Badge variant={getDifficultyVariant(classItem.rating || 0)}>
                          {getDifficultyLabel(classItem.rating || 0)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => {
                          const rating = classItem.rating || 0
                          if (i < Math.floor(rating)) {
                            return <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                            return <StarHalf key={i} className="h-4 w-4 fill-primary text-primary" />
                          } else {
                            return <Star key={i} className="h-4 w-4 text-gray-300" />
                          }
                        })}
                        <span className="text-sm font-medium ml-1">{(classItem.rating || 0).toFixed(1)}</span>
                        <span className="text-xs text-gray-500 ml-1">({classItem.reviewCount || 0} reviews)</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {classItem.description || "No description available."}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Link href={`/classes/${classItem.className}`} className="w-full">
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No classes found for this major.</p>
                <Link href="/classes/new">
                  <Button className="mt-4">Add a Class</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 RateMyClasses. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

// Helper functions
function getDifficultyLabel(rating: number): string {
  if (rating >= 4.5) return "Excellent"
  if (rating >= 4) return "Very Good"
  if (rating >= 3) return "Good"
  if (rating >= 2) return "Fair"
  if (rating > 0) return "Poor"
  return "Not Rated"
}

function getDifficultyVariant(rating: number): "default" | "secondary" | "outline" | "destructive" {
  if (rating >= 4.5) return "default"
  if (rating >= 3.5) return "secondary"
  if (rating >= 2.5) return "outline"
  if (rating > 0) return "destructive"
  return "outline"
}

