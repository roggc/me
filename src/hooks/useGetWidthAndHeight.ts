import { useLayoutEffect, useState, useRef } from 'react'

export const useGetWidthAndHeight = () => {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width)
      setHeight(ref.current.getBoundingClientRect().height)
    }
  }, [])
  return { width, height, ref }
}
