"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fetchClassDetails, createReview, fetchReviews} from "@/src/lib/api"
import type { Class, Review } from "@/src/lib/types"
import ClassDetailsLayout from "@/src/app/classes/[className]/components/ClassDetailsLayout"

export default function ClassDetailsPage({ params }) {
  const [classDetails, setClassDetails] = useState<Class | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const {className} = await params
        const classData = await fetchClassDetails(className)
        setClassDetails(classData.classInfo)
        const reviewsData = await fetchReviews(className)
        setReviews(reviewsData)
        setError(null)
      } catch (err) {
        console.error("Failed to fetch data:", err)
        setError("Failed to load class details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [params])

  useEffect(() => {
    console.log("classDetails updated:", classDetails);
  }, [classDetails]);

  const handleSubmitReview = async (reviewData: Review) => {
    try {
      setSubmitting(true)
      setSubmitError(null)
      console.log(`reviewData: ${JSON.stringify(reviewData)}`)
      const newReview = await createReview(reviewData)
      setReviews(reviews.length > 0 ? (prevReviews) => [newReview, ...prevReviews] : [newReview]);
      return newReview
    } catch (err) {
      console.error("Failed to submit review:", err)
      setSubmitError("Failed to submit review. Please try again later.")
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  // const handleLikeReview = async (reviewId: string) => {
  //   try {
  //     await likeReview(reviewId)
  //     setReviews((prevReviews) =>
  //       prevReviews.map((review) => (review.id === reviewId ? { ...review, likes: (review.likes || 0) + 1 } : review)),
  //     )
  //   } catch (err) {
  //     console.error("Failed to like review:", err)
  //   }
  // }

  if (loading) {
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
        <main className="flex-1 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
      </div>
    )
  }

  if (error || !classDetails) {
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
        <main className="flex-1 flex flex-col justify-center items-center">
          <p className="text-red-500">{error || "Class not found"}</p>
          <Button
            onClick={() => {
              setLoading(true)
              fetchClassDetails(params.className)
                .then(setClassDetails)
                .then(() => fetchReviews(params.className))
                .then(setReviews)
                .catch((err) => setError(String(err)))
                .finally(() => setLoading(false))
            }}
            className="mt-4"
          >
            Try Again
          </Button>
          <Link href="/majors">
            <Button variant="outline" className="mt-2">
              Back to Majors
            </Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <ClassDetailsLayout
      classDetails={classDetails}
      reviews={reviews}
      // onLikeReview={handleLikeReview}
      onSubmitReview={handleSubmitReview}
      submitting={submitting}
      submitError={submitError}
    />
  )
}

