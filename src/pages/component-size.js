import React, { useCallback, useState, useLayoutEffect, useRef } from 'react'
import { Box, Text, Flex } from '@setlife/ui';

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0
    }
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

function useComponentSize(ref) {
  const [ComponentSize, setComponentSize] = useState(getSize(ref ? ref.current : {}))

  const handleResize = useCallback(
    () => {
      if (ref.current) {
        setComponentSize(getSize(ref.current))
      }
    },
    [ref]
  )

  useLayoutEffect(
    () => {
      if (!ref.current) {
        return
      }

      handleResize()

      if (typeof ResizeObserver === 'function') {
        let resizeObserver = new ResizeObserver(() => handleResize())
        resizeObserver.observe(ref.current)

        return () => {
          resizeObserver.disconnect(ref.current)
          resizeObserver = null
        }
      } else {
        // fallback for no ResizeObserver
        window.addEventListener('resize', handleResize)
  
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }

    },
    [ref.current]
  )

  return ComponentSize
}

export default () => {
  const ref = useRef(null)
  const size = useComponentSize(ref)
  const { width, height } = size

  return (
    <Flex>
      <Box ref={ref} width={400} height={320} bg='green'>
        <Text color='white'>The box height is {height}px</Text>
        <Text color='white'>The box width is {width}px</Text>
      </Box>
    </Flex>
  )
}