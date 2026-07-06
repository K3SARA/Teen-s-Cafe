import Logo from "./Logo";

export default function MobileHeader() {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b border-blush-dark/20 bg-white/70 px-4 py-3 lg:hidden">
      <Logo size={30} />
      <p className="font-display text-base font-bold text-cocoa">Teen&apos;s Cafe</p>
    </header>
  );
}
