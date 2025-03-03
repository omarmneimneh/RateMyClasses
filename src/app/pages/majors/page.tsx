// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Search } from "lucide-react"
// import { fetchMajors } from "@/lib/api"
// import type { Major } from "@/lib/types"

// export default function MajorsPage() {
//   const [majors, setMajors] = useState<Major[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadMajors = async () => {
//       try {
//         const data = await fetchMajors()
//         setMajors(data)
//       } catch (error) {
//         console.error("Failed to fetch majors:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadMajors()
//   }, [])

//   if (loading) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="px-4 lg:px-6 h-16 flex items-center border-b">
//         <Link href="/" className="flex items-center justify-center">
//           <span className="font-bold text-xl">ClassRate</span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link href="/majors" className="text-sm font-medium hover:underline underline-offset-4">
//             Majors
//           </Link>
//           <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
//             About
//           </Link>
//           <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
//             Login
//           </Link>
//         </nav>
//       </header>
//       <main className="flex-1 py-6 px-4 md:px-6">
//         <div className="container mx-auto">
//           <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-bold">Browse Majors</h1>
//             <p className="text-gray-500 dark:text-gray-400">Select a major to view and rate classes</p>

//             <div className="relative w-full max-w-sm mb-6">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//               <Input
//                 type="search"
//                 placeholder="Search majors..."
//                 className="w-full bg-background pl-8 rounded-md border border-input"
//               />
//             </div>

//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//               {majors.map((major) => (
//                 <Card key={major.id} className="overflow-hidden">
//                   <CardHeader className="pb-2">
//                     <CardTitle>{major.name}</CardTitle>
//                     <CardDescription>{major.courseCount} courses available</CardDescription>
//                   </CardHeader>
//                   <CardContent className="pb-2">
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       View and rate classes in the {major.name} department.
//                     </p>
//                   </CardContent>
//                   <CardFooter>
//                     <Link href={`/majors/${major.id}`} className="w-full">
//                       <Button className="w-full">View Classes</Button>
//                     </Link>
//                   </CardFooter>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 ClassRate. All rights reserved.</p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link href="/terms" className="text-xs hover:underline underline-offset-4">
//             Terms of Service
//           </Link>
//           <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
//             Privacy
//           </Link>
//         </nav>
//       </footer>
//     </div>
//   )
// }

