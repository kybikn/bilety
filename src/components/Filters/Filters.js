'use client';
import Image from 'next/image'
import styles from './styles.module.css'
import React, { useCallback, useContext, useState } from 'react'
import Portal from '../../Portals/Portal/Portal';
import { useGetCinemasQuery } from '@/redux/services/cinemaApi';
import { genresMap } from '@/mock/genres';
import { filterActions } from '@/redux/feature/filter';
import { useDispatch } from 'react-redux';

const DropdownMenuContext = React.createContext(false);

const DropDownMenu = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState();
  const switchDropdown = useCallback((title) => {
    setActiveDropdown(activeDropdown === title ? undefined : title)
  }, [activeDropdown])

  return (
    <DropdownMenuContext.Provider value={{ activeDropdown, switchDropdown }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

DropDownMenu.Group = function DropdownGroup({ children, title, groupId }) {
  const { activeDropdown, switchDropdown } = useContext(DropdownMenuContext);
  const [popupParams, setPopupParams] = useState(null);

  function handleDropDownOpen(e) {
    const groupElement = e.target.closest(`.${styles.menuGroup}`)
    if (!groupElement) return
    const br = groupElement.getBoundingClientRect()
    const mystyle = {
      position: 'fixed',
      left: `${br.left}px`,
      top: `${br.bottom + 4}px`,
      maxWidth: `${br.right - br.left}px`,
    };
    setPopupParams(mystyle);
    switchDropdown(groupId);
  }
  return (
    <div className={styles.menuGroup}
      onClick={handleDropDownOpen}>
      <div className={styles.inputBox}  >
        {title}
        <input
          className={styles.input}
          placeholder='Введите название'
        />
      </div>
      <Image
        className={styles.inputIcon}
        src={activeDropdown === groupId ? "/arrow-up.svg" : "/arrow-down.svg"}
        alt="arrow"
        width={32}
        height={32}
        priority
      />
      {activeDropdown === groupId &&
        <Portal >
          <div style={popupParams}>
            {children}
          </div>
        </Portal>}
    </div>
  )
}

DropDownMenu.Item = function DropdownItem({ option, groupId, optionId, onSelect }) {
  const { activeDropdown, switchDropdown } = useContext(DropdownMenuContext);
  const handleClick = () => {
    onSelect({ groupId: activeDropdown, optionId, option })
    switchDropdown('')
  }
  return (
    <div onClick={handleClick}>
      <div className={styles.selectAnswer}>{option}</div>
    </div>
  )
}

export const Filters = () => {
  const { data, isLoading, error } = useGetCinemasQuery();
  const cinemas = data ? data : [];
  const dispatch = useDispatch();


  function handleDropDownSelect({ groupId, optionId, option }) {
    if (groupId === 'genre') dispatch(filterActions.setGenre(optionId));
    if (groupId === 'cinema') dispatch(filterActions.setCinemaId(optionId));
  }

  const [searchTerm, setSearchTerm] = useState("");


  function handleNameChange(e) {

    dispatch(filterActions.setName(e.target.value));
  }


  return (
    <div className={styles.filters}>
      <h2 className={styles.title}>Фильтр поиска</h2>
      {/* <div ref={genreInputRef} onClick={handleGenreOpen}>Выберите жанр
      </div> */}
      <label className={styles.inputBox}  >
        Название
        <input onChange={handleNameChange}
          className={styles.input}
          placeholder='Введите название'
        />
      </label>

      <DropDownMenu>
        <>
          <DropDownMenu.Group groupId={'genre'} title="Выберите жанр" >
            <DropDownMenu.Item
              option="Не выбран"
              optionId=""
              onSelect={handleDropDownSelect}
            />
            {Object.entries(genresMap).map(([key, value]) =>
            (<DropDownMenu.Item
              key={key}
              option={value}
              optionId={key}
              onSelect={handleDropDownSelect}
            />))}
          </DropDownMenu.Group>
          <DropDownMenu.Group groupId={'cinema'} title="Выберите Кинотеатр" >
            <DropDownMenu.Item
              option="Не выбран"
              optionId=""
              onSelect={handleDropDownSelect}
            />
            {isLoading ? <div>Loading</div> : (cinemas.map((cinema) =>
              <DropDownMenu.Item
                key={cinema.id}
                option={cinema.name}
                optionId={cinema.id}
                onSelect={handleDropDownSelect} />))}
          </DropDownMenu.Group></>
      </DropDownMenu>
    </div >
  )
}