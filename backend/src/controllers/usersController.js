import { db } from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res) => {
  const { name, email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const existingUser = await db('usuarios').where('email', email).first();
    if(existingUser) {
      return res.status(400).json({
        message: 'Este email já está em uso!'
      })
    }
    await db('usuarios').insert({
      nome: name,
      email: email,
      senha: hashedPassword,
      status: true,
    });

    res.status(200).json({
      message: 'Usuário adicionado com sucesso!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Ocorreu um erro ao adicionar usuário!',
    });
  }
};

export const getUsers = async (req,res) => {
  try {
    const data = await db
    .select("*")
    .from("usuarios")
    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message: 'ERRO INTERNO NO SERVIDOR'
    })
  }
}

export const updatePassword = async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await db('usuarios').where('id', userId).first();

    if (!user) {
      return res.status(404).json({
        message: 'Usuário não encontrado!',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.senha);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Senha atual incorreta!',
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await db('usuarios').where('id', userId).update({ senha: hashedNewPassword });

    res.status(200).json({
      message: 'Senha alterada com sucesso!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'ERRO INTERNO NO SERVIDOR',
    });
  }
};

export const getUserData = async (req, res) => {
    const { email, senha } = req.body;
    try {
      const results = await db.raw('SELECT * FROM usuarios WHERE email = ?', [email]);
      const users = results[0];
  
      if (users.length === 0) {
        res.status(404).json({
          message: 'Usuario nao encontrado',
        });
      } else {
        const user = users[0];
  
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) {
          res.status(401).json({
            message: 'Senha incorreta',
          });
        } else {
          const token = jwt.sign(
            { id: user.id, email: user.email, status: user.status, user: user.nome },
            'chave-secreta',
            { expiresIn: '1h' }
          );
  
          res.status(200).json({
            token
          });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'ERRO INTERNO NO SERVIDOR',
      });
    }
  };