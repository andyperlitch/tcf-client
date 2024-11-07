import { useParamsSafe } from "@/hooks/useParamsSafe";
import { StageQR } from "./StageQR";
import useWindowSize from "@/hooks/useWindowSize";

interface StageChromeProps {
  children: React.ReactNode;
  name: string;
}

export function StageChrome({ children, name }: StageChromeProps) {
  const { slug } = useParamsSafe("slug");
  const { width } = useWindowSize();
  return (
    <div
      data-name={name}
      className={`flex h-screen w-screen items-center align-middle`}
    >
      <div data-name={`${name}-content`} className="flex-1">
        {children}
      </div>
      <div
        data-name={`${name}-qr`}
        className={`flex-0 flex h-full flex-col justify-end`}
      >
        <StageQR
          slug={slug}
          width={width * 0.17}
          bgColor="#fae1aa77"
          fgColor="#894c37"
          bgQRColor="#fae1aa"
        />
      </div>
    </div>
  );
}
