import { db } from "../db/db.js";

export const renderGoal = async (req, res) => {
    const userId = req.id
    try {
      const data = await db.select('*').from('metas').where('user_id', userId);
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erro ao buscar tabelas: ' + err.message,
      });
    }
  };


export const createGoal = async (req, res) => {
  const userId = req.id
    const { desc, value, initialValue, date, type } = req.body;
    try {
      await db('metas').insert({
        descricao: desc,
        valor_atual: value,
        meta_valor: initialValue,
        data: date,
        tipo: type,
        user_id: userId,
      });
  
      return res.status(200).json({
        message: 'Registered with success!',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Error ao inserir tabelas: ' + err.message,
      });
    }
  };

  
  export const updateGoal = async (req, res) => {
    const { id } = req.params;
    const { valueAdd } = req.body;
    try {
      const goal = await db('metas').where({ id: id }).first();
      const valorAtual = goal.valor_atual;
      const novoValor = parseFloat(valorAtual) + parseFloat(valueAdd);
      await db('metas')
        .where({ id: id })
        .update({
          valor_atual: novoValor,
        });
  
      return res.status(200).json({
        message: 'Updated with success!',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Error ao inserir tabelas: ' + err.message,
      });
    }
  };
  
  export const removeGoal = async (req, res) => {
    const { id } = req.params;
    const { valueAdd } = req.body;
    try {
      const goal = await db('metas').where({ id: id }).first();
      const valorAtual = goal.valor_atual;
      const novoValor = parseFloat(valorAtual) - parseFloat(valueAdd);
      await db('metas')
        .where({ id: id })
        .update({
          valor_atual: novoValor,
        });
  
      return res.status(200).json({
        message: 'Updated with success!',
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Error ao inserir tabelas: ' + err.message,
      });
    }
  };

export const deleteGoal = async (req, res) => {
  const { id } = req.params
  try {
    const query = await db('metas')
    .where('id', id)
    .delete()
    return res.status(200).json({
      message: 'Sucesso!'
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Error ao inserir tabelas: ' + err.message,
    });
  }
}