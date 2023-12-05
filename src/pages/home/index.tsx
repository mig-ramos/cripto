import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import { BiSearch } from "react-icons/bi";

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps {
  coins: CoinProps[];
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);

  useEffect(() => {
    async function getData() {
      fetch(
        "https://sujeitoprogramador.com/api-cripto/?key=8dc2b09b06d97719&pref=BRL"
      )
        .then(response => response.json())
        .then((data: DataProps) => {
          // arequisicao deu tudo certo
          // console.log(data);
          const coinsData = data.coins.slice(0, 15);
          // console.log(coinsData);

          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          });
          const formatResult = coinsData.map((item) => {
            const formated = {
              ...item,
              formatedPrice: price.format(Number(item.price)),
              formatedMarket: price.format(Number(item.market_cap)),
            };

            return formated;
          });

          // console.log(formatResult);
          setCoins(formatResult);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, []);

  return (
    <main className={styles.container}>
      <form className={styles.form} action="">
        <input type="text" placeholder="Digite o símbolo da moeda: BTC..." />
        <button type="submit">
          <BiSearch size={30} color="#FFF" />
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
          </tr>
        </thead>
        <tbody id="tbody">
         {coins.map(coin => (
            <tr key={coin.name} className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                <span>{coin.name}</span> | {coin.symbol}
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="Mercado">
              {coin.formatedMarket}
            </td>
            <td className={styles.tdLabel} data-label="Preço">
              {coin.formatedPrice}
            </td>
            <td className={Number(coin?.delta_24h.replace(',','.')) >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
              <span>{coin.delta_24h}</span>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
