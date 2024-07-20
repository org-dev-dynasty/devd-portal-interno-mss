import express from 'express';
import { ProjectRepositoryPrisma } from '../../../shared/infra/repositories/project_repository_prisma';
import { CreateParicipantController } from './create_participant_controller';
import { CreateParticipantUseCase } from './create_participant_usecase';
import { UserRepositoryPrisma } from '../../../shared/infra/repositories/user_repository_prisma';
import { authenticateToken } from '../../../shared/middlewares/jwt_middleware';

const router = express.Router();
const projectRepository = new ProjectRepositoryPrisma();
const userRepository = new UserRepositoryPrisma();
const projectUseCase = new CreateParticipantUseCase(projectRepository, userRepository);
const projectController = new CreateParicipantController(projectUseCase);

router.post("/create-participant", authenticateToken, async (req, res) => {
  await projectController.createParticipant(req, res);
});

export default router;
