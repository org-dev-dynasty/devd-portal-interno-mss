import  express , {Request , Response} from 'express';
import { GetParticipantByProjectController } from './get_participant_by_project_controller';
import { ProjectRepositoryPrisma } from '../../../shared/infra/repositories/project_repository_prisma';
import { GetParticipantByProjectUseCase } from './get_participant_by_project_usecase';
import exp from 'constants';

const router = express.Router();
const projectRepository = new ProjectRepositoryPrisma();
const getParticipantByProjectUsecase = new GetParticipantByProjectUseCase(projectRepository);
const getParticipantByProjectController = new GetParticipantByProjectController(getParticipantByProjectUsecase);

router.get('/get-participant-by-project/:project_id', async (req: Request, res: Response) => await getParticipantByProjectController.handle(req, res));

export default router;