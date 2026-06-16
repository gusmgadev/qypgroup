import { del } from "@vercel/blob"
import { sql } from "../db"
import type { ProjectPhoto } from "./projects"

export async function getPhotosByProject(projectId: string): Promise<ProjectPhoto[]> {
  const rows = await sql`
    SELECT * FROM project_photos
    WHERE project_id = ${projectId}
    ORDER BY "order" ASC
  `
  return rows as ProjectPhoto[]
}

export async function addPhoto(
  projectId: string,
  url: string,
  storagePath: string,
  order: number
): Promise<ProjectPhoto> {
  const rows = await sql`
    INSERT INTO project_photos (project_id, url, storage_path, "order")
    VALUES (${projectId}, ${url}, ${storagePath}, ${order})
    RETURNING *
  `
  return rows[0] as ProjectPhoto
}

export async function deletePhoto(photoId: string, blobUrl: string): Promise<void> {
  await del(blobUrl)
  await sql`DELETE FROM project_photos WHERE id = ${photoId}`
}
