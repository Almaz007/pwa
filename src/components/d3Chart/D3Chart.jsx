import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const D3Graph = ({ data }) => {
    const chartData = data.xyData;
    const svgRef = useRef(); // Используем реф для работы с элементом SVG
    const zoomRef = useRef(); // Реф для зуммирования

    useEffect(() => {
        // Очистка предыдущего графика
        d3.select(svgRef.current).selectAll("*").remove();

        // Установим размеры графика
        const width = 800;
        const height = 400;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        // Создаем SVG
        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Определяем масштаб по оси X
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(chartData, (d) => d.x)]) // Диапазон по оси X
            .range([0, width - margin.left - margin.right]);

        // Определяем масштаб по оси Y, включая отрицательные значения
        const yMin = d3.min(chartData, (d) => d.y);
        const yMax = d3.max(chartData, (d) => d.y);
        const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax]) // Диапазон данных по оси Y
            .range([height - margin.top - margin.bottom, 0]);

        // Добавляем ось X
        const xAxis = svg
            .append("g")
            .attr(
                "transform",
                `translate(0, ${height - margin.top - margin.bottom})`
            )
            .call(d3.axisBottom(xScale));

        // Добавляем ось Y
        svg.append("g").call(d3.axisLeft(yScale));

        // Определяем линию
        const line = d3
            .line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y));

        // Добавляем линию на график
        const path = svg
            .append("path")
            .datum(chartData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // Добавляем горизонтальную линию для отметки 0 на оси Y, если есть отрицательные значения
        if (yMin < 0) {
            svg.append("line")
                .attr("x1", 0)
                .attr("x2", width - margin.left - margin.right)
                .attr("y1", yScale(0))
                .attr("y2", yScale(0))
                .attr("stroke", "black")
                .attr("stroke-width", 1);
        }

        // Определение зуммирования
        const zoom = d3
            .zoom()
            .scaleExtent([1, 5]) // Минимальное и максимальное масштабирование
            .translateExtent([
                [0, 0],
                [width, height],
            ]) // Ограничение панорамирования
            .extent([
                [0, 0],
                [width, height],
            ])
            .on("zoom", (event) => {
                const newXScale = event.transform.rescaleX(xScale); // Обновляем xScale в зависимости от зума
                xAxis.call(d3.axisBottom(newXScale)); // Перерисовываем ось X с новым масштабом
                path.attr(
                    "d",
                    d3
                        .line()
                        .x((d) => newXScale(d.x)) // Обновляем линию по новому xScale
                        .y((d) => yScale(d.y))
                );
            });

        // Добавляем обработчик зуммирования к SVG
        svg.call(zoom);
    }, [chartData]); // Эффект сработает при изменении данных

    return (
        <svg ref={svgRef}></svg> // SVG-элемент для рендеринга графика
    );
};

export default D3Graph;
