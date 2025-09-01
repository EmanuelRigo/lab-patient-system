import ButtonPanel from "./ButtonPanel";

function AsideContent({
  role,
  onLogout,
}: {
  role: string;
  onLogout: () => void;
}) {
  if (!role) return <p>Cargando rol de usuario...</p>;

  return (
    <>
      <ButtonPanel role={role} />
      <button
        onClick={onLogout}
        className="bg-sky-500 hover:bg-sky-600 text-neutral-100 p-4 rounded-md w-full mt-8"
      >
        Cerrar sesión
      </button>
    </>
  );
}
