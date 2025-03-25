"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Class, Review } from "@/src/lib/types"
import ClassHeader from "@/src/app/components/Classes/ClassHeader"
import ClassOverview from "@/src/app/components/Classes/ClassOverview"
import ClassReviews from "@/src/app/components/Classes/ClassReviews"
import ClassRatingForm from "@/src/app/components/Classes/ClassRatingForm"
import {Header, Footer} from "@/src/app/components/lib/Layout"

interface ClassDetailsLayoutProps {
  classDetails: Class
  reviews: Review[]
  onLikeReview: (reviewId: string) => Promise<void>
  onSubmitReview: (reviewData: Review) => Promise<Review>
  submitting: boolean
  submitError: string | null
}

export default function ClassDetailsLayout({
  classDetails,
  reviews,
  onLikeReview,
  onSubmitReview,
  submitting,
  submitError,
}: ClassDetailsLayoutProps) {
  const [activeTab, setActiveTab] = useState("overview")
  if (!classDetails) return <p>Class details are loading...</p>;
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
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
                  onLikeReview={onLikeReview}
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
      <Footer/>
    </div>
  )
}