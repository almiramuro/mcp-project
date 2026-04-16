'use client'

import { useState } from 'react'
import { DocumentType, ALLOWED_FILE_TYPES } from '@/types/documents'
import styles from "@/app/(pages)/settings/settings.module.css"


interface Props {
  businessId: string
  onUploadSuccess: () => void
}

export default function DocumentUpload({ businessId, onUploadSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<DocumentType>('menu')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('documentType', documentType)
    formData.append('businessId', businessId)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error)
        return
      }

      setFile(null)
      onUploadSuccess()

    } catch (err) {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={styles['document-upload']}>
      <input
        type="file"
        accept=".pdf,.txt,.csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <div className={styles['upload-controls']}>
        Label: 
        <select
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value as DocumentType)}
        >   
            <option value="menu">Menu</option>
            <option value="pricing">Pricing</option>
            <option value="policy">Policy</option>
            <option value="inventory">Inventory</option>
            <option value="other">Other</option>
        </select>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
            onClick={handleUpload}
            disabled={!file || uploading}
        >
            {uploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </div>
    </div>
  )
}