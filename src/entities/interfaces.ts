// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Interfaces {
  export interface User {
    id?: number;
    login: string;
    password: string;
    email: string;
    isActivated?: boolean;
    activationLink?: string;
    nickname?: string;
    rating?: number;
    about?: string | null;
    createdAt?: string;
    modifiedAt?: string;
  }

  export interface Film {
    id: number;
    name: string;
    country: Countries;
    author: string;
    averageRating: number;
    description: string | null;
    createdAt: string;
    modifiedAt: string;
  }

  export interface Review {
    id: number;
    authorId: number;
    filmId: number;
    content: string | null;
    score: number;
    karma: number;
    createdAt: string;
    modifiedAt: string;
  }

  export enum Countries {
    RUS = "RUS",
    BEL = "BEL",
    ARM = "ARM",
    KAZ = "KAZ",
    UNK = "UNK",
  }

  export interface ActivationData {
    login: string;
    activationStatus: boolean;
    activationLink: string;
  }
}
