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

export function SimpleCrumbs({ crumbs }: { crumbs: CrumbMeta[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map(([href, label]) => (
          <Fragment key={href}>
            <BreadcrumbItem key={href}>
              <BreadcrumbLink asChild>
                <Link to={href}>{label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
