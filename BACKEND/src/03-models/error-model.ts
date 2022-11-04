class ErrorModel {
    json(args: { success: boolean; }) {
        throw new Error('Method not implemented.');
    }
    
    public status: number;
    public message: string;

    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export default ErrorModel;


