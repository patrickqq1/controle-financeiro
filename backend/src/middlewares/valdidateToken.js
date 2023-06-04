import jwt from "jsonwebtoken"

export const userValidation = async (req, res, next) => {
    const userToken = req.headers.authorization;
    if (!userToken) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
    }
    try {
      const [, token] = userToken.split(' ');
      const tokenDecode = jwt.verify(token, 'chave-secreta');
      req.id = tokenDecode.id;
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token de autenticação inválido.' });
    }
  };