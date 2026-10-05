import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Translated } from "@/i18n/Translated";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export function NavGroup({
  label,
  links,
  onLogout,
}: {
  label: string;
  links: string[][];
  onLogout?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <span className="max-w-32 truncate">
          <Translated text={label} />
        </span>
        <ChevronDown className="h-3 w-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {links.map(([title, to]) => (
          <DropdownMenuItem asChild key={to}>
            <Link to={to}>
              <Translated text={title} />
            </Link>
          </DropdownMenuItem>
        ))}
        {onLogout && (
          <DropdownMenuItem onClick={onLogout}>
            <Translated text="Sair" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
