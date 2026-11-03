import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const EMAIL = "nitishnarisetti@gmail.com";

export function CopyEmail({ mobile = false }: { mobile?: boolean }) {
  const [status, setStatus] = useState("Copy email");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("Copied!");
    } catch {
      setStatus("Couldn't copy — try again");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("Copy email"), 2200);
  };

  return (
    <span className="group relative block w-fit">
      <Button
        variant="link"
        onClick={copy}
        aria-label={`Copy email address ${EMAIL}`}
        className={`h-auto justify-start rounded-sm p-0 text-electric focus-visible:ring-electric ${mobile ? "min-h-11 text-[15px] font-medium" : "text-[16px] font-normal leading-[26px]"}`}
      >
        {EMAIL}
      </Button>
      <span aria-hidden className={`pointer-events-none absolute bottom-full left-0 mb-1 whitespace-nowrap text-[12px] leading-5 text-electric transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${status === "Copy email" ? "opacity-0" : "opacity-100"}`}>
        {status}
      </span>
      <span role="status" className="sr-only">{status === "Copy email" ? "" : status}</span>
    </span>
  );
}