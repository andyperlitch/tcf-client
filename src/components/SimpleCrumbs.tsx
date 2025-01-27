import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";

export type CrumbMeta = [string, string];

export function SimpleCrumbs({
  crumbs,
  trailingSeparator = true,
}: {
  crumbs: CrumbMeta[];
  trailingSeparator?: boolean;
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map(([hrefOrId, label], index) => (
          <Fragment key={hrefOrId}>
            <BreadcrumbItem key={hrefOrId}>
              {hrefOrId.startsWith("/") ? (
                <BreadcrumbLink asChild>
                  <Link to={hrefOrId}>{label}</Link>
                </BreadcrumbLink>
              ) : (
                <div className="font-bold">{label}</div>
              )}
            </BreadcrumbItem>
            {(index < crumbs.length - 1 || trailingSeparator) && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
