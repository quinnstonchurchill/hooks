import React, { useState, useEffect } from 'react'
import { Flex, Card } from '@setlife/ui'

// some easing functions from the interwebs
const easingTypes = {
  linear: n => n,
  elastic: n =>
    n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: n => Math.pow(2, 10 * (n - 1))
}

function animationTimer(duration = 1000, delay = 0) {
  const [elapsed, setTime] = useState(0)

  useEffect(
    () => {
      let animationFrame, timerStop, start

      // execute on each animation frame
      function onFrame() {
        setTime(Date.now() - start)
        loop()
      }

      // call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame)
      }

      function onStart() {
        // stop animation when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame)
          setTime(Date.now() - start)
        }, duration)

        // start the loop
        start = Date.now()
        loop()
      }

      // start afteer specified delay
      const timerDelay = setTimeout(onStart, delay)

      // clean up
      return () => {
        clearTimeout(timerStop)
        clearTimeout(timerDelay)
        cancelAnimationFrame(animationFrame)
      }
    },
    [duration, delay] // only re-run effect if duration or delay changes
  )

  return elapsed
}

// main hook
function useAnimation({
  easing = 'linear',
  duration = 500,
  delay = 0
}) {
  // animationTimer hook calls useState every animation frame & rerenders as frequently as possible for smooth animations
  const elapsed = animationTimer(duration, delay)
  // amount of duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration)
  // change value based on easing function
  return easingTypes[easing](n)
}

export default () => {
  const delays = [0, 50, 100, 150, 200, 250, 300]
  const animations = delays.map(delay => useAnimation({ easing: 'elastic', duration: 600, delay }))

  return (
    <Flex direction='row' position='relative'>
      {animations.map((a, i) => (
        <Card position='absolute' height={100} width={100} mr='2rem' bg='blue' borderRadius={100} left={a * 150 * (i + 1) - 100} />
      ))}
    </Flex>
  )
}