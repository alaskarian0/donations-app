export default function GoldenDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-8">
      <div className="h-px flex-1 bg-gradient-to-l from-gold/60 to-transparent" />
      <div className="text-gold text-lg">✦</div>
      <div className="h-px flex-1 bg-gradient-to-r from-gold/60 to-transparent" />
    </div>
  );
}
