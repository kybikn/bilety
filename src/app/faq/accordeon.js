"use client";
import React, { useCallback, useContext, useState } from 'react'

const questionsAndwers = [
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
        <div>
            <button
                onClick={() => switchGroup(title)}
            >{title}</button>
            {activeGroup === title && <div>{children}</div>}
        </div>
    )

}

MenuAccordeon.Item = function MenuItem({ children, title }) {
    return (
        <div>
            <div>{title}</div>
        </div>
    )
}

export default function Accordeon() {
    return (
        <div>
            <MenuAccordeon>
                <MenuAccordeon.Item title="Главная" />
                <MenuAccordeon.Group title="Фильмы">
                    <MenuAccordeon.Item title="Топ" />
                    <MenuAccordeon.Item title="Популярные" />
                    <MenuAccordeon.Item title="Мои любимые" />
                </MenuAccordeon.Group>
                <MenuAccordeon.Group title="Сериалы">
                    <MenuAccordeon.Item title="Топ" />
                    <MenuAccordeon.Item title="Популярные" />
                    <MenuAccordeon.Item title="Мои любимые" />
                </MenuAccordeon.Group>
                <MenuAccordeon.Group title="Служебное">
                    <MenuAccordeon.Item title="О нас" />
                    <MenuAccordeon.Item title="Вопросы" />
                    <MenuAccordeon.Item title="Ответы" />
                </MenuAccordeon.Group>
            </MenuAccordeon>
        </div>
    )
}