import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import { useEffect, useState } from "react";
interface IProps {
  coinId?: string;
}

interface IPrice {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const BigBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: -15px 0px;
  gap: 10px;
`;

const GridSpan = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  padding: 7px 0px;
  background-color: ${(props) => props.theme.overColor};
  border-radius: 10px;
`;
const Brr = styled.br`
  margin-bottom: 10px;
`;
const BSpan = styled.span`
  display: block;
  font-size: 20px;
`;

const Price = () => {
  const coinId = useOutletContext<IProps["coinId"]>();
  const { isLoading, data } = useQuery<IPrice>(["price", coinId], () =>
    fetchCoinTickers(coinId!)
  );
  const Hdate = new Date(`${data?.quotes.USD.ath_date}`);
  const year = Hdate.getFullYear();
  const month = Hdate.getMonth();
  const date = Hdate.getDate();
  const hour = Hdate.getHours();
  const minutes = Hdate.getMinutes();
  const seconds = Hdate.getSeconds();
  const Bole = 0;

  return (
    <BigBox>
      <GridSpan>
        최고가달성 날짜
        <Brr />
        {year}.{month}.{date}
        <Brr />
        {hour}:{minutes}:{seconds}
      </GridSpan>
      <GridSpan>
        최고가
        <Brr />
        <BSpan>$ {data?.quotes.USD.ath_price.toFixed(3)}</BSpan>
      </GridSpan>
      <GridSpan>
        1시간 전보다
        <Brr />
        <BSpan
          style={{
            color: data?.quotes.USD.percent_change_1h! > Bole ? "red" : "blue",
          }}
        >
          {data?.quotes.USD.percent_change_1h} %
        </BSpan>
      </GridSpan>
      <GridSpan>
        6시간 전보다
        <Brr />
        <BSpan
          style={{
            color: data?.quotes.USD.percent_change_6h! > Bole ? "red" : "blue",
          }}
        >
          {data?.quotes.USD.percent_change_6h} %
        </BSpan>
      </GridSpan>
      <GridSpan>
        12시간 전보다
        <Brr />
        <BSpan
          style={{
            color: data?.quotes.USD.percent_change_12h! > Bole ? "red" : "blue",
          }}
        >
          {data?.quotes.USD.percent_change_12h} %
        </BSpan>
      </GridSpan>
      <GridSpan>
        24시간 전보다
        <Brr />
        <BSpan
          style={{
            color: data?.quotes.USD.percent_change_24h! > Bole ? "red" : "blue",
          }}
        >
          {data?.quotes.USD.percent_change_24h} %
        </BSpan>
      </GridSpan>
      <GridSpan>
        7일 전보다
        <Brr />
        <BSpan
          style={{
            color: data?.quotes.USD.percent_change_7d! > Bole ? "red" : "blue",
          }}
        >
          {data?.quotes.USD.percent_change_7d} %
        </BSpan>
      </GridSpan>
      <GridSpan>
        30일 전보다
        <Brr />
        <BSpan
          style={{
            color: data?.quotes.USD.percent_change_30d! > Bole ? "red" : "blue",
          }}
        >
          {data?.quotes.USD.percent_change_30d} %
        </BSpan>
      </GridSpan>
    </BigBox>
  );
};

export default Price;
