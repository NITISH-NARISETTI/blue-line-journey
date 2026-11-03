import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const EMAIL = "nitishnarisetti@gmail.com";

export function EmailContact() {
  const [status, setStatus] = useState("");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setStatus("Email copied");
    } catch {
      setStatus("Couldn't copy. Select the email to copy it.");
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus(""), 2500);
  };

  return (
    <div className="group/email relative flex min-h-11 items-center gap-1 text-electric">
      <a href={`mailto:${EMAIL}`} className="min-w-0 break-all underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric">{EMAIL}</a>
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type="button" variant="ghost" size="icon" onClick={copy} aria-label={status === "Email copied" ? "Email copied" : "Copy email"}
              className="h-11 w-11 shrink-0 text-electric opacity-0 transition-opacity group-hover/email:opacity-100 group-focus-within/email:opacity-100 [@media(hover:none)]:opacity-100">
              {status === "Email copied" ? <Check /> : <Copy />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{status || "Copy email"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span role="status" className="sr-only">{status}</span>
    </div>
  );
}