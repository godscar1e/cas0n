'use client'
import React, { useState, useEffect, useRef } from 'react'
import { numbers } from '@/app/utils/roulette/numbers'

// Standard European roulette wheel order
const wheelOrder = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26]

interface SpinCircleProps {
  isSpinning: boolean
  targetNumber: number | null
  onSpinEnd: () => void
}

export default function SpinCircle({ isSpinning, targetNumber, onSpinEnd }: SpinCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardWidth = 66
  const gap = 5
  const totalItemWidth = cardWidth + gap

  // Track cumulative transform for forward-only movement
  const [cumulativeTransform, setCumulativeTransform] = useState(0)

  // For debugging
  const [debugInfo, setDebugInfo] = useState({
    targetIndex: -1,
    landingPosition: 0,
    viewportCenter: 0,
    offsetApplied: 0
  })

  useEffect(() => {
    if (!isSpinning || targetNumber === null || targetNumber < 0) return

    const container = containerRef.current
    if (!container) return

    // Create a consistent sequence of numbers for the wheel
    const extendedWheel = Array.from({ length: 10 }).flatMap(() => wheelOrder)

    // Find the target number in the extended wheel
    const startSearchPosition = Math.floor(wheelOrder.length) // Start after at least one full wheel

    // Find the target index
    let targetIndex = -1
    for (let i = startSearchPosition; i < extendedWheel.length; i++) {
      if (extendedWheel[i] === targetNumber) {
        targetIndex = i
        break
      }
    }

    if (targetIndex === -1) return

    // Adjust target index to land one position before the target number
    const adjustedTargetIndex = targetIndex 

    // Calculate position where the wheel should stop
    const viewportCenter = container.offsetWidth / 2
    const baseLandingPosition = (adjustedTargetIndex * totalItemWidth) - viewportCenter + (cardWidth / 2)
    // Add at least one full wheel rotation to ensure forward spin
    const fullRotation = wheelOrder.length * totalItemWidth
    const landingPosition = baseLandingPosition + (Math.floor(-cumulativeTransform / fullRotation) + 1) * fullRotation

    // Store debug info
    setDebugInfo({
      targetIndex: adjustedTargetIndex,
      landingPosition,
      viewportCenter,
      offsetApplied: -1 * totalItemWidth
    })

    // Start the animation
    container.style.transition = `transform 6s cubic-bezier(0.2, 0.5, 0.3, 1)`
    container.style.transform = `translate3d(-${landingPosition}px, 0, 0)`

    const timeout = setTimeout(() => {
      container.style.transition = ''
      container.style.transform = `translate3d(-${landingPosition}px, 0, 0)`
      setCumulativeTransform(-landingPosition)
      onSpinEnd()
    }, 6000)

    return () => clearTimeout(timeout)
  }, [isSpinning, targetNumber, onSpinEnd, totalItemWidth, cumulativeTransform])

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative overflow-hidden w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1130px] bg-gray-800 p-4 rounded-3xl">
        {/* Center indicator line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-9 h-0 
          border-l-[18px] border-l-transparent
          border-t-[7px] border-t-red-500 
          border-r-[18px] border-r-transparent 
          border-solid border-transparent border-t-emerald 
          z-10 -translate-x-1/2 drop-shadow-[0_2px_4px_#7AFFC540]" />

        {/* Wheel container */}
        <div
          ref={containerRef}
          className="flex"
          style={{ transform: `translate3d(${cumulativeTransform}px, 0, 0)` }}
        >
          {Array.from({ length: 10 }).flatMap((_, arrayIndex) =>
            wheelOrder.map((number, i) => {
              // Fallback for number 0 if not found in numbers
              const numObj = number === 0 ? { number: 0, color: 'green' } : numbers.find(n => n.number === number)
              if (!numObj) return null

              const uniqueKey = `num-${number}-array-${arrayIndex}-index-${i}`
              const absoluteIndex = arrayIndex * wheelOrder.length + i
              const isTargetNumber = targetNumber !== null && number === targetNumber &&
                absoluteIndex === debugInfo.targetIndex + 1

              return (
                <div
                  key={uniqueKey}
                  className={`flex-shrink-0 w-[66px] h-[66px] flex items-center justify-center text-white font-bold text-xl rounded-xl mx-[2.5px]
                    ${number === 0 ? 'bg-secondary' : numObj.color === 'red' ? 'bg-pink' : 'bg-yellow'}
                    ${isTargetNumber ? 'ring-2 ring-yellow-300' : ''}`}
                  data-index={absoluteIndex}
                >
                  {number}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Extended debugging display */}
      <div className="text-xs mt-2 text-gray-500">
        <div>Target: {targetNumber}, Landing Index: {debugInfo.targetIndex}, Target Index: {debugInfo.targetIndex + 1}</div>
        <div>Landing: {debugInfo.landingPosition.toFixed(0)}px, Center: {debugInfo.viewportCenter.toFixed(0)}px</div>
        <div>Strategy: Stopping one position before target to ensure correct alignment, forward-only spin</div>
      </div>
    </div>
  )
}