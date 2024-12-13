interface HabitatFilterProps {
    filteredRegion: string;
    setFilteredRegion: (region: string) => void;
}

export default function HabitatFilter({ filteredRegion, setFilteredRegion }: HabitatFilterProps) {
    return (
        <select name="region" id="region" value={filteredRegion} onChange={(e) => setFilteredRegion(e.target.value)}>
            <option value="all">All</option>
            <option value="cave">Cave</option>
            <option value="forest">Forest</option>
            <option value="grassland">Grassland</option>
            <option value="montain">Montain</option>
            <option value="rare">Rare</option>
            <option value="rough-terrain">Rough terrain</option>
            <option value="sea">Sea</option>
            <option value="urban">Urban</option>
            <option value="waters-edge">Waters edge</option>
        </select>
    )
}