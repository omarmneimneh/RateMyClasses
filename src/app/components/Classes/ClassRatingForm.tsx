"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import {Review} from "@/src/lib/types"
//import { auth } from "@/lib/firebase"

interface ClassRatingFormProps {
  classID: string
  className: string
  onSubmitReview: (reviewData: Review) => Promise<void>
  submitting: boolean
  submitError: string | null
}

export default function ClassRatingForm({ classID,className, onSubmitReview, submitting, submitError }: ClassRatingFormProps) {
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [semester, setSemester] = useState("")
  const [year, setYear] = useState("")
  const [localError, setLocalError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userRating) {
        setLocalError("Please select a rating")
        return
    }

    if (!userComment.trim()) {
        setLocalError("Please enter a comment")
        return
    }

    if (!semester) {
        setLocalError("Please select a semester")
        return
    }

    if (!year) {
        setLocalError("Please select a year")
        return
    }

    setLocalError(null)

    //const currentUser = auth.currentUser

    // if (!currentUser) {
    //   setLocalError("You must be logged in to submit a review")
    //   return
    // }

    const reviewData: Review = {
      className: className,
      classID: classID,
      rating: userRating,
      comment: userComment,
      semester: semester,
      yearTaken: year,
      createdAt: new Date().toISOString().split("T")[0],
      likes: 0
    }
    try {
      await onSubmitReview(reviewData)

      // Reset form on success
      setUserRating(0)
      setUserComment("")
      setSemester("")
      setYear("")
    } catch (err) {
      console.error("Failed to submit review:", err)
    }
  }
    const generateYearOptions = () => {
      const currentYear = new Date().getFullYear()
      const startYear = currentYear - 5;
      const years = []

      for (let year = currentYear; year >= startYear; year--) {
        years.push(year)
      }

      return years
    }

    const yearOptions = generateYearOptions()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate This Class</CardTitle>
        <CardDescription>Share your experience with other students</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Your Rating</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 cursor-pointer ${
                      i < userRating ? "fill-primary text-primary" : "text-gray-300 hover:text-primary"
                    }`}
                    onClick={() => setUserRating(i + 1)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Your Review</p>
              <Textarea
                placeholder="Share your experience with this class..."
                className="min-h-[120px]"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">When did you take this class?</p>
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="">Select Semester</option>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                </select>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((yearOption) => (
                    <option key={yearOption} value={yearOption.toString()}>
                      {yearOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {(localError || submitError) && <div className="text-red-500 text-sm">{localError || submitError}</div>}
            <Button type="submit" className="w-full" /*disabled={submitting || !auth.currentUser}*/>
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>

            {/* {!auth.currentUser && (
              <div className="text-center mt-2">
                <p className="text-sm text-gray-500">You need to be logged in to submit a review.</p>
                <Link href="/login">
                  <Button variant="link" className="p-0 h-auto">
                    Log in here
                  </Button>
                </Link>
              </div>
            )} */}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

