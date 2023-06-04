import { db } from "../db/db.js";

export const renderFinancs = async (req, res) => {
    const userId = req.id;
    const { startDate, endDate } = req.query;
  
    try {
      let query = db.select('*').from('controlefinanc').where('user_id', '=', userId);
      if (startDate && endDate) {
        query = query.whereBetween('data_acrescimo', [startDate, endDate]);
      }
  
      const data = await query;
  
      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: 'Erro ao buscar tabelas: ' + err.message,
      });
    }
  };

export const deleteFinancs = async (req, res) => {
    const idItem = req.params.id
    try {
        const query = await db('controlefinanc')
        .where('id', idItem)
        .delete()
        return res.status(200).json({
            message: 'Excluido com sucesso!'
        })
    } catch (error) {
        console.error(error)
        return res.status(500)
    }
}

export const editFinancs = async (req, res) => {
    const idItem = req.params.id
    const { desc, value } = req.body
    try {
        const query = await db('controlefinanc')
        .where('id', idItem)
        .update({
            descricao: desc,
            valor: value,
        })
        return res.status(200).json({
            message: 'Editado com sucesso!'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Erro ao editar tabelas: ' + error.message,
          });
    }
}

export const renderBalance = async (req, res) => {
    const userId = req.id
    const { month } = req.query;
    try {
        let query = db.select('*').from('saldo_diario').where('user_id', userId)

        if (month) {
            query = query.whereRaw("data LIKE ?", [`${month}%`]);
        }

        const data = await query;

        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ocorreu um erro ao buscar tabelas' + err.message,
        });
    }
};


export const insertSaldoDiario = async () => {
    try {
        const query = `INSERT INTO saldo_diario (data, saldo, user_id)
        SELECT CURRENT_DATE(), SUM(entrada - saida) AS saldo, user_id
        FROM (
            SELECT user_id, 
                COALESCE(SUM(CASE WHEN tipo = 'entry' THEN valor ELSE 0 END), 0) AS entrada,
                COALESCE(SUM(CASE WHEN tipo = 'output' THEN valor ELSE 0 END), 0) AS saida
            FROM controlefinanc
            GROUP BY user_id
        ) AS t
        GROUP BY user_id;`;

        await db.raw(query);
        console.log('Insert realizado com sucesso');
    } catch (error) {
        console.error('Erro ao realizar o insert:', error);
    }
};


export const createFinancs = async (req, res) => {
    const idUser = req.id
    const { desc, value, date, type } = req.body;
    try {
        await db('controlefinanc').insert({
            descricao: desc,
            valor: value,
            data_acrescimo: date,
            tipo: type,
            user_id: idUser,
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

export const financsSoma = async (req, res) => {
    const userId = req.id
    const { startDate, endDate } = req.query;
    try {
        let query = db('controlefinanc')
            .sum('valor as entradas')
            .where('tipo', 'entry')
            .andWhere('user_id', '=', userId)
        if(startDate && endDate){
            query = query.whereBetween('data_acrescimo', [startDate, endDate])
        }
        const data = await query
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Erro ao buscar tabelas: ' + err.message,
        });
    }
};

export const minusSoma = async (req, res) => {
    const userId = req.id;
    const { startDate, endDate } = req.query;
    
    try {
        let query = db('controlefinanc')
            .sum('valor as entradas')
            .where('tipo', 'output')
            .andWhere('user_id', userId);

        if (startDate && endDate) {
            query = query.whereBetween('data_acrescimo', [startDate, endDate]);
        }

        const data = await query;
        
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Erro ao buscar tabelas: ' + err.message,
        });
    }
};


