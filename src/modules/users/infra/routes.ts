import express from 'express';
import { isLeft } from 'fp-ts/Either';

import { useCaseListByDocumentHandler } from '../useCases';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  try {
    const username = req.query.username.toString();

    const response = await useCaseListByDocumentHandler.execute({ username });

    if (isLeft(response)) {
      const errorType = response.left;

      if (errorType === 'InternalError') {
        return res.status(401).json({
          statusCode: 401,
          message: 'Internal Error Type',
        });
      } else {
        return res.status(403).json({
          statusCode: 403,
          message: 'Empty Document Error Type',
        });
      }
    } else {
      return res.status(200).json(response.right);
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Error Type',
    });
  }
});

export { userRouter };
