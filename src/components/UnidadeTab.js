import React, { useState } from 'react';
import ConsultorioCard from './ConsultorioCard';
import { PlusCircle } from 'lucide-react';

const UnidadeTab = ({ unidade, consultorios, setConsultorios, onDrop }) => {
  const [novoConsultorio, setNovoConsultorio] = useState({ numero: '', especialidade: '' });
  const [editandoConsultorio, setEditandoConsultorio] = useState(null);

  const adicionarConsultorio = () => {
    if (novoConsultorio.numero && novoConsultorio.especialidade) {
      setConsultorios(unidade, [...consultorios, { ...novoConsultorio, cotas: Array(4).fill(null) }]);
      setNovoConsultorio({ numero: '', especialidade: '' });
    }
  };

  const removerConsultorio = (index) => {
    setConsultorios(unidade, consultorios.filter((_, i) => i !== index));
  };

  const editarConsultorio = (index) => {
    setEditandoConsultorio(consultorios[index]);
  };

  const salvarEdicaoConsultorio = () => {
    if (editandoConsultorio) {
      const novosConsultorios = consultorios.map(c => 
        c.numero === editandoConsultorio.numero ? editandoConsultorio : c
      );
      setConsultorios(unidade, novosConsultorios);
      setEditandoConsultorio(null);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Adicionar Novo Consultório</h2>
        <div className="flex">
          <input
            type="number"
            value={novoConsultorio.numero}
            onChange={(e) => setNovoConsultorio({...novoConsultorio, numero: parseInt(e.target.value)})}
            className="border rounded p-1 mr-2"
            placeholder="Número"
          />
          <input
            type="text"
            value={novoConsultorio.especialidade}
            onChange={(e) => setNovoConsultorio({...novoConsultorio, especialidade: e.target.value})}
            className="border rounded p-1 mr-2"
            placeholder="Especialidade"
          />
          <button onClick={adicionarConsultorio} className="bg-green-500 text-white p-1 rounded">
            <PlusCircle size={24} />
          </button>
        </div>
      </div>

      {editandoConsultorio && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Editar Consultório</h2>
          <div className="flex">
            <input
              type="number"
              value={editandoConsultorio.numero}
              onChange={(e) => setEditandoConsultorio({...editandoConsultorio, numero: parseInt(e.target.value)})}
              className="border rounded p-1 mr-2"
              placeholder="Número"
            />
            <input
              type="text"
              value={editandoConsultorio.especialidade}
              onChange={(e) => setEditandoConsultorio({...editandoConsultorio, especialidade: e.target.value})}
              className="border rounded p-1 mr-2"
              placeholder="Especialidade"
            />
            <button onClick={salvarEdicaoConsultorio} className="bg-blue-500 text-white p-1 rounded">
              Salvar
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {consultorios.map((consultorio, index) => (
          <ConsultorioCard
            key={consultorio.numero}
            numero={consultorio.numero}
            especialidade={consultorio.especialidade}
            cotas={consultorio.cotas}
            onDrop={(e, consultorioIndex, cota) => onDrop(e, unidade, consultorioIndex, cota)}
            onRemove={() => removerConsultorio(index)}
            onEdit={() => editarConsultorio(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default UnidadeTab;
