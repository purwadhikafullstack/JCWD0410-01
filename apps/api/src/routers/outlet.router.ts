import { AddressController } from '@/controllers/address.controller';
import { OutletController } from '@/controllers/outlet.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class OutletRouter {
  private router: Router;
  private outletController: OutletController;

  constructor() {
    this.outletController = new OutletController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', verifyToken, this.outletController.getOutlets);
    // this.router.get('/:id', verifyToken, this.addressController.getAddress);
    // this.router.post('/', verifyToken, this.addressController.createAddress);
    // this.router.patch(
    //   '/update-address/:id',
    //   verifyToken,
    //   this.addressController.updateAddress,
    // );
    // this.router.patch(
    //   '/delete-address/:id',
    //   verifyToken,
    //   this.addressController.deleteAddress,
    // );
    // this.router.patch(
    //   '/set-primary-address/:id',
    //   verifyToken,
    //   this.addressController.setPrimaryAddress,
    // );
  }

  getRouter(): Router {
    return this.router;
  }
}
