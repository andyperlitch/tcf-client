import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { buttonVariants } from "./ui/button";

export const ADMIN_NAV_ITEMS = [
  {
    id: "events",
    title: "Events",
    href: "/admin/events",
  },
  {
    id: "users",
    title: "Users",
    href: "/admin/users",
  },
  {
    id: "calendar",
    title: "Calendar",
    href: "/admin/calendar",
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
      className={`
        relative z-[2] mx-auto mt-4 flex max-w-screen-lg flex-row justify-center
        rounded-lg border
      `}
    >
      <nav className={`flex w-1/4 flex-col border-r`}>
        <AdminSideNav currentSection={section} />
      </nav>

      <main className={`w-3/4`}>
        <div className="space-y-4 rounded-lg p-8 shadow-lg">{children}</div>
        <ModeToggle />
      </main>
    </div>
  );
}

function AdminSideNav({ currentSection }: { currentSection: string }) {
  return (
    <nav
      className={cn(
        `
          flex space-y-2 p-6

          lg:flex-col lg:space-x-0 lg:space-y-1
        `
      )}
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
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
