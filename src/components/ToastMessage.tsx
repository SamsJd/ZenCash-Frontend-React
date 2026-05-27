type ToastMessageProps = {
  mensagem: string;
  tipo: "success" | "danger" | "warning";
};

export default function ToastMessage({ mensagem, tipo }: ToastMessageProps) {
  if (!mensagem) return null;

  return (
    <div
      className={`alert alert-${tipo} position-fixed top-0 end-0 m-4 shadow fw-bold`}
      style={{ zIndex: 9999 }}
      role="alert"
    >
      {mensagem}
    </div>
  );
}