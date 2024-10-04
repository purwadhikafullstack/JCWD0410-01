import { createAddressService } from '@/services/address/create-address.service';
import { deleteAddressService } from '@/services/address/delete.address.service';
import { getAddressService } from '@/services/address/get-address.service';
import { getAddressesService } from '@/services/address/get-addresses.service';
import { setPrimaryAddressService } from '@/services/address/set-primary-address.service';
import { updateAddressService } from '@/services/address/update-address.service';
import { NextFunction, Request, Response } from 'express';

export class AddressController {
  async getAddresses(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAddressesService(Number(res.locals.user.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await getAddressService(
        Number(res.locals.user.id),
        Number(req.params.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async createAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await createAddressService(
        Number(res.locals.user.id),
        req.body,
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async updateAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await updateAddressService(
        Number(res.locals.user.id),
        req.body,
        Number(req.params.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
  async deleteAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await deleteAddressService(
        Number(res.locals.user.id),
        Number(req.params.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async setPrimaryAddress(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await setPrimaryAddressService(
        Number(res.locals.user.id),
        Number(req.params.id),
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
