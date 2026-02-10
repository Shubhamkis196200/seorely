export default function CodeBlock({ code, language = 'html' }: { code: string; language?: string }) {
  return (
    <div className="rounded-lg overflow-hidden my-4 bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-xs text-gray-400">{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs text-gray-400 hover:text-white transition"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-300"><code>{code}</code></pre>
    </div>
  );
}
