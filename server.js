import express from "express";

const app = express();

const PORT = 3000;

const mensagens = [{ id: 1, usuario: "Ana", texto: "Bom dia!" }, { id: 2, usuario: "Pedro", texto: "Olá!" }];

function consultar(simularErro = false) { return new Promise((resolve, reject) => { setTimeout(() => { if (simularErro) return reject(new Error("Falha simulada"));
resolve(mensagens); }, 1000); }); }

app.get("/mensagens-then", (req, res) => { consultar().then(lista => res.json(lista)).catch(() => res.status(500).json({ erro: "Falha na consulta" })); });

app.get("/mensagens-async", async (req, res) => { try { res.json(await consultar()); } catch (erro) { res.status(500).json({ erro: "Falha na consulta" }); } });

app.get("/mensagens-erro", async (req, res) => { try { res.json(await consultar(true)); } catch (erro) { res.status(500).json({ erro: "Falha simulada" }); } });

app.listen(PORT, "0.0.0.0", () => { console.log(`Servidor em http://localhost:${PORT}`); });

// -- [SPRINT 01 - ROTAS HERDADAS] --
// Rotas da Sprint 01 - continuam disponíveis.
app.get("/", (req, res) => res.send("Servidor rodando! 🚀"));
app.get("/status", (req, res) => res.json({ status: "online", sprint: 3 }));
app.get("/sobre", (req, res) => res.send("Mensageiro Local com Node.js, Express e ES Modules."));


// -- [SPRINT 02 - ROTAS HERDADAS] --
app.get("/mensagens", (req, res) => res.json(listarMensagens()));
app.get("/mensagens/:id", (req, res) => {
  const id = Number(req.params.id);
  const mensagem = buscarMensagem(id);
  if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada." });
  res.json(mensagem);
});
app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));


// -- [SPRINT 03 - NOVAS ROTAS: then/catch e async/await] --
app.get("/mensagens-then", (req, res) => {
  consultarMensagens()
    .then(dados => res.json(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).json({ erro: "Falha ao consultar mensagens." });
    });
});
app.get("/mensagens-async", async (req, res) => {
  try { res.json(await consultarMensagens()); }
  catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagens." });
  }
});

app.get("/mensagens-then", (req, res) => {
  consultarMensagens()
    .then(dados => res.json(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).json({ erro: "Falha ao consultar mensagens." });
    });
});

app.get("/mensagens-async", async (req, res) => {
  try { res.json(await consultarMensagens()); }
  catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Falha ao consultar mensagens." });
  }
});

app.get("/mensagens-erro", async (req, res) => {
  try { res.json(await consultarMensagens(true)); }
  catch (erro) {
    console.error("Erro simulado:", erro.message);
    res.status(500).json({ erro: "Falha simulada na consulta." });
  }
});

// -- [SPRINT 01 - SERVIDOR: iniciado na porta 3000; mantido ao longo das aulas] --
app.listen(PORT, () => {console.log(`Servidor em http://localhost:${PORT}`);
});
