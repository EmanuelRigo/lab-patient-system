import envsUtils from "@/utils/envs.utils";

const BASE = envsUtils.BACKEND_URL;

export default class RestApi<T> {
  constructor(private resource: string) {}

  private url(path = "") {
    return `${BASE}/api/${this.resource}${path}`;
  }

  // async getAll(): Promise<T[]> {
  //   const res = await fetch(this.url(), {
  //     credentials: "include",
  //   });
  //   if (!res.ok)

  //     throw new Error(`❌ No se pudo obtener ${this.resource}.`);
  //   const { data } = await res.json();
  //   return data as T[];
  // }

  async getAll(): Promise<T[]> {
    try {
      const res = await fetch(this.url(), {
        credentials: "include",
      });

      if (!res.ok) {
        console.warn(`⚠️ Error al obtener ${this.resource}:`, res.statusText);
        return []; // devolvemos array vacío para evitar romper el frontend
      }

      const json = await res.json();
      const data = json?.data;

      if (!Array.isArray(data)) {
        console.warn(
          `⚠️ La respuesta no contiene un array válido de ${this.resource}.`
        );
        return [];
      }

      return data as T[];
    } catch (error) {
      console.error(`❌ Error inesperado al obtener ${this.resource}:`, error);
      return [];
    }
  }

  async getById(id: string): Promise<T | null> {
    try {
      const res = await fetch(this.url(`/${id}`), {
        credentials: "include",
      });

      console.log("🚀 ~ RestApi<T> ~ res ~ id:", id);

      if (!res.ok) {
        console.warn(`⚠️ No se encontró ${this.resource} (${id}).`);
        return null;
      }

      const json = await res.json();
      const data = json?.data;

      if (!data) {
        console.warn(`⚠️ La respuesta no contiene un campo "data" válido.`);
        return null;
      }

      return data as T;
    } catch (error) {
      console.error(
        `❌ Error inesperado al obtener ${this.resource} (${id}):`,
        error
      );
      return null;
    }
  }

  async create(payload: Partial<T>): Promise<T> {
    const res = await fetch(this.url(), {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Esperamos la respuesta JSON del backend
      const errorData = await res.json();

      // Mostramos el mensaje que vino del backend
      console.error("Error del backend:", errorData.message);

      // Lanzamos un error para manejarlo en el frontend
      throw new Error(
        errorData.message || `❌ No se pudo crear ${this.resource}.`
      );
    }

    const { data } = await res.json();
    return data as T;
  }

  async update(id: string, payload: Partial<T>): Promise<T> {
    const res = await fetch(this.url(`/${id}`), {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`❌ No se pudo actualizar ${this.resource}.`);
    const { data } = await res.json();
    return data as T;
  }

  async remove(id: string): Promise<void> {
    const res = await fetch(this.url(`/${id}`), {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error(`❌ No se pudo eliminar ${this.resource}.`);
  }
}
