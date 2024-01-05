import MainLayout from '../layouts/main_layout'

const PleaseLoginPage = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">Please login to access this content.</h1>
      </div>
    </MainLayout>
  )
}

export default PleaseLoginPage
