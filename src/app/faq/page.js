"use client";
import React, { useCallback, useContext, useState } from 'react'
import Image from 'next/image'
import styles from './faq.module.css'

const questionsAnswers = [
    { question: "Что такое Билетопоиск?", answer: "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов." },
    { question: "Какой компании принадлежит Билетопоиск?", answer: "Билетопоиск - проект компании Яндекс" },
    { question: "Как купить билет на Билетопоиск?", answer: "Выберите нужное количество билетов плюсами и минусами, перейдите в корзину и оплатите." },
    { question: "Как оставить отзыв на Билетопоиск?", answer: "В Google Play или AppStore." },

]

const MenuContext = React.createContext(false);

const MenuAccordeon = ({ children }) => {
    const [activeGroup, setActiveGroup] = useState();
    const switchGroup = useCallback((title) => {
        setActiveGroup(activeGroup === title ? undefined : title)
    }, [activeGroup])

    return (
        <MenuContext.Provider value={{ activeGroup, switchGroup }}>
            {children}
        </MenuContext.Provider>
    )
}

MenuAccordeon.Group = function MenuGroup({ children, title }) {
    const { activeGroup, switchGroup } = useContext(MenuContext);
    return (
        <div className={styles.menuGroup} onClick={() => switchGroup(title)}>
            <div className={styles.textBox}>
                <h1 className={styles.titleTitle}>{title}</h1>
                {activeGroup === title && <div>{children}</div>}
            </div>
            <Image
                className={styles.titleIcon}
                src={activeGroup === title ? "/arrow-up.svg" : "/arrow-down.svg"}
                alt="arrow"
                width={32}
                height={32}
                priority
            />
        </div>
    )

}

MenuAccordeon.Item = function MenuItem({ children, title }) {
    return (
        <div>{title}</div>
    )
}

export default function Faq() {
    return (
        <div className={styles.faq}>
            <h1 className={styles.title}>Вопросы-ответы</h1>
            <div className={styles.accordeon}>
                <MenuAccordeon>
                    {questionsAnswers.map((question, index) => {
                        return (
                            <MenuAccordeon.Group title={question.question} key={index}>
                                <MenuAccordeon.Item title={question.answer} />
                            </MenuAccordeon.Group>)
                    })}
                </MenuAccordeon>
            </div>

        </div>
    )
}
