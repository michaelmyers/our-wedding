
export interface RegistrationStatus {
    succes: boolean;
    message: string;
};

export interface Registration {
    name?: string;
    email?: string;
    date?: Date;
    participation?: boolean;
}