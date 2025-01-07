// src/hooks/useDias.js
import useUnidadeState from './useUnidadeState';

const useDias = () => {
  const estadoSegunda = useUnidadeState();
  const estadoTerca = useUnidadeState();
  const estadoQuarta = useUnidadeState();
  const estadoQuinta = useUnidadeState();
  const estadoSexta = useUnidadeState();

  return {
    segunda: estadoSegunda,
    terca: estadoTerca,
    quarta: estadoQuarta,
    quinta: estadoQuinta,
    sexta: estadoSexta,
  };
};

export default useDias;
