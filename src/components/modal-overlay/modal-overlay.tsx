import { FC } from "react";
import styles from "./modal-overlay.module.css";

export type TModalOverlayProps = {
  onClick: () => void
}
export const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div onClick={onClick} className={styles.overlay}></div>;
};
