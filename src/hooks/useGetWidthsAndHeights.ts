import { useLayoutEffect,useEffect, useState, useRef } from 'react'

export const useGetWidthsAndHeights = (
  isActivateChange: boolean,
  setIsActivateChange: React.Dispatch<React.SetStateAction<boolean>>,
  numberOfItems:number
) => {
  const [widths, setWidths] = useState<number[]>([])
  const [heights, setHeights] = useState<number[]>([])
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useLayoutEffect(() => {
    if (isActivateChange) {
      const widths_: number[] = []
      const heights_: number[] = []
      refs.current = refs.current.slice(-numberOfItems)
      refs.current.forEach((el) => {
        if (el) {
          widths_.push(el.getBoundingClientRect().width)
          heights_.push(el.getBoundingClientRect().height)
        }
      })
      setWidths(widths_)
      setHeights(heights_)
      console.log(heights_)
      setIsActivateChange(false)
    }
  }, [isActivateChange, setIsActivateChange])

  useEffect(() => {
    const widths_: number[] = []
    const heights_: number[] = []
    refs.current.forEach((el) => {
      if (el) {
        widths_.push(el.getBoundingClientRect().width)
        heights_.push(el.getBoundingClientRect().height)
      }
    })
    setWidths(widths_)
    setHeights(heights_)
    console.log(heights_)
  }, [])

  return { widths, heights, refs, setWidths, setHeights }
}
