"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, StarHalf, ThumbsUp, MessageSquare, Calendar, Clock, Users, BookOpen } from "lucide-react"

export default function ClassDetailsPage({ params }: { params: { classId: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, this would be fetched from Firebase based on the classId
  const classDetails = getClassDetails(params.classId)
  const reviews = getClassReviews(params.classId)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">ClassRate</span>
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
                <Link href={`/majors/${classDetails.majorId}`} className="text-sm text-gray-500 hover:underline">
                  {classDetails.majorName}
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm font-medium">{classDetails.code}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h1 className="text-3xl font-bold">
                  {classDetails.code}: {classDetails.name}
                </h1>
                <Badge variant={getDifficultyVariant(classDetails.difficulty)} className="w-fit">
                  {getDifficultyLabel(classDetails.difficulty)}
                </Badge>
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
                <span className="text-lg font-medium ml-1">{classDetails.rating.toFixed(1)}</span>
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
                    <CardDescription>Details about {classDetails.code}</CardDescription>
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
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Professor</p>
                          <p className="text-sm text-gray-500">{classDetails.professor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Semester Offered</p>
                          <p className="text-sm text-gray-500">{classDetails.semestersOffered.join(", ")}</p>
                        </div>
                      </div>
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
                      <p className="text-gray-700 dark:text-gray-300">{classDetails.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {classDetails.prerequisites.length > 0
                          ? classDetails.prerequisites.join(", ")
                          : "No prerequisites required"}
                      </p>
                    </div>
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

              <TabsContent value="rate" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Rate This Class</CardTitle>
                    <CardDescription>Share your experience with other students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Your Rating</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 cursor-pointer text-gray-300 hover:text-primary" />
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Your Review</p>
                      <Textarea placeholder="Share your experience with this class..." className="min-h-[120px]" />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">When did you take this class?</p>
                      <div className="grid grid-cols-2 gap-4">
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select Semester</option>
                          <option value="Fall">Fall</option>
                          <option value="Spring">Spring</option>
                          <option value="Summer">Summer</option>
                          <option value="Winter">Winter</option>
                        </select>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select Year</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Submit Review</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ClassRate. All rights reserved.</p>
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
function getClassDetails(classId: string) {
  // Mock data - in a real app, this would be fetched from Firebase
  const classDetails = {
    cs101: {
      id: "cs101",
      code: "CS 101",
      name: "Introduction to Computer Science",
      majorId: "cs",
      majorName: "Computer Science",
      professor: "Dr. Smith",
      description: "An introduction to the basic concepts of computer science and programming.",
      fullDescription:
        "This course provides a comprehensive introduction to computer science and programming. Students will learn fundamental concepts including algorithms, data types, control structures, and basic problem-solving techniques. The course also covers an introduction to object-oriented programming and software development methodologies.",
      rating: 4.5,
      reviewCount: 128,
      difficulty: 2,
      credits: 3,
      semestersOffered: ["Fall", "Spring"],
      prerequisites: [],
    },
    cs201: {
      id: "cs201",
      code: "CS 201",
      name: "Data Structures",
      majorId: "cs",
      majorName: "Computer Science",
      professor: "Dr. Johnson",
      description: "A comprehensive study of data structures and their applications.",
      fullDescription:
        "This course covers the design, analysis, and implementation of data structures. Topics include arrays, linked lists, stacks, queues, trees, heaps, hash tables, and graphs. Students will learn how to select and use appropriate data structures for various computational problems and understand their performance characteristics.",
      rating: 4.2,
      reviewCount: 95,
      difficulty: 3,
      credits: 4,
      semestersOffered: ["Fall", "Spring"],
      prerequisites: ["CS 101"],
    },
  }

  return (
    classDetails[classId] || {
      id: "unknown",
      code: "Unknown",
      name: "Unknown Class",
      majorId: "unknown",
      majorName: "Unknown Major",
      professor: "Unknown",
      description: "No description available",
      fullDescription: "No detailed description available",
      rating: 0,
      reviewCount: 0,
      difficulty: 0,
      credits: 0,
      semestersOffered: [],
      prerequisites: [],
    }
  )
}

function getClassReviews(classId: string) {
  // Mock data - in a real app, this would be fetched from Firebase
  const reviews = {
    cs101: [
      {
        userName: "Alex Johnson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        semester: "Fall",
        year: "2023",
        comment:
          "Great introductory course! Dr. Smith explains concepts clearly and the assignments are challenging but fair. Highly recommend for anyone interested in CS.",
        likes: 24,
      },
      {
        userName: "Jamie Lee",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        semester: "Spring",
        year: "2023",
        comment:
          "Solid introduction to programming concepts. The course moves at a good pace and the professor is always available during office hours. Some assignments were a bit difficult but overall a good experience.",
        likes: 18,
      },
      {
        userName: "Taylor Smith",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        semester: "Fall",
        year: "2022",
        comment:
          "One of the best classes I've taken! Dr. Smith is an excellent teacher who really cares about student success. The projects were fun and I learned a lot.",
        likes: 32,
      },
    ],
    cs201: [
      {
        userName: "Jordan Wilson",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        semester: "Spring",
        year: "2023",
        comment:
          "Challenging but rewarding course. Dr. Johnson explains complex concepts well and the programming assignments help reinforce the material.",
        likes: 15,
      },
      {
        userName: "Casey Brown",
        userAvatar: "/placeholder.svg?height=40&width=40",
        rating: 3,
        semester: "Fall",
        year: "2022",
        comment:
          "The material is interesting but the workload is heavy. Be prepared to spend a lot of time on assignments. The professor is knowledgeable but sometimes moves too quickly through difficult topics.",
        likes: 10,
      },
    ],
  }

  return reviews[classId] || []
}

function getDifficultyLabel(level: number): string {
  switch (level) {
    case 1:
      return "Easy"
    case 2:
      return "Moderate"
    case 3:
      return "Challenging"
    case 4:
      return "Difficult"
    case 5:
      return "Very Difficult"
    default:
      return "Unknown"
  }
}

function getDifficultyVariant(level: number): "default" | "secondary" | "outline" | "destructive" {
  switch (level) {
    case 1:
      return "default"
    case 2:
      return "secondary"
    case 3:
      return "outline"
    case 4:
      return "destructive"
    case 5:
      return "destructive"
    default:
      return "default"
  }
}

