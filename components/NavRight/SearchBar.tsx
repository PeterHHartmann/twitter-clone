import style from '../../styles/components/NavRight/SearchBar.module.scss'

export const SearchBar: React.FC = () => {

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <svg className={style.icon} viewBox="0 0 24 24">
                    <use href="/icons.svg#search"></use>
                </svg>
                <input className={style.input} type='text' placeholder="Search Twitter"></input>
            </form>
        </div>
    )
}

export default SearchBar