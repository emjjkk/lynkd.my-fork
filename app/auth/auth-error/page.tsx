export default function AuthErrorPage({
  searchParams,
}: {
  searchParams?: {
    message?: string;
  };
}) {
  const errorMessage = searchParams?.message || 'Unknown error occurred';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dang, something went wrong</h1>
      <p className="text-red-500">{errorMessage}. Try again maybe?</p>
    </div>
  );
}
