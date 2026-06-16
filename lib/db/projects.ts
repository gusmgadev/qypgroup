import { sql } from "../db"

export type ProjectPhoto = {
  id: string
  project_id: string
  url: string
  storage_path: string
  order: number
  created_at: string
}

export type Project = {
  id: string
  title: string
  description: string | null
  visible: boolean
  created_at: string
  updated_at: string
  photos?: ProjectPhoto[]
}

export async function getVisibleProjects(): Promise<Project[]> {
  const rows = await sql`
    SELECT p.*,
      COALESCE(
        json_agg(ph ORDER BY ph."order") FILTER (WHERE ph.id IS NOT NULL),
        '[]'
      ) AS photos
    FROM projects p
    LEFT JOIN project_photos ph ON ph.project_id = p.id
    WHERE p.visible = true
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `
  return rows as Project[]
}

export async function getAllProjects(): Promise<Project[]> {
  const rows = await sql`
    SELECT p.*,
      COALESCE(
        json_agg(ph ORDER BY ph."order") FILTER (WHERE ph.id IS NOT NULL),
        '[]'
      ) AS photos
    FROM projects p
    LEFT JOIN project_photos ph ON ph.project_id = p.id
    GROUP BY p.id
    ORDER BY p.created_at DESC
  `
  return rows as Project[]
}

export async function getProjectById(id: string): Promise<Project | null> {
  const rows = await sql`
    SELECT p.*,
      COALESCE(
        json_agg(ph ORDER BY ph."order") FILTER (WHERE ph.id IS NOT NULL),
        '[]'
      ) AS photos
    FROM projects p
    LEFT JOIN project_photos ph ON ph.project_id = p.id
    WHERE p.id = ${id}
    GROUP BY p.id
  `
  return (rows[0] as Project) ?? null
}

export async function createProject(title: string, description: string): Promise<Project> {
  const rows = await sql`
    INSERT INTO projects (title, description)
    VALUES (${title}, ${description})
    RETURNING *
  `
  return rows[0] as Project
}

export async function updateProject(id: string, title: string, description: string): Promise<Project> {
  const rows = await sql`
    UPDATE projects
    SET title = ${title}, description = ${description}, updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0] as Project
}

export async function deleteProject(id: string): Promise<void> {
  await sql`DELETE FROM projects WHERE id = ${id}`
}

export async function toggleProjectVisible(id: string, visible: boolean): Promise<void> {
  await sql`UPDATE projects SET visible = ${visible}, updated_at = NOW() WHERE id = ${id}`
}
