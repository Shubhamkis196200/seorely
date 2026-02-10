export default function SEOScoreWidget({ score }: { score: number }) {
  const color = score >= 80 ? '#14B8A6' : score >= 50 ? '#F59E0B' : '#EF4444';
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="45" fill="none" stroke="#F3F4F6" strokeWidth="8" />
        <circle
          cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" transform="rotate(-90 60 60)"
          className="transition-all duration-1000"
        />
        <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold" fill={color} fontSize="28">{score}</text>
      </svg>
      <span className="text-sm text-gray-500 mt-2">SEO Score</span>
    </div>
  );
}
