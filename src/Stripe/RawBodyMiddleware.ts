import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as rawBody from 'raw-body';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['stripe-signature']) {
      rawBody(
        req,
        {
          encoding: true,
        },
        (err, body) => {
          if (err) return next(err);
          (req as any).rawBody = body;
          next();
        },
      );
    } else {
      next();
    }
  }
}
