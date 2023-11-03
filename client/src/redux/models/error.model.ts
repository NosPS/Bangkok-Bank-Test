type Props = {
    status: boolean,
    message: string,
    to: string
}

class ErrorModel {
    status: boolean;
    message: string;
    to: string;

    constructor(props: Props) {
        this.status = props.status;
        this.message = props.message;
        this.to = props.to;
    }
}

export default ErrorModel;