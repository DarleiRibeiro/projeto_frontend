interface ErrorProps {
  message: string | undefined
}
export const Errors = ({ message }: ErrorProps) => {
  return (
    <span className="text-red-500 mt-1 text-xs">{message}</span>
  )
}
