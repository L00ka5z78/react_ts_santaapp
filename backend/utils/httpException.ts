
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

export function ErrorHandler(error: unknown): HttpException {
    // check error types
    if (!(error instanceof Error)) {
        throw new HttpException('Encountered unknown error type', 500);
    }

    // check for unknown errors
    if (error.message.includes('E11000')) {
        throw new HttpException('Object with that ID already exists', 500);
    }

    // catch all unknown/unthought of errors

    throw new HttpException('Unknown error occurred', 500);
}