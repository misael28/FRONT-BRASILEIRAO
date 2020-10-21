import React from "react";
import "./App.css";
const arrow_left = require("./arrow_left.svg");
const arrow_right = require("./arrow_right.svg");
const arrow_sort = require("./arrow_sort.svg");
let brasaoCasa = [];
let brasaoVis = [];
let brasao = [];

const escudos = [
  {
    nomeEscudo: "Flamengo",
    url: "https://www.escudosfc.com.br/images/fla.png",
  },
  {
    nomeEscudo: "Santos",
    url: "https://www.escudosfc.com.br/images/santos.png",
  },
  {
    nomeEscudo: "Palmeiras",
    url: "https://www.escudosfc.com.br/images/palmeiras.png",
  },
  {
    nomeEscudo: "Grêmio",
    url: "https://www.escudosfc.com.br/images/gremio.png",
  },
  {
    nomeEscudo: "Athletico-PR",
    url: "https://www.escudosfc.com.br/images/atlpr.png",
  },
  {
    nomeEscudo: "São Paulo",
    url: "https://www.escudosfc.com.br/images/saopaulo.png",
  },
  {
    nomeEscudo: "Inter-RS",
    url: "https://www.escudosfc.com.br/images/interrs.png",
  },
  {
    nomeEscudo: "Corinthians",
    url: "https://www.escudosfc.com.br/images/corinthians.png",
  },
  {
    nomeEscudo: "Fortaleza",
    url: "https://www.escudosfc.com.br/images/fortaleza.png",
  },
  {
    nomeEscudo: "Goiás",
    url: "https://www.escudosfc.com.br/images/goias.png",
  },
  {
    nomeEscudo: "Bahia",
    url: "https://www.escudosfc.com.br/images/bahia.png",
  },
  {
    nomeEscudo: "Vasco",
    url: "https://www.escudosfc.com.br/images/vasco.png",
  },
  {
    nomeEscudo: "Atlético-MG",
    url: "https://www.escudosfc.com.br/images/atletico.png",
  },
  {
    nomeEscudo: "Botafogo",
    url: "https://www.escudosfc.com.br/images/botafogo.gif",
  },
  {
    nomeEscudo: "Fluminense",
    url: "https://www.escudosfc.com.br/images/fluminense.png",
  },
  {
    nomeEscudo: "Ceará",
    url: "https://www.escudosfc.com.br/images/ceara.png",
  },
  {
    nomeEscudo: "Cruzeiro",
    url: "https://www.escudosfc.com.br/images/cruzeiro.png",
  },
  {
    nomeEscudo: "CSA",
    url: "https://www.escudosfc.com.br/images/csa.png",
  },
  {
    nomeEscudo: "Chapecoense",
    url: "https://www.escudosfc.com.br/images/chapeco.png",
  },
  {
    nomeEscudo: "Avaí",
    url: "https://www.escudosfc.com.br/images/avai.gif",
  },
];

const colunas = [
  "nome",
  "pontos",
  "jogos",
  "vitorias",
  "derrotas",
  "empates",
  "golsFeitos",
  "golsSofridos",
];

const legenda = {
  nome: "Time",
  pontos: "Pontos",
  jogos: "J",
  vitorias: "V",
  derrotas: "D",
  empates: "E",
  golsFeitos: "GF",
  golsSofridos: "GS",
};

function fazerRequisicaoComBody(url, metodo, conteudo, token) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: JSON.stringify(conteudo),
  });
}

function App() {
  const [tabela, setTabela] = React.useState([]);
  const [rodadas, setRodadas] = React.useState([]);
  const [avancar, setAvancar] = React.useState(1);
  const [colunaOrdenada, setColunaOrdenada] = React.useState("pontos");
  const [ordem, setOrdem] = React.useState("ascendente");

  /**
   * Chamando a API
   */
  //tabela de classificação
  React.useEffect(() => {
   
    fetch("http://localhost:2020/classificacao")
      .then((res) => res.json())
      .then((dados) => {
        setTabela(dados.dados);
      });
    {
      /*fazerRequisicaoComBody(
      "https://localhost:2020/classificacao",
      "GET",
      conteudo,
      token
	);
	*/
    }
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:2020/jogos/${avancar}`)
      .then((res) => res.json())
      .then((dados) => {
        setRodadas(dados.dados);
      });
  }, [avancar]);

  const dadosAscendentes = tabela.sort((t1, t2) => {
    if (
      typeof t1[colunaOrdenada] === "number" &&
      typeof t2[colunaOrdenada] === "number"
    ) {
      return (
        parseInt(t2[colunaOrdenada], 10) - parseInt(t1[colunaOrdenada], 10)
      );
    } else {
      return t1[colunaOrdenada].localeCompare(t2[colunaOrdenada]);
    }
  });

  const dadosOrdenados =
    ordem === "ascendente" ? dadosAscendentes : dadosAscendentes.reverse();

  return (
    <div className="App">
      <header className="header">
        <div className="cabecalho">
          <div>
            <h1>Brasileirão</h1>
          </div>
          <div className="cabecalho-login">
            <label>Email</label>
            <input />
            <label>Senha</label>
            <input />
            <button>Logar</button>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="rodadas">
          <div className="rodadas-cabecalho">
            <button
              onClick={() => {
                if (avancar === 1) {
                  return;
                } else {
                  setAvancar(avancar - 1);
                }
              }}
            >
              <img src={arrow_left} alt="esquerda" />
            </button>
            <span>Rodada {avancar}</span>
            <button
              onClick={() => {
                if (avancar === 38) {
                  return;
                } else {
                  setAvancar(avancar + 1);
                }
              }}
            >
              <img src={arrow_right} alt="direita" />
            </button>
          </div>
          <div className="rodadas-conteudo">
            <ul className="jogos">
              {rodadas.map(
                (partida) => (
                  escudos.forEach((element) => {
                    if (element.nomeEscudo === partida.time_casa) {
                      brasaoCasa = element.url;
                    }
                    if (element.nomeEscudo === partida.time_visitante) {
                      brasaoVis = element.url;
                    }
                  }),
                  (
                    <li>
                      <div>
                        <img
                          src={brasaoCasa}
                          alt={partida.time_casa}
                          title={partida.time_casa}
                        />
                      </div>
                      <div>
                        {partida.gols_casa} x {partida.gols_visitante}
                      </div>
                      <div>
                        <img
                          src={brasaoVis}
                          alt={partida.time_visitante}
                          title={partida.time_visitante}
                        />
                      </div>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        </div>
        {/*   brasao = escudos.filter(
                      (item) => item.nomeEscudo === partida.time_casa
                );*/}

        <div className="classifica">
          <div className="classifica-header">
            <label>Posição</label>
            {colunas.map((coluna) => (
              <label>
                {legenda[coluna]}{" "}
                <button
                  onClick={() => {
                    if (colunaOrdenada === coluna) {
                      setOrdem((ordem) =>
                        ordem === "descendente" ? "ascendente" : "descendente"
                      );
                    } else {
                      setColunaOrdenada(coluna);
                      setOrdem("descendente");
                    }
                  }}
                >
                  {colunaOrdenada !== coluna || ordem === "descendente"
                    ? "⬇"
                    : "⬆"}
                </button>
              </label>
            ))}
          </div>
          <div className="classifica-lista">
            <ul className="classifca-lista-conteudo">
              {/*tabela.map */}
              {dadosOrdenados.map(
                (time, i) => (
                  escudos.forEach((element) => {
                    if (element.nomeEscudo === time.nome) {
                      brasao = element.url;
                    }
                  }),
                  (
                    <li>
                      <div className="indice-posicao">{i + 1}</div>
                      <img src={brasao} alt={time.nome} title={time.nome}></img>
                      <div className="indice-posicao">{time.pontos}</div>
                      <div className="indice-posicao">{time.jogos}</div>
                      <div className="indice-posicao">{time.vitorias}</div>
                      <div className="indice-posicao">{time.derrotas}</div>
                      <div className="indice-posicao">{time.empates}</div>
                      <div className="indice-posicao">{time.golsFeitos}</div>
                      <div className="indice-posicao">{time.golsSofridos}</div>
                    </li>
                  )
                )
              )}
            </ul>
            {/*
			<div className="tables">
        <table className="rounds">
          <thead>
            <tr>
              <th>{rodada}</th>
            </tr>
          </thead>
        </table>
        <table className="order">
          <thead>
            <tr>
              <th>Posição</th>
            </tr>
          </thead>
        </table>
      </div>
			*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
