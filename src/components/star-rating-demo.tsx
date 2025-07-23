"use client"

import { useState } from "react"
import { StarRating } from "@/registry/new-york/star-rating/components/star-rating"

export function StarRatingDemo() {
  const [rating, setRating] = useState(0)

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Current rating: {rating} stars
        </p>
        <StarRating value={rating} onChange={setRating} />
      </div>
    </div>
  )
}

export function StarRatingReadOnly({ value = 3, ...props }) {
  return <StarRating value={value} readonly {...props} />
}

export function StarRatingSizes() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Small:</span>
        <StarRating value={4} size="sm" readonly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Medium:</span>
        <StarRating value={4} size="md" readonly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Large:</span>
        <StarRating value={4} size="lg" readonly />
      </div>
    </div>
  )
}

export function BasicExample() {
  return <StarRating value={3} readonly />
}

export function InteractiveExample() {
  const [rating, setRating] = useState(0)

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-2">
          Current rating: {rating} stars
        </p>
        <StarRating value={rating} onChange={setRating} />
      </div>
    </div>
  )
}

export function SizesExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Small:</span>
        <StarRating value={4} size="sm" readonly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Medium:</span>
        <StarRating value={4} size="md" readonly />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Large:</span>
        <StarRating value={4} size="lg" readonly />
      </div>
    </div>
  )
}

export function CustomMaxExample() {
  return <StarRating value={7} max={10} readonly />
} 