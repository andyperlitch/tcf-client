import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { buttonVariants } from "./ui/button";
import { CalendarIcon, PersonIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ADMIN_NAV_ITEMS = [
  {
    id: "events",
    title: "Events",
    href: "/admin/events",
    icon: <CalendarIcon />,
  },
  {
    id: "users",
    title: "Users",
    href: "/admin/users",
    icon: <PersonIcon />,
  },
] as const;

export function AdminContainer({
  section,
  children,
}: {
  children: React.ReactNode;
  section: string;
}) {
  return (
    <div
      data-name="ADMIN-CONTAINER"
      className={`
        relative z-[2] mx-auto mt-0 flex flex-row justify-center rounded-lg
        max-w-screen
      `}
    >
      <nav className={`flex flex-col border-r`}>
        <AdminSideNav currentSection={section} />
      </nav>

      <main className={`flex-1`}>
        <div className="rounded-lg p-8 shadow-lg">{children}</div>
        <ModeToggle />
      </main>
    </div>
  );
}

function AdminSideNav({ currentSection }: { currentSection: string }) {
  return (
    <nav
      className={cn(`
        hidden space-x-0 space-y-2 p-6

        md:visible md:flex md:flex-col
      `)}
    >
      {ADMIN_NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            currentSection === item.id
              ? `
                bg-muted text-inherit

                hover:bg-muted
              `
              : `
                text-muted-foreground

                hover:bg-transparent
              `,
            "justify-start"
          )}
        >
          <div className="flex flex-row items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>{item.icon}</TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
            {/* only show title on desktop */}
            <div
              className={`
                hidden

                lg:block
              `}
            >
              {item.title}
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
}
