import { Router } from 'express';
import { userRouter } from '~/modules/users/infra';

const router = Router();

router.use('/users', userRouter);

export { router };
