"use client"

import { useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Class, Review } from "@/src/lib/types"
import ClassHeader from "@/src/app/classes/[className]/components/ClassHeader"
import ClassOverview from "@/src/app/classes/[className]/components/ClassOverview"
import ClassReviews from "@/src/app/classes/[className]/components/ClassReviews"
import ClassRatingForm from "@/src/app/classes/[className]/components/ClassRatingForm"

interface ClassDetailsLayoutProps {
  classDetails: Class
  reviews: Review[]
  //onLikeReview: (reviewId: string) => Promise<void>
  onSubmitReview: (reviewData: Review) => Promise<Review>
  submitting: boolean
  submitError: string | null
}

export default function ClassDetailsLayout({
  classDetails,
  reviews,
  // onLikeReview,
  onSubmitReview,
  submitting,
  submitError,
}: ClassDetailsLayoutProps) {
  const [activeTab, setActiveTab] = useState("overview")
  if (!classDetails) return <p>Class details are loading...</p>;
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
            <ClassHeader classDetails={classDetails} />

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="rate">Rate This Class</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <ClassOverview classDetails={classDetails} />
              </TabsContent>

              <TabsContent value="reviews" className="mt-4 space-y-4">
                <ClassReviews
                  reviews={reviews}
                  // onLikeReview={onLikeReview}
                  onWriteReview={() => setActiveTab("rate")}
                />
              </TabsContent>

              <TabsContent value="rate" className="mt-4">
                <ClassRatingForm
                  classID={classDetails.id||""}
                  className={classDetails.className || ""}
                  onSubmitReview={async (reviewData) => {
                    await onSubmitReview(reviewData)
                    setActiveTab("reviews")
                  }}
                  submitting={submitting}
                  submitError={submitError}
                />
              </TabsContent>
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