import EditForm from "./editForm";
import LoginForm from "./loginForm";
import { getTherapist } from "./getTherapist";

export default async function EditPage() {
  const therapist = await getTherapist();

  if (therapist) {
    return <EditForm therapist={therapist} />;
  }

  return <LoginForm />;
}
