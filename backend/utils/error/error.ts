import { Request, Response, NextFunction } from 'express';

export class ValidationError extends Error {}

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  res.status(err instanceof ValidationError ? 400 : 500).json({
    message:
      err instanceof ValidationError ? err.message : 'Sorry, try again later.',
  });
};

export default class HttpException extends Error {
  status?: number;
  message: string;
  error: string | null;

  constructor(message: string, status: number, error?: string | null) {
    super(message);
    this.status = status;
    this.message = message;
    this.error = error ?? null;
  }
}
