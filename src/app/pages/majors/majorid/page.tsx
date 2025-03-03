import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, StarHalf } from "lucide-react"

export default function MajorClassesPage({ params }: { params: { majorId: string } }) {

  const majorName = getMajorName(params.majorId)
  const classes = getClassesForMajor(params.majorId)

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
        <div className="container mx-auto">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Link href="/majors" className="text-sm text-gray-500 hover:underline">
                  Majors
                </Link>
                <span className="text-sm text-gray-500">/</span>
                <span className="text-sm font-medium">{majorName}</span>
              </div>
              <h1 className="text-3xl font-bold">{majorName} Classes</h1>
              <p className="text-gray-500 dark:text-gray-400">View and rate classes in this major</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {classItem.code}: {classItem.name}
                        </CardTitle>
                        <CardDescription>Professor: {classItem.professor}</CardDescription>
                      </div>
                      <Badge variant={getDifficultyVariant(classItem.difficulty)}>
                        {getDifficultyLabel(classItem.difficulty)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => {
                        if (i < Math.floor(classItem.rating)) {
                          return <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        } else if (i === Math.floor(classItem.rating) && classItem.rating % 1 !== 0) {
                          return <StarHalf key={i} className="h-4 w-4 fill-primary text-primary" />
                        } else {
                          return <Star key={i} className="h-4 w-4 text-gray-300" />
                        }
                      })}
                      <span className="text-sm font-medium ml-1">{classItem.rating.toFixed(1)}</span>
                      <span className="text-xs text-gray-500 ml-1">({classItem.reviewCount} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{classItem.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/classes/${classItem.id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
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
function getMajorName(majorId: string): string {
  const majors: Record<string, string> = {
    cs: "Computer Science",
    bio: "Biology",
    psych: "Psychology",
    eng: "Engineering",
    bus: "Business Administration",
    math: "Mathematics",
    chem: "Chemistry",
    phys: "Physics",
    hist: "History",
    econ: "Economics",
    art: "Art & Design",
    comm: "Communications",
  }
  return majors[majorId] || "Unknown Major"
}

function getClassesForMajor(majorId: string) {
  // Mock data - in a real app, this would be fetched from Firebase
  const classes = {
    cs: [
      {
        id: "cs101",
        code: "CS 101",
        name: "Introduction to Computer Science",
        professor: "Dr. Smith",
        description: "An introduction to the basic concepts of computer science and programming.",
        rating: 4.5,
        reviewCount: 128,
        difficulty: 2,
      },
      {
        id: "cs201",
        code: "CS 201",
        name: "Data Structures",
        professor: "Dr. Johnson",
        description: "A comprehensive study of data structures and their applications.",
        rating: 4.2,
        reviewCount: 95,
        difficulty: 3,
      },
      {
        id: "cs301",
        code: "CS 301",
        name: "Algorithms",
        professor: "Dr. Williams",
        description: "Design and analysis of algorithms for solving computational problems.",
        rating: 3.8,
        reviewCount: 72,
        difficulty: 4,
      },
      {
        id: "cs350",
        code: "CS 350",
        name: "Operating Systems",
        professor: "Dr. Brown",
        description: "Principles of operating systems design and implementation.",
        rating: 4.0,
        reviewCount: 65,
        difficulty: 4,
      },
      {
        id: "cs401",
        code: "CS 401",
        name: "Software Engineering",
        professor: "Dr. Davis",
        description: "Principles and practices of software development and project management.",
        rating: 4.7,
        reviewCount: 83,
        difficulty: 3,
      },
      {
        id: "cs450",
        code: "CS 450",
        name: "Machine Learning",
        professor: "Dr. Wilson",
        description: "Introduction to machine learning algorithms and applications.",
        rating: 4.9,
        reviewCount: 112,
        difficulty: 4,
      },
    ],
    // Add more majors as needed
  }

  return classes[majorId] || []
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

