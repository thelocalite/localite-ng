import { Technician } from './technician';

// Defines Service Model for rendering
export class Service {
    id: number;
    name: string;
    imageurl: string;
    list: Technician[];
}