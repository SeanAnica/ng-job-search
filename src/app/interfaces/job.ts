export type html = string;

export interface Job {
    id: string,
    companyName: string,
    title: string,
    companyLogo: string,
    reference: string,
    location?: string,
    industries?: string[],
    types?: string[],
    description?: html,
    publishDate?: string
}
