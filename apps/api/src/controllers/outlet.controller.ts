import { getAddressesService } from '@/services/address/get-addresses.service';
import { getOutletService } from '@/services/outlet/get-outlets.service';
import { NextFunction, Request, Response } from 'express';

export class OutletController {
  async getOutlets(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getOutletService();
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  // async getAddress(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await getAddressService(
  //       Number(res.locals.user.id),
  //       Number(req.params.id),
  //     );
  //     res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async createAddress(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await createAddressService(
  //       Number(res.locals.user.id),
  //       req.body,
  //     );
  //     res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async updateAddress(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await updateAddressService(
  //       Number(res.locals.user.id),
  //       req.body,
  //       Number(req.params.id),
  //     );
  //     res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async deleteAddress(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const result = await deleteAddressService(
  //       Number(res.locals.user.id),
  //       Number(req.params.id),
  //     );
  //     res.status(200).send(result);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
