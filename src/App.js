import React from "react";
//import logo from "./logo.svg";
import "./App.css";

function App() {
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
            <button>
              <img src="seta_esquerda.png" alt="esquerda" />
            </button>
            <span>Rodada 1</span>
            <button>
              <img src="seta_esquerda.png" alt="esquerda" />
            </button>
          </div>
          <div className="rodadas-conteudo">
            <ul className="jogos">
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
              <li>
                <div>Sao Paulo</div>
                <div>
                  <h2>
                    {2} x {0}
                  </h2>
                </div>
                <div>Botafogo</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="classifica">
          <div className="classifica-header">
            <label>Posição</label>
            <label>Time</label>
            <label>PTS</label>
            <label>E</label>
            <label>V</label>
            <label>D</label>
            <label>GF</label>
            <label>GS</label>
            <label>SG</label>
          </div>
          <ul>
            <li>
              <span>1</span>
              <span>Flamengo</span>
              <span>90</span>
              <span>6</span>
              <span>28</span>
              <span>4</span>
              <span>89</span>
              <span>37</span>
              <span>{89 - 37}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
