import { db } from '../db/db.js'

export const quoteSalaryAdd = async (req,res) => {
    const userId = req.id 
    try {
        const data = await db.select("*").from("dados_user").where("userId", userId)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Ocorreu um erro ao buscar tabelas'
        })
    }
}

export const createSalaryQuote = async (req, res) => {
    const userId = req.id
    const { salary, quote } = req.body
    try {
        await db("dados_user").insert({
            salario: salary,
            cota_mensal: quote,
            userId: userId,
        })
        return res.status(200).json({
            message: 'Insert realizado com sucesso'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Erro ao realizar Insert'
        })
    }

}

export const updateSalaryQuote = async (req, res) => {
    const { id } = req.params;
    const { salary, quote } = req.body;

    try {
        await db("dados_user")
            .where('id', id)
            .update({ salario: salary, cota_mensal: quote });

        return res.status(200).json({
            message: 'Update realizado com sucesso'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Erro ao realizar Update'
        });
    }
};