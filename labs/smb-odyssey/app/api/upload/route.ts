// handles file upload + full pipeline
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseClient'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, DocumentType } from '@/types/documents'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const documentType = formData.get('documentType') as DocumentType
    const businessId = formData.get('businessId') as string

    // Validate
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type as any)) {
      return NextResponse.json({ error: 'File type not supported' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    // Upload to Supabase Storage
    const filePath = `${businessId}/${Date.now()}_${file.name}`
    const fileBuffer = await file.arrayBuffer()

    const { error: storageError } = await supabaseAdmin.storage
      .from('documents')
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false
      })

    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 })
    }

    // Save metadata to DB
    const { data, error: dbError } = await supabaseAdmin
      .from('document_uploads')
      .insert({
        business_id: businessId,
        filename: file.name,
        file_path: filePath,
        file_type: file.type,
        document_type: documentType,
        status: 'uploaded'
      })
      .select()
      .single()

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      document: data 
    })

  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}