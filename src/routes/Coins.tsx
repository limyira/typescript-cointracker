import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
  display: flex;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  padding: 10px;
  a {
    padding: 12px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  margin-top: 3px;
  margin-left: 10px;
  margin-right: -2px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;

interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
}

const Coins = () => {
  const { isLoading, data } = useQuery<CoinProps[]>(["allCoins"], fetchCoins);

  // const [coins, setCoins] = useState<CoinProps[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const json = await await (
  //       await fetch("https://api.coinpaprika.com/v1/coins")
  //     ).json();
  //     setCoins(json.slice(0, 30));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 30).map((coin) => (
            <Coin key={coin.id}>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
              />
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                {coin.symbol} :{coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
};

export default Coins;
