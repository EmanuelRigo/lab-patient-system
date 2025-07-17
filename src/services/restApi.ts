import envsUtils from "@/utils/envs.utils";

const BASE = envsUtils.BACKEND_URL;

export default class RestApi<T> {
  constructor(private resource: string) {}

  private url(path = "") {
    return `${BASE}/api/${this.resource}${path}`;
  }

  async getAll(): Promise<T[]> {
    const res = await fetch(this.url(), {
      credentials: "include",
    });
    if (!res.ok) throw new Error(`❌ No se pudo obtener ${this.resource}.`);
    const { data } = await res.json();
    return data as T[];
  }

  async getById(id: string): Promise<T> {
    const res = await fetch(this.url(`/${id}`), {
      credentials: "include",
    });
    console.log("🚀 ~ RestApi<T> ~ res ~ id:", id);
    if (!res.ok) throw new Error(`❌ No se encontró ${this.resource} (${id}).`);
    const { data } = await res.json();
    return data as T;
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
