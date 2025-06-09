
import React from "react";
import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function App() {
  const [step, setStep] = useState("cadastro");
  const [paciente, setPaciente] = useState({
    nome: "", idade: "", telefone: "", endereco: "",
    objetivo: "", tratamentos: "", insucessos: "", proposta: "", retorno: "", arquivo: null
  });

  const salvarPaciente = async () => {
    try {
      await addDoc(collection(db, "pacientes"), {
        nome: paciente.nome,
        idade: paciente.idade,
        telefone: paciente.telefone,
        endereco: paciente.endereco,
        objetivo: paciente.objetivo,
        tratamentos: paciente.tratamentos,
        insucessos: paciente.insucessos,
        proposta: paciente.proposta,
        retorno: paciente.retorno,
        data: new Date().toISOString()
      });
      alert("Paciente salvo com sucesso!");
    } catch (e) {
      console.error("Erro ao salvar paciente:", e);
      alert("Erro ao salvar paciente.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1>Cadastro de Novo Paciente</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <input placeholder="Nome do paciente" value={paciente.nome} onChange={e => setPaciente({ ...paciente, nome: e.target.value })} />
        <input placeholder="Idade" value={paciente.idade} onChange={e => setPaciente({ ...paciente, idade: e.target.value })} />
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
        <input placeholder="Telefone" value={paciente.telefone} onChange={e => setPaciente({ ...paciente, telefone: e.target.value })} />
        <input placeholder="Endereço" value={paciente.endereco} onChange={e => setPaciente({ ...paciente, endereco: e.target.value })} />
      </div>
      <textarea
        rows={6}
        style={{ width: "100%", marginTop: "1rem" }}
        placeholder={`Objetivo:
Tratamentos já utilizados:
Motivos dos insucessos:
Tratamento proposto:
Sugestão de data para retorno:`}
        value={`${paciente.objetivo}\n${paciente.tratamentos}\n${paciente.insucessos}\n${paciente.proposta}\n${paciente.retorno}`}
        onChange={e => {
          const lines = e.target.value.split("\n");
          setPaciente({ ...paciente,
            objetivo: lines[0] || "",
            tratamentos: lines[1] || "",
            insucessos: lines[2] || "",
            proposta: lines[3] || "",
            retorno: lines[4] || ""
          });
        }}
      />
      <div style={{ marginTop: "1rem" }}>
        <label>
          📎 Anexar arquivo (exames ou prontuário):
          <input type="file" onChange={e => setPaciente({ ...paciente, arquivo: e.target.files[0] })} />
        </label>
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button onClick={salvarPaciente}>Salvar Paciente</button>
        <button onClick={() => setStep("cancelado")}>Cancelar</button>
      </div>
    </div>
  );
}

export default App;
