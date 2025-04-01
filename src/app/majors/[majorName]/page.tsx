"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, /*CardDescription,*/ CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf } from "lucide-react"
import { fetchClasses, fetchMajorDetails, addClass } from "@/src/lib/api"
import type { Class, Major } from "@/src/lib/types"
import { capitalizeWords } from "@/src/lib/utils"
import {Footer, Header} from "@/src/app/components/lib/Layout"
import AddClassModal from "@/src/app/components/Classes/AddClassModal"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
type Params = Promise<{majorName:string}>

export default function MajorClassesPage({ params }: { params: Params }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [major, setMajor] = useState<Major>({} as Major);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMessage, setAddMessage] = useState({text:'', visible: false});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<Class[]>([]);
  
  const handleAddClass = async (newClass: Class)=>{
      newClass.className = newClass.className.toLowerCase().trim();
      newClass.classCode = newClass.classCode.replace(/\s+/g, '').toLowerCase();
      const response = await addClass(newClass);
      if(!response.success){
        showMessage(response.message);
        return;
      }
      newClass.id = response.id;
      setClasses((prevClasses) => [...prevClasses, newClass]);
      setMajor((prevDetails) =>
          prevDetails && {
            ...prevDetails,
            courseCount: prevDetails.courseCount + 1
          })
      setIsModalOpen(false);
  }
  //makes sure parameter promises are fulfilled before fetching data and moving on
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const {majorName} = await params;
        const majorData = localStorage.getItem("selectedMajor") ? JSON.parse(localStorage.getItem("selectedMajor") as string) : (await fetchMajorDetails(majorName)).majorInfo;
        const classesData = await fetchClasses(majorName);
        setMajor(majorData)
        setClasses(classesData["classInfo"])
        setClasses(classesData["classInfo"])
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

  useEffect(()=>{
    if (!searchTerm.trim()) {
      setFilteredClasses(classes)
    } else {
      const lowerCasedSearch = searchTerm.toLowerCase()
      setFilteredClasses(
        classes.filter(classItem =>
          classItem.className.toLowerCase().includes(lowerCasedSearch) || 
          classItem.classCode.toLowerCase().includes(lowerCasedSearch)
        ))
    }
  }, [searchTerm, classes])

  const showMessage = (text: string, duration = 5000) => {
        setAddMessage({ text, visible: true });
        setTimeout(() => {
          setAddMessage({ text: '', visible: false });
        }, duration);
  };

  return (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 py-6 px-4 md:px-6">
      <div className="container mx-auto">
        {/* Flex container to position title and button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Link href="/majors" className="text-sm text-gray-500 hover:underline">
                Majors
              </Link>
              <span className="text-sm text-gray-500">/</span>
              <span className="text-sm font-medium">{major ? capitalizeWords(major.majorName) : "Loading..."}</span>
            </div>
            <h1 className="text-3xl font-bold">{major ? capitalizeWords(major.majorName) : "Loading..."} Major</h1>
            <p className="text-gray-500 dark:text-gray-400">View and rate classes in this major</p>
          </div>

          {/* New Button at Top-Right */}
          {addMessage.visible && (
            <div className="justify-between text-red-500 px-4 py-2 rounded shadow-md animate-bounce">
              {addMessage.text}
            </div>
          )}
          <Button onClick={() => setIsModalOpen(true)} variant={"outline"}>Add New Class</Button>
        
        </div>

        <div className="relative w-full max-w-sm mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder={`Search classes in ${major.majorName}...`}
            className="w-full bg-background pl-8 rounded-md border border-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
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
                params
                  .then((resolvedParams) => fetchMajorDetails(resolvedParams.majorName))
                  .then((majorData) => {
                    setMajor(majorData.majorInfo)
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
        ) : filteredClasses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filteredClasses
              .sort((a, b) => a.classCode.localeCompare(b.classCode))
              .map((classItem) => (
                <Card key={classItem.id} className="h-[340px] flex flex-col justify-between overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg leading-tight">
                        {classItem.classCode.toUpperCase()}: {capitalizeWords(classItem.className)}
                      </CardTitle>
                      <Badge variant={getDifficultyVariant(classItem.rating || 0)}>
                        {getDifficultyLabel(classItem.rating || 0)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => {
                        const rating = classItem.rating || 0;
                        if (i < Math.floor(rating)) {
                          return <Star key={i} className="h-4 w-4 fill-primary text-primary" />;
                        } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                          return <StarHalf key={i} className="h-4 w-4 fill-primary text-primary" />;
                        } else {
                          return <Star key={i} className="h-4 w-4 text-gray-300" />;
                        }
                      })}
                      <span className="text-sm font-medium ml-1">{(classItem.rating || 0).toFixed(1)}</span>
                      <span className="text-xs text-gray-500 ml-1">({classItem.reviewCount || 0} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow min-h-[60px] max-h-[100px] overflow-hidden line-clamp-4">
                      {classItem.description || "No description available."}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link 
                      href={`/classes/${classItem.className}`} 
                      className="w-full"
                      onClick={() => localStorage.setItem("selectedClass", JSON.stringify(classItem))}
                    >
                      <Button className="w-full" variant={"outline"}>View Details</Button>
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
    </main>
    <Footer />
    <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddClass}
        majorName={major.majorName}
    />
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

