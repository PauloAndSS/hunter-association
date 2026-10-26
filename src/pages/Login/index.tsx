import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { useTypewriter } from "../../hooks/useTypewriter";
import { authenticate, setSession } from "../../lib/session";
import style from "./index.module.css";

const BOOT_TEXT = "HUNTER-NET TERMINAL v2.4 — INICIALIZANDO CONEXÃO SEGURA...\nAGUARDANDO CREDENCIAIS DE HUNTER LICENCIADO.";

function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const { displayed } = useTypewriter(BOOT_TEXT);
  const [playerName, setPlayerName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    const session = authenticate(playerName, licenseNumber);
    if (!session) {
      setError("ACESSO NEGADO — Nome do Jogador ou Número da Licença inválidos.");
      return;
    }
    setError("");
    setSession(session);
    navigate("/", { replace: true });
  }

  return (
    <div className={style.screen}>
      <div className={style.card}>
        <div className={style.header}>
          <span className={style.brand}>HUNTER-NET</span>
          <span className={style.badge}>CONFIDENCIAL</span>
        </div>
        <p className={style.boot}>{displayed}</p>

        <form className={style.form} onSubmit={handleSubmit}>
          <label className={style.field}>
            <span>Nome do Jogador</span>
            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Digite seu nome de Hunter"
              autoComplete="username"
              autoFocus
            />
          </label>
          <label className={style.field}>
            <span>Número da Licença (Senha)</span>
            <input
              type="password"
              value={licenseNumber}
              onChange={(event) => setLicenseNumber(event.target.value)}
              placeholder="••••"
              autoComplete="current-password"
              inputMode="numeric"
            />
          </label>

          {error && <p className={style.error}>{error}</p>}

          <button type="submit" className={style.submit}>
            AUTENTICAR
          </button>
        </form>

        <p className={style.footer}>ASSOCIAÇÃO HUNTER • ACESSO RESTRITO A MEMBROS LICENCIADOS</p>
      </div>
    </div>
  );
}

export default LoginPage;
