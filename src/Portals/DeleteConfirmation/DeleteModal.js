'use client';
import styles from "./styles.module.css"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

function DeleteModal({ id, onConfirm, onCancel }) {
    const dialogRef = useRef(null);
    const containerRef = useRef(null);

    function handleClose() {
        onCancel(id)
    }

    function handleContainerClick(e) {
        if (e.target === containerRef.current) {
            onCancel(id)
        }
    }

    useEffect(() => {
        function handleEsc(e) {
            if (e.key === 'Escape') {
                onCancel(id)
            }
        }
        document.addEventListener("keydown", handleEsc)
        return () => document.removeEventListener("keydown", handleEsc)
    }, [id, onCancel])

    return (
        <div
            className={styles.container}
            onClick={handleContainerClick}
            ref={containerRef}
        >
            <div
                className={styles.dialog}
                ref={dialogRef}
            >
                <div className={styles.firstLine}>
                    <h3 className={styles.title}>Удаление билета</h3>
                    <Image
                        onClick={handleClose}
                        src="/close.svg"
                        alt="close"
                        className={styles.closeBtn}
                        width={32}
                        height={32}
                        priority
                    />
                </div>
                <p className={styles.question}>
                    Вы уверены, что хотите удалить билет?
                </p>
                <div className={styles.buttons}>
                    <button
                        onClick={onConfirm}
                        className={styles.buttonYes}>Да</button>
                    <button
                        onClick={handleClose}
                        className={styles.buttonNo}>Нет</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal