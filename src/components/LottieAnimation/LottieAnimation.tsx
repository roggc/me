import { useLottie } from 'lottie-react'

export const LottieAnimation:React.FC<{animationData:any}> = ({animationData}) => {
    const lottieOptions={
        animationData,
        loop:true,
        autoplay:true,
    }
  const { View } = useLottie(lottieOptions)
  return View
}
