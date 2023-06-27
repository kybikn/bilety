import React from 'react'
import Image from 'next/image'
import styles from "./styles.module.css"
const Popup = () => {
    return (
        <div
            onClick={handleOverlay}
            className={styles.popup}>
            <div className={styles["popup__container"]}>
                <button
                    className="popup__close hover"
                    type="button"
                    onClick={onClose}>
                    <Image
                        src="/close.svg"
                        alt="close button"
                        className={styles.basketIcon}
                        width={32}
                        height={32}
                        priority
                    />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Popup