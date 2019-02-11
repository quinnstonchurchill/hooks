import React, { Fragment, useState, useEffect, useRef } from 'react'
import { Card, Text, Button, Flex } from '@setlife/ui'

function useOnClickOutside(ref, handler) {
  function listener(event) {
    // ignore clicking ref's element or children
    if (!ref.current || ref.current.contains(event.target)) {
      return
    }

    handler(event)
  }

  useEffect(
    () => {
      // like componentDidMount
      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      // cleanup like componentWillUnmount
      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    }
  )
}

export default () => {
  const ref = useRef()
  const [open, setModalOpen] = useState(false)
  // close modal using hook
  useOnClickOutside(ref, () => setModalOpen(false))

  return (
    <Fragment>
      {open ? (
        <Flex direction='column' minHeight='100vh' alignItems='center' bg='overlay'>
          <Card ref={ref} bg='white' p='2rem' m='auto' borderRadius='4px'>
            <Text>Hey I'm a modal. Click anywhere outside of me to close.</Text>
          </Card>
        </Flex>
      ) : (
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        )}
    </Fragment>
  )
}