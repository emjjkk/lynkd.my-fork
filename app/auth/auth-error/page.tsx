// app/auth/auth-error/page.tsx

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { message?: string }
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dang, something went wrong</h1>
      <p className="text-red-500">
        {searchParams.message || 'Unknown error occurred'}. Try again maybe?
      </p>
    </div>
  );
}
