import React from "react";
import "./App.css";
const arrow_left = require("./arrow_left.svg");
const arrow_right = require("./arrow_right.svg");
const arrow_sort = require("./arrow_sort.svg");
//let dadosClassificao = [];
let brasaoCasa = [];
let brasaoVis = []
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
    nomeEscudo: "Corinthias",
    url: "https://www.escudosfc.com.br/images/corinthias.png",
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

function App() {
  const [tabela, setTabela] = React.useState([]);
  const [rodadas, setRodadas] = React.useState([]);
  const [avancar, setAvancar] = React.useState(1);
  /**
   * Chamando a API
   */
  //tabela de classificação
  React.useEffect(() => {
    {
      /*	fetch("localhost:2020/classificacao")*/
    }
    fetch("https://desafio-3-back-cubos-academy.herokuapp.com/classificacao")
      .then((res) => res.json())
      .then((dados) => {
        setTabela(dados.dados);
      });
  }, []);

  React.useEffect(() => {
    fetch(`https://desafio-3-back-cubos-academy.herokuapp.com/jogos/${avancar}`)
      .then((res) => res.json())
      .then((dados) => {
        setRodadas(dados.dados);
        console.log(dados.dados);
      });
  }, [avancar]);

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
              {rodadas.map((partida) => (
				  escudos.forEach(element => {
					  if(element.nomeEscudo===partida.time_casa){
						  brasaoCasa=element.url
					  }
					  if(element.nomeEscudo===partida.time_visitante){
						  brasaoVis=element.url
					  }
				  }),
                <li>
					
                  <div><img src={brasaoCasa} alt={partida.time_casa}/></div>
                  <div>{partida.gols_casa} x {partida.gols_visitante}</div>
                  <div><img src={brasaoVis} alt={partida.time_visitante}/></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
				{/*   brasao = escudos.filter(
                      (item) => item.nomeEscudo === partida.time_casa
                );*/}

        <div className="classifica">
          <div className="classifica-header">
            <label>Posição</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>Time</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>PTS</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>E</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>V</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>D</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>GF</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>GS</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
            <label>SG</label>
            <button>
              <img src={arrow_sort} alt="sort" />
            </button>
          </div>
          <div className="classifica-lista">
            <ul className="classifca-lista-conteudo">
              {tabela.map((time, i) => (
                <li>
                  <div>{i + 1}</div>
                  <div>{time.nome}</div>
                  <div>{time.pontos}</div>
                  <div>{time.jogos}</div>
                  <div>{time.vitorias}</div>
                  <div>{time.derrotas}</div>
                  <div>{time.empates}</div>
                  <div>{time.golsFeitos}</div>
                  <div>{time.golsSofridos}</div>
                </li>
              ))}
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
