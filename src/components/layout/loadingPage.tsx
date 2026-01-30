import { Spinner } from "../ui/loaders/loadingSpinner"

export const LoadingPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center" aria-label="Loading Product Details">
      <Spinner />
    </main>
  )
}