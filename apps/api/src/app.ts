import cors from 'cors';
import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import { PORT } from './config';
import { SampleRouter } from './routers/sample.router';
import { AdminRouter } from './routers/admin.router';
import { AuthRouter } from './routers/auth.router';
import { UserRouter } from './routers/user.router';
import { OrderRouter } from './routers/order.router';
import { AddressRouter } from './routers/address.router';
import { PickupRouter } from './routers/pickup.router';
import { OutletRouter } from './routers/outlet.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send(err.message);
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const sampleRouter = new SampleRouter();
    const adminRouter = new AdminRouter();
    const authRouter = new AuthRouter();
    const userRouter = new UserRouter();
    const orderRouter = new OrderRouter();
    const addressRouter = new AddressRouter();
    const pickupRouter = new PickupRouter();
    const outletRouter = new OutletRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/samples', sampleRouter.getRouter());
    this.app.use('/api/admin', adminRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/order', orderRouter.getRouter());
    this.app.use('/api/addresses', addressRouter.getRouter());
    this.app.use('/api/pickup-orders', pickupRouter.getRouter());
    this.app.use('/api/outlets', outletRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/api`);
    });
  }
}
