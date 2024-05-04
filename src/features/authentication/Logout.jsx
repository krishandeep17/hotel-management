import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogout from "./useLogout";

export default function Logout() {
  const { isPending, logout } = useLogout();

  return (
    <ButtonIcon title="Logout" disabled={isPending} onClick={logout}>
      {!isPending ? <HiOutlineArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
