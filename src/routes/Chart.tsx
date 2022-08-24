import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
interface ChartProps {
  coinId?: string;
}

interface iData {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const Chart = () => {
  const coinId = useOutletContext<ChartProps["coinId"]>();
  const { isLoading, data } = useQuery<iData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId!)
  );
  return (
    <div>
      {isLoading ? (
        "loading... "
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data!.map((price) => {
                return {
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: "white",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
