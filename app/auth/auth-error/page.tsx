export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const message = typeof searchParams.message === 'string'
    ? searchParams.message
    : Array.isArray(searchParams.message)
      ? searchParams.message[0]
      : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dang, something went wrong</h1>
      <p className="text-red-500">
        {message || 'Unknown error occurred'}. Try again maybe?
      </p>
    </div>
  );
}
