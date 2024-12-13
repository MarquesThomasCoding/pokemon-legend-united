interface TypeFilterProps {
    filteredType: string;
    setFilteredType: (type: string) => void;
}

export default function TypeFilter({ filteredType, setFilteredType }: TypeFilterProps) {
    return (
        <select  className="p-4 rounded-lg border-black border-2 font-impact tracking-wide" name="type" id="type" value={filteredType} onChange={(e) => setFilteredType(e.target.value)}>
            <option value="all">All</option>
            <option value="normal">Normal</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="electric">Electric</option>
            <option value="grass">Grass</option>
            <option value="ice">Ice</option>
            <option value="fighting">Fighting</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="flying">Flying</option>
            <option value="psychic">Psychic</option>
            <option value="bug">Bug</option>
            <option value="rock">Rock</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
        </select>
    )
}