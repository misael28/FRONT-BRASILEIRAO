import React from "react";
import "./App.css";
const arrow_left = require("./arrow_left.svg");
const arrow_right = require("./arrow_right.svg");
const pen = require("./pen.svg");
const check = require("./check.svg");
let brasaoCasa = [];
let brasaoVis = [];
let brasao = [];
let escudos = []

fetch("http://localhost:2020/escudos")
.then((res) => res.json())
.then((dados) => {
  escudos = dados.dados;
});

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
  const [token, setToken] = React.useState("");
  const [idJogo, setidJogo] = React.useState(0);
  const [golsCasa, setgolsCasa] = React.useState(undefined);
  const [golsVisitante, setgolsVisitante] = React.useState(undefined);

  /**
   * Chamando a API - BRASILEIRAO 
   * Feita por Misael - 17/10/2020
   * 7 meses de isolamento social... 
   * Ninguém tá aguentando mais essa COVID-19
   * Este front consome as seguintes informações da API
   * tabela de classificação,
   * tabela de jogos
   * tabela de escudos de cada time
   * tabela de jogos por rodada
   * autenticação e senha
   * alteração de placares dos jogos de cada rodada
   * */

  const salvarPlacar = async (idJogo, golsCasa, golsVisitante) => {
    const conteudo = {
      id: idJogo,
      gols_casa: golsCasa,
      gols_visitante: golsVisitante,
    };
   
    const requisao = await fazerRequisicaoComBody(
      "http://localhost:2020/jogos",
      "PUT",
      conteudo,
      token
    );

    const resposta = await requisao.json();
    
  };

  React.useEffect(() => {
    fetch("http://localhost:2020/classificacao")
      .then((res) => res.json())
      .then((dados) => {
        setTabela(dados.dados);
      });
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
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
          {!token ? (
            <div className="cabecalho-login">
              <label>Email</label>
              <input type="text" name="email" id="email" />
              <label>Senha</label>
              <input type="password" name="senha" id="senha" />
              <button
                onClick={() => {
                  const email = document.querySelector("#email").value;
                  const senha = document.querySelector("#senha").value;
                  const conteudo = {
                    email: email,
                    password: senha,
                  };
                  fazerRequisicaoComBody(
                    "http://localhost:2020/auth",
                    "POST",
                    conteudo
                  )
                    .then((res) => res.json())
                    .then((dados) => {
                      localStorage.setItem(
                        "token",
                        JSON.stringify(dados.dados.token)
                      );
                      setToken(dados.dados.token);
                    });
                }}
              >
                Logar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setToken("");
              }}
            >
              Deslogar{" "}
            </button>
          )}
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
                    if (element.nome_time === partida.time_casa) {
                      brasaoCasa = element.link_figura;
                    }
                    if (element.nome_time === partida.time_visitante) {
                      brasaoVis = element.link_figura;
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
                      <div className="placar-logado">
                        {token && idJogo === partida.id ? (
                          <div className="placar-logado-1">
                            <input
                              type="text"
                              id={partida.id}
                              defaultValue={partida.gols_casa}
                              value={golsCasa}
                              onChange={(event) => {
                                setgolsCasa(event.target.value);
                              }}
                            />
                            <div>x</div>
                            <input
                              type="text"
                              id={partida.id}
                              defaultValue={partida.gols_visitante}
                              value={golsVisitante}
                              onChange={(event) => {
                                setgolsVisitante(event.target.value);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="placar">
                            <div>{partida.gols_casa}</div>
                            <div>x</div>
                            <div>{partida.gols_visitante}</div>
                          </div>
                        )}
                      </div>

                      <div>
                        <img
                          src={brasaoVis}
                          alt={partida.time_visitante}
                          title={partida.time_visitante}
                        />
                      </div>

                      {token &&
                        (idJogo === partida.id ? (
                          <div className="check">
                            <button
                              onClick={() => {
                                salvarPlacar(idJogo, golsCasa, golsVisitante);
                                setidJogo(0);
                              }}
                            >
                              <img src={check} />
                            </button>
                          </div>
                        ) : (
                          <div className="editar">
                            <button
                              onClick={() => {
                                setidJogo(partida.id);
                                setgolsCasa(partida.gols_casa);
                                setgolsVisitante(partida.gols_visitante);
                              }}
                            >
                              <img src={pen} />
                            </button>
                          </div>
                        ))}
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        </div>
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
                    if (element.nome_time === time.nome) {
                      brasao = element.link_figura;
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
