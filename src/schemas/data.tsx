
import data from './mock_data.json'

type Repository = {
    id: number
    email: string
    language: string
    status: "active | archived"
    organization: string
}

export const repos = data as Repository[] 
export type {Repository};