"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import type { Review } from "@/src/lib/types"

interface ClassReviewsProps {
  reviews: Review[]
  //onLikeReview: (reviewId: string) => Promise<void>
  onWriteReview: () => void
}

export default function ClassReviews({ reviews, /*onLikeReview,*/ onWriteReview }: ClassReviewsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Reviews</CardTitle>
        <CardDescription>{reviews.length} reviews for this class</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-4">
                {/* <Avatar>
                  <AvatarImage src={review.userAvatar} alt={review.userName} />
                  <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                </Avatar> */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      {/* <p className="font-medium">{review.userName}</p> */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          {review.semester} {review.yearTaken}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs">{review.likes || 0}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => onLikeReview(review.id || "")}
                    >
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
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">No reviews yet. Be the first to review this class!</p>
            <Button onClick={onWriteReview} className="mt-4">
              Write a Review
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

