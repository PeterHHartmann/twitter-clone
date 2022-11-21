import style from '@styles/components/NavRight/SearchBar.module.scss'
import icon from '../../public/icon/search.svg'
import Image from 'next/image'

export const SearchBar: React.FC = () => {

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={handleSubmit}>
                <Image className={style.icon} src={icon} alt='' width={19} height={19} priority={true}/>
                <input className={style.input} type='text' placeholder="Search Twitter"></input>
            </form>
        </div>
    )
}

export default SearchBar