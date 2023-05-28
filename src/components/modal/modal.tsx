import { FC, ReactNode, useEffect} from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { modalRoot } from "../../utils/constants";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TModalProps = {
    onClose: () => void;
    header: string;
    styleHeader?: string;
    children: ReactNode
}

const Modal: FC<TModalProps> = ({onClose, header, styleHeader, children }) => {
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("keydown", onEsc);
        };
    }, []);
    return createPortal(
        (
            <>
                <div className={styles.containerModal}>
                    <div className={`${styles.content} pl-10 pt-10 pr-10`}>
                        { styleHeader ? 
                            <h2 className={styleHeader}>{header}</h2> :
                            <h2 className='text text_type_main-large'>{header}</h2>
                        }
                        <button className={styles.closeButton} type="button"> 
                            <CloseIcon type='primary' onClick={onClose}/>
                        </button>
                    </div>
                    <div className='pl-10 pb-10 pr-10'>
                        {children} 
                    </div>
                </div>
                <ModalOverlay onClick={onClose} /> 
            </>
        ),
        modalRoot
    );
};

export default Modal;