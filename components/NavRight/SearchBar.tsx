export default function SearchBar(){
    return (
        <div>
            <form>
                <svg viewBox="0 0 24 24">
                    <use href="/icons.svg#search"></use>
                </svg>
                <input type='text' placeholder="Search Twitter"></input>
            </form>
        </div>
    )
}