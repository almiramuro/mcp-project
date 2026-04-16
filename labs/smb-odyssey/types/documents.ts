export type DocumentType = 'pricing' | 'menu' | 'policy' | 'inventory' | 'other'

export type DocumentStatus = 
  | 'uploaded' 
  | 'extracting' 
  | 'chunking' 
  | 'embedding' 
  | 'ready' 
  | 'failed'

export interface DocumentUpload {
  id: string
  business_id: string
  filename: string
  file_path: string
  file_type: string
  document_type: DocumentType
  status: DocumentStatus
  created_at: string
}

export type AllowedFileType = 'application/pdf' | 'text/plain' | 'text/csv'

export const ALLOWED_FILE_TYPES: AllowedFileType[] = [
  'application/pdf',
  'text/plain', 
  'text/csv'
]

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB