"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { formatMontant } from "@/lib/format";

type DonneeMensuelle = { mois: string; total: number };

export function MonthlyExpensesChart({ data }: { data: DonneeMensuelle[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="depensesBarFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17618F" />
              <stop offset="100%" stopColor="#0d3a56" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#E3E8EF" />
          <XAxis
            dataKey="mois"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#45515F", fontSize: 13 }}
            dy={8}
          />
          <Tooltip
            cursor={{ fill: "#F5F7FA" }}
            formatter={(value) => [formatMontant(Number(value)), "Dépensé"]}
            labelClassName="font-semibold"
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E3E8EF",
              boxShadow: "0 12px 24px -12px rgba(8,43,80,0.25)",
              fontSize: 13,
              fontFamily: "var(--font-manrope)",
            }}
          />
          <Bar
            dataKey="total"
            fill="url(#depensesBarFill)"
            radius={[10, 10, 0, 0]}
            maxBarSize={48}
            animationDuration={700}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
