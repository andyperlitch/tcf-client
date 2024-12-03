import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useMemo } from "react";

interface AudioVizBarsProps {
  width: number | undefined;
  height: number | undefined;
  placement: "top" | "bottom" | "center";
  mirrored?: boolean;
  frequencyData: Uint8Array | null;
  fillColor?: string;
  className?: string;
  flipped?: boolean;
}

export function AudioVizBars({
  width,
  height,
  placement,
  mirrored = true,
  flipped = false,
  frequencyData,
  fillColor = "#FFFFFF88",
  className,
}: AudioVizBarsProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const { heightScale, yScale } = useMemo(() => {
    if (!height) {
      return { heightScale: undefined, yScale: undefined };
    }

    let yScale: d3.ScaleLinear<number, number> | undefined;

    if (placement === "center") {
      yScale = d3
        .scaleLinear()
        .domain([0, 255])
        .range([height / 2, 0]);
    } else if (placement === "bottom") {
      yScale = d3.scaleLinear().domain([0, 255]).range([height, 0]);
    } else {
      yScale = d3.scaleLinear().domain([0, 255]).range([0, 0]);
    }

    return {
      heightScale: d3.scaleLinear().domain([0, 255]).range([0, height]),
      yScale,
    };
  }, [height, placement]);

  useEffect(() => {
    if (
      frequencyData &&
      svgRef.current &&
      height &&
      width &&
      heightScale &&
      yScale
    ) {
      let dataToVisualize: Uint8Array;

      if (mirrored) {
        dataToVisualize = new Uint8Array([
          ...Array.from(frequencyData).slice(1).reverse(),
          ...Array.from(frequencyData),
        ]);
      } else if (flipped) {
        dataToVisualize = frequencyData.reverse();
      } else {
        dataToVisualize = frequencyData;
      }

      const bandWidth = width / dataToVisualize.length;
      console.log(`andy bandWidth`, bandWidth);

      d3.select(svgRef.current)
        .selectAll(`rect`)
        .data(dataToVisualize)
        .join((enter) =>
          enter
            .append("rect")
            .attr("x", (_d, i) => i * bandWidth)
            .attr("height", heightScale(0))
            .attr("width", bandWidth - 2)
            .attr("y", yScale(0))
            .attr("fill", fillColor)
        )
        .attr("x", (_d, i) => i * bandWidth)
        .attr("width", bandWidth - 2)
        .attr("height", (d) => heightScale(d))
        .attr("y", (d) => yScale(d));
    }
  }, [
    frequencyData,
    height,
    width,
    heightScale,
    yScale,
    fillColor,
    mirrored,
    flipped,
  ]);

  return (
    <svg
      className={className}
      width={width}
      height={height}
      data-name="AUDIO_VIZ_BARS"
      ref={svgRef}
    />
  );
}
