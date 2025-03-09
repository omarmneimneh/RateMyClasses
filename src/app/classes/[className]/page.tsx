"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, StarHalf, ThumbsUp, MessageSquare, Calendar, Clock, Users, BookOpen, SmilePlus, Smile, Meh, Frown, Angry } from "lucide-react"
import {fetchClassDetails} from "@/src/lib/api"
import { useEffect } from "react"
import { Class } from "@/src/lib/types"
import { capitalizeWords } from "@/src/lib/utils"
import Rating from "@/src/app/components/rating"


// Helper functions


export default function ClassDetailsPage({ params }: { params: { className: string } }) {
  
  const [activeTab, setActiveTab] = useState("overview")

  const [classDetails, setClassInfo] = useState<Class | null>(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enjoymentIndex, setEnjoymentIndex] = useState<number | null>(null);

  useEffect(()=>{
    const loadData = async ()=>{
      try {
        setLoading(true)
        const resolvedParams = await params;
        const classData = await fetchClassDetails(decodeURIComponent(resolvedParams.className));
        
        classData.classInfo.className = capitalizeWords(classData.classInfo.className);
        classData.classInfo.classCode = classData.classInfo.classCode.toUpperCase();
        classData.classInfo.majorName = capitalizeWords(classData.classInfo.majorName);
        setClassInfo(classData.classInfo);
        if(classData.reviewCount > 0) setReviews(fetchClassReviews(resolvedParams.className));
        setError(null)
      } catch(e){
        console.error("Failed to fetch data:", e)
        setError("Failed to load class details. Please try again later.")
      } finally{
        setLoading(false);
      }
    }
    loadData();
  },[params]);
  if (loading) { 
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  if (!classDetails) {
    return <div>Class not found</div>
  }


  const emojis = [
    {rating: 1, Icon: Angry},
    {rating: 2, Icon: Frown},
    {rating: 3, Icon: Meh},
    {rating: 4, Icon: Smile},
    {rating: 5, Icon: SmilePlus}
  ]
  
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
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Link href="/majors" className="text-sm text-gray-500 hover:underline">
                  Majors
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <Link href={`/majors/${classDetails.majorName}`} className="text-sm text-gray-500 hover:underline">
                  {classDetails.majorName}
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm font-medium">{classDetails.classCode}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h1 className="text-3xl font-bold">
                  {classDetails.classCode}: {classDetails.className}
                </h1>
                {/* <Badge variant={getDifficultyVariant(classDetails.difficulty)} className="w-fit">
                  {getDifficultyLabel(classDetails.difficulty)}
                </Badge> */}
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => {
                  if (i < Math.floor(classDetails.rating)) {
                    return <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  } else if (i === Math.floor(classDetails.rating) && classDetails.rating % 1 !== 0) {
                    return <StarHalf key={i} className="h-5 w-5 fill-primary text-primary" />
                  } else {
                    return <Star key={i} className="h-5 w-5 text-gray-300" />
                  }
                })}
                {/* <span className="text-lg font-medium ml-1">{classDetails.rating.toFixed(1)}</span> */}
                <span className="text-sm text-gray-500 ml-1">({classDetails.reviewCount} reviews)</span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="rate">Rate This Class</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Information</CardTitle>
                    <CardDescription>Details about {classDetails.classCode}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Department</p>
                          <p className="text-sm text-gray-500">{classDetails.majorName}</p>
                        </div>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Semester Offered</p>
                          <p className="text-sm text-gray-500">{classDetails.semestersOffered.join(", ")}</p>
                        </div>
                      </div> */}
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Credits</p>
                          <p className="text-sm text-gray-500">{classDetails.credits}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Description</h3>
                      <p className="text-gray-700 dark:text-gray-300">{classDetails.description}</p>
                    </div>

                    {/* <div>
                      <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {classDetails.prerequisites.length > 0
                          ? classDetails.prerequisites.join(", ")
                          : "No prerequisites required"}
                      </p>
                    </div> */}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>{reviews.length} reviews for this class</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.userAvatar} alt={review.userName} />
                            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{review.userName}</p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-gray-300"}`}
                                    />
                                  ))}
                                  <span className="text-xs text-gray-500 ml-1">
                                    {review.semester} {review.year}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500">
                                <ThumbsUp className="h-4 w-4" />
                                <span className="text-xs">{review.likes}</span>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p>
                            <div className="mt-2 flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <ThumbsUp className="h-4 w-4" />
                                <span>Helpful</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>Reply</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              <Rating />
              
            </Tabs>
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