"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { fetchMajors } from "@/src/lib/api"
import type { Major } from "@/src/lib/types"
import { capitalizeWords } from "@/src/lib/utils"
import {Footer, Header} from "@/src/app/components/lib/Layout"

export default function MajorsPage() {
  const [majors, setMajors] = useState<Major[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMajors = async () => {
      try {
        const data = await fetchMajors()
        setMajors(data)
      } catch (error) {
        console.error("Failed to fetch majors:", error)
      } finally {
        setLoading(false)
      }
    }
    loadMajors()
  }, [])
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <div className="w-full">
        <main className="flex-1 w-full py-6 px-4 md:px-6">
          <div className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl font-bold text-center">Browse Majors</h1>
                <p className="text-gray-500 dark:text-gray-400 text-center">Select a major to view and rate classes</p>

                <div className="relative w-full max-w-sm mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search majors..."
                    className="w-full bg-background pl-8 rounded-md border border-input"
                  />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {majors.map(major => (
                    <Card key={major.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle>{capitalizeWords(major.majorName)}</CardTitle>
                        <CardDescription>{major.courseCount} courses available</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          View and rate classes in the {capitalizeWords(major.majorName)} department.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Link 
                          href={`/majors/${major.majorName}`} 
                          className="w-full"
                          onClick={() => localStorage.setItem("selectedMajor", JSON.stringify(major))}
                        >
                          <Button className="w-full">View Classes</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

